import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import Layout from "../components/Layout"; // <-- Add this

export default function Savings() {
  const { data: savings, isLoading } = useQuery({
    queryKey: ["savings"],
    queryFn: () => apiRequest<any>("/savings").catch(() => ({ balance: 0, ledger: [] })),
  });

  if (isLoading) return <div className="p-10 text-center">Loading savings...</div>;

  return (
    <Layout> {/* <-- Add this */}
      <div>
        <div className="mb-6">
          <h2 className="text-3xl font-display mb-1">Digital Food Savings</h2>
          <p className="text-mute text-sm">Voluntary. Your own money. You can pause or change this any time.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="card mb-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="kpi">
                  <span>Savings Balance</span>
                  <b>₹{savings?.balance || 0}</b>
                </div>
                <div className="kpi">
                  <span>Total Contributed</span>
                  <b>₹{savings?.totalDeposits || 0}</b>
                </div>
              </div>
              
              <div className="p-4 bg-saffron/10 border border-saffron/20 rounded-xl">
                <h4 className="font-bold text-forest text-sm mb-1">Savings Rate</h4>
                <p className="text-xs text-mute mb-3">Set a voluntary rate to automatically save from future purchases.</p>
                <div className="flex bg-[#efe9da] p-1 rounded-full">
                  {[0, 0.5, 1, 2].map((rate) => (
                    <button key={rate} className={`flex-1 text-sm font-bold py-1.5 rounded-full ${rate === 1 ? 'bg-white text-forest shadow' : 'text-mute'}`}>
                      {rate === 0 ? 'None' : `${rate}%`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Ledger</h3>
            <div className="card bg-white border border-line overflow-hidden">
               <div className="p-4 text-center text-mute text-sm">
                 No savings entries yet. Start shopping to save automatically!
               </div>
            </div>
          </div>
        </div>
      </div>
    </Layout> // <-- Add this
  );
}