import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Enroll from "./pages/Enroll";
import Assignments from "./pages/Assignments";
import Attendance from "./pages/Attendance";
import Grades from "./pages/Grades";
import Feedback from "./pages/Feedback";
import Profile from "./pages/Profile";
import CGPA from "./pages/cgpa";


const PrivateRoute = ({ children }) => {

  const user =
    localStorage.getItem("user");

  return user
    ? children
    : <Navigate to="/" replace />;
};


function App() {

  return (

    <Router>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />


        <Route
          path="/enroll"
          element={
            <PrivateRoute>
              <Enroll />
            </PrivateRoute>
          }
        />


        <Route
          path="/assignments"
          element={
            <PrivateRoute>
              <Assignments />
            </PrivateRoute>
          }
        />


        <Route
          path="/grades"
          element={
            <PrivateRoute>
              <Grades />
            </PrivateRoute>
          }
        />


        <Route
          path="/feedback"
          element={
            <PrivateRoute>
              <Feedback />
            </PrivateRoute>
          }
        />


        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />


        <Route
          path="/cgpa"
          element={
            <PrivateRoute>
              <CGPA />
            </PrivateRoute>
          }
        />
         <Route
          path="/attendance"
          element={
            <PrivateRoute>
              <Attendance />
            </PrivateRoute>
          }
        />


        <Route
          path="*"
          element={
            <Navigate to="/" replace />
          }
        />

      </Routes>

    </Router>
  );
}

export default App;