import React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  User,
  GraduationCap,
  CalendarCheck,
  FileText,
  BookOpen,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

export default function Sidebar({
  expanded,
  setExpanded,
}) {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
    {
      name: "CGPA",
      path: "/cgpa",
      icon: GraduationCap,
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: CalendarCheck,
    },
    {
      name: "Grades",
      path: "/grades",
      icon: FileText,
    },
    {
      name: "Assignments",
      path: "/assignments",
      icon: BookOpen,
    },
    {
      name: "Feedback",
      path: "/feedback",
      icon: MessageSquare,
    },
  ];

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`
        fixed
        left-0
        top-0
        h-screen
        z-50
        overflow-hidden

        bg-gradient-to-b
        from-indigo-700
        via-purple-700
        to-pink-600

        text-white
        shadow-2xl

        transition-[width]
        duration-300
        ease-in-out

        ${expanded ? "w-64" : "w-20"}
      `}
    >

      {/* =====================================================
          LOGO
      ===================================================== */}

      <div
        className="
          h-20
          flex
          items-center
          px-5
          border-b
          border-white/20
          whitespace-nowrap
        "
      >

        <div
          className="
            min-w-[40px]
            h-10
            rounded-xl
            bg-white/20
            backdrop-blur
            flex
            items-center
            justify-center
          "
        >
          <GraduationCap
            size={24}
            strokeWidth={2}
          />
        </div>

        <span
          className={`
            ml-4
            text-xl
            font-bold
            transition-all
            duration-300
            whitespace-nowrap
            ${
              expanded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-3"
            }
          `}
        >
          StudentLog
        </span>

      </div>

      {/* =====================================================
          MENU
      ===================================================== */}

      <nav className="mt-6 px-3 space-y-2">

        {menu.map((item) => {

          const Icon = item.icon;

          const active =
            location.pathname === item.path;

          return (

            <Link
              key={item.path}
              to={item.path}
              className={`
                relative
                flex
                items-center
                h-12
                rounded-xl
                whitespace-nowrap
                transition-all
                duration-200

                ${
                  active
                    ? "bg-white text-purple-700 shadow-lg"
                    : "text-white hover:bg-white/15"
                }
              `}
            >

              {/* ACTIVE INDICATOR */}

              {active && (
                <div
                  className="
                    absolute
                    left-0
                    top-2
                    bottom-2
                    w-1
                    bg-purple-700
                    rounded-r-full
                  "
                />
              )}

              {/* ICON */}

              <span
                className="
                  min-w-[56px]
                  flex
                  items-center
                  justify-center
                "
              >

                <Icon
                  size={21}
                  strokeWidth={2}
                  className="
                    transition-transform
                    duration-200
                    hover:scale-110
                  "
                />

              </span>

              {/* TEXT */}

              <span
                className={`
                  font-medium
                  transition-all
                  duration-300
                  ${
                    expanded
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-3"
                  }
                `}
              >
                {item.name}
              </span>

              {/* ARROW */}

              <ChevronRight
                size={17}
                className={`
                  ml-auto
                  mr-4
                  transition-all
                  duration-300
                  ${
                    expanded
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-3"
                  }
                `}
              />

            </Link>

          );
        })}

      </nav>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div
        className={`
          absolute
          bottom-0
          left-0
          w-full
          border-t
          border-white/20
          py-4
          text-center
          text-xs
          text-white/70
          transition-all
          duration-300
          ${
            expanded
              ? "opacity-100"
              : "opacity-0"
          }
        `}
      >
        © 2026 StudentLog
      </div>

    </aside>
  );
}