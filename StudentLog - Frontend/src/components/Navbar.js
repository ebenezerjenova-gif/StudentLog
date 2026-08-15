import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <div className="text-white font-bold text-xl">
            Student Portal
          </div>

          {/* NAVIGATION */}
          <div className="hidden md:flex space-x-6 text-white font-medium">

            <Link
              to="/dashboard"
              className="hover:text-yellow-300 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/profile"
              className="hover:text-yellow-300 transition"
            >
              Profile
            </Link>

            <Link
              to="/cgpa"
              className="hover:text-yellow-300 transition"
            >
              CGPA
            </Link>

            <Link
              to="/attendance"
              className="hover:text-yellow-300 transition"
            >
              Attendance
            </Link>

            <Link
              to="/grades"
              className="hover:text-yellow-300 transition"
            >
              Grades
            </Link>

            <Link
              to="/assignments"
              className="hover:text-yellow-300 transition"
            >
              Assignments
            </Link>

            <Link
              to="/feedback"
              className="hover:text-yellow-300 transition"
            >
              Feedback
            </Link>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center space-x-4">

            <button
              onClick={handleLogout}
              className="
                bg-white
                text-purple-600
                px-4
                py-2
                rounded-lg
                font-semibold
                hover:bg-gray-200
                transition
              "
            >
              Logout
            </button>

          </div>

        </div>

      </div>
    </nav>
  );
}