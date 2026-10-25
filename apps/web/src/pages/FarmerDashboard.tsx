// // import { useState } from "react";
// // import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// // import { apiRequest } from "../lib/api";
// // import { Plus, MapPin, Calendar } from "lucide-react";
// // import Layout from "../components/Layout";

// // export default function FarmerDashboard() {
// //   const queryClient = useQueryClient();
// //   const [showForm, setShowForm] = useState(false);
// //   const [formData, setFormData] = useState({ name: "", variety: "", qty: "", price: "", moq: "", grade: "A", location: "", harvestDate: "" });

// //   const { data: crops, isLoading } = useQuery({
// //     queryKey: ["my-crops"],
// //     queryFn: () => apiRequest<any[]>("/crops/mine"),
// //   });

// //   const addCrop = useMutation({
// //     mutationFn: (newCrop: any) => apiRequest("/crops", { method: "POST", body: JSON.stringify(newCrop) }),
// //     onSuccess: () => {
// //       queryClient.invalidateQueries({ queryKey: ["my-crops"] });
// //       setShowForm(false);
// //       setFormData({ name: "", variety: "", qty: "", price: "", moq: "", grade: "A", location: "", harvestDate: "" });
// //       alert("Crop published successfully!");
// //     },
// //     onError: (err: any) => alert(err.message)
// //   });

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     addCrop.mutate({
// //       ...formData,
// //       qty: Number(formData.qty),
// //       price: Number(formData.price),
// //       moq: Number(formData.moq),
// //     });
// //   };

// //   return (
// //     <Layout>
// //       <div className="flex justify-between items-center mb-6">
// //         <div>
// //           <h2 className="text-3xl font-display mb-1">My Crop Listings</h2>
// //           <p className="text-mute text-sm">Manage your produce and reach local buyers.</p>
// //         </div>
// //         <button onClick={() => setShowForm(!showForm)} className="btn btn-s">
// //           <Plus size={18} /> Add Listing
// //         </button>
// //       </div>

// //       {showForm && (
// //         <form onSubmit={handleSubmit} className="card mb-6 bg-sage/20 border-leaf/30">
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// //             <div>
// //               <label className="block text-sm font-bold mb-1">Crop Name</label>
// //               <input required type="text" className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Tomato" />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-bold mb-1">Variety</label>
// //               <input required type="text" className="input-field" value={formData.variety} onChange={e => setFormData({...formData, variety: e.target.value})} placeholder="e.g. Hybrid" />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-bold mb-1">Quantity (kg)</label>
// //               <input required type="number" className="input-field" value={formData.qty} onChange={e => setFormData({...formData, qty: e.target.value})} />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-bold mb-1">Asking Price (₹/kg)</label>
// //               <input required type="number" className="input-field" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-bold mb-1">Minimum Order (kg)</label>
// //               <input required type="number" className="input-field" value={formData.moq} onChange={e => setFormData({...formData, moq: e.target.value})} />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-bold mb-1">Grade</label>
// //               <select className="input-field" value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})}>
// //                 <option>A</option><option>B</option><option>C</option>
// //               </select>
// //             </div>
// //             <div>
// //               <label className="block text-sm font-bold mb-1">Location</label>
// //               <input required type="text" className="input-field" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="e.g. Chittoor" />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-bold mb-1">Harvest Date</label>
// //               <input required type="date" className="input-field" value={formData.harvestDate} onChange={e => setFormData({...formData, harvestDate: e.target.value})} />
// //             </div>
// //           </div>
// //           <div className="flex justify-end gap-2">
// //             <button type="button" onClick={() => setShowForm(false)} className="btn btn-l">Cancel</button>
// //             <button type="submit" disabled={addCrop.isPending} className="btn btn-d">
// //               {addCrop.isPending ? "Publishing..." : "Publish Crop"}
// //             </button>
// //           </div>
// //         </form>
// //       )}

// //       {isLoading ? (
// //         <div className="text-center py-10 text-mute">Loading crops...</div>
// //       ) : crops?.length === 0 ? (
// //         <div className="card text-center py-12 text-mute">
// //           You have no active crop listings. Add one above to start selling!
// //         </div>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //           {crops?.map((crop) => (
// //             <div key={crop.id} className="card">
// //               <div className="h-20 bg-gradient-to-br from-[#ffe3c4] to-[#f6b98a] rounded-xl mb-4 flex items-center justify-center text-4xl">
// //                 🌱
// //               </div>
// //               <div className="flex justify-between items-start mb-2">
// //                 <div>
// //                   <h3 className="font-bold text-lg leading-tight">{crop.name}</h3>
// //                   <p className="text-xs text-mute">{crop.variety}</p>
// //                 </div>
// //                 <span className="pill">Grade {crop.grade}</span>
// //               </div>
// //               <div className="space-y-1 text-sm text-mute mb-4">
// //                 <p className="flex items-center gap-1"><MapPin size={14}/> {crop.location}</p>
// //                 <p className="flex items-center gap-1"><Calendar size={14}/> {new Date(crop.harvestDate).toLocaleDateString()}</p>
// //               </div>
// //               <div className="flex justify-between items-center pt-3 border-t border-line">
// //                 <div>
// //                   <div className="font-bold text-forest text-xl">₹{Number(crop.price)}<span className="text-xs text-mute font-normal">/kg</span></div>
// //                   <div className="text-xs text-mute">{Number(crop.qty)} kg available</div>
// //                 </div>
// //                 <span className="pill">Active</span>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </Layout>

// //   );
// // }

// import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { apiRequest } from "../lib/api";
// import { Plus, MapPin, Calendar } from "lucide-react";
// import Layout from "../components/Layout";

// export default function FarmerDashboard() {
//   const queryClient = useQueryClient();
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({ 
//     name: "", 
//     variety: "", 
//     qty: "", 
//     price: "", 
//     moq: "", 
//     grade: "A", 
//     location: "", 
//     harvestDate: "",
//     imageUrl: "" 
//   });

//   const { data: crops, isLoading } = useQuery({
//     queryKey: ["my-crops"],
//     queryFn: () => apiRequest<any[]>("/crops/mine"),
//   });

//   const addCrop = useMutation({
//     mutationFn: (newCrop: any) => apiRequest("/crops", { method: "POST", body: JSON.stringify(newCrop) }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["my-crops"] });
//       setShowForm(false);
//       setFormData({ name: "", variety: "", qty: "", price: "", moq: "", grade: "A", location: "", harvestDate: "", imageUrl: "" });
//       alert("Crop published successfully!");
//     },
//     onError: (err: any) => alert(err.message)
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     addCrop.mutate({
//       ...formData,
//       qty: Number(formData.qty),
//       price: Number(formData.price),
//       moq: Number(formData.moq),
//       imageUrl: formData.imageUrl.trim() === "" ? undefined : formData.imageUrl
//     });
//   };

//   return (
//     <div>
//         <Layout>
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-3xl font-display mb-1">My Crop Listings</h2>
//           <p className="text-mute text-sm">Manage your produce and reach local buyers.</p>
//         </div>
//         <button onClick={() => setShowForm(!showForm)} className="btn btn-s">
//           <Plus size={18} /> Add Listing
//         </button>
//       </div>

//       {showForm && (
//         <form onSubmit={handleSubmit} className="card mb-6 bg-sage/20 border-leaf/30">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="block text-sm font-bold mb-1">Crop Name</label>
//               <input required type="text" className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Tomato" />
//             </div>
//             <div>
//               <label className="block text-sm font-bold mb-1">Variety</label>
//               <input required type="text" className="input-field" value={formData.variety} onChange={e => setFormData({...formData, variety: e.target.value})} placeholder="e.g. Hybrid" />
//             </div>
//             <div>
//               <label className="block text-sm font-bold mb-1">Quantity (kg)</label>
//               <input required type="number" className="input-field" value={formData.qty} onChange={e => setFormData({...formData, qty: e.target.value})} />
//             </div>
//             <div>
//               <label className="block text-sm font-bold mb-1">Asking Price (₹/kg)</label>
//               <input required type="number" className="input-field" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
//             </div>
//             <div>
//               <label className="block text-sm font-bold mb-1">Minimum Order (kg)</label>
//               <input required type="number" className="input-field" value={formData.moq} onChange={e => setFormData({...formData, moq: e.target.value})} />
//             </div>
//             <div>
//               <label className="block text-sm font-bold mb-1">Grade</label>
//               <select className="input-field" value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})}>
//                 <option>A</option><option>B</option><option>C</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-bold mb-1">Location</label>
//               <input required type="text" className="input-field" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="e.g. Chittoor" />
//             </div>
//             <div>
//               <label className="block text-sm font-bold mb-1">Harvest Date</label>
//               <input required type="date" className="input-field" value={formData.harvestDate} onChange={e => setFormData({...formData, harvestDate: e.target.value})} />
//             </div>
//             {/* Image URL Input */}
//             <div className="md:col-span-2">
//               <label className="block text-sm font-bold mb-1">Image URL (Optional)</label>
//               <input type="url" className="input-field" placeholder="https://images.unsplash.com/photo-..." value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
//               <p className="text-xs text-mute mt-1">Paste a link to a photo of your crop. Leave blank for default emoji.</p>
//             </div>
//           </div>
//           <div className="flex justify-end gap-2">
//             <button type="button" onClick={() => setShowForm(false)} className="btn btn-l">Cancel</button>
//             <button type="submit" disabled={addCrop.isPending} className="btn btn-d">
//               {addCrop.isPending ? "Publishing..." : "Publish Crop"}
//             </button>
//           </div>
//         </form>
//       )}

//       {isLoading ? (
//         <div className="text-center py-10 text-mute">Loading crops...</div>
//       ) : crops?.length === 0 ? (
//         <div className="card text-center py-12 text-mute">
//           You have no active crop listings. Add one above to start selling!
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {crops?.map((crop) => (
//             <div key={crop.id} className="card">
//               <div className="h-32 rounded-xl mb-4 overflow-hidden bg-[#ffe3c4] flex items-center justify-center">
//                 {crop.imageUrl ? (
//                   <img src={crop.imageUrl} alt={crop.name} className="w-full h-full object-cover" />
//                 ) : (
//                   <span className="text-4xl">🌱</span>
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
//                 <p className="flex items-center gap-1"><Calendar size={14}/> {new Date(crop.harvestDate).toLocaleDateString()}</p>
//               </div>
//               <div className="flex justify-between items-center pt-3 border-t border-line">
//                 <div>
//                   <div className="font-bold text-forest text-xl">₹{Number(crop.price)}<span className="text-xs text-mute font-normal">/kg</span></div>
//                   <div className="text-xs text-mute">{Number(crop.qty)} kg available</div>
//                 </div>
//                 <span className="pill">Active</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       </Layout>
//     </div>
//   );
// }

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import Layout from "../components/Layout";
import { Plus, MapPin, Calendar } from "lucide-react";

export default function FarmerDashboard() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", variety: "", qty: "", price: "", moq: "", grade: "A", 
    location: "", harvestDate: "", imageUrl: "" 
  });

  const { data: crops, isLoading } = useQuery({
    queryKey: ["my-crops"],
    queryFn: () => apiRequest<any[]>("/crops/mine"),
  });

  const addCrop = useMutation({
    mutationFn: (newCrop: any) => apiRequest("/crops", { method: "POST", body: JSON.stringify(newCrop) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-crops"] });
      setShowForm(false);
      setFormData({ name: "", variety: "", qty: "", price: "", moq: "", grade: "A", location: "", harvestDate: "", imageUrl: "" });
      alert("Crop published successfully!");
    },
    onError: (err: any) => alert(err.message)
  });

  const toggleStatus = useMutation({
    mutationFn: (cropId: string) => apiRequest(`/crops/${cropId}/toggle`, { method: "PATCH" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-crops"] });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCrop.mutate({
      ...formData,
      qty: Number(formData.qty),
      price: Number(formData.price),
      moq: Number(formData.moq),
      imageUrl: formData.imageUrl.trim() === "" ? undefined : formData.imageUrl
    });
  };

  // Helper for pretty gradient tiles based on crop name
  const getTile = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('tomato')) return { class: "t1", emoji: "🍅" };
    if (n.includes('paddy') || n.includes('rice')) return { class: "t5", emoji: "🌾" };
    if (n.includes('onion')) return { class: "t4", emoji: "🧅" };
    if (n.includes('potato')) return { class: "t1", emoji: "🥔" };
    if (n.includes('mango')) return { class: "t2", emoji: "🥭" };
    return { class: "t2", emoji: "🌱" };
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-display mb-1 text-forest">My crop listings</h2>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-s">
          <Plus size={18} /> Add listing
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card mb-6 bg-sage/20 border-leaf/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold mb-1">Crop Name</label>
              <input required type="text" className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Tomato" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Variety</label>
              <input required type="text" className="input-field" value={formData.variety} onChange={e => setFormData({...formData, variety: e.target.value})} placeholder="e.g. Hybrid" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Quantity (kg)</label>
              <input required type="number" className="input-field" value={formData.qty} onChange={e => setFormData({...formData, qty: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Asking Price (₹/kg)</label>
              <input required type="number" className="input-field" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Minimum Order (kg)</label>
              <input required type="number" className="input-field" value={formData.moq} onChange={e => setFormData({...formData, moq: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Grade</label>
              <select className="input-field" value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})}>
                <option>A</option><option>B</option><option>C</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Location</label>
              <input required type="text" className="input-field" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="e.g. Chittoor" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Harvest Date</label>
              <input required type="date" className="input-field" value={formData.harvestDate} onChange={e => setFormData({...formData, harvestDate: e.target.value})} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold mb-1">Image URL (Optional)</label>
              <input type="url" className="input-field" placeholder="https://..." value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowForm(false)} className="btn btn-l">Cancel</button>
            <button type="submit" disabled={addCrop.isPending} className="btn btn-d">
              {addCrop.isPending ? "Publishing..." : "Publish Crop"}
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="text-center py-10 text-mute">Loading crops...</div>
      ) : crops?.length === 0 ? (
        <div className="card text-center py-12 text-mute">
          You have no active crop listings. Add one above to start selling!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {crops?.map((crop) => {
            const tile = getTile(crop.name);
            return (
              <div key={crop.id} className="card flex flex-col">
                {/* Gradient Tile */}
                <div className={`tile ${tile.class}`}>
                  {crop.imageUrl ? (
                    <img src={crop.imageUrl} alt={crop.name} className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    tile.emoji
                  )}
                </div>

                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-forest leading-tight">{crop.name} · {crop.variety}</h3>
                  {crop.active ? (
                    <span className="pill">Active</span>
                  ) : (
                    <span className="pill n">Inactive</span>
                  )}
                </div>
                
                <div className="text-sm text-mute mb-4">
                  <p>{Number(crop.qty).toLocaleString()} {crop.unit} · ₹{Number(crop.price)}/{crop.unit} · MOQ {Number(crop.moq)}</p>
                  <p className="flex items-center gap-1 mt-1"><MapPin size={14}/> {crop.location} · Grade {crop.grade} · Harvest {new Date(crop.harvestDate).toLocaleDateString()}</p>
                </div>

                <button 
                  onClick={() => toggleStatus.mutate(crop.id)}
                  className={`btn ${crop.active ? 'btn-l' : 'btn-d'} btn-sm mt-auto`}
                >
                  {crop.active ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}