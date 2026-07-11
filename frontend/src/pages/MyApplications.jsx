import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const applicationsData = [
  {
    id: 1,
    company: "Google",
    logo: "https://www.google.com/favicon.ico",
    position: "Frontend Developer",
    location: "California, USA",
    salary: "$90k - $120k",
    date: "08 Jul 2026",
    status: "Under Review",
  },
  {
    id: 2,
    company: "Microsoft",
    logo: "https://www.microsoft.com/favicon.ico",
    position: "Software Engineer",
    location: "Remote",
    salary: "$85k - $110k",
    date: "06 Jul 2026",
    status: "Interview",
  },
  {
    id: 3,
    company: "Amazon",
    logo: "https://www.amazon.com/favicon.ico",
    position: "React Developer",
    location: "Seattle",
    salary: "$75k - $100k",
    date: "02 Jul 2026",
    status: "Rejected",
  },
  {
    id: 4,
    company: "Netflix",
    logo: "https://www.netflix.com/favicon.ico",
    position: "UI Engineer",
    location: "Los Angeles",
    salary: "$95k - $130k",
    date: "28 Jun 2026",
    status: "Accepted",
  },
];

const badgeColor = (status) => {
  switch (status) {
    case "Accepted":
      return "bg-green-100 text-green-700";
    case "Rejected":
      return "bg-red-100 text-red-700";
    case "Interview":
      return "bg-indigo-100 text-indigo-700";
    default:
      return "bg-yellow-100 text-yellow-700";
  }
};

const progressColor = (status) => {
  switch (status) {
    case "Accepted":
      return "w-full bg-green-500";
    case "Interview":
      return "w-3/4 bg-indigo-500";
    case "Under Review":
      return "w-1/2 bg-yellow-500";
    default:
      return "w-1/4 bg-red-500";
  }
};

const MyApplications = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredApplications = applicationsData.filter((job) => {
    return (
      job.position.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.status.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl p-10 text-white shadow-lg">
          <h1 className="text-4xl font-bold">My Applications</h1>
          <p className="mt-2 text-teal-100">
            Track every job you've applied for.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow mt-8 p-5">
          <input
            type="text"
            placeholder="Search by company, position or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="space-y-6 mt-8">
          {filteredApplications.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-10 text-center">
              <h2 className="text-2xl font-bold text-gray-700">
                No Applications Found
              </h2>

              <p className="text-gray-500 mt-2">
                Try searching with another keyword.
              </p>
            </div>
          ) : (
            filteredApplications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
              >
                <div className="flex flex-col lg:flex-row justify-between gap-5">
                  {/* Left Side */}
                  <div>
                    <div className="flex items-center gap-4">
                      <img
                        src={app.logo}
                        alt={app.company}
                        className="w-16 h-16 rounded-2xl border bg-white p-2 shadow-sm object-contain"
                      />

                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                          {app.position}
                        </h2>

                        <p className="text-gray-500 mt-1 font-medium">
                          {app.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                      <span>📍 {app.location}</span>
                      <span>💰 {app.salary}</span>
                      <span>📅 {app.date}</span>
                    </div>

                    <div className="flex gap-2 mt-4 flex-wrap">
                      <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Full Time
                      </span>

                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Remote
                      </span>
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="flex flex-col items-start lg:items-end gap-4">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${badgeColor(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>

                    <div className="w-52 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full ${progressColor(app.status)}`} />
                    </div>

                    <div className="flex gap-3">
                      <button
                        className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-lg"
                        onClick={() => navigate(`/jobs/${app.id}`)}
                      >
                        View Details
                      </button>

                      <button className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-5 py-2 rounded-lg">
                        Withdraw
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyApplications;