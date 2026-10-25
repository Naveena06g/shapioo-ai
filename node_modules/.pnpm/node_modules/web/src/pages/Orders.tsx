import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import Layout from "../components/Layout";
import { Package, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
// ... (keep other imports)

export default function Orders() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: () => apiRequest<any[]>("/orders"),
  });

  const getStatusBadge = (status: string) => {
    if (status === 'delivered') return <span className="pill">Delivered</span>;
    if (status === 'cancelled') return <span className="pill r">Cancelled</span>;
    return <span className="pill y">Pending</span>;
  };

  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-3xl font-display text-forest mb-1">My Orders</h2>
        <p className="text-mute text-sm">Track your past purchases and their delivery statuses.</p>
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-mute">Loading orders...</div>
      ) : !orders || orders.length === 0 ? (
        <div className="card text-center py-12 text-mute">
          <div className="text-4xl mb-2">📦</div>
          <p>No orders yet.</p>
          <Link to="/shops" className="btn btn-d mt-4">Start shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="card">
              <div className="flex justify-between items-center border-b border-line pb-3 mb-4">
                <div>
                  <h3 className="font-bold text-lg">Order #{order.id.slice(-6).toUpperCase()}</h3>
                  <p className="text-xs text-mute">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="font-bold text-forest text-xl">
                  ₹{Number(order.total)}
                </div>
              </div>

              {order.groups?.map((group: any) => (
                <div key={group.id} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-ink flex items-center gap-1">
                      <MapPin size={14} className="text-mute" /> {group.shop.name}
                    </span>
                    {getStatusBadge(group.status)}
                  </div>
                  
                  <div className="bg-sage/30 rounded-lg p-3 space-y-2">
                    {group.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Package size={14} className="text-mute" /> {item.name} (x{item.qty})
                        </span>
                        <span>₹{Number(item.price) * item.qty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}