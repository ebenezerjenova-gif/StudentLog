import React from "react";
import {
  BookOpen,
  CalendarDays,
  Clock3,
  User,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowRight,
} from "lucide-react";

export default function Assignments() {
  const assignments = [
    {
      id: 1,
      subject: "Data Structures",
      title: "Binary Search Tree Implementation",
      description:
        "Implement insertion, deletion and searching operations using a Binary Search Tree.",
      faculty: "Dr. Kumar",
      dueDate: "18 Aug 2026",
      dueTime: "11:59 PM",
      status: "Pending",
      priority: "High",
    },
    {
      id: 2,
      subject: "Database Management",
      title: "SQL Query Assignment",
      description:
        "Write SQL queries using joins, subqueries, aggregate functions and group operations.",
      faculty: "Ms. Priya",
      dueDate: "21 Aug 2026",
      dueTime: "11:59 PM",
      status: "Pending",
      priority: "Medium",
    },
    {
      id: 3,
      subject: "Computer Networks",
      title: "Network Protocol Analysis",
      description:
        "Prepare a report explaining TCP, UDP and their differences with suitable examples.",
      faculty: "Mr. Arun",
      dueDate: "25 Aug 2026",
      dueTime: "05:00 PM",
      status: "Submitted",
      priority: "Medium",
    },
    {
      id: 4,
      subject: "Operating Systems",
      title: "CPU Scheduling Algorithms",
      description:
        "Compare FCFS, SJF, Round Robin and Priority Scheduling algorithms.",
      faculty: "Dr. Raj",
      dueDate: "29 Aug 2026",
      dueTime: "11:59 PM",
      status: "Pending",
      priority: "Low",
    },
    {
      id: 5,
      subject: "Software Engineering",
      title: "Software Development Life Cycle",
      description:
        "Prepare a detailed report covering different SDLC models and their advantages.",
      faculty: "Ms. Divya",
      dueDate: "03 Sep 2026",
      dueTime: "11:59 PM",
      status: "Submitted",
      priority: "Low",
    },
  ];

  const pendingCount = assignments.filter(
    (item) => item.status === "Pending"
  ).length;

  const submittedCount = assignments.filter(
    (item) => item.status === "Submitted"
  ).length;

  const highPriorityCount = assignments.filter(
    (item) => item.priority === "High"
  ).length;

  return (
    <div className="min-h-screen bg-slate-100">



      <main className="p-5 md:p-8">

        <div className="max-w-7xl mx-auto">



          <section className="mb-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div className="flex items-center gap-4">

                <div
                  className="
                    w-14 h-14
                    rounded-2xl
                    bg-gradient-to-br
                    from-indigo-500
                    to-purple-600
                    text-white
                    flex
                    items-center
                    justify-center
                    shadow-lg
                  "
                >
                  <BookOpen size={27} />
                </div>

                <div>

                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Assignments
                  </h1>

                  <p className="text-gray-500 mt-1">
                    Manage your academic assignments and deadlines.
                  </p>

                </div>

              </div>



              <div
                className="
                  bg-white
                  rounded-2xl
                  border
                  border-gray-100
                  px-6
                  py-4
                  shadow-sm
                "
              >

                <p className="text-xs text-gray-400">
                  Total Assignments
                </p>

                <p className="text-3xl font-bold text-indigo-600 mt-1">
                  {assignments.length}
                </p>

              </div>

            </div>

          </section>



          <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

            {/* PENDING */}

            <AssignmentStat
              title="Pending"
              value={pendingCount}
              description="Assignments awaiting submission"
              icon={Clock3}
              iconStyle="bg-orange-50 text-orange-500"
              valueStyle="text-orange-500"
            />



            <AssignmentStat
              title="Submitted"
              value={submittedCount}
              description="Successfully submitted"
              icon={CheckCircle2}
              iconStyle="bg-green-50 text-green-500"
              valueStyle="text-green-500"
            />

            {/* HIGH PRIORITY */}

            <AssignmentStat
              title="High Priority"
              value={highPriorityCount}
              description="Requires immediate attention"
              icon={AlertCircle}
              iconStyle="bg-red-50 text-red-500"
              valueStyle="text-red-500"
            />

          </section>



          <section
            className="
              bg-white
              rounded-3xl
              border
              border-gray-100
              shadow-sm
              overflow-hidden
            "
          >



            <div className="px-6 py-5 border-b border-gray-100">

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-11 h-11
                    rounded-xl
                    bg-indigo-50
                    text-indigo-600
                    flex
                    items-center
                    justify-center
                  "
                >
                  <FileText size={21} />
                </div>

                <div>

                  <h2 className="text-xl font-bold text-gray-800">
                    My Assignments
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    View subjects, deadlines and submission status.
                  </p>

                </div>

              </div>

            </div>



            <div className="p-5 space-y-5">

              {assignments.map((assignment) => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                />
              ))}

            </div>

          </section>



          <footer className="text-center text-sm text-gray-400 py-8">
            StudentLog • Assignments
          </footer>

        </div>

      </main>

    </div>
  );
}


function AssignmentStat({
  title,
  value,
  description,
  icon: Icon,
  iconStyle,
  valueStyle,
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

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <p
            className={`
              text-3xl
              font-bold
              mt-1
              ${valueStyle}
            `}
          >
            {value}
          </p>

        </div>

        <div
          className={`
            w-12 h-12
            rounded-xl
            flex
            items-center
            justify-center
            ${iconStyle}
          `}
        >
          <Icon size={23} />
        </div>

      </div>

      <p className="text-xs text-gray-400 mt-3">
        {description}
      </p>

    </div>
  );
}



function AssignmentCard({ assignment }) {

  const isSubmitted =
    assignment.status === "Submitted";

  const priorityStyle =
    assignment.priority === "High"
      ? "bg-red-50 text-red-600"
      : assignment.priority === "Medium"
      ? "bg-yellow-50 text-yellow-600"
      : "bg-green-50 text-green-600";

  return (
    <article
      className="
        border
        border-gray-100
        rounded-2xl
        p-5
        md:p-6
        hover:border-indigo-200
        hover:shadow-lg
        hover:-translate-y-1
        transition-all
        duration-300
        bg-white
      "
    >

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">



        <div className="flex gap-4">

          <div
            className="
              w-12 h-12
              flex-shrink-0
              rounded-xl
              bg-indigo-50
              text-indigo-600
              flex
              items-center
              justify-center
            "
          >
            <BookOpen size={22} />
          </div>

          <div className="min-w-0">



            <div className="flex flex-wrap items-center gap-2">

              <span
                className="
                  text-xs
                  font-semibold
                  px-3
                  py-1
                  rounded-full
                  bg-indigo-50
                  text-indigo-600
                "
              >
                {assignment.subject}
              </span>

              <span
                className={`
                  text-xs
                  font-semibold
                  px-3
                  py-1
                  rounded-full
                  ${priorityStyle}
                `}
              >
                {assignment.priority} Priority
              </span>

            </div>



            <h3 className="text-lg md:text-xl font-bold text-gray-800 mt-3">
              {assignment.title}
            </h3>



            <p className="text-sm text-gray-500 mt-2 leading-6 max-w-3xl">
              {assignment.description}
            </p>



            <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">

              <User
                size={16}
                className="text-indigo-500"
              />

              <span>
                Assigned by {assignment.faculty}
              </span>

            </div>

          </div>

        </div>



        <div className="flex-shrink-0">

          <span
            className={`
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-xl
              text-sm
              font-semibold
              ${
                isSubmitted
                  ? "bg-green-50 text-green-600"
                  : "bg-orange-50 text-orange-600"
              }
            `}
          >

            {isSubmitted ? (
              <CheckCircle2 size={16} />
            ) : (
              <Clock3 size={16} />
            )}

            {assignment.status}

          </span>

        </div>

      </div>



      <div
        className="
          mt-5
          pt-4
          border-t
          border-gray-100
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
        "
      >

        <div className="flex flex-wrap gap-4">

          <div className="flex items-center gap-2 text-sm text-gray-500">

            <CalendarDays
              size={16}
              className="text-indigo-500"
            />

            <span>
              Due: {assignment.dueDate}
            </span>

          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">

            <Clock3
              size={16}
              className="text-indigo-500"
            />

            <span>
              {assignment.dueTime}
            </span>

          </div>

        </div>

   

        <button
          type="button"
          onClick={() =>
            alert(`Assignment: ${assignment.title}`)
          }
          className="
            flex
            items-center
            justify-center
            gap-2
            px-5
            py-2.5
            rounded-xl
            bg-indigo-600
            text-white
            text-sm
            font-semibold
            hover:bg-indigo-700
            hover:shadow-md
            transition-all
            duration-200
          "
        >
          View Assignment
          <ArrowRight size={16} />
        </button>

      </div>

    </article>
  );
}
