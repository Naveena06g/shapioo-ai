// // import { useState } from "react";
// // import { useQuery, useMutation } from "@tanstack/react-query";
// // import { apiRequest } from "../lib/api";
// // import { MapPin, Calendar } from "lucide-react";
// // import Layout from "../components/Layout";

// // export default function Market() {
// //   const [selectedCrop, setSelectedCrop] = useState<any>(null);
// //   const [offerQty, setOfferQty] = useState("");
// //   const [offerPrice, setOfferPrice] = useState("");

// //   const { data: crops, isLoading } = useQuery({
// //     queryKey: ["crops"],
// //     queryFn: () => apiRequest<any[]>("/crops"),
// //   });

// //   const makeOffer = useMutation({
// //     mutationFn: () => apiRequest(`/offers/${selectedCrop.id}`, { 
// //       method: "POST", 
// //       body: JSON.stringify({ qty: Number(offerQty), price: Number(offerPrice) }) 
// //     }),
// //     onSuccess: () => {
// //       alert("Offer sent to farmer! 🤝");
// //       setSelectedCrop(null);
// //       setOfferQty("");
// //       setOfferPrice("");
// //     },
// //     onError: (err: any) => alert(err.message),
// //   });

// //   return (
// //     <Layout>
// //       <div className="mb-6">
// //         <h2 className="text-3xl font-display mb-1">Farmer Market</h2>
// //         <p className="text-mute text-sm">Browse crops and submit your bulk purchase offers.</p>
// //       </div>

// //       {isLoading ? (
// //         <div className="text-center py-10 text-mute">Loading crops...</div>
// //       ) : crops?.length === 0 ? (
// //         <div className="card text-center py-12 text-mute">No crop listings yet.</div>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //           {crops?.map((crop) => (
// //             <div key={crop.id} className="card hover:shadow-lg transition-shadow">
// //               <div className="h-24 bg-gradient-to-br from-[#ffe3c4] to-[#f6b98a] rounded-xl mb-4 flex items-center justify-center text-5xl">🍅</div>
// //               <div className="flex justify-between items-start mb-2">
// //                 <div>
// //                   <h3 className="font-bold text-lg leading-tight">{crop.name}</h3>
// //                   <p className="text-xs text-mute">{crop.variety}</p>
// //                 </div>
// //                 <span className="pill">Grade {crop.grade}</span>
// //               </div>
// //               <div className="space-y-1 text-sm text-mute mb-4">
// //                 <p className="flex items-center gap-1"><MapPin size={14}/> {crop.location}</p>
// //                 <p className="flex items-center gap-1"><Calendar size={14}/> Harvested: {new Date(crop.harvestDate).toLocaleDateString()}</p>
// //                 <p className="font-medium text-ink mt-2">Farmer: {crop.farmer.name}</p>
// //               </div>
// //               <div className="flex justify-between items-center pt-3 border-t border-line">
// //                 <div className="font-bold text-forest text-xl">
// //                   ₹{Number(crop.price)}<span className="text-xs text-mute font-normal">/{crop.unit}</span>
// //                 </div>
// //                 <button onClick={() => setSelectedCrop(crop)} className="btn btn-d btn-sm">Make Offer</button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* Offer Modal */}
// //       {selectedCrop && (
// //         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
// //           <div className="bg-paper rounded-2xl p-6 w-full max-w-sm">
// //             <h3 className="text-xl font-bold mb-2">Offer for {selectedCrop.name}</h3>
// //             <p className="text-sm text-mute mb-4">Asking price: ₹{Number(selectedCrop.price)}/{selectedCrop.unit}</p>
            
// //             <form onSubmit={(e) => { e.preventDefault(); makeOffer.mutate(); }}>
// //               <div className="mb-4">
// //                 <label className="block text-sm font-bold mb-1">Quantity ({selectedCrop.unit})</label>
// //                 <input required type="number" className="input-field" value={offerQty} onChange={e => setOfferQty(e.target.value)} placeholder={`Min: ${selectedCrop.moq}`} />
// //               </div>
// //               <div className="mb-6">
// //                 <label className="block text-sm font-bold mb-1">Your Price (₹)</label>
// //                 <input required type="number" className="input-field" value={offerPrice} onChange={e => setOfferPrice(e.target.value)} />
// //               </div>
// //               <div className="flex gap-2">
// //                 <button type="button" onClick={() => setSelectedCrop(null)} className="btn btn-l flex-1">Cancel</button>
// //                 <button type="submit" disabled={makeOffer.isPending} className="btn btn-d flex-1">
// //                   {makeOffer.isPending ? "Sending..." : "Send Offer"}
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </Layout>
// //   );
// // }

// import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { apiRequest } from "../lib/api";
// import { MapPin, Calendar } from "lucide-react";
// import Layout from "../components/Layout";

// export default function Market() {
//   const queryClient = useQueryClient();
//   const [selectedCrop, setSelectedCrop] = useState<any>(null);
//   const [offerQty, setOfferQty] = useState("");
//   const [offerPrice, setOfferPrice] = useState("");

//   const { data: crops, isLoading } = useQuery({
//     queryKey: ["crops"],
//     queryFn: () => apiRequest<any[]>("/crops"),
//   });

//   const makeOffer = useMutation({
//     mutationFn: () => apiRequest(`/offers/${selectedCrop.id}`, { 
//       method: "POST", 
//       body: JSON.stringify({ qty: Number(offerQty), price: Number(offerPrice) }) 
//     }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["crops"] });
//       alert("Offer sent to farmer! 🤝");
//       setSelectedCrop(null);
//       setOfferQty("");
//       setOfferPrice("");
//     },
//     onError: (err: any) => alert(err.message),
//   });

//   return (
//     <Layout>
//       <div className="mb-6">
//         <h2 className="text-3xl font-display mb-1">Farmer Market</h2>
//         <p className="text-mute text-sm">Browse crops and submit your bulk purchase offers.</p>
//       </div>

//       {isLoading ? (
//         <div className="text-center py-10 text-mute">Loading crops...</div>
//       ) : crops?.length === 0 ? (
//         <div className="card text-center py-12 text-mute">No crop listings yet.</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {crops?.map((crop) => (
//             <div key={crop.id} className="card hover:shadow-lg transition-shadow">
//               {/* Dynamic Image Display */}
//               <div className="h-32 rounded-xl mb-4 overflow-hidden bg-[#ffe3c4] flex items-center justify-center">
//                 {crop.imageUrl ? (
//                   <img src={crop.imageUrl} alt={crop.name} className="w-full h-full object-cover" />
//                 ) : (
//                   <span className="text-4xl">🍅</span>
//                 )}
//               </div>
//               <div className="flex justify-between items-start mb-2">
//                 <div>
//                   <h3 className="font-bold text-lg leading-tight">{crop.name}</h3>
//                   <p className="text-xs text-mute">{crop.variety}</p>
//                 </div>
//                 <span className="pill">Grade {crop.grade}</span>
//               </div>
//               <div className="space-y-1 text-sm text-mute mb-4">
//                 <p className="flex items-center gap-1"><MapPin size={14}/> {crop.location}</p>
//                 <p className="flex items-center gap-1"><Calendar size={14}/> Harvested: {new Date(crop.harvestDate).toLocaleDateString()}</p>
//                 <p className="font-medium text-ink mt-2">Farmer: {crop.farmer.name}</p>
//               </div>
//               <div className="flex justify-between items-center pt-3 border-t border-line">
//                 <div className="font-bold text-forest text-xl">
//                   ₹{Number(crop.price)}<span className="text-xs text-mute font-normal">/{crop.unit}</span>
//                 </div>
//                 <button onClick={() => setSelectedCrop(crop)} className="btn btn-d btn-sm">Make Offer</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Offer Modal */}
//       {selectedCrop && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-paper rounded-2xl p-6 w-full max-w-sm animate-rise">
//             <h3 className="text-xl font-bold mb-2">Offer for {selectedCrop.name}</h3>
//             <p className="text-sm text-mute mb-4">Asking price: ₹{Number(selectedCrop.price)}/{selectedCrop.unit}</p>
            
//             <form onSubmit={(e) => { e.preventDefault(); makeOffer.mutate(); }}>
//               <div className="mb-4">
//                 <label className="block text-sm font-bold mb-1">Quantity ({selectedCrop.unit})</label>
//                 <input required type="number" className="input-field" value={offerQty} onChange={e => setOfferQty(e.target.value)} placeholder={`Min: ${selectedCrop.moq}`} />
//               </div>
//               <div className="mb-6">
//                 <label className="block text-sm font-bold mb-1">Your Price (₹)</label>
//                 <input required type="number" className="input-field" value={offerPrice} onChange={e => setOfferPrice(e.target.value)} />
//               </div>
//               <div className="flex gap-2">
//                 <button type="button" onClick={() => setSelectedCrop(null)} className="btn btn-l flex-1">Cancel</button>
//                 <button type="submit" disabled={makeOffer.isPending} className="btn btn-d flex-1">
//                   {makeOffer.isPending ? "Sending..." : "Send Offer"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </Layout>
//   );
// }

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import { MapPin, Calendar } from "lucide-react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

export default function Market() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedCrop, setSelectedCrop] = useState<any>(null);
  const [offerQty, setOfferQty] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const { data: crops, isLoading } = useQuery({
    queryKey: ["crops"],
    queryFn: () => apiRequest<any[]>("/crops"),
  });

  const makeOffer = useMutation({
    mutationFn: () => apiRequest(`/offers/${selectedCrop.id}`, { 
      method: "POST", 
      body: JSON.stringify({ qty: Number(offerQty), price: Number(offerPrice) }) 
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crops"] });
      alert("Offer sent to farmer! 🤝");
      setSelectedCrop(null);
      setOfferQty("");
      setOfferPrice("");
    },
    onError: (err: any) => alert(err.message),
  });

  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-3xl font-display mb-1">Farmer Market</h2>
        <p className="text-mute text-sm">Official mandi prices should be read from Agmarknet; the asking prices below are farmer-set.</p>
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-mute">Loading crops...</div>
      ) : crops?.length === 0 ? (
        <div className="card text-center py-12 text-mute">
          No crop listings yet. Register as a Farmer to add your first crop.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {crops?.map((crop) => (
            <div key={crop.id} className="card hover:shadow-lg transition-shadow">
              
              {/* Crop Image or Emoji */}
              <div className="h-32 rounded-xl mb-4 overflow-hidden bg-[#ffe3c4] flex items-center justify-center relative">
                {crop.imageUrl ? (
                  <img src={crop.imageUrl} alt={crop.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl">🌱</span>
                )}
                <span className="absolute top-2 right-2 pill">Grade {crop.grade}</span>
              </div>

              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg leading-tight">{crop.name}</h3>
                  <p className="text-xs text-mute">{crop.variety}</p>
                </div>
              </div>
              
              <div className="space-y-1 text-sm text-mute mb-4">
                <p className="flex items-center gap-1"><MapPin size={14}/> {crop.location}</p>
                <p className="flex items-center gap-1"><Calendar size={14}/> Harvested: {new Date(crop.harvestDate).toLocaleDateString()}</p>
                <p className="font-medium text-ink mt-2">Farmer: {crop.farmer.name}</p>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-line">
                <div className="font-bold text-forest text-xl">
                  ₹{Number(crop.price)}<span className="text-xs text-mute font-normal">/{crop.unit}</span>
                </div>
                
                {/* Only Traders can make offers */}
                {user?.role === "trader" ? (
                  <button onClick={() => setSelectedCrop(crop)} className="btn btn-d btn-sm">
                    Make Offer
                  </button>
                ) : (
                  <span className="pill n text-[10px]">Traders only</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Offer Modal */}
      {selectedCrop && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-paper rounded-2xl p-6 w-full max-w-sm animate-rise shadow-2xl">
            <h3 className="text-xl font-bold mb-2">Offer for {selectedCrop.name}</h3>
            <p className="text-sm text-mute mb-4">
              Asking price: ₹{Number(selectedCrop.price)}/{selectedCrop.unit} · MOQ {Number(selectedCrop.moq)}
            </p>
            
            <form onSubmit={(e) => { e.preventDefault(); makeOffer.mutate(); }}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Quantity ({selectedCrop.unit})</label>
                <input required type="number" className="input-field" value={offerQty} onChange={e => setOfferQty(e.target.value)} placeholder={`Min: ${selectedCrop.moq}`} />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-bold mb-1">Your Price (₹)</label>
                <input required type="number" className="input-field" value={offerPrice} onChange={e => setOfferPrice(e.target.value)} />
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setSelectedCrop(null)} className="btn btn-l flex-1">Cancel</button>
                <button type="submit" disabled={makeOffer.isPending} className="btn btn-d flex-1">
                  {makeOffer.isPending ? "Sending..." : "Send Offer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}