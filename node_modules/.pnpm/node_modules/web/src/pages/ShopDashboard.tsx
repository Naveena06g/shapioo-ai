// import { useQuery } from "@tanstack/react-query";
// import { apiRequest } from "../lib/api";
// import { Package, IndianRupee } from "lucide-react";
// import Layout from "../components/Layout";

// export default function ShopDashboard() {
//   const { data: orders, isLoading } = useQuery({
//     queryKey: ["shop-orders"],
//     queryFn: () => apiRequest<any[]>("/orders/shop"),
//   });

//   if (isLoading) return <div className="p-10 text-center text-mute">Loading orders...</div>;

//   return (
//     <div className="max-w-5xl mx-auto p-8">
//         <Layout>
//       <h2 className="text-3xl font-bold text-forest mb-6">Incoming Orders</h2>

//       {!orders || orders.length === 0 ? (
//         <div className="card text-center py-12 text-mute">
//           No orders yet. Share your shop link with customers!
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div key={order.id} className="card">
//               <div className="flex justify-between items-start mb-4 border-b border-line pb-3">
//                 <div>
//                   <h3 className="font-bold text-lg">Order #{order.orderId.slice(-6)}</h3>
//                   <p className="text-sm text-mute">
//                     Customer: {order.order.user.name} ({order.order.user.phone})
//                   </p>
//                 </div>
//                 <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase
//                   ${order.status === 'pending' ? 'bg-saffron/20 text-saffron' : 'bg-sage text-leaf'}`}>
//                   {order.status}
//                 </span>
//               </div>

//               <div className="space-y-2 mb-4">
//                 {order.items.map((item: any) => (
//                   <div key={item.id} className="flex justify-between text-sm">
//                     <span className="flex items-center gap-2">
//                       <Package size={16} className="text-mute" /> {item.name} (x{item.qty})
//                     </span>
//                     <span>₹{item.price * item.qty}</span>
//                   </div>
//                 ))}
//               </div>

//               <div className="bg-sage/30 p-3 rounded-lg flex justify-between items-center font-bold">
//                 <span>Total Revenue</span>
//                 <span className="flex items-center text-forest text-xl">
//                   <IndianRupee size={18} /> {order.subtotal + order.delivery}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       </Layout>
//     </div>
//   );
// }

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import { Package, IndianRupee } from "lucide-react";
import Layout from "../components/Layout";

export default function ShopDashboard() {
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["shop-orders"],
    queryFn: () => apiRequest<any[]>("/orders/shop"),
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      apiRequest(`/orders/group/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shop-orders"] });
      alert("Order status updated!");
    },
  });

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-4">
        <h2 className="text-3xl font-bold text-forest mb-6">Incoming Orders</h2>

        {isLoading ? (
          <div className="text-center py-10 text-mute">Loading orders...</div>
        ) : !orders || orders.length === 0 ? (
          <div className="card text-center py-12 text-mute">
            No orders yet. Share your shop link with customers!
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="card">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-4 border-b border-line pb-3">
                  <div>
                    <h3 className="font-bold text-lg">Order #{order.orderId.slice(-6).toUpperCase()}</h3>
                    <p className="text-sm text-mute">
                      Customer: {order.order.user.name} ({order.order.user.phone})
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                      ${order.status === 'pending' ? 'bg-saffron/20 text-saffron' : 'bg-sage text-leaf'}`}>
                      {order.status}
                    </span>
                    {order.status === 'pending' && (
                      <button 
                        onClick={() => updateStatus.mutate({ id: order.id, status: "confirmed" })}
                        className="btn btn-l btn-sm"
                      >
                        Mark Confirmed
                      </button>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-2 mb-4">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Package size={16} className="text-mute" /> {item.name} (x{item.qty})
                      </span>
                      <span>₹{Number(item.price) * item.qty}</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="bg-sage/30 p-3 rounded-lg flex justify-between items-center font-bold">
                  <span>Total Revenue</span>
                  <span className="flex items-center text-forest text-xl">
                    <IndianRupee size={18} /> 
                    {Number(order.subtotal) + Number(order.delivery)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}