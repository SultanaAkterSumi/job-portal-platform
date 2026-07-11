import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

export default function ApplyForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!objectIdPattern.test(id || "")) {
      alert("Invalid job ID. Please open the job from the jobs page again.");
      navigate("/jobs");
      return;
    }

    if (!resume) {
      alert("Please select a PDF resume.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("job", id);
      formData.append("coverLetter", coverLetter);
      formData.append("resume", resume);

      // Do not set Content-Type manually. Axios/browser adds the multipart boundary.
      const res = await API.post("/applications", formData);

      alert(res.data.message || "Application submitted successfully");
      navigate("/my-applications");
    } catch (error) {
      console.error("Application submit failed:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Apply for this Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">Cover Letter</label>
            <textarea
              rows="5"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full border rounded-lg p-3"
              placeholder="Write your cover letter..."
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Resume (PDF)</label>
            <input
              type="file"
              accept="application/pdf,.pdf"
              onChange={(e) => setResume(e.target.files?.[0] || null)}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white py-3 rounded-lg"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}
