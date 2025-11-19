import React from "react";
import { Link } from "react-router-dom";

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
      {icon}
    </div>
    <div>
      <div className="text-sm text-slate-500">{title}</div>
      <div className="text-2xl font-bold text-slate-800">{value}</div>
    </div>
  </div>
);

const ReportCard = ({ id, type, date, confidence, status }) => (
  <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:shadow-md transition">
    <div>
      <div className="text-sm font-semibold text-slate-800">
        Report ID: {id}
      </div>
      <div className="text-xs text-slate-500 mt-1">
        {type} • {new Date(date).toLocaleDateString()}
      </div>
      <div className="mt-2 text-xs text-slate-500">
        Status:{" "}
        <span
          className={`${
            status === "Completed"
              ? "text-green-600 font-semibold"
              : "text-yellow-600 font-medium"
          }`}
        >
          {status}
        </span>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <div className="hidden sm:block w-44">
        <div className="text-xs text-slate-500 mb-1">Confidence</div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="h-2 rounded-full bg-blue-600"
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Link
          to={`/results/${id}`}
          className="px-3 py-1 text-xs rounded-md border hover:bg-slate-100"
        >
          View
        </Link>
        <Link
          to={`/results/${id}/download`}
          className="px-3 py-1 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Download
        </Link>
      </div>
    </div>
  </div>
);

export default function PatientDashboard() {
  const reports = [
    {
      id: "R-2101",
      type: "Brain MRI - Glioma Detection",
      date: "2025-10-10",
      confidence: 92,
      status: "Completed",
    },
    {
      id: "R-2102",
      type: "Alzheimer’s Progression Scan",
      date: "2025-10-15",
      confidence: 75,
      status: "Processing",
    },
    {
      id: "R-2103",
      type: "Brain MRI - No Abnormality",
      date: "2025-10-18",
      confidence: 98,
      status: "Completed",
    },
  ];

  // Example upcoming appointments (replace with API data later)
  const appointments = [
    {
      id: "A-9876",
      doctor: "Dr. Ayesha Khan (Neurologist)",
      date: "2025-11-12T15:30:00",
      location: "NeuroScan Clinic, Karachi",
      status: "Confirmed",
    },
    {
      id: "A-9877",
      doctor: "Dr. Omar Siddiqui (Radiologist)",
      date: "2025-11-20T11:00:00",
      location: "City Medical Center",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-10 px-6 md:px-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Patient Dashboard
          </h2>
          <p className="text-slate-500 mt-1">
            Consult doctors, book appointments, and review your reports.
          </p>
        </div>

        {/* Actions: replaced Upload MRI with consultation/appointments */}
        <div className="flex gap-3 mt-4 md:mt-0">
          <Link
            to="/doctors"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
          >
            Consult a Doctor
          </Link>
          <Link
            to="/appointments/new"
            className="px-5 py-2 rounded-lg border text-sm font-medium hover:bg-slate-50"
          >
            Book Appointment
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total Reports"
          value="12"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-6l6-3v6l-6 3zM21 12v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6" />
            </svg>
          }
        />
        <StatCard
          title="Upcoming Appointments"
          value={appointments.length}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V5m8 2V5M4 11h16M5 6h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
            </svg>
          }
        />
        <StatCard
          title="Last Report"
          value="Oct 18, 2025"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 5v14M5 12h14" />
            </svg>
          }
        />
        <StatCard
          title="AI Accuracy"
          value="94%"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
            </svg>
          }
        />
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">
            Upcoming Appointments
          </h3>
          <Link to="/appointments" className="text-sm text-blue-600 hover:underline">
            View all
          </Link>
        </div>

        {appointments.length === 0 ? (
          <div className="text-sm text-slate-500">
            You have no upcoming appointments.{" "}
            <Link to="/appointments/new" className="text-blue-600 hover:underline">
              Book your first appointment
            </Link>
            .
          </div>
        ) : (
          <div className="space-y-3">
            {appointments.map((a) => (
              <div key={a.id} className="border rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-slate-800">{a.doctor}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {new Date(a.date).toLocaleString()} • {a.location}
                  </div>
                  <div className="text-xs mt-1">
                    Status:{" "}
                    <span className={a.status === "Confirmed" ? "text-green-600 font-semibold" : "text-yellow-600 font-medium"}>
                      {a.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/appointments/${a.id}`} className="px-3 py-1 text-xs rounded-md border hover:bg-slate-100">
                    Details
                  </Link>
                  <Link to={`/appointments/${a.id}/reschedule`} className="px-3 py-1 text-xs rounded-md border hover:bg-slate-100">
                    Reschedule
                  </Link>
                  <Link to={`/appointments/${a.id}/cancel`} className="px-3 py-1 text-xs rounded-md bg-rose-50 text-rose-700 hover:bg-rose-100">
                    Cancel
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4">
          <Link
            to="/appointments/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 5v14M5 12h14" />
            </svg>
            Book New Appointment
          </Link>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">
            Recent Reports
          </h3>
          <Link to="/results" className="text-sm text-blue-600 hover:underline">
            View all
          </Link>
        </div>

        <div className="space-y-4">
          {reports.map((r) => (
            <ReportCard key={r.id} {...r} />
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 rounded-2xl p-6 mt-10 border border-blue-100">
        <h4 className="text-lg font-semibold text-blue-800 mb-2">💡 Health Tips</h4>
        <ul className="text-sm text-blue-900 space-y-2 list-disc pl-5">
          <li>Use the “Consult a Doctor” flow to discuss your AI results.</li>
          <li>Bring previous reports to your appointment for better context.</li>
          <li>Set reminders for follow-up appointments every 6–12 months.</li>
        </ul>
      </div>
    </div>
  );
}
