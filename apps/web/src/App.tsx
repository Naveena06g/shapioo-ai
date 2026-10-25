
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