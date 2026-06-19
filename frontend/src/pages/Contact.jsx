import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white pt-16">

      {/* HERO */}
      <section className="py-16 text-center" style={{background: "#0d0d1a"}}>
        <h1 className="text-4xl font-bold text-white">Contact Us</h1>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

            {/* LEFT */}
            <div>
              <h2 className="text-4xl font-bold mb-4" style={{color: "#1a1a2e"}}>
                You Will Grow, You Will Succeed. We Promise That
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-10">
                Pellentesque arcu facilisis nunc mi proin. Dignissim mattis in lectus tincidunt tincidunt ultrices. Diam convallis morbi pellentesque adipiscing
              </p>

              <div className="grid grid-cols-2 gap-8">
                {[
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    ),
                    title: "Call for inquiry",
                    value: "+257 388-6895"
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                      </svg>
                    ),
                    title: "Send us email",
                    value: "kramulous@sbcglobal.net"
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                    ),
                    title: "Opening hours",
                    value: "Mon - Fri: 10AM - 10PM"
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                    ),
                    title: "Office",
                    value: "19 North Road Piscataway, NY 08854"
                  },
                ].map((item) => (
                  <div key={item.title}>
                    <div className="mb-2">{item.icon}</div>
                    <h4 className="font-bold text-sm mb-1" style={{color: "#1a1a2e"}}>{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT - FORM */}
            <div className="rounded-2xl p-8" style={{background: "#f0faf9"}}>
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold mb-2" style={{color: "#1a1a2e"}}>Message Sent!</h3>
                  <p className="text-gray-500 text-sm">We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ firstName: "", lastName: "", email: "", message: "" }); }}
                    className="mt-6 text-white font-semibold px-6 py-2.5 rounded-lg text-sm"
                    style={{background: "#0d9488"}}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-1" style={{color: "#1a1a2e"}}>Contact Info</h3>
                  <p className="text-sm text-gray-500 mb-6">Nibh dis faucibus proin lacus tristique</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          placeholder="Your last name"
                          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Your E-mail address"
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Your message..."
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white font-semibold py-3 rounded-lg text-sm"
                      style={{background: "#0d9488"}}
                    >
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="h-80 bg-gray-200 relative overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095919655!2d-74.00425088459451!3d40.71278937933209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMTUuMyJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{border: 0}}
          allowFullScreen=""
          loading="lazy"
          title="map"
        />
      </section>

      {/* PARTNER LOGOS */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center gap-16 flex-wrap">
            {["zoom", "tinder", "dribbble", "asana"].map((p) => (
              <span key={p} className="text-2xl font-bold text-gray-300 tracking-tight">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background: "#1a1a2e"}} className="pt-14 pb-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs" style={{background: "#0d9488"}}>JP</div>
                <span className="text-white font-bold">Job</span>
              </div>
              <p className="text-sm leading-relaxed" style={{color: "#94a3b8"}}>
                Quis enim pellentesque viverra tellus eget malesuada facilisis. Congue nibh vivamus aliquet nunc mauris d...
              </p>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold text-sm mb-4">Company</h3>
              <ul className="space-y-2.5">
                {["About Us", "Our Team", "Partners", "For Candidates", "For Employers"].map(item => (
                  <li key={item}><a href="#" className="text-sm hover:text-white transition-colors" style={{color: "#94a3b8"}}>{item}</a></li>
                ))}
              </ul>
            </div>

            {/* Job Categories */}
            <div>
              <h3 className="text-white font-semibold text-sm mb-4">Job Categories</h3>
              <ul className="space-y-2.5">
                {["Telecomunications", "Hotels & Tourism", "Construction", "Education", "Financial Services"].map(item => (
                  <li key={item}><a href="#" className="text-sm hover:text-white transition-colors" style={{color: "#94a3b8"}}>{item}</a></li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-white font-semibold text-sm mb-4">Newsletter</h3>
              <p className="text-sm mb-4" style={{color: "#94a3b8"}}>Eu nunc pretium vitae platea. Non netus elementum vulputate</p>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-lg px-3 py-2.5 text-sm outline-none mb-3 border border-gray-600 bg-transparent text-white"
              />
              <button className="w-full text-white font-semibold py-2.5 rounded-lg text-sm" style={{background: "#0d9488"}}>
                Subscribe now
              </button>
            </div>
          </div>

          <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-3" style={{borderColor: "rgba(255,255,255,0.1)"}}>
            <p className="text-xs" style={{color: "#64748b"}}>© Copyright Job Portal 2024. Designed by Figma.guru</p>
            <div className="flex gap-6">
              <a href="#" className="text-xs hover:text-white transition-colors" style={{color: "#64748b"}}>Privacy Policy</a>
              <a href="#" className="text-xs hover:text-white transition-colors" style={{color: "#64748b"}}>Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Contact;