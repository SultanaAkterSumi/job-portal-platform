import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { categories, jobs, testimonials, topCompanies } from "../data/mockData";
import JobCard from "../components/JobCard";

const Homepage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?search=${searchQuery}&location=${locationQuery}`);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section style={{background: "linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 50%, #0f3460 100%)"}} className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold text-white leading-tight mb-4">
            Find Your Dream Job Today!
          </h1>
          <p className="mb-10 text-lg" style={{color: "#94a3b8"}}>
            Connecting Talent with Opportunity: Your Gateway to Career Success
          </p>

          <form onSubmit={handleSearch} className="bg-white rounded-2xl p-2 flex gap-2 max-w-3xl mx-auto mb-10" style={{boxShadow: "0 20px 60px rgba(0,0,0,0.4)"}}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Job Title or Company"
              className="flex-1 text-sm text-gray-700 outline-none px-4 py-3"
            />
            <div className="w-px bg-gray-200"></div>
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              placeholder="Select Location"
              className="flex-1 text-sm text-gray-700 outline-none px-4 py-3"
            />
            <div className="w-px bg-gray-200"></div>
            <select className="text-sm text-gray-500 outline-none px-3 py-3 bg-transparent">
              <option>Select Category</option>
              {categories.map(c => <option key={c.id}>{c.name}</option>)}
            </select>
            <button type="submit" className="text-white font-semibold px-6 py-3 rounded-xl text-sm flex-shrink-0" style={{background: "#0d9488"}}>
               Search Job
            </button>
          </form>

          {/* Stats */}
          <div className="flex items-center justify-center gap-10 flex-wrap">
            {[
              {
                value: "25,850", label: "Jobs",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M2 12h20"/></svg>
              },
              {
                value: "10,250", label: "Candidates",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              },
              {
                value: "18,400", label: "Companies",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{background: "#0d9488"}}>
                  {stat.icon}
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs" style={{color: "#94a3b8"}}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="bg-white py-8 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center gap-12 flex-wrap">
            <div className="flex items-center gap-2 text-gray-500 font-bold text-lg">
              <svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#1DB954"/><path d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75c-.5.15-1-.15-1.15-.6-.15-.5.15-1 .6-1.15 3.55-1.05 9.4-.85 13.1 1.35.45.25.6.85.35 1.3-.25.35-.85.5-1.3.25zm-.1 2.8c-.25.4-.75.5-1.15.25-2.7-1.65-6.8-2.15-9.95-1.15-.4.1-.85-.1-.95-.5-.1-.4.1-.85.5-.95 3.65-1.1 8.15-.55 11.25 1.35.4.25.5.75.3 1zm-1.3 2.7c-.2.35-.65.45-1 .25-2.35-1.45-5.3-1.75-8.8-.95-.35.1-.65-.15-.75-.45-.1-.35.15-.65.45-.75 3.8-.85 7.1-.5 9.7 1.1.35.2.4.65.4 1 0-.05-.05-.15-.05-.2z" fill="white"/></svg>
              Spotify
            </div>
            <div className="flex items-center gap-2 text-gray-500 font-bold text-lg">
              <svg width="22" height="22" viewBox="0 0 24 24"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#E01E5A"/></svg>
              slack
            </div>
            <div className="flex items-center gap-2 text-gray-500 font-bold text-lg">
              <svg width="22" height="22" viewBox="0 0 24 24"><path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM0 1.376l8.298 20.899L0 1.376zM24 1.376l-8.298 20.899L24 1.376zM8.122 18.343h7.756l1.69 4.281H6.432z" fill="#FF0000"/></svg>
              Adobe
            </div>
            <div className="flex items-center gap-2 text-gray-500 font-bold text-lg">
              <svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="7.2" r="4.8" fill="#F06A6A"/><circle cx="4.8" cy="16.8" r="4.8" fill="#F06A6A"/><circle cx="19.2" cy="16.8" r="4.8" fill="#F06A6A"/></svg>
              asana
            </div>
            <div className="flex items-center gap-2 text-gray-500 font-bold text-lg">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#5E6AD2"/><path d="M4.5 15.5L8.5 19.5L19.5 8.5" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
              Linear
            </div>
          </div>
        </div>
      </section>

      {/* RECENT JOBS */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold" style={{color: "#1a1a2e"}}>Recent Jobs Available</h2>
              <p className="text-gray-500 text-sm mt-1">At eu lobortis pretium tincidunt amet lacus ut aenean aliquet.</p>
            </div>
            <button onClick={() => navigate("/jobs")} className="text-sm font-semibold px-4 py-2 rounded-lg border" style={{color: "#f97316", borderColor: "#f97316"}}>
              View all
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {jobs.slice(0, 5).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* BROWSE BY CATEGORY */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold" style={{color: "#1a1a2e"}}>Browse by Category</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">At eu lobortis pretium tincidunt amet lacus ut aenean aliquet.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/jobs?category=${cat.name}`)}
                className="bg-white rounded-xl p-5 text-center border border-gray-200 hover:shadow-md transition-all"
                onMouseEnter={e => e.currentTarget.style.borderColor = "#f97316"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#e5e7eb"}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <h3 className="font-semibold text-sm" style={{color: "#1a1a2e"}}>{cat.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{cat.count} jobs</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GOOD LIFE */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-200 rounded-2xl h-72 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Company Image</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4" style={{color: "#1a1a2e"}}>Good Life Begins With A Good Company</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Ultricies purus dolor viverra mi laoreet at cursus justo. Ultrices purus diam egestas amet faucibus tempor blandit.
              </p>
              <div className="flex gap-3">
                <button onClick={() => navigate("/jobs")} className="text-white font-semibold px-6 py-2.5 rounded-lg text-sm" style={{background: "#f97316"}}>Search Job</button>
                <button className="font-semibold px-6 py-2.5 rounded-lg text-sm border border-gray-300 text-gray-600">Learn more</button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8 mt-16 text-center">
            {[
              { value: "12k+", label: "Clients worldwide" },
              { value: "20k+", label: "Active resume" },
              { value: "18k+", label: "Companies" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold mb-1" style={{color: "#f97316"}}>{stat.value}</div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREATE BETTER FUTURE */}
      <section className="py-16" style={{background: "linear-gradient(135deg, #1a1a2e, #0f3460)"}}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Create A Better Future For Yourself</h2>
              <p className="text-sm leading-relaxed mb-6" style={{color: "#94a3b8"}}>
                At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum id scelerisque rhoncus.
              </p>
              <button onClick={() => navigate("/jobs")} className="text-white font-semibold px-6 py-2.5 rounded-lg text-sm" style={{background: "#f97316"}}>Search Job</button>
            </div>
            <div className="bg-gray-700 rounded-2xl h-64 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Career Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold" style={{color: "#1a1a2e"}}>Testimonials from Our Customers</h2>
            <p className="text-gray-500 text-sm mt-2">At eu lobortis pretium tincidunt amet lacus ut aenean aliquet.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(s => <span key={s} style={{color: "#f97316"}}>★</span>)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0" style={{background: "#f97316"}}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{color: "#1a1a2e"}}>{t.name}</p>
                    <p className="text-xs text-gray-400">Happy Client</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP COMPANIES */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8" style={{color: "#1a1a2e"}}>Top Companies Hiring</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {topCompanies.map((c, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 text-center cursor-pointer hover:shadow-md transition-all"
                onMouseEnter={e => e.currentTarget.style.borderColor = "#f97316"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#e5e7eb"}
              >
                <div className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center text-white text-sm font-bold"
                  style={{background: ["#f97316","#3b82f6","#8b5cf6","#10b981","#ec4899","#6366f1"][i % 6]}}>
                  {c.logo}
                </div>
                <p className="text-xs font-semibold truncate" style={{color: "#1a1a2e"}}>{c.name}</p>
                <p className="text-xs mt-0.5" style={{color: "#f97316"}}>{c.jobs} open roles</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Homepage;