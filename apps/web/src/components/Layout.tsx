import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "./ui/Toast";
import { useFocusTrap } from "../hooks/useFocusTrap";
import {
  LogOut,
  ShoppingCart,
  Home,
  Store,
  Package,
  Wallet,
  PiggyBank,
  Wheat,
  Sprout,
  Handshake,
  Warehouse,
  ClipboardList,
  GraduationCap,
  Briefcase,
  CheckCircle,
  AlertTriangle,
  MoreHorizontal,
  X,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Navigation (same routes and labels as before; icons are now unique) */
/* ------------------------------------------------------------------ */

interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
}

const NAVS: Record<string, NavItem[]> = {
  customer: [
    { path: "/dashboard", label: "Home", icon: Home },
    { path: "/shops", label: "Shops", icon: Store },
    { path: "/cart", label: "Cart", icon: ShoppingCart },
    { path: "/orders", label: "Orders", icon: Package },
    { path: "/budget", label: "Budget", icon: Wallet },
    { path: "/savings", label: "Savings", icon: PiggyBank },
    { path: "/market", label: "Farm market", icon: Wheat },
  ],
  farmer: [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/farmer", label: "My crops", icon: Sprout },
    { path: "/farmer-offers", label: "Offers", icon: Handshake },
    { path: "/warehouses", label: "Warehouses", icon: Warehouse },
    { path: "/market", label: "Market prices", icon: Wheat },
  ],
  shop: [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/manage-products", label: "Products", icon: Package },
    { path: "/shop", label: "Orders", icon: ClipboardList },
    { path: "/alerts", label: "Stock alerts", icon: AlertTriangle },
  ],
  trader: [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/market", label: "Browse crops", icon: Wheat },
    { path: "/trader-offers", label: "My offers", icon: Handshake },
    { path: "/warehouses", label: "Warehouses", icon: Warehouse },
  ],
  seeker: [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/courses", label: "Courses", icon: GraduationCap },
    { path: "/jobs", label: "Jobs", icon: Briefcase },
  ],
  admin: [
    { path: "/dashboard", label: "Overview", icon: Home },
    { path: "/admin/verify", label: "Verify", icon: CheckCircle },
    { path: "/admin/post-job", label: "Post Job", icon: Briefcase },
    { path: "/alerts", label: "Stock alerts", icon: AlertTriangle },
    { path: "/admin/orders", label: "All orders", icon: Package },
  ],
};

const ROLE_LABEL: Record<string, string> = {
  customer: "Customer",
  farmer: "Farmer",
  shop: "Shopkeeper",
  trader: "Trader",
  seeker: "Job seeker",
  admin: "Admin",
};

/** More than this many items => show the first 4 plus a "More" sheet on phones */
const MOBILE_MAX = 5;

/**
 * One shared width + gutter rule for the top bar and the page content so they
 * always line up. Gutters follow the design system: 12px (<420), 16px, 26px (md+).
 * The 1680px cap only matters on ultra-wide monitors; remove it for truly edge-to-edge.
 */
const CONTENT_BOX = "mx-auto w-full max-w-[1680px] px-3 xs:px-4 md:px-[26px]";

function isActive(pathname: string, path: string) {
  if (pathname === path) return true;
  // A single shop page (/shop/:id) belongs to the customer's "Shops" item
  if (path === "/shops" && pathname.startsWith("/shop/")) return true;
  return false;
}

/** Turns true for ~300ms whenever `value` changes (used for the cart badge pop) */
function useBump(value: number) {
  const [bump, setBump] = useState(false);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setBump(true);
    const t = setTimeout(() => setBump(false), 300);
    return () => clearTimeout(t);
  }, [value]);
  return bump;
}

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function CartBadge({ count, bump, className = "" }: { count: number; bump: boolean; className?: string }) {
  return (
    <span
      className={`rounded-full bg-tomato px-1.5 text-[10px] font-bold leading-[18px] text-white transition-transform duration-300 ${
        bump ? "scale-150" : "scale-100"
      } ${className}`}
    >
      {count}
      <span className="sr-only"> items in cart</span>
    </span>
  );
}

function MoreSheet({
  open,
  onClose,
  items,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  pathname: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, open, onClose);
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end bg-[rgba(15,30,20,.55)] md:hidden"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="More pages"
        className="animate-rise w-full rounded-t-modal bg-paper p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-pop"
      >
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-display text-lg text-forest">More</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid h-11 w-11 place-items-center rounded-full text-mute transition-colors hover:bg-sage hover:text-forest"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <ul className="grid gap-1">
          {items.map(({ path, label, icon: Icon }) => {
            const active = isActive(pathname, path);
            return (
              <li key={path}>
                <Link
                  to={path}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-[48px] items-center gap-3 rounded-xl px-3 text-sm font-bold transition-colors ${
                    active ? "bg-sage text-forest" : "text-ink hover:bg-sage/60"
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

export default function Layout({ children }: { children: ReactNode }) {
  const { user, logout, cartCount } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const count = cartCount ?? 0;
  const bump = useBump(count);

  // Close the "More" sheet whenever the page changes
  useEffect(() => {
    setMoreOpen(false);
  }, [location.pathname]);

  // Soft shadow under the sticky top bar once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!user) return null;

  const nav = NAVS[user.role] ?? NAVS.customer;
  const mobileItems = nav.length > MOBILE_MAX ? nav.slice(0, 4) : nav;
  const overflowItems = nav.length > MOBILE_MAX ? nav.slice(4) : [];
  const moreActive = overflowItems.some((i) => isActive(location.pathname, i.path));

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.info("You have been signed out.");
  };

  return (
    <div className="flex min-h-screen bg-cream">
      {/* Keyboard users can jump straight to the page content */}
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-saffron px-4 py-2 text-sm font-bold text-[#3a2300] focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        Skip to content
      </a>

      {/* ---------------- Desktop sidebar: 236px on tablets, 272px from 1024px up ---------------- */}
      <aside className="fixed inset-y-0 z-20 hidden w-[236px] flex-col bg-forest p-4 text-[#d4ebdc] shadow-[8px_0_30px_rgba(10,40,25,.08)] md:flex lg:w-[272px]">
        <Link
          to="/dashboard"
          className="mb-3 block whitespace-nowrap rounded-xl px-3 py-5 font-display text-2xl font-extrabold tracking-tight text-white transition-opacity hover:opacity-90"
        >
          🌾 SHOPIOO AI
        </Link>

        <nav aria-label="Main" className="flex-1 overflow-y-auto">
          <ul>
            {nav.map(({ path, label, icon: Icon }) => {
              const active = isActive(location.pathname, path);
              return (
                <li key={path}>
                  <Link
                    to={path}
                    aria-current={active ? "page" : undefined}
                    className={`group relative mb-1.5 flex min-h-[52px] items-center gap-3.5 rounded-xl px-4 py-3 text-base transition-all duration-200 motion-reduce:transform-none ${
                      active
                        ? "bg-saffron font-bold text-[#3a2300] shadow-[0_5px_14px_rgba(242,163,58,.18)] before:absolute before:bottom-[20%] before:left-0 before:top-[20%] before:w-[3px] before:rounded-r before:bg-white before:content-['']"
                        : "font-medium hover:translate-x-[3px] hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon
                      size={22}
                      className="flex-none transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 motion-reduce:transform-none"
                      aria-hidden="true"
                    />
                    <span className="truncate">{label}</span>
                    {path === "/cart" && count > 0 && (
                      <CartBadge count={count} bump={bump} className="ml-auto" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto px-3 pb-1 text-sm opacity-70">SHOPIOO AI · Live Platform</div>
      </aside>

      {/* ---------------- Main column (margin matches the sidebar width) ---------------- */}
      <div className="min-w-0 flex-1 pb-24 md:ml-[236px] md:pb-8 lg:ml-[272px]">
        {/* Top bar: same width + gutters as <main> so the edges line up */}
        <header
          className={`sticky top-0 z-10 border-b border-line bg-cream/90 backdrop-blur-md transition-shadow duration-200 ${
            scrolled ? "shadow-card" : ""
          }`}
        >
          <div className={`${CONTENT_BOX} flex items-center justify-between gap-3 py-2.5`}>
            <div className="flex min-w-0 items-center gap-2.5">
              <div
                className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gradient-to-br from-leaf to-forest font-bold text-white"
                aria-hidden="true"
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="truncate font-bold">{user.name}</span>
            </div>
            <div className="flex flex-none items-center gap-2 sm:gap-3">
              <span className="pill">{ROLE_LABEL[user.role] ?? user.role}</span>
              <button
                type="button"
                onClick={handleLogout}
                aria-label="Sign out"
                className="flex min-h-[44px] items-center gap-1.5 rounded-full px-2 text-sm font-bold text-mute transition-colors hover:text-tomato"
              >
                <LogOut size={16} aria-hidden="true" />
                <span className="hidden xs:inline">Sign out</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content: fills the whole column (re-plays a short fade + lift on page change) */}
        <main
          id="main"
          tabIndex={-1}
          className={`${CONTENT_BOX} page-enter min-w-0 py-4 outline-none md:py-6`}
        >
          {children}
        </main>
      </div>

      {/* ---------------- Mobile bottom nav ---------------- */}
      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-white px-1 pt-1 pb-[max(.25rem,env(safe-area-inset-bottom))] md:hidden"
      >
        {mobileItems.map(({ path, label, icon: Icon }) => {
          const active = isActive(location.pathname, path);
          return (
            <Link
              key={path}
              to={path}
              aria-current={active ? "page" : undefined}
              className={`relative flex min-h-[52px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-[10px] font-bold transition-colors active:scale-95 ${
                active ? "bg-sage text-forest" : "text-mute"
              }`}
            >
              <span className="relative">
                <Icon size={20} aria-hidden="true" />
                {path === "/cart" && count > 0 && (
                  <CartBadge count={count} bump={bump} className="absolute -right-3 -top-2" />
                )}
              </span>
              <span className="max-w-full truncate">{label}</span>
            </Link>
          );
        })}

        {overflowItems.length > 0 && (
          <button
            type="button"
            onClick={() => setMoreOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={moreOpen}
            className={`flex min-h-[52px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-[10px] font-bold transition-colors active:scale-95 ${
              moreActive ? "bg-sage text-forest" : "text-mute"
            }`}
          >
            <MoreHorizontal size={20} aria-hidden="true" />
            <span>More</span>
          </button>
        )}
      </nav>

      <MoreSheet
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        items={overflowItems}
        pathname={location.pathname}
      />
    </div>
  );
}