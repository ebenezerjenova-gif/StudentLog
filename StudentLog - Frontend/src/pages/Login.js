import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginStudent } from "../services/api";
import {
  Mail,
  Lock,
  LogIn,
  UserPlus,
  AlertCircle,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginStudent(
        email.trim(),
        password
      );

      console.log("LOGIN RESPONSE:", response);

      if (!response || response.success !== true) {
        setError(
          response?.message || "Invalid email or password."
        );
        return;
      }

      const user = response.user || {
        email: email.trim(),
      };

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      navigate("/dashboard");

    } catch (error) {
      console.error("Login Error:", error);

      setError(
        error.message || "Login failed."
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

          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <LogIn size={30} strokeWidth={2} />
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            StudentLog
          </h1>

          <p className="text-gray-500 mt-2">
            Login to your account
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm flex items-center gap-2">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="mb-5">

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
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                className="w-full border p-3 pl-11 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                className="w-full border p-3 pl-11 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

            </div>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              "Logging in..."
            ) : (
              <>
                <LogIn size={20} />
                Login
              </>
            )}
          </button>

        </form>

        {/* Register */}
        <p className="text-center text-gray-500 mt-6 flex items-center justify-center gap-1">

          Don't have an account?

          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline flex items-center gap-1"
          >
            <UserPlus size={16} />
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}