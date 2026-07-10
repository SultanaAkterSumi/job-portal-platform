import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../api/axios";
import JobCard from "../components/JobCard";

const categories = [
  "Commerce", "Technology", "Education", "Healthcare",
  "Hotels & Tourism", "Finance", "Design & Arts", "Engineering",
];

const jobTypes = ["full-time", "part-time", "remote", "contract"];
const levels = ["fresher", "intermediate", "expert"];

const JobListings = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchJobs();
  }, [selectedCategory, selectedType, selectedLevel]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (selectedCategory) params.category = selectedCategory;
      if (selectedType) params.jobType = selectedType;
      if (selectedLevel) params.experienceLevel = selectedLevel;

      const res = await API.get("/jobs", { params });
      setJobs(res.data.jobs || []);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedType("");
    setSelectedLevel("");
  };

  return (
    
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="py-10" style={{backgroundImage: "linear-gradient(135deg, rgba(26,26,46,0.85), rgba(15,52,96,0.85)), url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhpcmluZ3xlbnwwfHwwfHx8MA%3D%3D')"}}>
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <h1 className="text-3xl font-bold text-white mb-1">Find Your Perfect Job</h1>
          <p className="mb-6" style={{color: "#94a3b8"}}>{jobs.length} jobs available</p>

          <form onSubmit={handleSearch} className="bg-white rounded-xl p-2 flex gap-2 max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs, skills, companies..."
              className="flex-1 text-sm text-gray-800 outline-none px-3 py-2"
            />
            <button type="submit" className="text-white px-5 py-2 rounded-lg text-sm font-semibold" style={{background: "#f97316"}}>
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">

        {/* Sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-20">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold" style={{color: "#1a1a2e"}}>Filters</h3>
              <button onClick={clearFilters} className="text-xs" style={{color: "#f97316"}}>Clear all</button>
            </div>

            {/* Category */}
            <div className="mb-5">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Category</h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat === selectedCategory ? "" : cat)}
                      className="accent-orange-500"
                    />
                    <span className="text-sm text-gray-600">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Job Type */}
            <div className="mb-5">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Job Type</h4>
              <div className="space-y-2">
                {jobTypes.map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      checked={selectedType === type}
                      onChange={() => setSelectedType(type === selectedType ? "" : type)}
                      className="accent-orange-500"
                    />
                    <span className="text-sm text-gray-600 capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Experience Level</h4>
              <div className="space-y-2">
                {levels.map((level) => (
                  <label key={level} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="level"
                      checked={selectedLevel === level}
                      onChange={() => setSelectedLevel(level === selectedLevel ? "" : level)}
                      className="accent-orange-500"
                    />
                    <span className="text-sm text-gray-600 capitalize">{level}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Job List */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold" style={{color: "#1a1a2e"}}>{jobs.length}</span> jobs
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="salary">Highest Salary</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-3">⏳</div>
              <p className="text-gray-500">Loading jobs...</p>
            </div>
          ) : jobs.length > 0 ? (
            <div className="flex flex-col gap-4">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold mb-2" style={{color: "#1a1a2e"}}>No jobs found</h3>
              <p className="text-gray-500 mb-5">Try different keywords or clear filters</p>
              <button onClick={clearFilters} className="text-white px-6 py-2.5 rounded-lg text-sm font-semibold" style={{background: "#f97316"}}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListings;