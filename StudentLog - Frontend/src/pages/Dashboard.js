import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  GraduationCap,
  MapPin,
  Megaphone,
  BookOpen,
  ClipboardList,
  BarChart3,
  UserRound,
  MessageSquare,
  ArrowRight,
  Bell,
  Building2,
  Users,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});

  // Controls sidebar animation
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  // =====================================================
  // SAMPLE DATA
  // =====================================================

  const timetable = [
    {
      time: "09:00 AM - 10:00 AM",
      subject: "Data Structures",
      faculty: "Dr. Kumar",
      room: "CSE Lab - 1",
    },
    {
      time: "10:00 AM - 11:00 AM",
      subject: "Database Management",
      faculty: "Ms. Priya",
      room: "Room 204",
    },
    {
      time: "11:15 AM - 12:15 PM",
      subject: "Computer Networks",
      faculty: "Mr. Arun",
      room: "Room 302",
    },
    {
      time: "01:15 PM - 02:15 PM",
      subject: "Operating Systems",
      faculty: "Dr. Raj",
      room: "Room 205",
    },
    {
      time: "02:15 PM - 03:15 PM",
      subject: "Software Engineering",
      faculty: "Ms. Divya",
      room: "Room 201",
    },
  ];

  const exams = [
    {
      date: "20 Aug 2026",
      day: "Thursday",
      subject: "Data Structures",
      time: "10:00 AM - 01:00 PM",
      hall: "Main Block - Hall 1",
    },
    {
      date: "24 Aug 2026",
      day: "Monday",
      subject: "Database Management",
      time: "10:00 AM - 01:00 PM",
      hall: "Main Block - Hall 2",
    },
    {
      date: "27 Aug 2026",
      day: "Thursday",
      subject: "Computer Networks",
      time: "10:00 AM - 01:00 PM",
      hall: "Science Block - Hall 3",
    },
  ];

  const events = [
    {
      title: "Annual Sports Meet",
      date: "22 Aug 2026",
      venue: "College Ground",
      type: "Sports",
    },
    {
      title: "Technical Symposium",
      date: "28 Aug 2026",
      venue: "Auditorium",
      type: "Technical",
    },
    {
      title: "Project Expo 2026",
      date: "02 Sep 2026",
      venue: "Main Block",
      type: "Academic",
    },
  ];

  const announcements = [
    {
      title: "Internal Assessment Examination",
      description:
        "The upcoming internal assessment examination timetable has been published.",
      date: "Today",
      important: true,
    },
    {
      title: "Assignment Submission",
      description:
        "Students are requested to submit pending assignments before the deadline.",
      date: "Yesterday",
      important: false,
    },
    {
      title: "Library Notice",
      description:
        "Library working hours have been extended during the examination period.",
      date: "2 days ago",
      important: false,
    },
  ];

  // =====================================================
  // LOAD USER + PROFILE
  // =====================================================

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedProfile = localStorage.getItem("profile");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    } catch (error) {
      console.error("Unable to load dashboard data:", error);
    }
  }, []);

  // =====================================================
  // STUDENT INFORMATION
  // =====================================================

  const studentName =
    profile.name ||
    user.name ||
    "Student";

  const department =
    profile.department ||
    "Department";

  const year =
    profile.year ||
    "";

  const semester =
    profile.currentSem ||
    "";

  // =====================================================
  // DATE
  // =====================================================

  const today = new Date();

  const formattedDate = today.toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  // =====================================================
  // QUICK ACCESS
  // =====================================================

  const quickAccess = [
    {
      title: "Profile",
      description: "View your details",
      icon: UserRound,
      path: "/profile",
    },
    {
      title: "CGPA",
      description: "Calculate your CGPA",
      icon: GraduationCap,
      path: "/cgpa",
    },
    {
      title: "Attendance",
      description: "Check attendance",
      icon: BarChart3,
      path: "/attendance",
    },
    {
      title: "Grades",
      description: "View your results",
      icon: ClipboardList,
      path: "/grades",
    },
    {
      title: "Assignments",
      description: "View assignments",
      icon: BookOpen,
      path: "/assignments",
    },
    {
      title: "Feedback",
      description: "Send feedback",
      icon: MessageSquare,
      path: "/feedback",
    },
  ];

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-100">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar
        expanded={sidebarExpanded}
        setExpanded={setSidebarExpanded}
      />

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div
        className={`
          min-h-screen
          transition-[margin]
          duration-300
          ease-in-out
          ${sidebarExpanded ? "ml-64" : "ml-20"}
        `}
      >

        {/* NAVBAR */}

        <Navbar />

        {/* MAIN */}

        <main className="p-5 md:p-8">

          <div className="max-w-7xl mx-auto">

            {/* =================================================
                WELCOME
            ================================================= */}

            <section
              className="
                relative
                overflow-hidden
                rounded-3xl
                bg-gradient-to-r
                from-indigo-700
                via-purple-700
                to-pink-600
                text-white
                shadow-xl
                p-6
                md:p-8
                mb-8
                transition-all
                duration-300
                hover:shadow-2xl
              "
            >

              <div
                className="
                  absolute
                  -right-20
                  -top-20
                  w-64
                  h-64
                  rounded-full
                  bg-white/10
                "
              />

              <div
                className="
                  absolute
                  right-20
                  -bottom-32
                  w-72
                  h-72
                  rounded-full
                  bg-white/5
                "
              />

              <div
                className="
                  relative
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-6
                "
              >

                <div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-indigo-100
                      text-sm
                      mb-2
                    "
                  >
                    <Sparkles size={16} />

                    <span>
                      StudentLog
                    </span>
                  </div>

                  <h1
                    className="
                      text-3xl
                      md:text-4xl
                      font-bold
                    "
                  >
                    Welcome back, {studentName}
                  </h1>

                  <p
                    className="
                      text-indigo-100
                      mt-3
                    "
                  >
                    Here's what's happening with
                    your academic journey.
                  </p>

                  <div
                    className="
                      flex
                      flex-wrap
                      items-center
                      gap-3
                      mt-5
                    "
                  >

                    <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur">
                      {department}
                    </div>

                    {year && (
                      <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur">
                        {year} Year
                      </div>
                    )}

                    {semester && (
                      <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur">
                        Semester {semester}
                      </div>
                    )}

                  </div>

                </div>

                <div
                  className="
                    bg-white/10
                    border
                    border-white/20
                    backdrop-blur
                    rounded-2xl
                    p-5
                    min-w-[230px]
                  "
                >

                  <div className="flex items-center gap-3">
                    <CalendarDays size={22} />

                    <span className="font-semibold">
                      Today
                    </span>
                  </div>

                  <p className="mt-3 text-indigo-100 text-sm">
                    {formattedDate}
                  </p>

                </div>

              </div>

            </section>

            {/* =================================================
                STATISTICS
            ================================================= */}

            <section
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                gap-5
                mb-8
              "
            >

              <StatCard
                title="Attendance"
                value="93.1%"
                subtitle="Overall attendance"
                icon={BarChart3}
              />

              <StatCard
                title="CGPA"
                value="8.22"
                subtitle="Current CGPA"
                icon={GraduationCap}
              />

              <StatCard
                title="Assignments"
                value="--"
                subtitle="Pending assignments"
                icon={BookOpen}
              />

              <StatCard
                title="Exams"
                value={exams.length}
                subtitle="Upcoming examinations"
                icon={ClipboardList}
              />

            </section>

            {/* =================================================
                TIMETABLE
            ================================================= */}

            <section
              className="
                bg-white
                rounded-3xl
                shadow-sm
                border
                border-gray-100
                overflow-hidden
                mb-8
                transition-all
                duration-300
                hover:shadow-lg
              "
            >

              <SectionTitle
                icon={Clock3}
                title="Today's Timetable"
                description={
                  department !== "Department"
                    ? `${department} • ${year} Year • Semester ${semester}`
                    : "Your scheduled classes"
                }
              />

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="bg-slate-50 text-left text-sm text-gray-500">

                      <th className="px-6 py-4">
                        Time
                      </th>

                      <th className="px-6 py-4">
                        Subject
                      </th>

                      <th className="px-6 py-4">
                        Faculty
                      </th>

                      <th className="px-6 py-4">
                        Room
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {timetable.map((item, index) => (

                      <tr
                        key={index}
                        className="
                          border-t
                          border-gray-100
                          hover:bg-indigo-50/40
                          transition
                        "
                      >

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-2 text-gray-600 whitespace-nowrap">

                            <Clock3
                              size={16}
                              className="text-indigo-500"
                            />

                            {item.time}

                          </div>

                        </td>

                        <td className="px-6 py-5 font-semibold text-gray-800">
                          {item.subject}
                        </td>

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-2 text-gray-600">

                            <Users size={16} />

                            {item.faculty}

                          </div>

                        </td>

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-2 text-gray-600">

                            <MapPin size={16} />

                            {item.room}

                          </div>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </section>

            {/* =================================================
                EXAMS + EVENTS
            ================================================= */}

            <div
              className="
                grid
                grid-cols-1
                xl:grid-cols-2
                gap-8
                mb-8
              "
            >

              {/* EXAMS */}

              <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

                <SectionTitle
                  icon={ClipboardList}
                  title="Upcoming Examinations"
                  description="Exam schedule and hall allotment"
                />

                <div className="p-5 space-y-4">

                  {exams.map((exam, index) => (

                    <div
                      key={index}
                      className="
                        rounded-2xl
                        border
                        border-gray-100
                        p-5
                        hover:border-indigo-200
                        hover:shadow-md
                        hover:-translate-y-0.5
                        transition-all
                        duration-300
                      "
                    >

                      <div className="flex justify-between items-start gap-4">

                        <div>

                          <p className="text-sm text-indigo-600 font-semibold">
                            {exam.date}
                          </p>

                          <h3 className="text-lg font-bold text-gray-800 mt-1">
                            {exam.subject}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            {exam.day}
                          </p>

                        </div>

                        <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl">
                          <GraduationCap size={22} />
                        </div>

                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">

                        <InfoItem
                          icon={Clock3}
                          text={exam.time}
                        />

                        <InfoItem
                          icon={Building2}
                          text={exam.hall}
                        />

                      </div>

                    </div>

                  ))}

                </div>

              </section>

              {/* EVENTS */}

              <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

                <SectionTitle
                  icon={CalendarDays}
                  title="Upcoming College Events"
                  description="Stay updated with campus activities"
                />

                <div className="p-5 space-y-4">

                  {events.map((event, index) => (

                    <div
                      key={index}
                      className="
                        flex
                        gap-4
                        p-4
                        rounded-2xl
                        border
                        border-gray-100
                        hover:bg-indigo-50/40
                        hover:border-indigo-100
                        hover:-translate-y-0.5
                        transition-all
                        duration-300
                      "
                    >

                      <div
                        className="
                          flex-shrink-0
                          w-14
                          h-14
                          rounded-xl
                          bg-gradient-to-br
                          from-indigo-500
                          to-purple-600
                          text-white
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <CalendarDays size={20} />
                      </div>

                      <div className="flex-1">

                        <div className="flex justify-between gap-3">

                          <h3 className="font-bold text-gray-800">
                            {event.title}
                          </h3>

                          <span className="text-xs px-2 py-1 rounded-lg bg-indigo-50 text-indigo-600 h-fit">
                            {event.type}
                          </span>

                        </div>

                        <p className="text-sm text-gray-500 mt-1">
                          {event.date}
                        </p>

                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">

                          <MapPin size={14} />

                          {event.venue}

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              </section>

            </div>

            {/* =================================================
                ANNOUNCEMENTS
            ================================================= */}

            <section
              className="
                bg-white
                rounded-3xl
                shadow-sm
                border
                border-gray-100
                overflow-hidden
                mb-8
              "
            >

              <SectionTitle
                icon={Megaphone}
                title="Announcements & Notices"
                description="Important updates from your college"
              />

              <div className="divide-y divide-gray-100">

                {announcements.map((announcement, index) => (

                  <div
                    key={index}
                    className="
                      p-5
                      md:p-6
                      flex
                      gap-4
                      hover:bg-slate-50
                      transition
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
                        flex-shrink-0
                      "
                    >

                      {announcement.important ? (
                        <Bell size={20} />
                      ) : (
                        <Megaphone size={20} />
                      )}

                    </div>

                    <div className="flex-1">

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                        <h3 className="font-bold text-gray-800">
                          {announcement.title}
                        </h3>

                        <span className="text-xs text-gray-400">
                          {announcement.date}
                        </span>

                      </div>

                      <p className="text-sm text-gray-500 mt-2">
                        {announcement.description}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </section>

            {/* =================================================
                QUICK ACCESS
            ================================================= */}

            <section className="mb-8">

              <div className="mb-5">

                <h2 className="text-2xl font-bold text-gray-800">
                  Quick Access
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Quickly access your student portal features.
                </p>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                {quickAccess.map((item) => {

                  const Icon = item.icon;

                  return (

                    <a
                      href={item.path}
                      key={item.path}
                      className="
                        group
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

                      <div className="flex items-center justify-between">

                        <div
                          className="
                            w-12
                            h-12
                            rounded-xl
                            bg-indigo-50
                            text-indigo-600
                            flex
                            items-center
                            justify-center
                            group-hover:bg-indigo-600
                            group-hover:text-white
                            transition
                          "
                        >
                          <Icon size={23} />
                        </div>

                        <ArrowRight
                          size={20}
                          className="
                            text-gray-300
                            group-hover:text-indigo-600
                            group-hover:translate-x-1
                            transition
                          "
                        />

                      </div>

                      <h3 className="text-lg font-bold text-gray-800 mt-5">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {item.description}
                      </p>

                    </a>

                  );

                })}

              </div>

            </section>

            <div className="text-center text-sm text-gray-400 py-6">
              StudentLog • Academic Dashboard
            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

// =====================================================
// STAT CARD
// =====================================================

function StatCard({
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

      <div className="flex items-center justify-between">

        <div
          className="
            w-12
            h-12
            rounded-xl
            bg-indigo-50
            text-indigo-600
            flex
            items-center
            justify-center
          "
        >
          <Icon size={23} />
        </div>

        <ChevronRight
          size={18}
          className="text-gray-300"
        />

      </div>

      <p className="text-sm text-gray-500 mt-5">
        {title}
      </p>

      <p className="text-3xl font-bold text-gray-800 mt-1">
        {value}
      </p>

      <p className="text-xs text-gray-400 mt-1">
        {subtitle}
      </p>

    </div>
  );
}

// =====================================================
// SECTION TITLE
// =====================================================

function SectionTitle({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div
      className="
        px-6
        py-5
        border-b
        border-gray-100
        flex
        items-center
        gap-4
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
        <Icon size={21} />
      </div>

      <div>

        <h2 className="text-xl font-bold text-gray-800">
          {title}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {description}
        </p>

      </div>

    </div>
  );
}

// =====================================================
// INFO ITEM
// =====================================================

function InfoItem({
  icon: Icon,
  text,
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        bg-slate-50
        rounded-xl
        px-3
        py-2
        text-sm
        text-gray-600
      "
    >

      <Icon
        size={16}
        className="text-indigo-500"
      />

      <span>{text}</span>

    </div>
  );
}