import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";

    if (!password.trim()) e.password = "Password is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (!validate()) return;
    setLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (!res.ok) {
        setErrors({ form: res.error });
        return;
      }

      const role = res.user.role;
      const destFrom = location.state?.from;
      const defaultDest =
        role === "Admin"
          ? "/admin-dashboard"
          : role === "Doctor"
          ? "/doctor-dashboard"
          : "/patient-dashboard";

      navigate(destFrom || defaultDest, { replace: true });
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Welcome Back
        </h2>

        {errors.form && (
          <div className="mb-4 text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {errors.form}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4" autoComplete="off">
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              className={
                "w-full border rounded-lg px-4 py-2 outline-none focus:ring " +
                (errors.email ? "border-red-500" : "border-gray-300")
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"           // NOT email (prevents saved suggestions)
              inputMode="email"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                className={
                  "w-full border rounded-lg px-4 py-2 outline-none focus:ring " +
                  (errors.password ? "border-red-500" : "border-gray-300")
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPass ? "text" : "password"}   // toggling works
                name="pass"
                autoComplete="off"
                spellCheck={false}
                placeholder="Your password"
              />

              {/* Eye button */}
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPass ? (
                  // Eye OFF (hide)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3l18 18m-9-5a5 5 0 110-10 5 5 0 010 10zm8.485-2.515A11.955 11.955 0 0021 12a11.96 11.96 0 00-2.515-4.485M6.515 6.515A11.96 11.96 0 003 12c0 1.86.428 3.622 1.185 5.185"
                    />
                  </svg>
                ) : (
                  // Eye ON (show)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          No account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
