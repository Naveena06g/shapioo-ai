import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import Layout from "../components/Layout";

export default function AdminOrders() {
  // Note: You would need a backend endpoint to fetch ALL orders for the admin
  const { data: orders, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => apiRequest<any[]>("/admin/orders").catch(() => []), 
  });

  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-3xl font-display mb-1">Platform Orders</h2>
        <p className="text-mute text-sm">Monitor all transactions across SHOPIOO AI.</p>
      </div>

      <div className="card overflow-hidden p-0">
        <table className="w-full text-left">
          <thead className="bg-[#f6f0e2] border-b border-line text-xs uppercase text-mute">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={4} className="p-4 text-center text-mute">Loading orders...</td></tr>
            ) : orders?.length === 0 ? (
              <tr><td colSpan={4} className="p-4 text-center text-mute">No orders yet.</td></tr>
            ) : orders?.map(order => (
              <tr key={order.id} className="border-b border-line last:border-0">
                <td className="p-4 font-mono text-xs">{order.id.slice(0, 8)}</td>
                <td className="p-4 font-bold">{order.user?.name || "Customer"}</td>
                <td className="p-4">₹{Number(order.total)}</td>
                <td className="p-4"><span className="pill">{order.status || "Completed"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}