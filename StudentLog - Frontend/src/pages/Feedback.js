import React, { useState } from "react";
import { sendToN8N } from "../services/api";

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    year: "",
    department: "",
    category: "",
    content: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.year ||
      !formData.department ||
      !formData.category ||
      !formData.content
    ) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await sendToN8N({
        action: "submitFeedback",
        data: formData,
      });

      console.log("Feedback response:", response);

      if (!response || response.success !== true) {
        setError(
          response?.message || "Feedback submission failed."
        );
        return;
      }

      setMessage("Feedback submitted successfully.");

      // Clear fields after successful submission
      setFormData({
        name: "",
        email: "",
        year: "",
        department: "",
        category: "",
        content: "",
      });

    } catch (error) {
      console.error("Feedback Error:", error);
      setError("Unable to connect to n8n.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-2xl mx-auto">

        <div className="bg-white rounded-2xl shadow-xl p-8">

          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">📝</div>

            <h1 className="text-3xl font-bold text-gray-800">
              Student Feedback
            </h1>

            <p className="text-gray-500 mt-2">
              Share your feedback with us
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-5 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
              ❌ {error}
            </div>
          )}

          {/* SUCCESS */}
          {message && (
            <div className="mb-5 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg">
              ✅ {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* NAME */}
            <div className="mb-5">
              <label className="block font-semibold mb-2">
                Student Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* EMAIL - MANUAL ENTRY */}
            <div className="mb-5">
              <label className="block font-semibold mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* YEAR DROPDOWN */}
            <div className="mb-5">
              <label className="block font-semibold mb-2">
                Year
              </label>

              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">
                  Select Year
                </option>

                <option value="I">
                  I Year
                </option>

                <option value="II">
                  II Year
                </option>

                <option value="III">
                  III Year
                </option>

                <option value="IV">
                  IV Year
                </option>
              </select>
            </div>

            {/* DEPARTMENT DROPDOWN */}
            <div className="mb-5">
              <label className="block font-semibold mb-2">
                Department
              </label>

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">
                  Select Department
                </option>

                <option value="CSE">
                  CSE
                </option>

                <option value="ECE">
                  ECE
                </option>

                <option value="EEE">
                  EEE
                </option>

                <option value="MECH">
                  MECH
                </option>

                <option value="AI&DS">
                  AI&DS
                </option>
              </select>
            </div>

            {/* CATEGORY DROPDOWN */}
            <div className="mb-5">
              <label className="block font-semibold mb-2">
                Feedback Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">
                  Select Category
                </option>

                <option value="Academic">
                  Academic
                </option>

                <option value="Infrastructure">
                  Infrastructure
                </option>

                <option value="Hostel">
                  Hostel
                </option>

                <option value="General">
                  General
                </option>

                <option value="Portal">
                  Portal
                </option>
              </select>
            </div>

            {/* FEEDBACK */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">
                Feedback
              </label>

              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Enter your feedback"
                rows="5"
                className="w-full border p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading
                ? "Submitting..."
                : "Submit Feedback"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}