import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/authOptions';
import AdminTable from './AdminTable';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  console.log("session", session);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="max-w-6xl mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">🛠️ Admin - Orders</h1>
      <AdminTable />
    </div>
  );
}
