import AppLayout from '../../Components/AppLayout';
import TicketForm from '../../Components/TicketForm';
export default function Edit({ ticket }) {
  return <AppLayout><div className="mb-5"><h1 className="text-2xl font-bold">Edit Ticket</h1><p className="mt-1 text-slate-500">Update the ticket details or status.</p></div><TicketForm ticket={ticket} submitLabel="Save Changes" /></AppLayout>;
}
