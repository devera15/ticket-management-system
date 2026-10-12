import { Link, router, useForm } from '@inertiajs/react';
import AppLayout from '../../Components/AppLayout';

const badge = (value) => {
  const color = value === 'Urgent' || value === 'Closed' ? 'bg-red-100 text-red-700'
    : value === 'High' || value === 'In Progress' ? 'bg-amber-100 text-amber-800'
    : value === 'Resolved' ? 'bg-emerald-100 text-emerald-700'
    : 'bg-slate-100 text-slate-700';
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${color}`}>{value}</span>;
};

export default function Index({ tickets, filters = {} }) {
  const filterForm = useForm({ search: filters.search || '', status: filters.status || '', category: filters.category || '' });
  const applyFilters = (e) => { e.preventDefault(); filterForm.get('/tickets', { preserveState: true, preserveScroll: true }); };
  return <AppLayout>
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div><h1 className="text-2xl font-bold">My Tickets</h1><p className="mt-1 text-slate-500">Track and manage your support requests.</p></div>
      <Link href="/tickets/create" className="rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white">+ New Ticket</Link>
    </div>
    <form onSubmit={applyFilters} className="mb-5 grid gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:grid-cols-4">
      <input aria-label="Search tickets" placeholder="Search title or description" className="rounded-lg border border-slate-300 px-3 py-2 sm:col-span-2" value={filterForm.data.search} onChange={e => filterForm.setData('search', e.target.value)} />
      <select aria-label="Filter by status" className="rounded-lg border border-slate-300 px-3 py-2" value={filterForm.data.status} onChange={e => filterForm.setData('status', e.target.value)}><option value="">All statuses</option>{['Open','In Progress','Resolved','Closed'].map(x => <option key={x}>{x}</option>)}</select>
      <select aria-label="Filter by category" className="rounded-lg border border-slate-300 px-3 py-2" value={filterForm.data.category} onChange={e => filterForm.setData('category', e.target.value)}><option value="">All categories</option>{['Hardware','Software','Network','Account','Other'].map(x => <option key={x}>{x}</option>)}</select>
      <div className="flex gap-2 sm:col-span-4"><button className="rounded-lg bg-slate-800 px-4 py-2 font-semibold text-white">Apply filters</button><button type="button" onClick={() => router.get('/tickets')} className="rounded-lg border border-slate-300 px-4 py-2">Clear</button></div>
    </form>
    {tickets.data.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><h2 className="text-lg font-semibold">No tickets yet</h2><p className="mt-2 text-slate-500">Create your first support ticket to get started.</p><Link href="/tickets/create" className="mt-4 inline-block font-semibold text-indigo-700">Create a ticket →</Link></div> :
      <div className="space-y-3">{tickets.data.map(t => <article key={t.id} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <div className="min-w-0"><Link href={`/tickets/${t.id}`} className="break-words text-lg font-bold text-indigo-700 hover:underline">{t.title}</Link><p className="mt-1 line-clamp-2 text-sm text-slate-600">{t.description}</p><p className="mt-2 text-xs text-slate-500">{t.category} · {new Date(t.created_at).toLocaleDateString()}</p></div>
          <div className="flex flex-wrap gap-2">{badge(t.priority)}{badge(t.status)}</div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-sm"><Link href={`/tickets/${t.id}`} className="font-semibold text-indigo-700">View</Link><Link href={`/tickets/${t.id}/edit`} className="font-semibold text-slate-700">Edit</Link><button onClick={() => { if (confirm('Delete this ticket? This cannot be undone.')) router.delete(`/tickets/${t.id}`); }} className="font-semibold text-red-600">Delete</button></div>
      </article>)}</div>}
    {tickets.links && <div className="mt-6 flex flex-wrap gap-2">{tickets.links.map((link, i) => <Link key={i} href={link.url || '#'} preserveScroll className={`rounded-lg border px-3 py-2 text-sm ${link.active ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 bg-white'} ${!link.url ? 'pointer-events-none opacity-40' : ''}`} dangerouslySetInnerHTML={{ __html: link.label }} />)}</div>}
  </AppLayout>;
}
