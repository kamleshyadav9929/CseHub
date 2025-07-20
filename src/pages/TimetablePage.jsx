import { Calendar, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import TimetableForm from "../components/TimetableForm";
import initialSchedule from "../data/timetable.json";

const TimetablePage = () => {
  // --- CHANGE 1: Load state from localStorage ---
  const [schedule, setSchedule] = useState(() => {
    const savedSchedule = localStorage.getItem("timetable");
    return savedSchedule ? JSON.parse(savedSchedule) : initialSchedule;
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [classToEdit, setClassToEdit] = useState(null);
  const [selectedDay, setSelectedDay] = useState("Monday");

  // --- CHANGE 2: Save state to localStorage whenever it changes ---
  useEffect(() => {
    localStorage.setItem("timetable", JSON.stringify(schedule));
  }, [schedule]);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = Array.from(
    { length: 10 },
    (_, i) => `${(i + 8).toString().padStart(2, "0")}:00`
  );

  const handleOpenForm = (day, classData = null) => {
    setSelectedDay(day);
    setClassToEdit(classData);
    setIsFormOpen(true);
  };

  // --- CHANGE 3: Implement the save/update logic ---
  const handleSaveClass = (classData) => {
    const newSchedule = { ...schedule };

    // If we are editing an existing class
    if (classToEdit) {
      // Find the original day of the class being edited
      const originalDay = Object.keys(newSchedule).find((day) =>
        newSchedule[day].some((c) => c.id === classToEdit.id)
      );

      // Remove the old class entry
      if (originalDay) {
        newSchedule[originalDay] = newSchedule[originalDay].filter(
          (c) => c.id !== classToEdit.id
        );
      }

      // Add the updated class to the (potentially new) correct day
      const updatedClass = { ...classToEdit, ...classData };
      newSchedule[classData.day] = [
        ...(newSchedule[classData.day] || []),
        updatedClass,
      ];
    } else {
      // If we are adding a new class
      const newClass = { ...classData, id: Date.now() };
      newSchedule[classData.day] = [
        ...(newSchedule[classData.day] || []),
        newClass,
      ];
    }

    setSchedule(newSchedule);
    setIsFormOpen(false);
  };

  const findClass = (day, time) => {
    const hour = parseInt(time.split(":")[0]);
    return schedule[day]?.find((cls) => {
      const startHour = parseInt(cls.startTime.split(":")[0]);
      return hour === startHour;
    });
  };

  return (
    <div className="min-h-screen bg-[#1a202c] text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Calendar className="w-8 h-8 text-blue-400" />
              Weekly Timetable
            </h1>
            <p className="text-gray-400 mt-1">
              Your customizable weekly schedule.
            </p>
          </div>
          <button
            onClick={() => handleOpenForm("Monday")}
            className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
          >
            <Plus size={20} /> Add Class
          </button>
        </div>

        {/* Timetable Grid and Mobile List (The JSX for displaying is the same) */}
        {/* ... The rest of your JSX from the previous step goes here ... */}
        {/* --- Desktop Grid View (Hidden on mobile) --- */}
        <div className="hidden md:block">
          <div className="grid grid-cols-6 gap-1 text-center font-semibold">
            <div className="p-2">Time</div>
            {days.map((day) => (
              <div key={day} className="p-2">
                {day}
              </div>
            ))}
          </div>
          <div className="bg-[#2d3748] rounded-lg p-1">
            {timeSlots.map((time) => (
              <div key={time} className="grid grid-cols-6 gap-1 h-20">
                <div className="flex items-center justify-center text-sm text-gray-400 border-r border-slate-600">
                  {time}
                </div>
                {days.map((day) => {
                  const cls = findClass(day, time);
                  if (cls) {
                    return (
                      <div
                        key={cls.id}
                        onClick={() => handleOpenForm(day, cls)}
                        className="rounded p-2 flex flex-col justify-start text-left text-xs cursor-pointer"
                        style={{ backgroundColor: cls.color }}
                      >
                        <p className="font-bold text-white">{cls.subject}</p>
                        <p className="text-gray-200 mt-auto">{`${cls.startTime} - ${cls.endTime}`}</p>
                      </div>
                    );
                  }
                  return (
                    <div key={day} className="border-t border-slate-700"></div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* --- Mobile List View (Hidden on desktop) --- */}
        <div className="md:hidden space-y-6">
          {days.map((day) => (
            <div key={day}>
              <h2 className="text-xl font-semibold mb-2 text-pink-400">
                {day}
              </h2>
              <div className="space-y-2">
                {schedule[day] && schedule[day].length > 0 ? (
                  schedule[day]
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((cls) => (
                      <div
                        key={cls.id}
                        onClick={() => handleOpenForm(day, cls)}
                        className="rounded-lg p-3 flex items-center gap-3"
                        style={{ backgroundColor: `${cls.color}40` }} // 40 adds transparency
                      >
                        <div
                          className="w-1 h-full rounded-full"
                          style={{ backgroundColor: cls.color }}
                        ></div>
                        <div>
                          <p className="font-bold text-white">{cls.subject}</p>
                          <p className="text-sm text-gray-300">{`${cls.startTime} - ${cls.endTime}`}</p>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-sm text-gray-500 pl-4">
                    No classes scheduled.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isFormOpen && (
        <TimetableForm
          onSave={handleSaveClass}
          onCancel={() => setIsFormOpen(false)}
          classToEdit={classToEdit}
          day={selectedDay}
        />
      )}
    </div>
  );
};

export default TimetablePage;
