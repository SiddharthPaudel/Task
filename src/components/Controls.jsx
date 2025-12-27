export default function Controls({ status, setStatus, sort, setSort }) {
  return (
   <div className="flex flex-wrap gap-3 mb-6">
  <select
    className="rounded-lg border px-3 py-2 text-slate-700"
    value={status}
    onChange={e => setStatus(e.target.value)}
  >
    <option>All</option>
    <option>Pending</option>
    <option>Done</option>
  </select>

  <select
    className="rounded-lg border px-3 py-2 text-slate-700"
    value={sort}
    onChange={e => setSort(e.target.value)}
  >
    <option value="date">Sort by Date</option>
    <option value="name">Sort by Name</option>
  </select>
</div>

  );
}
