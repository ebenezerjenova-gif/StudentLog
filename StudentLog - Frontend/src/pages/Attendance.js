import React, { useEffect, useState } from "react";
import {
  CalendarCheck,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  BookOpen,
  AlertCircle,
} from "lucide-react";

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // SAMPLE ATTENDANCE DATA
  // Replace this later with n8n API response
  // =====================================================

  const sampleAttendance = [
    {
      subject: "Data Structures",
      totalClasses: 42,
      attended: 40,
      absent: 2,
    },
    {
      subject: "Database Management",
      totalClasses: 40,
      attended: 37,
      absent: 3,
    },
    {
      subject: "Computer Networks",
      totalClasses: 38,
      attended: 35,
      absent: 3,
    },
    {
      subject: "Operating Systems",
      totalClasses: 41,
      attended: 38,
      absent: 3,
    },
    {
      subject: "Software Engineering",
      totalClasses: 36,
      attended: 34,
      absent: 2,
    },
    {
      subject: "Web Technology",
      totalClasses: 35,
      attended: 32,
      absent: 3,
    },
  ];

  // =====================================================
  // LOAD ATTENDANCE
  // =====================================================

  useEffect(() => {
    const loadAttendance = () => {
      setTimeout(() => {
        setAttendance(sampleAttendance);
        setLoading(false);
      }, 500);
    };

    loadAttendance();
  }, []);

  // =====================================================
  // CALCULATE STATISTICS
  // =====================================================

  const totalClasses = attendance.reduce(
    (total, item) => total + item.totalClasses,
    0
  );

  const totalAttended = attendance.reduce(
    (total, item) => total + item.attended,
    0
  );

  const totalAbsent = attendance.reduce(
    (total, item) => total + item.absent,
    0
  );

  const overallPercentage =
    totalClasses > 0
      ? ((totalAttended / totalClasses) * 100).toFixed(1)
      : 0;

  // =====================================================
  // GET ATTENDANCE STATUS
  // =====================================================

  const getStatus = (percentage) => {
    if (percentage >= 90) {
      return {
        text: "Excellent",
        className: "bg-green-100 text-green-700",
      };
    }

    if (percentage >= 75) {
      return {
        text: "Good",
        className: "bg-blue-100 text-blue-700",
      };
    }

    return {
      text: "Low",
      className: "bg-red-100 text-red-700",
    };
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-gray-500">
            Loading attendance...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <CalendarCheck size={25} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Attendance
              </h1>

              <p className="text-gray-500 mt-1">
                Monitor your subject-wise attendance
              </p>
            </div>

          </div>

        </div>

        {/* =================================================
            STATISTICS
        ================================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          {/* Overall Attendance */}

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition">

            <div className="flex justify-between items-center">

              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <TrendingUp size={23} />
              </div>

              <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
                Overall
              </span>

            </div>

            <p className="text-sm text-gray-500 mt-5">
              Overall Attendance
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-1">
              {overallPercentage}%
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Current attendance percentage
            </p>

          </div>

          {/* Total Classes */}

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition">

            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <BookOpen size={23} />
            </div>

            <p className="text-sm text-gray-500 mt-5">
              Total Classes
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-1">
              {totalClasses}
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Classes conducted
            </p>

          </div>

          {/* Attended */}

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition">

            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <CheckCircle size={23} />
            </div>

            <p className="text-sm text-gray-500 mt-5">
              Classes Attended
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-1">
              {totalAttended}
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Present classes
            </p>

          </div>

          {/* Absent */}

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition">

            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <XCircle size={23} />
            </div>

            <p className="text-sm text-gray-500 mt-5">
              Classes Absent
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-1">
              {totalAbsent}
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Total absent classes
            </p>

          </div>

        </div>

        {/* =================================================
            ATTENDANCE WARNING
        ================================================= */}

        {Number(overallPercentage) < 75 ? (
          <div className="mb-8 p-5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-4">

            <AlertCircle
              size={23}
              className="text-red-600 mt-1"
            />

            <div>
              <h3 className="font-bold text-red-700">
                Attendance Warning
              </h3>

              <p className="text-sm text-red-600 mt-1">
                Your overall attendance is below the required
                percentage. Please attend upcoming classes
                regularly.
              </p>
            </div>

          </div>
        ) : (
          <div className="mb-8 p-5 bg-green-50 border border-green-200 rounded-2xl flex items-start gap-4">

            <CheckCircle
              size={23}
              className="text-green-600 mt-1"
            />

            <div>
              <h3 className="font-bold text-green-700">
                Attendance Status
              </h3>

              <p className="text-sm text-green-600 mt-1">
                Your overall attendance is currently above
                the minimum requirement.
              </p>
            </div>

          </div>
        )}

        {/* =================================================
            SUBJECT-WISE ATTENDANCE
        ================================================= */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

          <div className="px-6 py-5 border-b border-gray-100">

            <h2 className="text-xl font-bold text-gray-800">
              Subject-wise Attendance
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Detailed attendance information for each subject
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-slate-50 text-left text-sm text-gray-500">

                  <th className="px-6 py-4">
                    Subject
                  </th>

                  <th className="px-6 py-4">
                    Total Classes
                  </th>

                  <th className="px-6 py-4">
                    Attended
                  </th>

                  <th className="px-6 py-4">
                    Absent
                  </th>

                  <th className="px-6 py-4">
                    Attendance
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {attendance.map((item, index) => {

                  const percentage =
                    (
                      (item.attended /
                        item.totalClasses) *
                      100
                    ).toFixed(1);

                  const status =
                    getStatus(Number(percentage));

                  return (
                    <tr
                      key={index}
                      className="
                        border-t
                        border-gray-100
                        hover:bg-indigo-50/40
                        transition
                      "
                    >

                      {/* Subject */}

                      <td className="px-6 py-5">

                        <div className="font-semibold text-gray-800">
                          {item.subject}
                        </div>

                      </td>

                      {/* Total */}

                      <td className="px-6 py-5 text-gray-600">
                        {item.totalClasses}
                      </td>

                      {/* Attended */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2 text-green-600">

                          <CheckCircle size={17} />

                          {item.attended}

                        </div>

                      </td>

                      {/* Absent */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2 text-red-500">

                          <XCircle size={17} />

                          {item.absent}

                        </div>

                      </td>

                      {/* Percentage */}

                      <td className="px-6 py-5 min-w-[180px]">

                        <div className="flex items-center gap-3">

                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">

                            <div
                              className={`h-full rounded-full ${
                                Number(percentage) >= 90
                                  ? "bg-green-500"
                                  : Number(percentage) >= 75
                                  ? "bg-indigo-500"
                                  : "bg-red-500"
                              }`}
                              style={{
                                width: `${percentage}%`,
                              }}
                            />

                          </div>

                          <span className="font-semibold text-gray-700 text-sm">
                            {percentage}%
                          </span>

                        </div>

                      </td>

                      {/* Status */}

                      <td className="px-6 py-5">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${status.className}`}
                        >
                          {status.text}
                        </span>

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="text-center text-sm text-gray-400 py-8">
          StudentLog • Attendance Management
        </div>

      </div>

    </div>
  );
}