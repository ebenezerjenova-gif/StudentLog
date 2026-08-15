import React, { useState } from "react";
import { calculateCGPA } from "../services/api";

const CGPA = () => {

  const [numSemesters, setNumSemesters] =
    useState("");

  const [semesters, setSemesters] =
    useState([]);

  const [cgpa, setCgpa] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  const handleSemesterChange = (e) => {

    const count = Number(e.target.value);

    setNumSemesters(count);
    setCgpa(null);
    setError("");

    const newSemesters = [];

    for (let i = 0; i < count; i++) {

      newSemesters.push({
        semester: i + 1,
        gpa: "",
        credits: "",
      });

    }

    setSemesters(newSemesters);
  };


  const handleInputChange = (
    index,
    field,
    value
  ) => {

    const updated = [...semesters];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setSemesters(updated);
  };


  const handleCalculate = async () => {

    setError("");
    setCgpa(null);

    if (!numSemesters) {
      setError(
        "Please select the number of semesters."
      );
      return;
    }

    for (const semester of semesters) {

      if (
        semester.gpa === "" ||
        semester.credits === ""
      ) {
        setError(
          "Please enter GPA and Credits for every semester."
        );
        return;
      }

      if (
        Number(semester.gpa) < 0 ||
        Number(semester.gpa) > 10
      ) {
        setError(
          "GPA must be between 0 and 10."
        );
        return;
      }

      if (Number(semester.credits) <= 0) {
        setError(
          "Credits must be greater than 0."
        );
        return;
      }
    }

    setLoading(true);

    try {

      const formattedSemesters =
        semesters.map((semester) => ({
          semester: semester.semester,
          gpa: Number(semester.gpa),
          credits: Number(semester.credits),
        }));

      console.log(
        "Sending CGPA data:",
        formattedSemesters
      );

      const response =
        await calculateCGPA(
          formattedSemesters
        );

      console.log(
        "CGPA Response:",
        response
      );

      if (!response || response.success !== true) {

        setError(
          response?.message ||
          "CGPA calculation failed."
        );

        return;
      }

      const calculatedCGPA =
        response.cgpa ??
        response.data?.cgpa;

      if (
        calculatedCGPA === undefined ||
        calculatedCGPA === null
      ) {
        setError(
          "n8n did not return the CGPA value."
        );
        return;
      }

      setCgpa(calculatedCGPA);

    } catch (error) {

      console.error(
        "CGPA Error:",
        error
      );

      setError(
        "Unable to connect to n8n."
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-2xl shadow-xl p-6">

          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            CGPA Calculator
          </h1>


          <div className="mb-8">

            <label className="block font-semibold mb-2">
              Select Number of Semesters
            </label>

            <select
              value={numSemesters}
              onChange={handleSemesterChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >

              <option value="">
                -- Select Semesters --
              </option>

              {[1, 2, 3, 4, 5, 6, 7, 8].map(
                (number) => (
                  <option
                    key={number}
                    value={number}
                  >
                    {number} Semester
                    {number > 1 ? "s" : ""}
                  </option>
                )
              )}

            </select>

          </div>


          {semesters.length > 0 && (

            <div className="space-y-4">

              {semesters.map(
                (semester, index) => (

                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl p-5 bg-gray-50 shadow-sm"
                  >

                    <h2 className="text-lg font-bold text-indigo-600 mb-4">
                      Semester {semester.semester}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      <div>

                        <label className="block font-medium mb-2">
                          GPA
                        </label>

                        <input
                          type="number"
                          min="0"
                          max="10"
                          step="0.01"
                          value={semester.gpa}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "gpa",
                              e.target.value
                            )
                          }
                          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Enter GPA"
                        />

                      </div>


                      <div>

                        <label className="block font-medium mb-2">
                          Credits
                        </label>

                        <input
                          type="number"
                          min="1"
                          step="1"
                          value={semester.credits}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "credits",
                              e.target.value
                            )
                          }
                          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Enter Credits"
                        />

                      </div>

                    </div>

                  </div>

                )
              )}


              {error && (

                <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                  ❌ {error}
                </div>

              )}


              <button
                onClick={handleCalculate}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
              >

                {loading
                  ? "Calculating..."
                  : "Calculate CGPA"}

              </button>


              {cgpa !== null && (

                <div className="mt-5 p-5 bg-green-100 border border-green-300 rounded-xl text-center">

                  <p className="text-gray-600">
                    Your CGPA
                  </p>

                  <p className="text-4xl font-bold text-green-600">
                    {Number(cgpa).toFixed(2)}
                  </p>

                </div>

              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default CGPA;