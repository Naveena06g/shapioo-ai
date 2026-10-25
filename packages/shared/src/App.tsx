import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";

const queryClient = new QueryClient();

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-cream">
      <nav className="bg-forest text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl">🌾 SHAPIOO AI</h1>
        <button onClick={logout} className="text-sm bg-white/10 px-4 py-2 rounded-full hover:bg-white/20">
          Sign Out
        </button>
      </nav>
      <main className="max-w-4xl mx-auto p-8">
        <div className="card">
          <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
          <p className="text-mute">Welcome back, {user?.name}!</p>
        </div>
      </main>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-10 text-center text-mute">Loading SHAPIOO...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}