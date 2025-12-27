import { useEffect, useState } from "react";

export default function TaskForm({ onSave, editing, onCancel }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setDueDate(editing.dueDate);
    }
  }, [editing]);

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: editing?.id || Date.now(),
      title,
      dueDate,
      status: editing?.status || "Pending",
    });

    setTitle("");
    setDueDate("");
  };

  return (
  <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 mb-6">
  <input
    className="flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
    placeholder="What needs to be done?"
    value={title}
    onChange={e => setTitle(e.target.value)}
  />

  <input
    type="date"
    className="rounded-lg border border-slate-300 px-3 py-2"
    value={dueDate}
    onChange={e => setDueDate(e.target.value)}
  />

  <button
    className="rounded-lg bg-blue-600 text-white px-5 py-2 font-medium hover:bg-blue-700 transition disabled:opacity-50"
    disabled={!title.trim()}
  >
    {editing ? "Update" : "Add"}
  </button>

  {editing && (
    <button
      type="button"
      onClick={onCancel}
      className="rounded-lg border px-4 py-2 text-slate-600 hover:bg-slate-100"
    >
      Cancel
    </button>
  )}
</form>


  );
}
