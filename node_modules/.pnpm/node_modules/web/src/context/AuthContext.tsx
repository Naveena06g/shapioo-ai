import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiRequest } from "../lib/api";

type User = { id: string; name: string; role: string; phone: string };
type AuthContextType = {
  user: User | null;
  loading: boolean;
  cartCount: number;
  refreshCart: () => Promise<void>;
  login: (phone: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  const refreshCart = async () => {
    if (!user || user.role !== "customer") return;
    try {
      const cart = await apiRequest<any[]>("/cart");
      const total = cart.reduce((sum, group) => sum + group.items.reduce((s: number, i: any) => s + i.qty, 0), 0);
      setCartCount(total);
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    apiRequest<User>("/me")
      .then((u) => {
        setUser(u);
        if (u.role === "customer") refreshCart();
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (phone: string, password: string) => {
    const loggedUser = await apiRequest<User>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ phone, password }),
    });
    setUser(loggedUser);
    if (loggedUser.role === "customer") refreshCart();
  };

  const logout = async () => {
    await apiRequest("/auth/logout", { method: "POST" });
    setUser(null);
    setCartCount(0);
  };

  return (
    <AuthContext.Provider value={{ user, loading, cartCount, refreshCart, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};