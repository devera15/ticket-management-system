import { useForm } from '@inertiajs/react';

const priorities = ['Low', 'Medium', 'High', 'Urgent'];
const statuses = ['Open', 'In Progress', 'Resolved', 'Closed'];
const categories = ['Hardware', 'Software', 'Network', 'Account', 'Other'];

export default function TicketForm({ ticket = null, submitLabel = 'Create Ticket' }) {
  const { data, setData, post, put, processing, errors } = useForm({
    title: ticket?.title ?? '',
    description: ticket?.description ?? '',
    priority: ticket?.priority ?? 'Medium',
    status: ticket?.status ?? 'Open',
    category: ticket?.category ?? 'Other',
  });

  const submit = (e) => {
    e.preventDefault();
    ticket ? put(`/tickets/${ticket.id}`) : post('/tickets');
  };
  const field = (name, label, child) => (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-semibold">{label}</label>
      {child}
      {errors[name] && <p className="text-sm text-red-600">{errors[name]}</p>}
    </div>
  );
  const inputClass = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100';
  return (
    <form onSubmit={submit} className="space-y-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-7">
      {field('title', 'Title', <input id="title" className={inputClass} value={data.title} onChange={e => setData('title', e.target.value)} maxLength={255} />)}
      {field('description', 'Description', <textarea id="description" rows="5" className={inputClass} value={data.description} onChange={e => setData('description', e.target.value)} />)}
      <div className="grid gap-4 sm:grid-cols-3">
        {field('priority', 'Priority', <select id="priority" className={inputClass} value={data.priority} onChange={e => setData('priority', e.target.value)}>{priorities.map(x => <option key={x}>{x}</option>)}</select>)}
        {field('status', 'Status', <select id="status" className={inputClass} value={data.status} onChange={e => setData('status', e.target.value)}>{statuses.map(x => <option key={x}>{x}</option>)}</select>)}
        {field('category', 'Category', <select id="category" className={inputClass} value={data.category} onChange={e => setData('category', e.target.value)}>{categories.map(x => <option key={x}>{x}</option>)}</select>)}
      </div>
      <button disabled={processing} className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">
        {processing ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}
