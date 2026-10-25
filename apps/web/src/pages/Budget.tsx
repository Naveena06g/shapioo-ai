import { useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

export default function Budget() {
  const { user } = useAuth();
  const [budget, setBudget] = useState<Record<string, number>>({
    "Rice & grains": 2000, "Pulses": 1500, "Vegetables & fruits": 1000, "Cooking oil": 500, "Milk & dairy": 800, "Millets": 500, "Other": 700
  });

  const totalBudget = Object.values(budget).reduce((a, b) => a + b, 0);

  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-3xl font-display mb-1">Household Food Budget</h2>
        <p className="text-mute text-sm">Plan your monthly essentials and track your spending.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="kpi"><span>Total Budget</span><b>₹{totalBudget}</b></div>
        <div className="kpi"><span>Spent</span><b>₹0</b></div>
        <div className="kpi"><span>Remaining</span><b>₹{totalBudget}</b></div>
      </div>

      <div className="card">
        <h3 className="font-bold mb-4">Category Limits</h3>
        {Object.entries(budget).map(([cat, amount]) => (
          <div key={cat} className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-bold">{cat}</span>
              <span className="text-mute">₹{amount}</span>
            </div>
            <input 
              type="range" min="0" max="5000" step="100" value={amount}
              onChange={(e) => setBudget({...budget, [cat]: Number(e.target.value)})}
              className="w-full accent-forest"
            />
          </div>
        ))}
      </div>
    </Layout>
  );
}