import { Link, usePage } from '@inertiajs/react';

export default function AppLayout({ children }) {
  const { auth, flash } = usePage().props;
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="bg-white border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <Link href="/dashboard" className="text-lg font-bold text-indigo-700">HelpDesk</Link>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="text-slate-600">Hi, {auth?.user?.name}</span>
            <Link href="/dashboard" className="hover:text-indigo-700">Dashboard</Link>
            <Link href="/tickets" className="hover:text-indigo-700">Tickets</Link>
            <Link href="/tickets/create" className="rounded-lg bg-indigo-600 px-3 py-2 font-semibold text-white hover:bg-indigo-700">New Ticket</Link>
            <Link href="/logout" method="post" as="button" className="text-slate-600 hover:text-red-600">Logout</Link>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-6xl px-4 py-6">
        {flash?.success && <div role="status" className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">{flash.success}</div>}
        {flash?.error && <div role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800">{flash.error}</div>}
        {children}
      </main>
    </div>
  );
}
