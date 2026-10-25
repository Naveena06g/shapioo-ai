// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { apiRequest } from "../lib/api";
// import Layout from "../components/Layout";
// import { Package, CheckCircle, XCircle } from "lucide-react";

// export default function FarmerOffers() {
//   const queryClient = useQueryClient();

//   const { data: offers, isLoading } = useQuery({
//     queryKey: ["farmer-offers"],
//     queryFn: () => apiRequest<any[]>("/offers"),
//   });

//   const updateStatus = useMutation({
//     mutationFn: ({ id, status }: { id: string; status: string }) => 
//       apiRequest(`/offers/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["farmer-offers"] });
//       alert("Offer updated!");
//     },
//     onError: (err: any) => alert(err.message)
//   });

//   return (
//     <Layout>
//       <div className="mb-6">
//         <h2 className="text-3xl font-display mb-1">Incoming Offers</h2>
//         <p className="text-mute text-sm">Review offers from traders on your crops.</p>
//       </div>

//       {isLoading ? (
//         <div className="text-center py-10 text-mute">Loading offers...</div>
//       ) : offers?.length === 0 ? (
//         <div className="card text-center py-12 text-mute">
//           No offers yet. Once you list crops, traders can make offers here.
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 gap-4">
//           {offers?.map((offer) => (
//             <div key={offer.id} className="card flex flex-col md:flex-row justify-between items-center gap-4">
//               <div>
//                 <div className="flex items-center gap-2 mb-1">
//                   <h3 className="font-bold text-lg">{offer.crop.name}</h3>
//                   <span className={`pill ${offer.status === 'pending' ? 'y' : offer.status === 'accepted' ? '' : 'r'}`}>
//                     {offer.status.toUpperCase()}
//                   </span>
//                 </div>
//                 <p className="text-sm text-mute">
//                   From: <span className="font-medium text-ink">{offer.trader.name}</span> ({offer.trader.phone})
//                 </p>
//                 <div className="flex gap-4 mt-2 text-sm">
//                   <span className="flex items-center gap-1"><Package size={16}/> {Number(offer.qty)} {offer.crop.unit}</span>
//                   <span className="font-bold text-forest">₹{Number(offer.price)} / {offer.crop.unit}</span>
//                 </div>
//               </div>

//               {offer.status === "pending" && (
//                 <div className="flex gap-2 w-full md:w-auto">
//                   <button 
//                     onClick={() => updateStatus.mutate({ id: offer.id, status: "rejected" })}
//                     className="btn btn-r btn-sm flex-1 flex items-center justify-center gap-1"
//                   >
//                     <XCircle size={16} /> Reject
//                   </button>
//                   <button 
//                     onClick={() => updateStatus.mutate({ id: offer.id, status: "accepted" })}
//                     className="btn btn-d btn-sm flex-1 flex items-center justify-center gap-1"
//                   >
//                     <CheckCircle size={16} /> Accept
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </Layout>
//   );
// }

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import Layout from "../components/Layout";
import { CheckCircle, XCircle } from "lucide-react";

export default function FarmerOffers() {
  const queryClient = useQueryClient();
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [counterPrice, setCounterPrice] = useState("");

  // 1. Fetch Offers
  const { data: offers, isLoading } = useQuery({
    queryKey: ["farmer-offers"],
    queryFn: () => apiRequest<any[]>("/offers"),
  });

  // 2. Fetch Bulk Orders
  const { data: bulkOrders } = useQuery({
    queryKey: ["farmer-bulk-orders"],
    queryFn: () => apiRequest<any[]>("/offers/farmer-bulk"),
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      apiRequest(`/offers/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["farmer-offers"] });
      alert("Offer updated!");
    },
    onError: (err: any) => alert(err.message)
  });

  const makeCounter = useMutation({
    mutationFn: ({ id, price }: { id: string; price: number }) => 
      apiRequest(`/offers/${id}/counter`, { method: "POST", body: JSON.stringify({ price }) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["farmer-offers"] });
      alert("Counter offer sent!");
      setSelectedOffer(null);
      setCounterPrice("");
    },
    onError: (err: any) => alert(err.message)
  });

  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-3xl font-display mb-1">Offers on my crops</h2>
        <p className="text-mute text-sm">Accept, counter or reject. Accepting reserves stock for the buyer.</p>
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-mute">Loading offers...</div>
      ) : offers?.length === 0 ? (
        <div className="card text-center py-12 text-mute">
          No offers yet. Once you list crops, traders can make offers here.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {offers?.map((offer) => (
            <div key={offer.id} className="card flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg">
                    {offer.trader.name} wants <span className="text-leaf">{Number(offer.qty).toLocaleString()} {offer.crop.unit}</span> of {offer.crop.name}
                  </h3>
                  <span className={`pill ${
                    offer.status === 'pending' ? 'y' : 
                    offer.status === 'accepted' ? '' : 'r'
                  }`}>
                    {offer.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-mute">
                  Offered ₹{Number(offer.price)}/{offer.crop.unit} (your ask ₹{Number(offer.crop.price)}) · Total ₹{(Number(offer.qty) * Number(offer.price)).toLocaleString()}
                </p>
              </div>

              <div className="flex-shrink-0 flex flex-col gap-2 w-full md:w-auto">
                {offer.status === 'pending' && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => updateStatus.mutate({ id: offer.id, status: "accepted" })}
                      className="btn btn-d btn-sm"
                    >
                      Accept
                    </button>
                    <button 
                      onClick={() => { setSelectedOffer(offer); setCounterPrice(String(offer.crop.price)); }}
                      className="btn btn-l btn-sm"
                    >
                      Counter
                    </button>
                    <button 
                      onClick={() => updateStatus.mutate({ id: offer.id, status: "rejected" })}
                      className="btn btn-r btn-sm"
                    >
                      Reject
                    </button>
                  </div>
                )}
                {offer.status === 'rejected' && <span className="text-tomato text-sm font-bold flex items-center gap-1"><XCircle size={16}/> Rejected</span>}
                {offer.status === 'accepted' && <span className="text-leaf text-sm font-bold flex items-center gap-1"><CheckCircle size={16}/> Accepted</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Orders Section (Matches HTML exactly) */}
      <h3 className="text-xl font-bold mt-8 mb-4">Orders</h3>
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

      {/* Counter Offer Modal */}
      {selectedOffer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-paper rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-xl font-bold mb-2">Counter Offer</h3>
            <p className="text-sm text-mute mb-4">Send a new price back to the trader.</p>
            
            <form onSubmit={(e) => { e.preventDefault(); makeCounter.mutate({ id: selectedOffer.id, price: Number(counterPrice) }); }}>
              <div className="mb-6">
                <label className="block text-sm font-bold mb-1">Your Counter Price (₹/{selectedOffer.crop.unit})</label>
                <input required type="number" className="input-field" value={counterPrice} onChange={e => setCounterPrice(e.target.value)} />
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setSelectedOffer(null)} className="btn btn-l flex-1">Cancel</button>
                <button type="submit" disabled={makeCounter.isPending} className="btn btn-d flex-1">
                  {makeCounter.isPending ? "Sending..." : "Send Counter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}