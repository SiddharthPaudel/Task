export default function SearchBar({ value, onChange }) {
  return (
   <input
  className="w-full mb-4 rounded-lg border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
  placeholder=" Search tasks..."
  value={value}
  onChange={e => onChange(e.target.value)}
/>

  );
}
