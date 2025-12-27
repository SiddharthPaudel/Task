import TaskItem from "./TaskItem";

export default function TaskList(props) {
  if (!props.tasks.length)
    return <p className="text-gray-500">No tasks found.</p>;

  return (
    <ul className="space-y-4">
      {props.tasks.map(task => (
        <TaskItem key={task.id} task={task} {...props} />
      ))}
    </ul>
  );
}
