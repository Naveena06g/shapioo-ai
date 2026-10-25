
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import { apiRequest } from "./lib/api";

// // Pages
// import Landing from "./pages/Landing";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Cart from "./pages/Cart";
// import ShopDashboard from "./pages/ShopDashboard";
// import Market from "./pages/Market";
// import ManageProducts from "./pages/ManageProducts";
// import Savings from "./pages/Savings";
// import FarmerDashboard from "./pages/FarmerDashboard";
// import FarmerOffers from "./pages/FarmerOffers";
// import Jobs from "./pages/Jobs";
// import AdminDashboard from "./pages/AdminDashboard";
// import AdminVerifications from "./pages/AdminVerifications";
// import Budget from "./pages/Budget";
// import Warehouses from "./pages/Warehouses";
// import Courses from "./pages/Courses";
// import AdminOrders from "./pages/AdminOrders";
// import TraderOffers from "./pages/TraderOffers";
// import StockAlerts from "./pages/StockAlerts";
// import Shops from "./pages/Shops";
// import Orders from "./pages/Orders";
// import ShopDetails from "./pages/ShopDetails";
// import AdminPostJob from "./pages/AdminPostJob";

// // Layout
// import Layout from "./components/Layout";

// const queryClient = new QueryClient();

// // --- The Universal Dashboard Component ---
// function Dashboard() {
//   const { user, cartCount } = useAuth();
  
//   const { data: shops, isLoading } = useQuery({
//     queryKey: ["shops"],
//     queryFn: () => apiRequest<any[]>("/shops"),
//   });

//   const addToCart = async (productId: string) => {
//     await apiRequest("/cart/update", { method: "POST", body: JSON.stringify({ productId, qty: 1 }) });
//     alert("Added to cart!");
//     window.location.reload(); 
//   };

//   // Dynamic Subtitles based on Role
//   const subtitles: Record<string, string> = {
//     customer: "Plan your food budget and shop from local stores.",
//     farmer: "Check new offers and keep your listings fresh.",
//     shop: "Keep stock updated and confirm new orders quickly.",
//     trader: "Browse fresh crop listings and send offers.",
//     seeker: "Learn a new skill and apply for local jobs.",
//     admin: "Review pending verifications and low-stock alerts.",
//   };

//   // Dynamic Quick Actions based on Role
//   const quickActionsMap: Record<string, any[]> = {
//     customer: [
//       { icon: "🛍️", label: "Find essentials", link: "/shops" },
//       { icon: "🧺", label: "View cart", link: "/cart" },
//       { icon: "💰", label: "Food budget", link: "/budget" },
//     ],
//     farmer: [
//       { icon: "🌱", label: "List a crop", link: "/farmer" },
//       { icon: "🤝", label: "Review offers", link: "/farmer-offers" },
//       { icon: "🏭", label: "Find storage", link: "/warehouses" },
//     ],
//     shop: [
//       { icon: "📋", label: "Manage products", link: "/manage-products" },
//       { icon: "📦", label: "View orders", link: "/shop" },
//       { icon: "⚠️", label: "Stock alerts", link: "/alerts" },
//     ],
//     trader: [
//       { icon: "🌾", label: "Browse crops", link: "/market" },
//       { icon: "🤝", label: "My offers", link: "/trader-offers" },
//       { icon: "🏭", label: "Storage", link: "/warehouses" },
//     ],
//     seeker: [
//       { icon: "🎓", label: "Explore courses", link: "/courses" },
//       { icon: "💼", label: "Find jobs", link: "/jobs" },
//       { icon: "📄", label: "My applications", link: "/jobs" },
//     ],
//     admin: [
//       { icon: "✅", label: "Verify partners", link: "/admin/verify" },
//       { icon: "⚠️", label: "Stock alerts", link: "/alerts" },
//       { icon: "📦", label: "All orders", link: "/admin/orders" },
//     ],
//   };

//   const quickActions = quickActionsMap[user?.role || "customer"];

//   // Dynamic KPIs based on Role
//   const renderKPIs = () => {
//     if (user?.role === "customer") {
//       return (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//           <div className="kpi"><span>Active orders</span><b>0</b></div>
//           <div className="kpi"><span>Spent this month</span><b>₹0</b><small>No budget set</small></div>
//           <div className="kpi"><span>Savings balance</span><b>₹0</b><small>Saving 1% per order</small></div>
//           <div className="kpi"><span>Cart items</span><b>{cartCount}</b></div>
//         </div>
//       );
//     }
//     if (user?.role === "seeker") {
//       return (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <div className="kpi"><span>Courses enrolled</span><b>0</b></div>
//           <div className="kpi"><span>Completed</span><b>0</b></div>
//           <div className="kpi"><span>Applications</span><b>0</b></div>
//         </div>
//       );
//     }
//     if (user?.role === "admin") {
//       return (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//           <div className="kpi"><span>Verified shops</span><b>3/4</b></div>
//           <div className="kpi"><span>Pending verifications</span><b>3</b></div>
//           <div className="kpi"><span>Orders</span><b>0</b></div>
//           <div className="kpi"><span>GMV</span><b>₹0</b></div>
//           <div className="kpi"><span>Low-stock alerts</span><b>4</b></div>
//           <div className="kpi"><span>Crop listings</span><b>6</b></div>
//         </div>
//       );
//     }
//     // Default for shop/farmer/trader
//     return (
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         <div className="kpi"><span>Active listings</span><b>0</b></div>
//         <div className="kpi"><span>Pending offers</span><b>0</b></div>
//         <div className="kpi"><span>Stock listed</span><b>0 kg</b></div>
//         <div className="kpi"><span>Storage bookings</span><b>0</b></div>
//       </div>
//     );
//   };

//   const missionCards = [
//     { icon: "🌾", title: "AI Farmers Market", desc: "Explore crop listings, farmer-set prices and bulk supply.", link: "/market", action: "Browse market" },
//     { icon: "🏪", title: "AI Local Multi-Shops", desc: "Find groceries, fresh produce, dairy and daily essentials.", link: "/shops", action: "Explore shops" },
//     { icon: "🛡️", title: "Digital Food Security", desc: "Plan a monthly food budget, compare local prices and keep an eye on essentials.", link: "/budget", action: "Plan budget" },
//     { icon: "🐷", title: "Digital Food Savings", desc: "Choose a voluntary savings rate and review your savings ledger.", link: "/savings", action: "View savings" },
//     { icon: "🎓", title: "AI Skill Development", desc: "Build practical digital, shop-management and technical skills.", link: "/courses", action: "Explore skills" },
//     { icon: "💼", title: "Youth Jobs & Self-employment", desc: "Discover roles across local shops, delivery, warehouses and digital services.", link: "/jobs", action: "Find opportunities" },
//   ];

//   return (
//     <Layout>
//       {/* Greeting Section */}
//       <div className="flex justify-between items-end mb-6">
//         <div>
//           <h2 className="text-4xl font-display mb-1 text-forest">
//             Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {user?.name.split(' ')[0]} <span className="wave inline-block origin-[70%_70%] animate-[waveHand_2.4s_ease-in-out_0.5s_2]">👋</span>
//           </h2>
//           <p className="text-mute text-sm capitalize">{user?.role} dashboard · {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
//           <p className="text-mute text-sm mt-1">{subtitles[user?.role || "customer"]}</p>
//         </div>
//         <span className="pill bg-sage text-leaf2 flex items-center gap-2">
//           <i className="w-2 h-2 rounded-full bg-leaf animate-pulse"></i> Demo mode
//         </span>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-[#f0f5eb] border border-[#dce7d6] rounded-2xl p-4 mb-8">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-bold text-forest text-sm">Quick actions</h3>
//           <span className="text-xs text-mute">Jump straight into your tasks</span>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//           {quickActions.map((qa, i) => (
//             <a key={i} href={qa.link} className="bg-white border border-line p-3 rounded-xl flex items-center gap-3 hover:-translate-y-1 transition-transform shadow-sm">
//               <span className="text-2xl">{qa.icon}</span>
//               <span className="font-bold text-sm flex-1">{qa.label}</span>
//               <span className="text-leaf text-lg">↗</span>
//             </a>
//           ))}
//         </div>
//       </div>

//       {/* Role-specific KPIs */}
//       {renderKPIs()}
      
//       {/* Course warning ONLY for Job Seekers */}
//       {user?.role === "seeker" && (
//         <p className="text-sm text-mute mb-8 border-l-4 border-saffron pl-3 py-1 bg-[#fff8e8] rounded-r-lg">
//           Completing a course earns a completion certificate. It does not guarantee a job.
//         </p>
//       )}

//       {/* Collapsible Mission Section */}
//       <details className="bg-paper border border-line rounded-2xl overflow-hidden group mb-8 shadow-sm">
//         <summary className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[#f6f2e6] transition-colors list-none">
//           <div className="w-12 h-12 bg-sage rounded-xl flex items-center justify-center text-2xl">🌾</div>
//           <div className="flex-1">
//             <h3 className="font-bold text-forest">Food Security & Youth Employment Mission</h3>
//             <p className="text-xs text-mute">Six services · supply chain · pilot · jobs</p>
//           </div>
//           <span className="text-leaf2 text-xl transition-transform group-open:rotate-180">▼</span>
//         </summary>
        
//         <div className="p-4 pt-0 border-t border-line">
//           <div className="bg-gradient-to-br from-[#103b29] to-[#398653] rounded-2xl p-6 text-white my-4 relative overflow-hidden">
//             <div className="relative z-10">
//               <span className="inline-flex border border-white/20 bg-white/10 px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-3">
//                 🌱 SHAPIOO AI MISSION
//               </span>
//               <h3 className="text-2xl font-display leading-tight mb-2">
//                 Better food access.<br/><span className="text-[#ffd17c]">Stronger local livelihoods.</span>
//               </h3>
//               <p className="text-sage text-sm max-w-lg mb-4">
//                 One connected platform to help farmers reach buyers, local shops serve families, households plan food spending, and young people build skills and find work.
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
//             {missionCards.map((mc, i) => (
//               <a key={i} href={mc.link} className="card flex flex-col p-4 hover:-translate-y-1 transition-transform">
//                 <div className="w-10 h-10 bg-sage rounded-xl flex items-center justify-center text-xl mb-3">{mc.icon}</div>
//                 <h4 className="font-bold text-forest text-sm mb-1">{mc.title}</h4>
//                 <p className="text-xs text-mute leading-relaxed mb-3 flex-1">{mc.desc}</p>
//                 <div className="flex justify-between items-center text-xs font-bold text-leaf2 mt-auto pt-3 border-t border-line">
//                   <span>{mc.action}</span>
//                   <span className="text-base">↗</span>
//                 </div>
//               </a>
//             ))}
//           </div>
//         </div>
//       </details>
//     </Layout>
//   );
// }

// // --- Protected Route Wrapper ---
// function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const { user, loading } = useAuth();
//   if (loading) return <div className="p-10 text-center text-mute">Loading SHAPIOO...</div>;
//   if (!user) return <Navigate to="/login" replace />;
//   return <>{children}</>;
// }

// // --- Main App ---
// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <AuthProvider>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Landing />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />

//             <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//             <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
//             <Route path="/shop" element={<ProtectedRoute><ShopDashboard /></ProtectedRoute>} />
//             <Route path="/market" element={<ProtectedRoute><Market /></ProtectedRoute>} />
//             <Route path="/manage-products" element={<ProtectedRoute><ManageProducts /></ProtectedRoute>} />
//             <Route path="/savings" element={<ProtectedRoute><Savings /></ProtectedRoute>} />
//             <Route path="/farmer" element={<ProtectedRoute><FarmerDashboard /></ProtectedRoute>} />
//             <Route path="/farmer-offers" element={<ProtectedRoute><FarmerOffers /></ProtectedRoute>} />
//             <Route path="/trader-offers" element={<ProtectedRoute><TraderOffers /></ProtectedRoute>} />
//             <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
//             <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
//             <Route path="/admin/verify" element={<ProtectedRoute><AdminVerifications /></ProtectedRoute>} />
//             <Route path="/budget" element={<ProtectedRoute><Budget /></ProtectedRoute>} />
//             <Route path="/warehouses" element={<ProtectedRoute><Warehouses /></ProtectedRoute>} />
//             <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
//             <Route path="/admin/orders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
//             <Route path="/alerts" element={<ProtectedRoute><StockAlerts /></ProtectedRoute>} />
//             <Route path="/shops" element={<ProtectedRoute><Shops /></ProtectedRoute>} />
//             <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
//             <Route path="/shop/:id" element={<ProtectedRoute><ShopDetails /></ProtectedRoute>} />
//             <Route path="/admin/post-job" element={<ProtectedRoute><AdminPostJob /></ProtectedRoute>} />

//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </BrowserRouter>
//       </AuthProvider>
//     </QueryClientProvider>
//   );
// }

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Shared UI providers
import { ToastProvider } from "./components/ui/Toast";
import { ConfirmProvider } from "./components/ui/ConfirmModal";
import { PageSkeleton } from "./components/ui/Skeleton";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import ShopDashboard from "./pages/ShopDashboard";
import Market from "./pages/Market";
import ManageProducts from "./pages/ManageProducts";
import Savings from "./pages/Savings";
import FarmerDashboard from "./pages/FarmerDashboard";
import FarmerOffers from "./pages/FarmerOffers";
import Jobs from "./pages/Jobs";
import AdminDashboard from "./pages/AdminDashboard";
import AdminVerifications from "./pages/AdminVerifications";
import Budget from "./pages/Budget";
import Warehouses from "./pages/Warehouses";
import Courses from "./pages/Courses";
import AdminOrders from "./pages/AdminOrders";
import TraderOffers from "./pages/TraderOffers";
import StockAlerts from "./pages/StockAlerts";
import Shops from "./pages/Shops";
import Orders from "./pages/Orders";
import ShopDetails from "./pages/ShopDetails";
import AdminPostJob from "./pages/AdminPostJob";

const queryClient = new QueryClient();

// --- Protected Route Wrapper ---
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <PageSkeleton />;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

// --- Main App ---
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <ConfirmProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/shop" element={<ProtectedRoute><ShopDashboard /></ProtectedRoute>} />
                <Route path="/market" element={<ProtectedRoute><Market /></ProtectedRoute>} />
                <Route path="/manage-products" element={<ProtectedRoute><ManageProducts /></ProtectedRoute>} />
                <Route path="/savings" element={<ProtectedRoute><Savings /></ProtectedRoute>} />
                <Route path="/farmer" element={<ProtectedRoute><FarmerDashboard /></ProtectedRoute>} />
                <Route path="/farmer-offers" element={<ProtectedRoute><FarmerOffers /></ProtectedRoute>} />
                <Route path="/trader-offers" element={<ProtectedRoute><TraderOffers /></ProtectedRoute>} />
                <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/verify" element={<ProtectedRoute><AdminVerifications /></ProtectedRoute>} />
                <Route path="/budget" element={<ProtectedRoute><Budget /></ProtectedRoute>} />
                <Route path="/warehouses" element={<ProtectedRoute><Warehouses /></ProtectedRoute>} />
                <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
                <Route path="/admin/orders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
                <Route path="/alerts" element={<ProtectedRoute><StockAlerts /></ProtectedRoute>} />
                <Route path="/shops" element={<ProtectedRoute><Shops /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                <Route path="/shop/:id" element={<ProtectedRoute><ShopDetails /></ProtectedRoute>} />
                <Route path="/admin/post-job" element={<ProtectedRoute><AdminPostJob /></ProtectedRoute>} />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </ConfirmProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}