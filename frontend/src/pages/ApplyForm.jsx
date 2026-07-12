import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

export default function ApplyForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [coverLetter, setCoverLetter] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!objectIdPattern.test(id || "")) {
      alert("Invalid job ID.");
      navigate("/jobs");
      return;
    }

    if (!resumeLink.startsWith("https://")) {
      alert("Please enter a valid Google Drive link starting with https://");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/applications", {
        job: id,
        coverLetter,
        resumeLink,
      });
      alert(res.data.message || "Application submitted successfully");
      navigate("/my-applications");
    } catch (error) {
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
            <label className="block mb-2 font-medium">
              Resume Link (Google Drive)
            </label>
            <input
              type="url"
              value={resumeLink}
              onChange={(e) => setResumeLink(e.target.value)}
              className="w-full border rounded-lg p-3"
              placeholder="https://drive.google.com/file/d/..."
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Google Drive এ file upload করে "Anyone with the link" করে link দাও
            </p>
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
