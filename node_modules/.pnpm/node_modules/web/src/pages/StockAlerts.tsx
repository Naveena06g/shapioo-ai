import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import Layout from "../components/Layout";
import { AlertTriangle, Package } from "lucide-react";

export default function StockAlerts() {
  const { data: alerts, isLoading } = useQuery({
    queryKey: ["stock-alerts"],
    queryFn: () => apiRequest<any[]>("/alerts"),
  });

  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-3xl font-display mb-1 flex items-center gap-2">
          <AlertTriangle className="text-saffron" size={28} /> Stock Alerts
        </h2>
        <p className="text-mute text-sm">Items with 5 or fewer units remaining. Reorder soon to avoid stockouts.</p>
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-mute">Checking inventory...</div>
      ) : !alerts || alerts.length === 0 ? (
        <div className="card text-center py-12 text-mute">
          <div className="text-4xl mb-2">✅</div>
          <p>Everything is well stocked!</p>
        </div>
      ) : (
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f6f0e2] border-b border-line text-xs uppercase text-mute">
              <tr>
                <th className="p-4 font-bold">Product</th>
                <th className="p-4 font-bold">Shop</th>
                <th className="p-4 font-bold">Stock</th>
                <th className="p-4 font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((product) => (
                <tr key={product.id} className="border-b border-line last:border-0 hover:bg-sage/20">
                  <td className="p-4 font-bold flex items-center gap-2">
                    <Package size={16} className="text-mute" /> {product.name}
                  </td>
                  <td className="p-4 text-mute">{product.shop.name}</td>
                  <td className="p-4">
                    <span className={`pill ${product.stock === 0 ? 'r' : 'y'}`}>
                      {product.stock === 0 ? "Out of stock" : `${product.stock} left`}
                    </span>
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => alert(`Supplier alerted for ${product.name} (demo)`)} 
                      className="btn btn-l btn-sm"
                    >
                      Alert Supplier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}