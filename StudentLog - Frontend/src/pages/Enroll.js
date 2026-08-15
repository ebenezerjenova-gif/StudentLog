import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Enroll() {
  return (
    <div className="min-h-screen bg-slate-100">

      <Sidebar />

      <div className="ml-20">

        <Navbar />

        <main className="p-8">

          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-card p-8">

            <h1 className="text-3xl font-bold text-gray-800">
              Enrollment
            </h1>

            <p className="text-gray-500 mt-2">
              Student enrollment information will appear here.
            </p>

          </div>

        </main>

      </div>

    </div>
  );
}