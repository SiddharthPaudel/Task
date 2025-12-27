import { useEffect, useMemo, useState } from "react";
import { taskApi } from "./services/taskApi";
import { useDebounce } from "./hooks/useDebounce";

import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList";
import Controls from "./components/Controls";
import SearchBar from "./components/SearchBar";
import task from "./icons/list.png"

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("date");
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    taskApi.getAll().then(setTasks);
  }, []);

  useEffect(() => {
    taskApi.saveAll(tasks);
  }, [tasks]);

  const processedTasks = useMemo(() => {
    return tasks
      .filter(t => status === "All" || t.status === status)
      .filter(t => t.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
      .sort((a, b) =>
        sort === "name"
          ? a.title.localeCompare(b.title)
          : new Date(a.dueDate || 0) - new Date(b.dueDate || 0)
      );
  }, [tasks, status, sort, debouncedSearch]);

  const saveTask = (task) => {
    setTasks(prev =>
      prev.some(t => t.id === task.id)
        ? prev.map(t => t.id === task.id ? task : t)
        : [...prev, task]
    );
    setEditing(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6 font-poppins">
  <div className="max-w-2xl mx-auto">
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-1">
        <img src={task} alt="Task Tracker Logo" className="inline-block w-10 h-10 mr-2" /> Task Tracker
      </h1>
      <p className="text-slate-500 mb-6">
        Manage your daily tasks efficiently
      </p>

        <TaskForm onSave={saveTask} editing={editing} onCancel={() => setEditing(null)} />
        <SearchBar value={search} onChange={setSearch} />
        <Controls status={status} setStatus={setStatus} sort={sort} setSort={setSort} />

        <TaskList
          tasks={processedTasks}
          onEdit={setEditing}
          onDelete={(id) => confirm("Delete task?") && setTasks(tasks.filter(t => t.id !== id))}
          onToggle={(id) =>
            setTasks(tasks.map(t =>
              t.id === id ? { ...t, status: t.status === "Pending" ? "Done" : "Pending" } : t
            ))
          }
        />
      </div>
    </div>
    </div>
  );
}
