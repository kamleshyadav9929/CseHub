// File: src/pages/Reminders.jsx
import { useState, useEffect } from "react";
import { AlarmClockCheck, BellPlus, Trash2 } from "lucide-react";

export default function Reminders() {
  const [reminders, setReminders] = useState(
    () => JSON.parse(localStorage.getItem("reminders")) || []
  );
  const [newReminder, setNewReminder] = useState("");

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = () => {
    if (newReminder.trim() !== "") {
      setReminders([...reminders, newReminder.trim()]);
      setNewReminder("");
    }
  };

  const deleteReminder = (index) => {
    const updated = reminders.filter((_, i) => i !== index);
    setReminders(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white px-4 py-10 pb-16">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <AlarmClockCheck className="text-blue-400" /> Study Reminders
      </h1>

      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
        <input
          value={newReminder}
          onChange={(e) => setNewReminder(e.target.value)}
          placeholder="Enter a new reminder..."
          className="flex-1 p-3 rounded-lg bg-gray-800 border border-blue-500 w-full"
        />
        <button
          onClick={addReminder}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg text-white font-semibold flex items-center gap-2"
        >
          <BellPlus size={18} /> Add
        </button>
      </div>

      <ul className="space-y-4">
        {reminders.length === 0 && (
          <p className="text-gray-400 text-sm">No reminders set.</p>
        )}
        {reminders.map((reminder, i) => (
          <li
            key={i}
            className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex justify-between items-center text-sm"
          >
            <span>{reminder}</span>
            <button
              onClick={() => deleteReminder(i)}
              className="text-red-400 hover:text-red-500"
            >
              <Trash2 size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
