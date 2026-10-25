import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { ShoppingBag } from "lucide-react";

export default function Cart() {
  const { refreshCart } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => apiRequest<any[]>("/cart"),
  });

  const updateQty = useMutation({
    mutationFn: ({ productId, qty }: { productId: string; qty: number }) =>
      apiRequest("/cart/update", { method: "POST", body: JSON.stringify({ productId, qty }) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      refreshCart();
    },
  });

  const checkout = useMutation({
    mutationFn: () => apiRequest("/orders/checkout", { method: "POST" }),
    onSuccess: () => {
      alert("Order placed successfully! 🎉");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      refreshCart();
      navigate("/dashboard"); // Redirect to dashboard instead of /
    },
    onError: (err: any) => alert(err.message),
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="p-10 text-center text-mute">Loading cart...</div>
      </Layout>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-24 h-24 bg-sage rounded-full flex items-center justify-center mb-6">
            <ShoppingBag size={48} className="text-leaf" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-mute mb-6">Looks like you haven't added anything yet.</p>
          <button onClick={() => navigate("/dashboard")} className="btn btn-d">
            Browse Shops
          </button>
        </div>
      </Layout>
    );
  }

  const grandTotal = cart.reduce((sum, group) => sum + group.subtotal + Number(group.shop.deliveryFee), 0);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-display text-forest mb-6">Your Cart</h2>

        {cart.map((group) => (
          <div key={group.shop.id} className="card mb-6">
            <h3 className="font-bold text-lg border-b border-line pb-2 mb-4">{group.shop.name}</h3>
            {group.items.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center py-3 border-b border-line last:border-0">
                <div>
                  <p className="font-bold">{item.product.name}</p>
                  <p className="text-sm text-mute">₹{item.product.price} / {item.product.unit}</p>
                </div>
                <div className="flex items-center gap-3 bg-sage/50 px-3 py-1 rounded-full">
                  <button 
                    onClick={() => updateQty.mutate({ productId: item.productId, qty: item.qty - 1 })}
                    className="font-bold text-forest hover:text-tomato w-6 text-center text-lg"
                  >
                    −
                  </button>
                  <span className="font-bold w-4 text-center">{item.qty}</span>
                  <button 
                    onClick={() => updateQty.mutate({ productId: item.productId, qty: item.qty + 1 })}
                    className="font-bold text-forest hover:text-leaf w-6 text-center text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between text-sm text-mute mt-4 pt-2">
              <span>Subtotal</span><span>₹{group.subtotal}</span>
            </div>
            <div className="flex justify-between text-sm text-mute">
              <span>Delivery</span><span>₹{group.shop.deliveryFee}</span>
            </div>
          </div>
        ))}

        <div className="card bg-forest text-white flex justify-between items-center p-6 mt-6">
          <div>
            <p className="text-sm text-sage">Total to pay</p>
            <p className="text-3xl font-display font-bold">₹{grandTotal}</p>
          </div>
          <button
            onClick={() => checkout.mutate()}
            disabled={checkout.isPending}
            className="bg-saffron text-forest px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-colors disabled:opacity-50"
          >
            {checkout.isPending ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </Layout>
  );
}