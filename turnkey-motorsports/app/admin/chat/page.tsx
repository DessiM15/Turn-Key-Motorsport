import AdminChatPanel from '@/components/admin/AdminChatPanel';

export const metadata = {
  title: 'Live Chat',
};

export default function AdminChatPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
          Live Chat
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          View and respond to customer chat conversations in real time.
        </p>
      </div>

      <AdminChatPanel />
    </div>
  );
}
