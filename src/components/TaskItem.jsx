import React from "react";

function TaskItem({ task, onEdit, onDelete, onToggle }) {
  const isDone = task.status === "Done";

  return (
    <li className="flex justify-between items-start gap-4 p-4 rounded-xl border hover:shadow-md transition ">
      <div >
        <div className="flex items-center gap-2">
          <h3 className={`font-semibold ${isDone && "line-through text-slate-400"}`}>
            {task.title}
          </h3>

          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium
              ${isDone
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
              }`}
          >
            {task.status}
          </span>
        </div>

        <p className="text-sm text-slate-500 mt-1">
          📅 {task.dueDate || "No due date"}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onToggle(task.id)}
          className="text-sm text-green-600 hover:underline"
        >
          {isDone ? "Undo" : "Done"}
        </button>

        <button
          onClick={() => onEdit(task)}
          className="text-sm text-blue-600 hover:underline"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="text-sm text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </li>
  );
}


export default (TaskItem);
