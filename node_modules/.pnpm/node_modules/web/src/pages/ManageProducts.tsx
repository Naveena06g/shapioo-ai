// import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { apiRequest } from "../lib/api";
// import { Plus, Package } from "lucide-react";
// import Layout from "../components/Layout";

// export default function ManageProducts() {
//   const queryClient = useQueryClient();
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({ name: "", category: "Pulses", price: "", unit: "kg", stock: "" });

//   const { data: shops } = useQuery({
//     queryKey: ["my-shops"],
//     queryFn: () => apiRequest<any[]>("/shops"),
//   });

//   const myShop = shops?.[0]; // Simplified: assumes shopkeeper has 1 shop

//   const addProduct = useMutation({
//     mutationFn: (newProduct: any) => apiRequest("/products", { method: "POST", body: JSON.stringify(newProduct) }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["my-shops"] });
//       setShowForm(false);
//       setFormData({ name: "", category: "Pulses", price: "", unit: "kg", stock: "" });
//       alert("Product added!");
//     }
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     addProduct.mutate({
//       name: formData.name,
//       category: formData.category,
//       price: Number(formData.price),
//       unit: formData.unit,
//       stock: Number(formData.stock)
//     });
//   };

//   return (
//     <div>
//           <Layout>
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-3xl font-display mb-1">Products & Stock</h2>
//           <p className="text-mute text-sm">{myShop?.name || "My Shop"}</p>
//         </div>
//         <button onClick={() => setShowForm(!showForm)} className="btn btn-s">
//           <Plus size={18} /> Add Product
//         </button>
//       </div>

//       {showForm && (
//         <form onSubmit={handleSubmit} className="card mb-6 bg-sage/20 border-leaf/30">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="block text-sm font-bold mb-1">Product Name</label>
//               <input required type="text" className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Toor Dal" />
//             </div>
//             <div>
//               <label className="block text-sm font-bold mb-1">Category</label>
//               <select className="input-field" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
//                 <option>Pulses</option>
//                 <option>Rice & grains</option>
//                 <option>Vegetables & fruits</option>
//                 <option>Cooking oil</option>
//                 <option>Milk & dairy</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-bold mb-1">Price (₹)</label>
//               <input required type="number" min="1" className="input-field" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
//             </div>
//             <div>
//               <label className="block text-sm font-bold mb-1">Stock</label>
//               <input required type="number" min="0" className="input-field" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
//             </div>
//           </div>
//           <div className="flex justify-end gap-2">
//             <button type="button" onClick={() => setShowForm(false)} className="btn btn-l">Cancel</button>
//             <button type="submit" disabled={addProduct.isPending} className="btn btn-d">
//               {addProduct.isPending ? "Saving..." : "Save Product"}
//             </button>
//           </div>
//         </form>
//       )}

//       <div className="card bg-white border border-line">
//         <div className="flex items-center gap-2 text-mute mb-4 pb-4 border-b border-line">
//           <Package size={20} /> <span className="font-bold text-ink">Current Inventory</span>
//         </div>
//         {myShop?.products?.length > 0 ? (
//           <div className="space-y-3">
//             {myShop.products.map((p: any) => (
//               <div key={p.id} className="flex justify-between items-center p-3 hover:bg-sage/20 rounded-lg transition-colors">
//                 <div>
//                   <div className="font-bold">{p.name}</div>
//                   <div className="text-xs text-mute">{p.category} · ₹{p.price}/{p.unit}</div>
//                 </div>
//                 <div className="text-right">
//                   <span className={`pill ${p.stock <= 5 ? 'r' : ''}`}>{p.stock} in stock</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-8 text-mute">No products yet. Add your first product above!</div>
//         )}
//       </div>
//       </Layout>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import Layout from "../components/Layout";
import { Plus, Package } from "lucide-react";

export default function ManageProducts() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", category: "Pulses", price: "", unit: "kg", stock: "" });

  // Local state to track edits before saving
  const [edits, setEdits] = useState<Record<string, { price: string; stock: string }>>({});

  const { data: shops } = useQuery({
    queryKey: ["my-shops"],
    queryFn: () => apiRequest<any[]>("/shops"),
  });

  const myShop = shops?.[0]; // Assuming the shopkeeper has one shop

  // When shop data loads, initialize the edits state
  useEffect(() => {
    if (myShop?.products) {
      const initialEdits: Record<string, { price: string; stock: string }> = {};
      myShop.products.forEach((p: any) => {
        initialEdits[p.id] = { price: String(Number(p.price)), stock: String(p.stock) };
      });
      setEdits(initialEdits);
    }
  }, [myShop]);

  const addProduct = useMutation({
    mutationFn: (newProduct: any) => apiRequest("/products", { method: "POST", body: JSON.stringify(newProduct) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-shops"] });
      setShowForm(false);
      setFormData({ name: "", category: "Pulses", price: "", unit: "kg", stock: "" });
      alert("Product added!");
    }
  });

  const updateProduct = useMutation({
    mutationFn: ({ id, price, stock }: { id: string; price: number; stock: number }) => 
      apiRequest(`/products/${id}`, { method: "PATCH", body: JSON.stringify({ price, stock }) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-shops"] });
      alert("Product updated!");
    },
    onError: (err: any) => alert(err.message)
  });

  const deleteProduct = useMutation({
    mutationFn: (id: string) => apiRequest(`/products/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-shops"] });
      alert("Product removed.");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct.mutate({
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      unit: formData.unit,
      stock: Number(formData.stock)
    });
  };

  const handleSave = (id: string) => {
    const edit = edits[id];
    if (!edit) return;
    updateProduct.mutate({ id, price: Number(edit.price), stock: Number(edit.stock) });
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-display mb-1">Products & Stock</h2>
          <p className="text-mute text-sm">{myShop?.name || "My Shop"}</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-s">
          <Plus size={18} /> Add Product
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card mb-6 bg-sage/20 border-leaf/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold mb-1">Product Name</label>
              <input required type="text" className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Toor Dal" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Category</label>
              <select className="input-field" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option>Pulses</option>
                <option>Rice & grains</option>
                <option>Vegetables & fruits</option>
                <option>Cooking oil</option>
                <option>Milk & dairy</option>
                <option>Millets</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Price (₹)</label>
              <input required type="number" min="1" className="input-field" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Unit</label>
              <select className="input-field" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})}>
                <option>kg</option>
                <option>litre</option>
                <option>packet</option>
                <option>piece</option>
                <option>dozen</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Stock</label>
              <input required type="number" min="0" className="input-field" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={() => setShowForm(false)} className="btn btn-l">Cancel</button>
            <button type="submit" disabled={addProduct.isPending} className="btn btn-d">
              {addProduct.isPending ? "Saving..." : "Add Product"}
            </button>
          </div>
        </form>
      )}

      <div className="card p-0 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#f6f0e2] text-xs uppercase text-mute border-b border-line">
            <tr>
              <th className="p-4 font-bold">Product</th>
              <th className="p-4 font-bold">Category</th>
              <th className="p-4 font-bold">Price ₹</th>
              <th className="p-4 font-bold">Stock</th>
              <th className="p-4 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myShop?.products?.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-mute">
                  No products listed yet. Add your first product above.
                </td>
              </tr>
            ) : (
              myShop?.products?.map((p: any) => (
                <tr key={p.id} className="border-b border-line last:border-0">
                  <td className="p-4">
                    <div className="font-bold flex items-center gap-2">
                      <Package size={16} className="text-mute"/> {p.name}
                    </div>
                    {p.stock <= 5 && <span className="pill y text-[10px] mt-1 inline-block">Low</span>}
                  </td>
                  <td className="p-4 text-sm text-mute">{p.category}</td>
                  <td className="p-4">
                    <input 
                      type="number" 
                      className="w-24 border border-line rounded-lg px-2 py-1"
                      value={edits[p.id]?.price || ""}
                      onChange={e => setEdits({ ...edits, [p.id]: { ...edits[p.id], price: e.target.value } })}
                    />
                  </td>
                  <td className="p-4">
                    <input 
                      type="number" 
                      className="w-24 border border-line rounded-lg px-2 py-1"
                      value={edits[p.id]?.stock || ""}
                      onChange={e => setEdits({ ...edits, [p.id]: { ...edits[p.id], stock: e.target.value } })}
                    />
                  </td>
                  <td className="p-4 flex gap-2">
                    <button 
                      onClick={() => handleSave(p.id)} 
                      className="btn btn-l btn-sm"
                      disabled={updateProduct.isPending}
                    >
                      Save
                    </button>
                    <button 
                      onClick={() => { if(confirm('Remove this product?')) deleteProduct.mutate(p.id); }} 
                      className="btn btn-r btn-sm"
                      disabled={deleteProduct.isPending}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}