import React, { useState } from "react";
import { Link } from "react-router-dom";

const StatCard = ({ title, value, subtitle, icon }) => (
  <div className="bg-white rounded-2xl shadow-sm p-4 flex items-start gap-4">
    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
      {icon}
    </div>
    <div className="flex-1">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="text-2xl font-bold text-slate-800">{value}</div>
      {subtitle && <div className="text-xs text-slate-400 mt-1">{subtitle}</div>}
    </div>
  </div>
);

const PatientRow = ({ patient }) => (
  <tr className="hover:bg-slate-50">
    <td className="px-4 py-3">{patient.id}</td>
    <td className="px-4 py-3">{patient.name}</td>
    <td className="px-4 py-3">{patient.age}</td>
    <td className="px-4 py-3">{patient.lastVisit}</td>
    <td className="px-4 py-3 text-sm text-slate-600">{patient.condition}</td>
    <td className="px-4 py-3">
      <Link
        to={`/results/${patient.lastReportId}`}
        className="text-sm px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700"
      >
        View
      </Link>
    </td>
  </tr>
);

export default function DoctorDashboard() {
  const [query, setQuery] = useState("");

  // ── Stats ─────────────────────────────────────────────────────────────
  const stats = [
    {
      title: "My Patients",
      value: 82,
      subtitle: "Active patients assigned",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5m6 0v-2a4 4 0 00-4-4h-0a4 4 0 00-4 4v2" />
        </svg>
      ),
    },
    {
      title: "Pending Analyses",
      value: 6,
      subtitle: "Awaiting review",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3" />
          <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      title: "Today’s Appointments",
      value: 5,
      subtitle: "Scheduled today",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V5m8 2V5M4 11h16M5 6h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
        </svg>
      ),
    },
    {
      title: "Reports Generated",
      value: 314,
      subtitle: "This month",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-6l6-3v6l-6 3zM21 12v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6" />
        </svg>
      ),
    },
  ];

  // ── Placeholder data; replace with API later ──────────────────────────
  const patients = [
    { id: "P-1001", name: "Lara Croft", age: 45, lastVisit: "2025-10-09", condition: "Follow-up", lastReportId: "R-2041" },
    { id: "P-1002", name: "Mark Taylor", age: 62, lastVisit: "2025-10-12", condition: "New scan", lastReportId: "R-2045" },
    { id: "P-1003", name: "Sofia Ali", age: 71, lastVisit: "2025-10-14", condition: "Monitoring", lastReportId: "R-2047" },
  ];

  const analyses = [
    { id: "R-2045", patient: "Mark Taylor", finding: "Glioma", confidence: 0.89, date: "2025-10-18" },
    { id: "R-2041", patient: "Lara Croft", finding: "No abnormality", confidence: 0.12, date: "2025-10-16" },
    { id: "R-2047", patient: "Sofia Ali", finding: "AMCI suspected", confidence: 0.72, date: "2025-10-14" },
  ];

  const todaysAppointments = [
    { id: "A-3001", patient: "Ahmed Raza", time: "10:00 AM", location: "Room 3B", reason: "MRI Review", status: "Confirmed" },
    { id: "A-3002", patient: "Mehak Noor", time: "11:30 AM", location: "Tele-consult", reason: "Alzheimer’s Follow-up", status: "Pending" },
    { id: "A-3003", patient: "Usman Tariq", time: "2:00 PM", location: "Room 1A", reason: "New Symptoms", status: "Confirmed" },
  ];

  // ── MRI Upload Queue data (doctor-side) ───────────────────────────────
  const pendingUploads = [
    { id: "U-501", patient: "Ali Hassan", modality: "MRI Brain", size: "182 MB", uploadedAt: "2025-11-08 17:44", notes: "First-time upload" },
    { id: "U-502", patient: "Sara Ahmed", modality: "MRI Brain (T1/T2)", size: "220 MB", uploadedAt: "2025-11-09 09:12", notes: "Follow-up scan" },
    { id: "U-503", patient: "Bilal Khan", modality: "MRI Spine", size: "150 MB", uploadedAt: "2025-11-09 10:05", notes: "Neck pain" },
  ];

  const completedUploads = [
    { id: "U-480", patient: "Nida Farooq", modality: "MRI Brain", size: "205 MB", completedAt: "2025-11-07 14:20", reportId: "R-2088" },
    { id: "U-476", patient: "Hassan Ali", modality: "MRI Brain", size: "198 MB", completedAt: "2025-11-06 12:05", reportId: "R-2079" },
  ];

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.id.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-8 px-4 md:px-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">Doctor Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Review scans, manage your schedule, and consult with patients.
          </p>

          {/* ⬇️ Upload MRI moved here under the header text */}
          <div className="mt-3">
            <Link
              to="/upload-mri"
              className="inline-flex px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
            >
              MRI Scans Upload
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patient by name or ID..."
            className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search patients"
          />

          {/* Shortcuts (kept; Upload MRI removed from here) */}
          <Link
            to="/appointments"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Appointment Requests
          </Link>
          <Link
            to="/consults"
            className="px-4 py-2 rounded-lg border text-sm hover:bg-slate-50"
          >
            Consult Requests
          </Link>
          <button className="px-4 py-2 rounded-lg border text-sm hover:bg-slate-50">
            Settings
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, idx) => (
          <StatCard key={idx} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Recent analyses + Today’s Appointments */}
        <section className="lg:col-span-2 space-y-6">
          {/* Recent Analyses */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Recent Analyses</h2>
              <Link to="/results" className="text-sm text-blue-600 hover:underline">View all</Link>
            </div>

            <div className="space-y-4">
              {analyses.map((a) => (
                <div
                  key={a.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 rounded-lg p-4"
                >
                  <div>
                    <div className="text-sm font-medium text-slate-800">{a.patient}</div>
                    <div className="text-xs text-slate-500">{a.date} • Report {a.id}</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-sm text-slate-600">{a.finding}</div>

                    <div className="w-44">
                      <div className="text-xs text-slate-500 mb-1">Confidence</div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-2 rounded-full bg-blue-600"
                          style={{ width: `${Math.round(a.confidence * 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link to={`/results/${a.id}`} className="px-3 py-1 text-sm rounded-md border hover:bg-slate-100">
                        View
                      </Link>
                      <button className="px-3 py-1 text-sm rounded-md bg-yellow-100 border">
                        Annotate
                      </button>
                      <button className="px-3 py-1 text-sm rounded-md bg-red-600 text-white">
                        Request Biopsy
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today’s Appointments */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Today’s Appointments</h3>
              <Link to="/appointments" className="text-sm text-blue-600 hover:underline">
                View all
              </Link>
            </div>

            {todaysAppointments.length === 0 ? (
              <div className="text-sm text-slate-500">
                No appointments scheduled for today.
              </div>
            ) : (
              <div className="space-y-3">
                {todaysAppointments.map((a) => (
                  <div
                    key={a.id}
                    className="border rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-800">
                        {a.patient} • {a.time}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {a.location} • {a.reason}
                      </div>
                      <div className="text-xs mt-1">
                        Status:{" "}
                        <span
                          className={
                            a.status === "Confirmed"
                              ? "text-green-600 font-semibold"
                              : "text-yellow-600 font-medium"
                          }
                        >
                          {a.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        to={`/appointments/${a.id}`}
                        className="px-3 py-1 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Start Consult
                      </Link>
                      <Link
                        to={`/appointments/${a.id}/reschedule`}
                        className="px-3 py-1 text-xs rounded-md border hover:bg-slate-100"
                      >
                        Reschedule
                      </Link>
                      <button className="px-3 py-1 text-xs rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                        Mark Complete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4">
              <Link
                to="/consults/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm hover:bg-slate-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 5v14M5 12h14" />
                </svg>
                New Consult
              </Link>
            </div>
          </div>

          {/* MRI Upload Queue */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-800">MRI Upload Queue</h3>
              <Link
                to="/upload-mri"
                className="text-sm px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Upload New MRI
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Pending Uploads */}
              <div className="rounded-xl bg-white/70 backdrop-blur border border-blue-100">
                <div className="px-4 py-3 border-b border-blue-100">
                  <h4 className="text-sm font-semibold text-blue-700 flex items-center gap-2">
                    <span className="inline-flex w-2 h-2 rounded-full bg-blue-600" />
                    Pending Uploads
                  </h4>
                </div>
                <div className="divide-y divide-blue-100">
                  {pendingUploads.map((u) => (
                    <div key={u.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-medium text-slate-800">
                          {u.patient} • <span className="text-slate-600">{u.modality}</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {u.size} • Uploaded {u.uploadedAt}
                        </div>
                        {u.notes && (
                          <div className="text-xs text-slate-500 mt-0.5">Notes: {u.notes}</div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Link
                          to={`/uploads/${u.id}`}
                          className="px-3 py-1 text-xs rounded-md border border-blue-200 hover:bg-blue-50 text-blue-700"
                        >
                          Review
                        </Link>
                        <button className="px-3 py-1 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700">
                          Process
                        </button>
                        <button className="px-3 py-1 text-xs rounded-md bg-rose-50 text-rose-700 hover:bg-rose-100">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  {pendingUploads.length === 0 && (
                    <div className="p-4 text-sm text-blue-800/70">No pending uploads.</div>
                  )}
                </div>
              </div>

              {/* Completed Uploads */}
              <div className="rounded-xl bg-white/70 backdrop-blur border border-blue-100">
                <div className="px-4 py-3 border-b border-blue-100">
                  <h4 className="text-sm font-semibold text-blue-700 flex items-center gap-2">
                    <span className="inline-flex w-2 h-2 rounded-full bg-emerald-500" />
                    Completed Uploads
                  </h4>
                </div>
                <div className="divide-y divide-blue-100">
                  {completedUploads.map((u) => (
                    <div key={u.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-medium text-slate-800">
                          {u.patient} • <span className="text-slate-600">{u.modality}</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {u.size} • Completed {u.completedAt}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          to={`/results/${u.reportId}`}
                          className="px-3 py-1 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700"
                        >
                          View Report
                        </Link>
                        <button className="px-3 py-1 text-xs rounded-md border border-blue-200 hover:bg-blue-50 text-blue-700">
                          Archive
                        </button>
                      </div>
                    </div>
                  ))}
                  {completedUploads.length === 0 && (
                    <div className="p-4 text-sm text-blue-800/70">No completed uploads.</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Notes / Workflow */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-slate-800">Quick Notes</h3>
            <ul className="mt-3 text-sm text-slate-600 space-y-2">
              <li>• Use Annotate to highlight ROIs before exporting the report.</li>
              <li>• Export PDF reports for the patient chart.</li>
              <li>• Flag high-confidence findings for multidisciplinary review.</li>
            </ul>
          </div>
        </section>

        {/* Right: Patient list */}
        <aside className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">Patient List</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-500 text-left">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Age</th>
                  <th className="px-4 py-2">Last Visit</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((p) => (
                  <PatientRow key={p.id} patient={p} />
                ))}

                {filteredPatients.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-4 py-6 text-center text-slate-500">
                      No patients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <Link to="/patients" className="text-sm text-blue-600 hover:underline">
              Manage all patients
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
