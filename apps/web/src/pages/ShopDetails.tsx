import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import Layout from "../components/Layout";
import { ArrowLeft } from "lucide-react";

export default function ShopDetails() {
  const { id } = useParams();

  // Fetch the specific shop by ID
  const { data: shop, isLoading } = useQuery({
    queryKey: ["shop", id],
    queryFn: () => apiRequest<any>(`/shops/${id}`),
  });

  const addToCart = async (productId: string) => {
    try {
      await apiRequest("/cart/update", { method: "POST", body: JSON.stringify({ productId, qty: 1 }) });
      alert("Added to cart!");
      window.location.reload(); // Refresh to update cart badge
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="text-center py-20 text-mute">Loading shop details...</div>
      </Layout>
    );
  }

  if (!shop) {
    return (
      <Layout>
        <div className="text-center py-20 text-mute">Shop not found.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Back Button */}
      <Link to="/shops" className="inline-flex items-center text-sm font-bold text-mute hover:text-forest mb-4 transition-colors">
        <ArrowLeft size={16} className="mr-1" /> All shops
      </Link>

      {/* Shop Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-display text-forest mb-1 flex items-center gap-2">
          🏪 {shop.name}
        </h2>
        <p className="text-mute text-sm">
          {shop.type} · {shop.area} · Delivery ₹{Number(shop.deliveryFee)} · Min order ₹{Number(shop.minOrder)}
          {shop.verified && <span className="ml-2 text-leaf2 font-bold">· ✔ Verified</span>}
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {!shop.products || shop.products.length === 0 ? (
          <div className="col-span-full card text-center py-12 text-mute">
            No products listed in this shop yet.
          </div>
        ) : (
          shop.products.map((product: any) => (
            <div key={product.id} className="card flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-forest leading-tight">{product.name}</h3>
                  
                  {/* Stock Badge */}
                  {product.stock <= 0 ? (
                    <span className="pill r text-[10px]">Out of stock</span>
                  ) : product.stock <= 5 ? (
                    <span className="pill y text-[10px]">Only {product.stock} left</span>
                  ) : (
                    <span className="pill text-[10px]">In stock</span>
                  )}
                </div>
                <p className="text-xs text-mute mb-4">{product.category}</p>
              </div>
              
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-line">
                <div className="font-bold text-forest text-xl">
                  ₹{Number(product.price)}
                  <span className="text-xs text-mute font-normal">/{product.unit}</span>
                </div>
                <button 
                  onClick={() => addToCart(product.id)} 
                  className="btn btn-d btn-sm"
                  disabled={product.stock <= 0}
                >
                  Add
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}