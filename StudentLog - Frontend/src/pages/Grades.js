import React, { useEffect, useState } from "react";
import {
  FileText,
  Award,
  BookOpen,
  TrendingUp,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { getGrades } from "../services/api";

export default function Grades() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const sampleGrades = [
    {
      subject: "Data Structures",
      code: "CS301",
      internal: 45,
      external: 42,
      total: 87,
      grade: "A+",
      gradePoint: 9,
      credits: 4,
    },
    {
      subject: "Database Management Systems",
      code: "CS302",
      internal: 43,
      external: 40,
      total: 83,
      grade: "A+",
      gradePoint: 9,
      credits: 4,
    },
    {
      subject: "Computer Networks",
      code: "CS303",
      internal: 41,
      external: 38,
      total: 79,
      grade: "A",
      gradePoint: 8,
      credits: 3,
    },
    {
      subject: "Operating Systems",
      code: "CS304",
      internal: 42,
      external: 35,
      total: 77,
      grade: "A",
      gradePoint: 8,
      credits: 3,
    },
    {
      subject: "Software Engineering",
      code: "CS305",
      internal: 44,
      external: 41,
      total: 85,
      grade: "A+",
      gradePoint: 9,
      credits: 3,
    },
    {
      subject: "Professional English",
      code: "HS301",
      internal: 46,
      external: 39,
      total: 85,
      grade: "A+",
      gradePoint: 9,
      credits: 2,
    },
  ];

  const fetchGrades = async () => {
    try {
      setLoading(true);
      setError("");

      const userData = localStorage.getItem("user");

      if (!userData) {
        setGrades(sampleGrades);
        setError("Login information not found. Showing sample grades.");
        return;
      }

      const user = JSON.parse(userData);

      const response = await getGrades(user.email);

      console.log("Grades response:", response);

      if (!response || response.success !== true) {
        // Use sample data for testing
        setGrades(sampleGrades);

        setError(
          response?.message ||
            "Unable to fetch grades. Showing sample data."
        );

        return;
      }

      const fetchedGrades =
        response.grades ||
        response.data?.grades ||
        [];

      // If API returns empty data
      if (fetchedGrades.length === 0) {
        setGrades(sampleGrades);
        setError("No grades found. Showing sample data.");
      } else {
        setGrades(fetchedGrades);
      }

    } catch (error) {
      console.error("Grades Error:", error);

      // Show sample data if n8n is unavailable
      setGrades(sampleGrades);

      setError(
        "Unable to connect to n8n. Showing sample grade details."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);


  const totalSubjects = grades.length;

  const passedSubjects = grades.filter(
    (grade) =>
      grade.grade !== "F" &&
      grade.grade !== "RA"
  ).length;

  const failedSubjects =
    totalSubjects - passedSubjects;

  const totalMarks = grades.reduce(
    (sum, grade) =>
      sum + Number(grade.total || 0),
    0
  );

  const averageMarks =
    totalSubjects > 0
      ? Math.round(totalMarks / totalSubjects)
      : 0;

  const totalCredits = grades.reduce(
    (sum, grade) =>
      sum + Number(grade.credits || 0),
    0
  );

  const weightedGradePoints = grades.reduce(
    (sum, grade) =>
      sum +
      Number(grade.gradePoint || 0) *
        Number(grade.credits || 0),
    0
  );

  const semesterGPA =
    totalCredits > 0
      ? (
          weightedGradePoints /
          totalCredits
        ).toFixed(2)
      : "0.00";

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">

        <div className="text-center">

          <div
            className="
              w-12
              h-12
              border-4
              border-indigo-200
              border-t-indigo-600
              rounded-full
              animate-spin
              mx-auto
            "
          />

          <p className="mt-4 text-gray-600 font-medium">
            Loading grades...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-5 md:p-8">

      <div className="max-w-7xl mx-auto">


        <div className="mb-8">

          <div className="flex items-center gap-3">

            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-gradient-to-br
                from-indigo-600
                to-purple-600
                text-white
                flex
                items-center
                justify-center
                shadow-lg
              "
            >
              <FileText size={24} />
            </div>

            <div>

              <h1
                className="
                  text-3xl
                  font-bold
                  text-gray-800
                "
              >
                Academic Grades
              </h1>

              <p className="text-gray-500 mt-1">
                View your semester examination performance
              </p>

            </div>

          </div>

        </div>


        {error && (
          <div
            className="
              mb-6
              flex
              items-center
              gap-3
              p-4
              rounded-xl
              bg-amber-50
              border
              border-amber-200
              text-amber-700
            "
          >
            <AlertCircle size={20} />

            <span className="text-sm">
              {error}
            </span>
          </div>
        )}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-5
            mb-8
          "
        >

          <SummaryCard
            title="Semester GPA"
            value={semesterGPA}
            subtitle="Current semester"
            icon={Award}
          />

          <SummaryCard
            title="Average Marks"
            value={`${averageMarks}%`}
            subtitle="Across all subjects"
            icon={TrendingUp}
          />

          <SummaryCard
            title="Subjects"
            value={totalSubjects}
            subtitle="Total subjects"
            icon={BookOpen}
          />

          <SummaryCard
            title="Passed"
            value={`${passedSubjects}/${totalSubjects}`}
            subtitle={
              failedSubjects > 0
                ? `${failedSubjects} subject pending`
                : "All subjects passed"
            }
            icon={CheckCircle}
          />

        </div>

        <div
          className="
            bg-white
            rounded-3xl
            shadow-sm
            border
            border-gray-100
            overflow-hidden
          "
        >

          {/* TABLE HEADER */}

          <div
            className="
              px-6
              py-5
              border-b
              border-gray-100
            "
          >

            <h2
              className="
                text-xl
                font-bold
                text-gray-800
              "
            >
              Semester Grade Details
            </h2>

            <p
              className="
                text-sm
                text-gray-500
                mt-1
              "
            >
              Subject-wise marks and grade performance
            </p>

          </div>

          

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr
                  className="
                    bg-slate-50
                    text-left
                    text-sm
                    text-gray-500
                  "
                >

                  <th className="px-6 py-4">
                    Subject
                  </th>

                  <th className="px-6 py-4">
                    Code
                  </th>

                  <th className="px-6 py-4">
                    Internal
                  </th>

                  <th className="px-6 py-4">
                    External
                  </th>

                  <th className="px-6 py-4">
                    Total
                  </th>

                  <th className="px-6 py-4">
                    Grade
                  </th>

                  <th className="px-6 py-4">
                    Grade Point
                  </th>

                  <th className="px-6 py-4">
                    Credits
                  </th>

                </tr>

              </thead>

              <tbody>

                {grades.map(
                  (grade, index) => {

                    const gradeValue =
                      grade.grade ||
                      grade.Grade ||
                      "-";

                    const subject =
                      grade.subject ||
                      grade.Subject ||
                      `Subject ${index + 1}`;

                    const code =
                      grade.code ||
                      grade.Code ||
                      "-";

                    return (
                      <tr
                        key={index}
                        className="
                          border-t
                          border-gray-100
                          hover:bg-indigo-50/40
                          transition-colors
                        "
                      >

                        {/* SUBJECT */}

                        <td className="px-6 py-5">

                          <div
                            className="
                              font-semibold
                              text-gray-800
                            "
                          >
                            {subject}
                          </div>

                        </td>

                       

                        <td
                          className="
                            px-6
                            py-5
                            text-gray-500
                          "
                        >
                          {code}
                        </td>

                        

                        <td
                          className="
                            px-6
                            py-5
                            text-gray-600
                          "
                        >
                          {grade.internal ?? "-"}
                        </td>

                        {/* EXTERNAL */}

                        <td
                          className="
                            px-6
                            py-5
                            text-gray-600
                          "
                        >
                          {grade.external ?? "-"}
                        </td>

                        {/* TOTAL */}

                        <td
                          className="
                            px-6
                            py-5
                            font-semibold
                            text-gray-800
                          "
                        >
                          {grade.total ?? "-"}
                        </td>

                        {/* GRADE */}

                        <td className="px-6 py-5">

                          <GradeBadge
                            grade={gradeValue}
                          />

                        </td>

                        {/* GRADE POINT */}

                        <td
                          className="
                            px-6
                            py-5
                            font-semibold
                            text-indigo-600
                          "
                        >
                          {grade.gradePoint ?? "-"}
                        </td>

                        {/* CREDITS */}

                        <td
                          className="
                            px-6
                            py-5
                            text-gray-600
                          "
                        >
                          {grade.credits ?? "-"}
                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>

        </div>

        <div
          className="
            mt-8
            bg-white
            rounded-3xl
            border
            border-gray-100
            shadow-sm
            p-6
          "
        >

          <h2
            className="
              text-lg
              font-bold
              text-gray-800
              mb-4
            "
          >
            Grade Scale
          </h2>

          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-4
              lg:grid-cols-7
              gap-3
            "
          >

            <GradeScale
              grade="O"
              point="10"
            />

            <GradeScale
              grade="A+"
              point="9"
            />

            <GradeScale
              grade="A"
              point="8"
            />

            <GradeScale
              grade="B+"
              point="7"
            />

            <GradeScale
              grade="B"
              point="6"
            />

            <GradeScale
              grade="C"
              point="5"
            />

            <GradeScale
              grade="RA"
              point="0"
            />

          </div>

        </div>

        <div
          className="
            text-center
            text-sm
            text-gray-400
            py-8
          "
        >
          StudentLog • Academic Performance
        </div>

      </div>

    </div>
  );
}

function SummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
}) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-gray-100
        p-5
        shadow-sm
        hover:shadow-lg
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >

      <div
        className="
          w-11
          h-11
          rounded-xl
          bg-indigo-50
          text-indigo-600
          flex
          items-center
          justify-center
        "
      >
        <Icon size={22} />
      </div>

      <p
        className="
          text-sm
          text-gray-500
          mt-4
        "
      >
        {title}
      </p>

      <p
        className="
          text-3xl
          font-bold
          text-gray-800
          mt-1
        "
      >
        {value}
      </p>

      <p
        className="
          text-xs
          text-gray-400
          mt-1
        "
      >
        {subtitle}
      </p>

    </div>
  );
}

function GradeBadge({ grade }) {
  const styles = {
    O: "bg-emerald-100 text-emerald-700",
    "A+": "bg-indigo-100 text-indigo-700",
    A: "bg-blue-100 text-blue-700",
    "B+": "bg-purple-100 text-purple-700",
    B: "bg-yellow-100 text-yellow-700",
    C: "bg-orange-100 text-orange-700",
    RA: "bg-red-100 text-red-700",
    F: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        min-w-[45px]
        px-3
        py-1.5
        rounded-lg
        text-sm
        font-bold
        ${
          styles[grade] ||
          "bg-gray-100 text-gray-600"
        }
      `}
    >
      {grade}
    </span>
  );
}

function GradeScale({
  grade,
  point,
}) {
  return (
    <div
      className="
        rounded-xl
        bg-slate-50
        border
        border-gray-100
        p-3
        text-center
      "
    >

      <div
        className="
          text-lg
          font-bold
          text-indigo-600
        "
      >
        {grade}
      </div>

      <div
        className="
          text-xs
          text-gray-500
          mt-1
        "
      >
        {point} Points
      </div>

    </div>
  );
}
