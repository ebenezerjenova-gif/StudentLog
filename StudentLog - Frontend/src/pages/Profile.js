import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/api";


const EMPTY_PROFILE = {
  name: "",
  course: "",
  year: "",
  email: "",
  phone: "",
  registerNumber: "",

  gender: "",
  dob: "",
  bloodGroup: "",
  aadhar: "",
  parentPhone: "",
  address: "",

  degree: "",
  department: "",
  batch: "",
  currentSem: "",
  regulation: "",
  arrearsHistory: "",
  mode: "",
  type: "",
  quota: "",
  firstGraduate: "",
};


const getLoggedInEmail = () => {
  try {
    const loggedUser = localStorage.getItem("user");

    if (loggedUser) {
      const user = JSON.parse(loggedUser);

      if (user?.email) {
        return String(user.email).trim();
      }
    }

    const storedProfile = localStorage.getItem("profile");

    if (storedProfile) {
      const profile = JSON.parse(storedProfile);

      if (profile?.email) {
        return String(profile.email).trim();
      }
    }

    return "";
  } catch (error) {
    console.error("Error getting logged-in email:", error);
    return "";
  }
};


const getValue = (...values) => {
  for (const value of values) {
    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    ) {
      return value;
    }
  }

  return "";
};


const normalizeProfile = (response) => {
  console.log("====================================");
  console.log("RAW PROFILE RESPONSE:");
  console.log(response);
  console.log("====================================");

  if (response === null || response === undefined) {
    return {};
  }

  let data = response;
-

  let counter = 0;

  while (counter < 10) {
    counter++;

    // If response is array
    if (Array.isArray(data)) {
      if (data.length === 0) {
        return {};
      }

      data = data[0];
      continue;
    }

    // If not object
    if (!data || typeof data !== "object") {
      return {};
    }

    // response.profile
    if (
      data.profile &&
      typeof data.profile === "object"
    ) {
      data = data.profile;
      continue;
    }

    // response.body
    if (
      data.body &&
      typeof data.body === "object"
    ) {
      data = data.body;
      continue;
    }

    // response.data
    if (
      data.data &&
      typeof data.data === "object"
    ) {
      data = data.data;
      continue;
    }

    // response.user
    if (
      data.user &&
      typeof data.user === "object"
    ) {
      data = data.user;
      continue;
    }

    // response.result
    if (
      data.result &&
      typeof data.result === "object"
    ) {
      data = data.result;
      continue;
    }

    break;
  }


  if (Array.isArray(data)) {
    data = data[0] || {};
  }

  if (!data || typeof data !== "object") {
    return {};
  }

  console.log("ACTUAL PROFILE OBJECT:");
  console.log(data);


  const normalized = {
    ...EMPTY_PROFILE,

    // BASIC
    name: getValue(
      data.name,
      data.studentName,
      data.student_name
    ),

    course: getValue(
      data.course
    ),

    year: getValue(
      data.year,
      data.currentYear,
      data.current_year
    ),

    email: getValue(
      data.email,
      data.mail
    ),

    phone: getValue(
      data.phone,
      data.phoneNumber,
      data.phone_number
    ),

    registerNumber: getValue(
      data.registerNumber,
      data.register_number,
      data.registerNo,
      data.register_no
    ),

    // PERSONAL
    gender: getValue(
      data.gender
    ),

    dob: getValue(
      data.dob,
      data.dateOfBirth,
      data.date_of_birth
    ),

    bloodGroup: getValue(
      data.bloodGroup,
      data.blood_group
    ),

    aadhar: getValue(
      data.aadhar,
      data.aadhaar,
      data.aadharNumber,
      data.aadhar_number,
      data.aadhaar_number
    ),

    parentPhone: getValue(
      data.parentPhone,
      data.parent_phone,
      data.parentPhoneNumber,
      data.parent_phone_number,
      data.guardianPhone,
      data.guardian_phone
    ),

    address: getValue(
      data.address
    ),

    // ACADEMIC
    degree: getValue(
      data.degree
    ),

    department: getValue(
      data.department
    ),

    batch: getValue(
      data.batch
    ),

    currentSem: getValue(
      data.currentSem,
      data.current_sem,
      data.currentSemester,
      data.current_semester
    ),

    regulation: getValue(
      data.regulation
    ),

    arrearsHistory: getValue(
      data.arrearsHistory,
      data.arrears_history,
      data.historyOfArrears,
      data.history_of_arrears
    ),

    mode: getValue(
      data.mode
    ),

    type: getValue(
      data.type
    ),

    quota: getValue(
      data.quota
    ),

    firstGraduate: getValue(
      data.firstGraduate,
      data.first_graduate,
      data.firstGraduateStatus,
      data.first_graduate_status
    ),
  };

  console.log("====================================");
  console.log("FINAL NORMALIZED PROFILE:");
  console.log(normalized);
  console.log("====================================");

  return normalized;
};


function Field({
  label,
  name,
  profile,
  edit,
  onChange,
  type = "text",
  placeholder = "",
  children,
}) {
  const value =
    profile[name] !== null &&
    profile[name] !== undefined
      ? profile[name]
      : "";

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      {edit ? (
        children ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          >
            {children}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        )
      ) : (
        <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 min-h-[48px]">
          {String(value).trim() !== ""
            ? value
            : "Not provided"}
        </div>
      )}
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  description,
}) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-2xl">
        {icon}
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-800">
          {title}
        </h3>

        <p className="text-sm text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}


export default function Profile() {
  const [profile, setProfile] =
    useState(EMPTY_PROFILE);

  const [edit, setEdit] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");


  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setError("");

      try {
        

        const email =
          getLoggedInEmail();

        console.log(
          "PROFILE EMAIL:",
          email
        );

        if (!email) {
          setError(
            "Student email not found. Please login again."
          );

          setLoading(false);
          return;
        }


        const response =
          await getProfile(email);

        console.log(
          "GET PROFILE RESPONSE:",
          response
        );


        const profileData =
          normalizeProfile(response);

        console.log(
          "PROFILE DATA FOR FRONTEND:",
          profileData
        );


        const hasRealData =
          Object.values(
            profileData
          ).some(
            (value) =>
              value !== null &&
              value !== undefined &&
              String(value).trim() !== ""
          );

        if (hasRealData) {
          // -------------------------------------------
          // PUT DATA INTO REACT STATE
          // -------------------------------------------

          setProfile({
            ...EMPTY_PROFILE,
            ...profileData,
          });


          localStorage.setItem(
            "profile",
            JSON.stringify(
              profileData
            )
          );

          console.log(
            "PROFILE SUCCESSFULLY LOADED."
          );
        } else {
          
          const stored =
            localStorage.getItem(
              "profile"
            );

          if (stored) {
            const localProfile =
              normalizeProfile(
                JSON.parse(stored)
              );

            setProfile({
              ...EMPTY_PROFILE,
              ...localProfile,
            });

            console.log(
              "PROFILE LOADED FROM LOCAL STORAGE."
            );
          } else {
            setProfile({
              ...EMPTY_PROFILE,
            });
          }
        }
      } catch (err) {
        console.error(
          "PROFILE LOAD ERROR:",
          err
        );

        setError(
          err?.message ||
            "Unable to load profile from server."
        );


        try {
          const stored =
            localStorage.getItem(
              "profile"
            );

          if (stored) {
            const localProfile =
              normalizeProfile(
                JSON.parse(stored)
              );

            setProfile({
              ...EMPTY_PROFILE,
              ...localProfile,
            });
          }
        } catch (localError) {
          console.error(
            "LOCAL STORAGE ERROR:",
            localError
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);



  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setProfile(
      (previousProfile) => ({
        ...previousProfile,
        [name]: value,
      })
    );

    setMessage("");
    setError("");
  };



  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      
      const email =
        getLoggedInEmail();

      if (!email) {
        setError(
          "Student email not found. Please login again."
        );

        setSaving(false);
        return;
      }

      

      const profileToSave = {
        name: profile.name || "",
        course: profile.course || "",
        year: profile.year || "",
        email:
          profile.email || email,
        phone: profile.phone || "",
        registerNumber:
          profile.registerNumber || "",

        gender:
          profile.gender || "",
        dob:
          profile.dob || "",
        bloodGroup:
          profile.bloodGroup || "",
        aadhar:
          profile.aadhar || "",
        parentPhone:
          profile.parentPhone || "",
        address:
          profile.address || "",

        degree:
          profile.degree || "",
        department:
          profile.department || "",
        batch:
          profile.batch || "",
        currentSem:
          profile.currentSem || "",
        regulation:
          profile.regulation || "",
        arrearsHistory:
          profile.arrearsHistory || "",
        mode:
          profile.mode || "",
        type:
          profile.type || "",
        quota:
          profile.quota || "",
        firstGraduate:
          profile.firstGraduate || "",
      };

      console.log(
        "===================================="
      );

      console.log(
        "DATA SENT TO N8N:"
      );

      console.log(
        JSON.stringify(
          profileToSave,
          null,
          2
        )
      );

      console.log(
        "===================================="
      );

      
      const response =
        await updateProfile(
          profileToSave
        );

      console.log(
        "UPDATE PROFILE RESPONSE:",
        response
      );

     

      let updatedProfile =
        normalizeProfile(
          response
        );

      
      const responseHasValues =
        Object.values(
          updatedProfile
        ).some(
          (value) =>
            value !== null &&
            value !== undefined &&
            String(value).trim() !== ""
        );

      
      if (!responseHasValues) {
        updatedProfile =
          normalizeProfile(
            profileToSave
          );
      }

     

      setProfile({
        ...EMPTY_PROFILE,
        ...updatedProfile,
      });

      

      localStorage.setItem(
        "profile",
        JSON.stringify(
          updatedProfile
        )
      );

    

      try {
        const loggedUser =
          localStorage.getItem(
            "user"
          );

        if (loggedUser) {
          const user =
            JSON.parse(
              loggedUser
            );

          localStorage.setItem(
            "user",
            JSON.stringify({
              ...user,
              email:
                updatedProfile.email ||
                email,
            })
          );
        }
      } catch (userError) {
        console.error(
          "USER STORAGE UPDATE ERROR:",
          userError
        );
      }


      setEdit(false);

      setMessage(
        "Profile updated successfully."
      );
    } catch (err) {
      console.error(
        "PROFILE SAVE ERROR:",
        err
      );

      setError(
        err?.message ||
          "Unable to save profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };


  const handleCancel = () => {
    try {
      const stored =
        localStorage.getItem(
          "profile"
        );

      if (stored) {
        const localProfile =
          normalizeProfile(
            JSON.parse(stored)
          );

        setProfile({
          ...EMPTY_PROFILE,
          ...localProfile,
        });
      }

      setEdit(false);
      setMessage("");
      setError("");
    } catch (err) {
      console.error(
        "CANCEL ERROR:",
        err
      );
    }
  };


  const handleEdit = () => {
    setEdit(true);
    setMessage("");
    setError("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="text-5xl mb-4">
            🎓
          </div>

          <p className="text-lg font-semibold text-gray-700">
            Loading your profile...
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Fetching your information from the server
          </p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 py-8 px-4">

      <div className="max-w-6xl mx-auto">


        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-6 md:p-8 text-white shadow-xl mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div className="flex items-center gap-5">

              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-4xl border border-white/30">
                🎓
              </div>

              <div>

                <p className="text-indigo-100 text-sm">
                  StudentLog
                </p>

                <h1 className="text-3xl md:text-4xl font-bold">
                  {profile.name ||
                    "Student Profile"}
                </h1>

                <p className="text-indigo-100 mt-1">
                  {profile.department ||
                    "Department"}

                  {profile.year
                    ? ` • ${profile.year} Year`
                    : ""}
                </p>

              </div>

            </div>

            {!edit && (
              <button
                type="button"
                onClick={handleEdit}
                className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-100 transition"
              >
                ✏️ Edit Profile
              </button>
            )}

          </div>

        </div>


        {message && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 font-medium">
            ✅ {message}
          </div>
        )}


        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 font-medium">
            ⚠️ {error}
          </div>
        )}


        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8 mb-8">

          <SectionHeader
            icon="👤"
            title="Basic Details"
            description="Your primary student information"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <Field
              label="Student Name"
              name="name"
              profile={profile}
              edit={edit}
              onChange={handleChange}
              placeholder="Enter student name"
            />

            <Field
              label="Course"
              name="course"
              profile={profile}
              edit={edit}
              onChange={handleChange}
              placeholder="Example: B.E"
            />

            <Field
              label="Year"
              name="year"
              profile={profile}
              edit={edit}
              onChange={handleChange}
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
            </Field>

            <Field
              label="Email"
              name="email"
              type="email"
              profile={profile}
              edit={edit}
              onChange={handleChange}
              placeholder="student@example.com"
            />

            <Field
              label="Phone Number"
              name="phone"
              type="tel"
              profile={profile}
              edit={edit}
              onChange={handleChange}
              placeholder="Enter phone number"
            />

            <Field
              label="Register Number"
              name="registerNumber"
              profile={profile}
              edit={edit}
              onChange={handleChange}
              placeholder="Enter register number"
            />

          </div>

        </div>

        {/* =================================================
            PERSONAL DETAILS
        ================================================= */}

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8 mb-8">

          <SectionHeader
            icon="🧑"
            title="Personal Details"
            description="Your personal and contact information"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <Field
              label="Gender"
              name="gender"
              profile={profile}
              edit={edit}
              onChange={handleChange}
            >
              <option value="">
                Select Gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>
            </Field>

            <Field
              label="Date of Birth"
              name="dob"
              type="date"
              profile={profile}
              edit={edit}
              onChange={handleChange}
            />

            <Field
              label="Blood Group"
              name="bloodGroup"
              profile={profile}
              edit={edit}
              onChange={handleChange}
            >
              <option value="">
                Select Blood Group
              </option>

              <option value="A+">
                A+
              </option>

              <option value="A-">
                A-
              </option>

              <option value="B+">
                B+
              </option>

              <option value="B-">
                B-
              </option>

              <option value="AB+">
                AB+
              </option>

              <option value="AB-">
                AB-
              </option>

              <option value="O+">
                O+
              </option>

              <option value="O-">
                O-
              </option>
            </Field>

            <Field
              label="Aadhaar Number"
              name="aadhar"
              profile={profile}
              edit={edit}
              onChange={handleChange}
              placeholder="Enter Aadhaar number"
            />

            <Field
              label="Parent / Guardian Phone"
              name="parentPhone"
              type="tel"
              profile={profile}
              edit={edit}
              onChange={handleChange}
              placeholder="Enter parent phone"
            />

            {/* ADDRESS */}

            <div className="md:col-span-2 lg:col-span-3">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address
              </label>

              {edit ? (
                <textarea
                  name="address"
                  value={
                    profile.address || ""
                  }
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter your complete address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
                />
              ) : (
                <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 min-h-[100px]">
                  {profile.address ||
                    "Not provided"}
                </div>
              )}

            </div>

          </div>

        </div>


        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8 mb-8">

          <SectionHeader
            icon="🎓"
            title="Academic Details"
            description="Your academic and institutional information"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <Field
              label="Degree"
              name="degree"
              profile={profile}
              edit={edit}
              onChange={handleChange}
            >
              <option value="">
                Select Degree
              </option>

              <option value="B.E">
                B.E
              </option>

              <option value="B.Tech">
                B.Tech
              </option>

              <option value="M.E">
                M.E
              </option>

              <option value="M.Tech">
                M.Tech
              </option>
            </Field>

            <Field
              label="Department"
              name="department"
              profile={profile}
              edit={edit}
              onChange={handleChange}
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
            </Field>

            <Field
              label="Batch"
              name="batch"
              profile={profile}
              edit={edit}
              onChange={handleChange}
              placeholder="Example: 2023-2027"
            />

            <Field
              label="Current Semester"
              name="currentSem"
              profile={profile}
              edit={edit}
              onChange={handleChange}
            >
              <option value="">
                Select Semester
              </option>

              <option value="1">
                Semester 1
              </option>

              <option value="2">
                Semester 2
              </option>

              <option value="3">
                Semester 3
              </option>

              <option value="4">
                Semester 4
              </option>

              <option value="5">
                Semester 5
              </option>

              <option value="6">
                Semester 6
              </option>

              <option value="7">
                Semester 7
              </option>

              <option value="8">
                Semester 8
              </option>
            </Field>

            <Field
              label="Regulation"
              name="regulation"
              profile={profile}
              edit={edit}
              onChange={handleChange}
              placeholder="Example: 2021"
            />

            <Field
              label="History of Arrears"
              name="arrearsHistory"
              profile={profile}
              edit={edit}
              onChange={handleChange}
            >
              <option value="">
                Select Arrears Status
              </option>

              <option value="No Arrears">
                No Arrears
              </option>

              <option value="Have Arrears">
                Have Arrears
              </option>
            </Field>

            <Field
              label="Mode"
              name="mode"
              profile={profile}
              edit={edit}
              onChange={handleChange}
            >
              <option value="">
                Select Mode
              </option>

              <option value="Regular">
                Regular
              </option>

              <option value="Lateral Entry">
                Lateral Entry
              </option>
            </Field>

            <Field
              label="Type"
              name="type"
              profile={profile}
              edit={edit}
              onChange={handleChange}
            >
              <option value="">
                Select Type
              </option>

              <option value="Full Time">
                Full Time
              </option>

              <option value="Part Time">
                Part Time
              </option>
            </Field>

            <Field
              label="Quota"
              name="quota"
              profile={profile}
              edit={edit}
              onChange={handleChange}
            >
              <option value="">
                Select Quota
              </option>

              <option value="Government">
                Government
              </option>

              <option value="Management">
                Management
              </option>

              <option value="Other">
                Other
              </option>
            </Field>

            <Field
              label="First Graduate"
              name="firstGraduate"
              profile={profile}
              edit={edit}
              onChange={handleChange}
            >
              <option value="">
                Select Option
              </option>

              <option value="Yes">
                Yes
              </option>

              <option value="No">
                No
              </option>
            </Field>

          </div>

        </div>


        {edit && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 flex flex-col sm:flex-row justify-end gap-4">

            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="px-7 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {saving
                ? "⏳ Saving..."
                : "💾 Save Changes"}
            </button>

          </div>
        )}


        <div className="text-center mt-6 mb-8">

          <p className="text-sm text-gray-500">
            🔒 Your profile information is stored securely.
          </p>

        </div>

      </div>
    </div>
  );
}
