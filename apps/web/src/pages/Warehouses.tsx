// import Layout from "../components/Layout";
// import { MapPin } from "lucide-react";

// export default function Warehouses() {
//   const warehouses = [
//     { id: 1, name: "Kisan Cold Storage", loc: "Guntur", free: "1,800 kg", cap: "5,000 kg", price: "₹4", status: "Available" },
//     { id: 2, name: "Sri Sai Godown", loc: "Nizamabad", free: "6,600 kg", cap: "12,000 kg", price: "₹2.5", status: "Available" },
//     { id: 3, name: "Deccan Agri Hub", loc: "Kurnool", free: "400 kg", cap: "8,000 kg", price: "₹3", status: "Almost Full" },
//   ];

//   return (
//     <Layout>
//       <div className="mb-6">
//         <h2 className="text-3xl font-display mb-1">Warehouses & Storage</h2>
//         <p className="text-mute text-sm">Find cold storage or dry storage for your harvest.</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {warehouses.map(w => (
//           <div key={w.id} className="card">
//             <div className="flex justify-between items-start mb-2">
//               <h3 className="font-bold text-lg">{w.name}</h3>
//               <span className={`pill ${w.status === 'Available' ? '' : 'y'}`}>{w.status}</span>
//             </div>
//             <p className="text-sm text-mute flex items-center gap-1 mb-4"><MapPin size={14}/> {w.loc}</p>
            
//             <div className="w-full bg-[#efe9da] rounded-full h-2 mb-2">
//                <div className={`h-2 rounded-full ${w.status === 'Available' ? 'bg-leaf' : 'bg-saffron'}`} style={{ width: '60%' }}></div>
//             </div>
//             <p className="text-xs text-mute mb-4">{w.free} free of {w.cap} · {w.price}/100kg/month</p>
            
//             <button className="btn btn-d btn-sm w-full">Request Space</button>
//           </div>
//         ))}
//       </div>
//     </Layout>
//   );
// }

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import Layout from "../components/Layout";
import { MapPin } from "lucide-react";

export default function Warehouses() {
  const queryClient = useQueryClient();
  const [selectedWh, setSelectedWh] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    cropName: "", qty: "", months: "1", startDate: new Date().toISOString().split('T')[0]
  });

  const { data: warehouses, isLoading } = useQuery({
    queryKey: ["warehouses"],
    queryFn: () => apiRequest<any[]>("/warehouses"),
  });

  const { data: bookings } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: () => apiRequest<any[]>("/warehouses/bookings"),
  });

  const bookSpace = useMutation({
    mutationFn: () => apiRequest(`/warehouses/${selectedWh.id}/book`, { 
      method: "POST", 
      body: JSON.stringify({ 
        cropName: formData.cropName, 
        qty: Number(formData.qty), 
        months: Number(formData.months), 
        startDate: formData.startDate 
      }) 
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["warehouses"] });
      queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
      alert("Booking confirmed!");
      setSelectedWh(null);
      setFormData({ cropName: "", qty: "", months: "1", startDate: new Date().toISOString().split('T')[0] });
    },
    onError: (err: any) => alert(err.message)
  });

  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-3xl font-display mb-1">Warehouses & Storage</h2>
        <p className="text-mute text-sm">Capacity is checked on every booking.</p>
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-mute">Loading warehouses...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {warehouses?.map((w) => {
            const free = Number(w.capacity) - Number(w.used);
            const percent = Math.round((Number(w.used) / Number(w.capacity)) * 100);
            return (
              <div key={w.id} className="card">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{w.name}</h3>
                  <span className={`pill ${percent > 90 ? 'r' : ''}`}>{percent > 90 ? 'Almost full' : 'Space available'}</span>
                </div>
                <p className="text-sm text-mute flex items-center gap-1 mb-4"><MapPin size={14}/> {w.location} · {w.type}</p>
                
                <div className="w-full bg-[#efe9da] rounded-full h-2 mb-2">
                   <div className={`h-2 rounded-full ${percent > 90 ? 'bg-tomato' : percent > 75 ? 'bg-saffron' : 'bg-leaf'}`} style={{ width: `${percent}%` }}></div>
                </div>
                <p className="text-xs text-mute mb-4">{free.toLocaleString()} of {Number(w.capacity).toLocaleString()} kg free · ₹{Number(w.price)}/100kg/month</p>
                
                <button 
                  onClick={() => setSelectedWh(w)} 
                  className="btn btn-d btn-sm"
                  disabled={free <= 0}
                >
                  Request space
                </button>
              </div>
            );
          })}
        </div>
      )}

      <h3 className="text-xl font-bold mb-4">My bookings</h3>
      {!bookings || bookings.length === 0 ? (
        <p className="text-mute text-sm">No bookings yet.</p>
      ) : (
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#f6f0e2] text-xs uppercase text-mute">
              <tr>
                <th className="p-4">Warehouse</th>
                <th className="p-4">Crop</th>
                <th className="p-4">Qty (kg)</th>
                <th className="p-4">From</th>
                <th className="p-4">Months</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} className="border-t border-line">
                  <td className="p-4 font-bold">{b.warehouse.name}</td>
                  <td className="p-4">{b.cropName}</td>
                  <td className="p-4">{Number(b.qty).toLocaleString()}</td>
                  <td className="p-4">{new Date(b.startDate).toLocaleDateString()}</td>
                  <td className="p-4">{b.months}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Booking Modal */}
      {selectedWh && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-paper rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Book · {selectedWh.name}</h3>
              <button onClick={() => setSelectedWh(null)} className="text-mute hover:text-ink">✕</button>
            </div>
            
            <p className="text-xs text-mute mb-6">
              {(Number(selectedWh.capacity) - Number(selectedWh.used)).toLocaleString()} kg free · ₹{Number(selectedWh.price)} per 100 kg per month
            </p>

            <form onSubmit={(e) => { e.preventDefault(); bookSpace.mutate(); }}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Crop</label>
                <input required type="text" className="input-field" value={formData.cropName} onChange={e => setFormData({...formData, cropName: e.target.value})} placeholder="e.g. Tomato" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Quantity (kg)</label>
                <input required type="number" className="input-field" value={formData.qty} onChange={e => setFormData({...formData, qty: e.target.value})} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Start date</label>
                <input required type="date" className="input-field" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-bold mb-1">Months</label>
                <select className="input-field" value={formData.months} onChange={e => setFormData({...formData, months: e.target.value})}>
                  {[1, 2, 3, 6].map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <button type="submit" disabled={bookSpace.isPending} className="btn btn-d w-full">
                {bookSpace.isPending ? "Booking..." : "Request booking"}
              </button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}