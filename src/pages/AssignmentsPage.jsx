import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  ClipboardList,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AssignmentForm from "../components/AssignmentForm";
import initialAssignments from "../data/assignments.json";

// Helper to calculate days remaining
const getDaysRemaining = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  today.setHours(0, 0, 0, 0); // Compare dates only, not time
  due.setHours(0, 0, 0, 0);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const AssignmentsPage = () => {
  // --- CHANGE 1: Load state from localStorage ---
  const [assignments, setAssignments] = useState(() => {
    const savedAssignments = localStorage.getItem("assignments");
    return savedAssignments ? JSON.parse(savedAssignments) : initialAssignments;
  });

  const [isFormOpen, setIsFormOpen] = useState(false);

  // --- CHANGE 2: Save state to localStorage whenever it changes ---
  useEffect(() => {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [assignments]);

  const handleToggleComplete = (id) => {
    setAssignments(
      assignments.map((assign) =>
        assign.id === id ? { ...assign, completed: !assign.completed } : assign
      )
    );
  };

  const handleDeleteAssignment = (id) => {
    if (
      window.confirm("Are you sure you want to permanently delete this task?")
    ) {
      setAssignments(assignments.filter((assign) => assign.id !== id));
    }
  };

  const handleSaveAssignment = (newAssignment) => {
    setAssignments([
      ...assignments,
      { ...newAssignment, id: Date.now(), completed: false },
    ]);
    setIsFormOpen(false);
  };

  const { pending, completed } = useMemo(() => {
    const pending = assignments.filter((a) => !a.completed);
    const completed = assignments.filter((a) => a.completed);
    pending.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    return { pending, completed };
  }, [assignments]);

  return (
    <div className="min-h-screen bg-[#1a202c] text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 transition-colors text-white font-semibold px-4 py-2 rounded-lg"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <ClipboardList className="w-8 h-8 text-blue-400" />
              Assignment Tracker
            </h1>
            <p className="text-gray-400 mt-1">Stay on top of your deadlines.</p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors font-semibold"
          >
            + Add New
          </button>
        </div>

        {/* ... (The rest of the JSX for displaying the lists is exactly the same) ... */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2">
            Pending
          </h2>
          <div className="space-y-3">
            {pending.length > 0 ? (
              pending.map((assign) => {
                const daysLeft = getDaysRemaining(assign.dueDate);
                const dateColor =
                  daysLeft < 0
                    ? "text-red-400"
                    : daysLeft <= 3
                    ? "text-yellow-400"
                    : "text-gray-400";

                return (
                  <div
                    key={assign.id}
                    className="bg-[#2d3748] rounded-lg p-4 flex items-center gap-4"
                  >
                    <button
                      onClick={() => handleToggleComplete(assign.id)}
                      className="text-gray-400 hover:text-green-400"
                    >
                      <Circle size={24} />
                    </button>
                    <div className="flex-grow">
                      <p className="font-semibold">{assign.title}</p>
                      <p className="text-sm text-gray-400">{assign.subject}</p>
                    </div>
                    <div className={`text-sm font-medium ${dateColor}`}>
                      {daysLeft < 0
                        ? `Overdue by ${Math.abs(daysLeft)} days`
                        : daysLeft === 0
                        ? "Due Today"
                        : `${daysLeft} days left`}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">
                No pending assignments. Great job!
              </p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 border-b-2 border-gray-600 pb-2">
            Completed
          </h2>
          <div className="space-y-3">
            {completed.map((assign) => (
              <div
                key={assign.id}
                className="bg-[#2d3748] rounded-lg p-4 flex items-center gap-4 opacity-60"
              >
                <button
                  onClick={() => handleToggleComplete(assign.id)}
                  className="text-green-400"
                >
                  <CheckCircle2 size={24} />
                </button>
                <div className="flex-grow">
                  <p className="font-semibold line-through">{assign.title}</p>
                  <p className="text-sm text-gray-500">{assign.subject}</p>
                </div>
                <button
                  onClick={() => handleDeleteAssignment(assign.id)}
                  className="text-red-500 hover:text-red-400"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isFormOpen && (
        <AssignmentForm
          onSave={handleSaveAssignment}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default AssignmentsPage;
