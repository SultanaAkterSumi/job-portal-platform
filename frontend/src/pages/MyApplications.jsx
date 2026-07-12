import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await API.get("/applications");
        setApplications(res.data.applications || []);
      } catch (err) {
        console.error("Failed to fetch applications:", err.response?.data || err);
        setError(err.response?.data?.message || "Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return applications;

    return applications.filter((application) => {
      const job = application.job;
      return (
        job?.title?.toLowerCase().includes(query) ||
        job?.company?.toLowerCase().includes(query) ||
        job?.location?.toLowerCase().includes(query)
      );
    });
  }, [applications, search]);

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl p-10 text-white shadow-lg">
          <h1 className="text-4xl font-bold">My Applications</h1>
          <p className="mt-2 text-teal-100">
            Jobs you have applied for.
          </p>
          <div className="mt-8 max-w-xs bg-white/15 rounded-2xl p-4 text-center border border-white/20">
            <h2 className="text-3xl font-bold">{applications.length}</h2>
            <p className="text-teal-100">Total Applications</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow mt-8 p-5">
          <input
            type="text"
            placeholder="Search by company, job title or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="space-y-5 mt-8">
          {loading ? (
            <div className="bg-white rounded-2xl shadow p-10 text-center">
              <div className="w-8 h-8 mx-auto border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-500 mt-3">Loading applications...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-2xl shadow p-10 text-center">
              <h2 className="text-xl font-bold text-red-600">Unable to load applications</h2>
              <p className="text-gray-500 mt-2">{error}</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-10 text-center">
              <h2 className="text-2xl font-bold text-gray-700">
                No Applications Found
              </h2>
              <p className="text-gray-500 mt-2">
                Apply for a job and it will appear here.
              </p>
              <button
                onClick={() => navigate("/jobs")}
                className="mt-5 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg"
              >
                Browse Jobs
              </button>
            </div>
          ) : (
            filteredApplications.map((application) => {
              const job = application.job;

              return (
                <div
                  key={application._id}
                  className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                    <div>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-xl font-bold">
                          {job?.company?.charAt(0)?.toUpperCase() || "J"}
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-800">
                            {job?.title || "Job no longer available"}
                          </h2>
                          <p className="text-gray-500 mt-1 font-medium">
                            {job?.company || "Unknown company"}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                        <span>📍 {job?.location || "Not specified"}</span>
                        <span className="capitalize">💼 {job?.jobType || "Not specified"}</span>
                        <span>
                          📅 Applied {new Date(application.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    {job?._id && (
                      <button
                        onClick={() => navigate(`/jobs/${job._id}`)}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg"
                      >
                        View Job
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
