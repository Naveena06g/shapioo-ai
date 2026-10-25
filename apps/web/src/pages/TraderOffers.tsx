// import { useQuery } from "@tanstack/react-query";
// import { apiRequest } from "../lib/api";
// import Layout from "../components/Layout";
// import { Package, Clock, CheckCircle, XCircle } from "lucide-react";

// export default function TraderOffers() {
//   const { data: offers, isLoading } = useQuery({
//     queryKey: ["trader-offers"],
//     queryFn: () => apiRequest<any[]>("/offers/mine"),
//   });

//   return (
//     <Layout>
//       <div className="mb-6">
//         <h2 className="text-3xl font-display mb-1">My Offers</h2>
//         <p className="text-mute text-sm">Track the status of offers you've sent to farmers.</p>
//       </div>

//       {isLoading ? (
//         <div className="text-center py-10 text-mute">Loading offers...</div>
//       ) : !offers || offers.length === 0 ? (
//         <div className="card text-center py-12 text-mute">
//           You haven't sent any offers yet. Go to the Farm Market to browse crops.
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 gap-4">
//           {offers.map((offer) => (
//             <div key={offer.id} className="card flex flex-col md:flex-row justify-between items-center gap-4">
//               <div>
//                 <div className="flex items-center gap-2 mb-1">
//                   <h3 className="font-bold text-lg">{offer.crop.name}</h3>
//                   <span className={`pill ${
//                     offer.status === 'pending' ? 'y' : 
//                     offer.status === 'accepted' ? '' : 'r'
//                   }`}>
//                     {offer.status.toUpperCase()}
//                   </span>
//                 </div>
//                 <p className="text-sm text-mute">
//                   Farmer: <span className="font-medium text-ink">{offer.crop.farmer.name}</span> ({offer.crop.farmer.phone})
//                 </p>
//                 <div className="flex gap-4 mt-2 text-sm">
//                   <span className="flex items-center gap-1">
//                     <Package size={16}/> {Number(offer.qty)} {offer.crop.unit}
//                   </span>
//                   <span className="font-bold text-forest">₹{Number(offer.price)} / {offer.crop.unit}</span>
//                 </div>
//               </div>

//               {/* Status Icon */}
//               <div className="flex-shrink-0">
//                 {offer.status === 'pending' && <Clock className="text-saffron" size={32} />}
//                 {offer.status === 'accepted' && <CheckCircle className="text-leaf" size={32} />}
//                 {offer.status === 'rejected' && <XCircle className="text-tomato" size={32} />}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </Layout>
//   );
// }

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import Layout from "../components/Layout";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";

export default function TraderOffers() {
  const queryClient = useQueryClient();

  const { data: offers, isLoading } = useQuery({
    queryKey: ["trader-offers"],
    queryFn: () => apiRequest<any[]>("/offers/mine"),
  });

  const { data: bulkOrders } = useQuery({
    queryKey: ["bulk-orders"],
    queryFn: () => apiRequest<any[]>("/offers/bulk"),
  });

  const confirmOrder = useMutation({
    mutationFn: (offerId: string) => apiRequest(`/offers/${offerId}/confirm`, { method: "POST" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trader-offers"] });
      queryClient.invalidateQueries({ queryKey: ["bulk-orders"] });
      alert("Order confirmed! Stock has been reserved.");
    },
    onError: (err: any) => alert(err.message),
  });

  const simulateReply = useMutation({
    mutationFn: (offerId: string) => apiRequest(`/offers/${offerId}/simulate`, { method: "POST" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trader-offers"] });
      alert("Simulated farmer reply received!");
    },
  });

  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-3xl font-display mb-1">My offers</h2>
        <p className="text-mute text-sm">Negotiate with farmers and confirm accepted offers.</p>
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-mute">Loading offers...</div>
      ) : !offers || offers.length === 0 ? (
        <div className="card text-center py-12 text-mute">
          You haven't sent any offers yet. Go to "Browse crops" to make an offer.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 mb-8">
          {offers.map((offer) => (
            <div key={offer.id} className="card flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg">{offer.crop.name}</h3>
                  <span className={`pill ${
                    offer.status === 'pending' ? 'y' : 
                    offer.status === 'accepted' ? '' : 'r'
                  }`}>
                    {offer.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-mute">
                  Farmer: <span className="font-medium text-ink">{offer.crop.farmer.name}</span> · Asking ₹{Number(offer.crop.price)}/{offer.crop.unit}
                </p>
                <div className="flex gap-4 mt-2 text-sm">
                  <span className="flex items-center gap-1">
                    <Package size={16}/> {Number(offer.qty).toLocaleString()} {offer.crop.unit}
                  </span>
                  <span className="font-bold text-forest">₹{Number(offer.price)} / {offer.crop.unit}</span>
                </div>
              </div>

              <div className="flex-shrink-0 flex flex-col gap-2 w-full md:w-auto">
                {offer.status === 'pending' && (
                  <button 
                    onClick={() => simulateReply.mutate(offer.id)} 
                    className="btn btn-l btn-sm"
                  >
                    Demo: simulate farmer reply
                  </button>
                )}
                {offer.status === 'accepted' && (
                  <button 
                    onClick={() => confirmOrder.mutate(offer.id)} 
                    className="btn btn-s btn-sm"
                  >
                    Confirm & place order
                  </button>
                )}
                {offer.status === 'rejected' && <span className="text-tomato text-sm font-bold flex items-center gap-1"><XCircle size={16}/> Rejected by Farmer</span>}
                {offer.status === 'ordered' && <span className="text-leaf text-sm font-bold flex items-center gap-1"><CheckCircle size={16}/> Order Placed</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      <h3 className="text-xl font-bold mb-4">Bulk orders</h3>
      {!bulkOrders || bulkOrders.length === 0 ? (
        <p className="text-mute text-sm">No orders yet.</p>
      ) : (
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#f6f0e2] text-xs uppercase text-mute">
              <tr>
                <th className="p-4">Order</th>
                <th className="p-4">Crop</th>
                <th className="p-4">Qty</th>
                <th className="p-4">Rate</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {bulkOrders.map(b => (
                <tr key={b.id} className="border-t border-line">
                  <td className="p-4 font-mono text-xs">#{b.id.slice(-4).toUpperCase()}</td>
                  <td className="p-4 font-bold">{b.cropName}</td>
                  <td className="p-4">{Number(b.qty).toLocaleString()}</td>
                  <td className="p-4">₹{Number(b.price)}</td>
                  <td className="p-4 font-bold">₹{(Number(b.qty) * Number(b.price)).toLocaleString()}</td>
                  <td className="p-4"><span className="pill">{b.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}