import AppointmentTable from '@/components/admin/AppointmentTable';

export const metadata = {
  title: 'Appointments',
};

export default function AppointmentsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
          Appointments
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          View, approve, deny, and reschedule appointment requests.
        </p>
      </div>

      <AppointmentTable />
    </div>
  );
}
