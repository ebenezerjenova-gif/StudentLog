import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Hash } from "lucide-react";
import { registerStudent } from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    registerNo: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.registerNo.trim() ||
      !formData.password.trim()
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await registerStudent(formData);

      console.log("REGISTER RESPONSE:", response);

      if (!response || response.success !== true) {
        setError(response?.message || "Registration failed.");
        return;
      }

      setMessage(
        "Registration successful! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      console.error("Registration Error:", error);

      setError(
        error.message || "Registration failed."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">

      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">

        {/* Header */}
        <div className="text-center mb-7">

          <div className="flex justify-center mb-4">
            <div className="bg-indigo-100 p-4 rounded-full">
              <User
                size={42}
                className="text-indigo-600"
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Student Registration
          </h1>

          <p className="text-gray-500 mt-2">
            Create your StudentLog account
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Success */}
        {message && (
          <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleRegister}>

          {/* Name */}
          <div className="mb-4">

            <label className="block font-semibold mb-2">
              Student Name
            </label>

            <div className="relative">

              <User
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

            </div>

          </div>

          {/* Email */}
          <div className="mb-4">

            <label className="block font-semibold mb-2">
              Email
            </label>

            <div className="relative">

              <Mail
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

            </div>

          </div>

          {/* Register Number */}
          <div className="mb-4">

            <label className="block font-semibold mb-2">
              Register Number
            </label>

            <div className="relative">

              <Hash
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                name="registerNo"
                value={formData.registerNo}
                onChange={handleChange}
                placeholder="Enter register number"
                className="w-full border p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

            </div>

          </div>

          {/* Password */}
          <div className="mb-6">

            <label className="block font-semibold mb-2">
              Password
            </label>

            <div className="relative">

              <Lock
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                className="w-full border p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

            </div>

          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        {/* Login Link */}
        <p className="text-center text-gray-500 mt-6">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}