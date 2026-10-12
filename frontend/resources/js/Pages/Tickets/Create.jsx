import AppLayout from '../../Components/AppLayout';
import TicketForm from '../../Components/TicketForm';
export default function Create() {
  return <AppLayout><div className="mb-5"><h1 className="text-2xl font-bold">Create Ticket</h1><p className="mt-1 text-slate-500">Describe the issue so the support team can help.</p></div><TicketForm /></AppLayout>;
}
