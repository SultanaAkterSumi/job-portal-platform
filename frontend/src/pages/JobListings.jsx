import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { jobs, categories } from "../data/mockData";
import JobCard from "../components/JobCard";

const JobListings = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const jobTypes = ["full-time", "part-time", "remote", "contract"];
  const levels = ["fresher", "intermediate", "expert"];

  const filtered = useMemo(() => {
    let result = [...jobs];

    if (searchQuery) {
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory) {
      result = result.filter((j) => j.category === selectedCategory);
    }

    if (selectedType) {
      result = result.filter((j) => j.type === selectedType);
    }

    if (selectedLevel) {
      result = result.filter((j) => j.experienceLevel === selectedLevel);
    }

    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
    } else if (sortBy === "salary") {
      result.sort((a, b) => b.salary.max - a.salary.max);
    }

    return result;
  }, [searchQuery, selectedCategory, selectedType, selectedLevel, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedType("");
    setSelectedLevel("");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-teal-600 pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">Find Your Perfect Job</h1>
          <p className="text-teal-100">{filtered.length} jobs available</p>

          {/* Search Bar */}
          <div className="bg-white rounded-xl p-3 flex gap-3 mt-6 max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs, skills, companies..."
              className="flex-1 text-sm text-gray-800 outline-none px-2"
            />
            <button className="bg-teal-500 text-white px-5 py-2 rounded-lg text-sm font-semibold">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">

          {/* Sidebar Filters */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-20">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-xs text-teal-600 hover:underline"
                >
                  Clear all
                </button>
              </div>

              {/* Category */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat.name}
                        onChange={() => setSelectedCategory(cat.name === selectedCategory ? "" : cat.name)}
                        className="accent-teal-500"
                      />
                      <span className="text-sm text-gray-600">{cat.name}</span>
                      <span className="text-xs text-gray-400 ml-auto">{cat.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Job Type */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Job Type</h4>
                <div className="space-y-2">
                  {jobTypes.map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        checked={selectedType === type}
                        onChange={() => setSelectedType(type === selectedType ? "" : type)}
                        className="accent-teal-500"
                      />
                      <span className="text-sm text-gray-600 capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Experience Level</h4>
                <div className="space-y-2">
                  {levels.map((level) => (
                    <label key={level} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="level"
                        checked={selectedLevel === level}
                        onChange={() => setSelectedLevel(level === selectedLevel ? "" : level)}
                        className="accent-teal-500"
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
            {/* Sort */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-900">{filtered.length}</span> jobs
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

            {/* Jobs */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {filtered.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-500 mb-5">Try different keywords or clear filters</p>
                <button
                  onClick={clearFilters}
                  className="bg-teal-500 text-white px-6 py-2.5 rounded-lg text-sm font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListings;