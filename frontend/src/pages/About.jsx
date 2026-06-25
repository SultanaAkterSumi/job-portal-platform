const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">

      {/* HERO */}
      <section className="py-20 text-center" style={{background: "linear-gradient(135deg, #1a1a2e, #0f3460)"}}>
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>
          <p className="text-lg" style={{color: "#94a3b8"}}>
            Connecting talent with opportunity across Bangladesh and beyond.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider" style={{color: "#f97316"}}>Our Mission</span>
              <h2 className="text-3xl font-bold mt-2 mb-4" style={{color: "#1a1a2e"}}>
                Good Life Begins With A Good Company
              </h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                We believe that the right job can transform a person's life. Our platform is built to make the job search process simple, transparent, and effective for everyone.
              </p>
              <p className="text-gray-500 leading-relaxed">
                From fresh graduates to experienced professionals, we help thousands of people find meaningful careers every day across Bangladesh.
              </p>
              <button className="mt-6 text-white font-semibold px-6 py-3 rounded-lg" style={{background: "#f97316"}}>
                Search Jobs
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "12k+", label: "Clients Worldwide" },
                { value: "20k+", label: "Active Resumes" },
                { value: "18k+", label: "Companies" },
                { value: "95%", label: "Success Rate" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm">
                  <div className="text-3xl font-bold mb-1" style={{color: "#f97316"}}>{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold uppercase tracking-wider" style={{color: "#f97316"}}>Why Choose Us</span>
            <h2 className="text-3xl font-bold mt-2" style={{color: "#1a1a2e"}}>Create A Better Future For Yourself</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🎯", title: "Targeted Job Matches", desc: "Our smart algorithm matches you with jobs that fit your skills, experience, and career goals perfectly." },
              { icon: "🚀", title: "Fast & Easy Apply", desc: "Apply to multiple jobs with a single click. No repetitive forms, no wasted time." },
              { icon: "📊", title: "Track Your Progress", desc: "Monitor your applications in real-time and stay updated on every step of the hiring process." },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                onMouseEnter={e => e.currentTarget.style.borderColor = "#f97316"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#e5e7eb"}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2" style={{color: "#1a1a2e"}}>{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-16" style={{background: "#1a1a2e"}}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider" style={{color: "#f97316"}}>Our Team</span>
          <h2 className="text-3xl font-bold text-white mt-2 mb-12">The People Behind JobPortal</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Rafiq Ahmed", role: "CEO & Founder", avatar: "RA" },
              { name: "Nadia Islam", role: "Head of Design", avatar: "NI" },
              { name: "Tanvir Hossain", role: "Lead Developer", avatar: "TH" },
              { name: "Sumaiya Khan", role: "HR Manager", avatar: "SK" },
            ].map((member) => (
              <div key={member.name} className="rounded-xl p-6" style={{background: "rgba(255,255,255,0.07)"}}>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg" style={{background: "#f97316"}}>
                  {member.avatar}
                </div>
                <h3 className="font-semibold text-white">{member.name}</h3>
                <p className="text-sm mt-1" style={{color: "#94a3b8"}}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;