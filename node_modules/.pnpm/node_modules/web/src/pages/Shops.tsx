// import { useQuery } from "@tanstack/react-query";
// import { apiRequest } from "../lib/api";
// import Layout from "../components/Layout";

// export default function Shops() {
//   const { data: shops, isLoading } = useQuery({
//     queryKey: ["shops"],
//     queryFn: () => apiRequest<any[]>("/shops"),
//   });

//   const addToCart = async (productId: string) => {
//     await apiRequest("/cart/update", { method: "POST", body: JSON.stringify({ productId, qty: 1 }) });
//     alert("Added to cart!");
//     window.location.reload(); 
//   };

//   const getTile = (index: number) => ["t1", "t2", "t3", "t5"][index % 4];
  
//   const getEmoji = (type: string) => {
//     if (type.toLowerCase().includes("veg")) return "🥬";
//     if (type.toLowerCase().includes("milk")) return "🥛";
//     if (type.toLowerCase().includes("rice")) return "🍚";
//     return "🛒";
//   };

//   return (
//     <Layout>
//       <div className="mb-6">
//         <h2 className="text-3xl font-display text-forest mb-1">Shops near you</h2>
//         <p className="text-mute text-sm">Discover fresh produce and daily essentials from local vendors.</p>
//       </div>

//       {isLoading ? (
//         <div className="text-center py-10 text-mute">Loading shops...</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {shops?.map((shop, index) => (
//             <div key={shop.id} className="card p-4 flex flex-col hover:-translate-y-1 transition-transform">
//               <div className={`tile ${getTile(index)}`}>
//                 {getEmoji(shop.type)}
//               </div>
              
//               <div className="flex justify-between items-start mb-1">
//                 <h3 className="font-bold text-forest leading-tight">{shop.name}</h3>
//                 <span className="pill text-[10px] px-1.5">✔</span>
//               </div>
//               <p className="text-xs text-mute mb-4">{shop.type} · {shop.area}</p>
              
//               <div className="mt-auto space-y-1 text-xs text-mute">
//                 <p>🚚 ₹{Number(shop.deliveryFee)} delivery · Min ₹{Number(shop.minOrder)}</p>
//               </div>
              
//               {shop.products?.[0] && (
//                 <button 
//                   onClick={() => addToCart(shop.products[0].id)} 
//                   className="mt-3 w-full bg-sage text-forest px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-leaf hover:text-white transition-colors"
//                 >
//                   Add {shop.products[0].name} (₹{Number(shop.products[0].price)})
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </Layout>
//   );
// }

import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import Layout from "../components/Layout";

export default function Shops() {
  const { data: shops, isLoading } = useQuery({
    queryKey: ["shops"],
    queryFn: () => apiRequest<any[]>("/shops"),
  });

  const getTile = (index: number) => ["t1", "t2", "t3", "t5"][index % 4];
  
  const getEmoji = (type: string) => {
    if (type.toLowerCase().includes("veg")) return "🥬";
    if (type.toLowerCase().includes("milk")) return "🥛";
    if (type.toLowerCase().includes("rice")) return "🍚";
    return "🛒";
  };

  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-3xl font-display text-forest mb-1">Local shops</h2>
        <p className="text-mute text-sm">Order from several shops in one cart.</p>
        <div className="mt-4 max-w-sm">
          <input type="text" placeholder="Search shops or products..." className="input-field" />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-mute">Loading shops...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {shops?.map((shop, index) => (
            <Link 
              to={`/shop/${shop.id}`} 
              key={shop.id} 
              className="card p-4 flex flex-col hover:-translate-y-1 transition-transform cursor-pointer"
            >
              <div className={`tile ${getTile(index)}`}>
                {getEmoji(shop.type)}
              </div>
              
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-forest leading-tight">{shop.name}</h3>
                {shop.verified ? (
                  <span className="pill text-[10px] px-1.5">✔</span>
                ) : (
                  <span className="pill n text-[10px] px-1.5">Unverified</span>
                )}
              </div>
              <p className="text-xs text-mute mb-4">{shop.type} · {shop.area}</p>
              
              <div className="mt-auto space-y-1 text-xs text-mute">
                <p>🚚 ₹{Number(shop.deliveryFee)} delivery · Min ₹{Number(shop.minOrder)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Layout>
  );
}