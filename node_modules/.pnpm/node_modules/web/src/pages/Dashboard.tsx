// // import { useMemo } from "react";
// // import { Link } from "react-router-dom";
// // import { ChevronDown, ArrowUpRight } from "lucide-react";
// // import { useAuth } from "../context/AuthContext";
// // import Layout from "../components/Layout";
// // import CountUp from "../components/ui/CountUp";

// // /* ------------------------------------------------------------------ */
// // /* Static content (display only - no API calls on this page)           */
// // /* ------------------------------------------------------------------ */

// // const ROLE_LABEL: Record<string, string> = {
// //   customer: "Customer",
// //   farmer: "Farmer",
// //   shop: "Shopkeeper",
// //   trader: "Trader",
// //   seeker: "Job seeker",
// //   admin: "Admin",
// // };

// // const SUBTITLES: Record<string, string> = {
// //   customer: "Plan your food budget and shop from local stores.",
// //   farmer: "Check new offers and keep your listings fresh.",
// //   shop: "Keep stock updated and confirm new orders quickly.",
// //   trader: "Browse fresh crop listings and send offers.",
// //   seeker: "Learn a new skill and apply for local jobs.",
// //   admin: "Review pending verifications and low-stock alerts.",
// // };

// // interface QuickAction {
// //   icon: string;
// //   label: string;
// //   link: string;
// // }

// // const QUICK_ACTIONS: Record<string, QuickAction[]> = {
// //   customer: [
// //     { icon: "🛍️", label: "Find essentials", link: "/shops" },
// //     { icon: "🧺", label: "View cart", link: "/cart" },
// //     { icon: "💰", label: "Food budget", link: "/budget" },
// //   ],
// //   farmer: [
// //     { icon: "🌱", label: "List a crop", link: "/farmer" },
// //     { icon: "🤝", label: "Review offers", link: "/farmer-offers" },
// //     { icon: "🏭", label: "Find storage", link: "/warehouses" },
// //   ],
// //   shop: [
// //     { icon: "📋", label: "Manage products", link: "/manage-products" },
// //     { icon: "📦", label: "View orders", link: "/shop" },
// //     { icon: "⚠️", label: "Stock alerts", link: "/alerts" },
// //   ],
// //   trader: [
// //     { icon: "🌾", label: "Browse crops", link: "/market" },
// //     { icon: "🤝", label: "My offers", link: "/trader-offers" },
// //     { icon: "🏭", label: "Storage", link: "/warehouses" },
// //   ],
// //   seeker: [
// //     { icon: "🎓", label: "Explore courses", link: "/courses" },
// //     { icon: "💼", label: "Find jobs", link: "/jobs" },
// //     { icon: "📄", label: "My applications", link: "/jobs" },
// //   ],
// //   admin: [
// //     { icon: "✅", label: "Verify partners", link: "/admin/verify" },
// //     { icon: "⚠️", label: "Stock alerts", link: "/alerts" },
// //     { icon: "📦", label: "All orders", link: "/admin/orders" },
// //   ],
// // };

// // interface KpiData {
// //   label: string;
// //   /** numeric value is animated with a count-up */
// //   value?: number;
// //   /** use for non-numeric values such as "3/4" */
// //   text?: string;
// //   prefix?: string;
// //   suffix?: string;
// //   sub?: string;
// // }

// // const MISSION_CARDS = [
// //   { icon: "🌾", title: "AI Farmers Market", desc: "Explore crop listings, farmer-set prices and bulk supply.", link: "/market", action: "Browse market" },
// //   { icon: "🏪", title: "AI Local Multi-Shops", desc: "Find groceries, fresh produce, dairy and daily essentials.", link: "/shops", action: "Explore shops" },
// //   { icon: "🛡️", title: "Digital Food Security", desc: "Plan a monthly food budget, compare local prices and keep an eye on essentials.", link: "/budget", action: "Plan budget" },
// //   { icon: "🐷", title: "Digital Food Savings", desc: "Choose a voluntary savings rate and review your savings ledger.", link: "/savings", action: "View savings" },
// //   { icon: "🎓", title: "AI Skill Development", desc: "Build practical digital, shop-management and technical skills.", link: "/courses", action: "Explore skills" },
// //   { icon: "💼", title: "Youth Jobs & Self-employment", desc: "Discover roles across local shops, delivery, warehouses and digital services.", link: "/jobs", action: "Find opportunities" },
// // ];

// // /* ------------------------------------------------------------------ */
// // /* Small pieces                                                        */
// // /* ------------------------------------------------------------------ */

// // function Kpi({ label, value, text, prefix, suffix, sub }: KpiData) {
// //   return (
// //     <div className="kpi">
// //       <span>{label}</span>
// //       <b>
// //         {text !== undefined ? (
// //           text
// //         ) : (
// //           <CountUp value={value ?? 0} prefix={prefix} suffix={suffix} />
// //         )}
// //       </b>
// //       {sub && <small>{sub}</small>}
// //     </div>
// //   );
// // }

// // /* ------------------------------------------------------------------ */
// // /* Page                                                                */
// // /* ------------------------------------------------------------------ */

// // export default function Dashboard() {
// //   const { user, cartCount } = useAuth();
// //   const role = user?.role || "customer";

// //   const greeting = useMemo(() => {
// //     const h = new Date().getHours();
// //     return h < 12 ? "morning" : h < 17 ? "afternoon" : "evening";
// //   }, []);

// //   const today = useMemo(
// //     () =>
// //       new Date().toLocaleDateString("en-IN", {
// //         weekday: "long",
// //         day: "numeric",
// //         month: "long",
// //       }),
// //     []
// //   );

// //   const firstName = user?.name?.split(" ")[0] ?? "";
// //   const quickActions = QUICK_ACTIONS[role] ?? QUICK_ACTIONS.customer;

// //   // Role-specific KPIs (same figures as before; wire to real data later)
// //   const kpis: KpiData[] = useMemo(() => {
// //     if (role === "customer") {
// //       return [
// //         { label: "Active orders", value: 0 },
// //         { label: "Spent this month", value: 0, prefix: "₹", sub: "No budget set" },
// //         { label: "Savings balance", value: 0, prefix: "₹", sub: "Saving 1% per order" },
// //         { label: "Cart items", value: cartCount ?? 0 },
// //       ];
// //     }
// //     if (role === "seeker") {
// //       return [
// //         { label: "Courses enrolled", value: 0 },
// //         { label: "Completed", value: 0 },
// //         { label: "Applications", value: 0 },
// //       ];
// //     }
// //     if (role === "admin") {
// //       return [
// //         { label: "Verified shops", text: "3/4" },
// //         { label: "Pending verifications", value: 3 },
// //         { label: "Orders", value: 0 },
// //         { label: "GMV", value: 0, prefix: "₹" },
// //         { label: "Low-stock alerts", value: 4 },
// //         { label: "Crop listings", value: 6 },
// //       ];
// //     }
// //     return [
// //       { label: "Active listings", value: 0 },
// //       { label: "Pending offers", value: 0 },
// //       { label: "Stock listed", value: 0, suffix: " kg" },
// //       { label: "Storage bookings", value: 0 },
// //     ];
// //   }, [role, cartCount]);

// //   const kpiCols = role === "seeker" ? "md:grid-cols-3" : "md:grid-cols-4";

// //   return (
// //     <Layout>
// //       <div className="page-enter">
// //         {/* Greeting */}
// //         <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
// //           <div>
// //             <h1 className="mb-1 font-display text-3xl font-bold text-forest md:text-4xl">
// //               Good {greeting}
// //               {firstName ? `, ${firstName}` : ""}{" "}
// //               <span className="wave" aria-hidden="true">
// //                 👋
// //               </span>
// //             </h1>
// //             <p className="text-sm text-mute">
// //               {ROLE_LABEL[role] ?? role} dashboard · {today}
// //             </p>
// //             <p className="mt-1 text-sm text-mute">{SUBTITLES[role]}</p>
// //           </div>
// //           <span
// //             className="live-dot cursor-help"
// //             title="Demo mode: sample data and no real payments"
// //           >
// //             <i aria-hidden="true" />
// //             Demo mode
// //           </span>
// //         </header>

// //         {/* Quick actions */}
// //         <section
// //           aria-labelledby="quick-actions-title"
// //           className="mb-8 rounded-2xl border border-line bg-gradient-to-r from-sage/70 to-paper p-4"
// //         >
// //           <div className="mb-3 flex flex-wrap items-center justify-between gap-1">
// //             <h2 id="quick-actions-title" className="font-sans text-sm font-bold text-forest">
// //               Quick actions
// //             </h2>
// //             <span className="text-xs text-mute">Jump straight into your tasks</span>
// //           </div>
// //           <div className="stagger grid grid-cols-1 gap-3 md:grid-cols-3">
// //             {quickActions.map((qa) => (
// //               <Link
// //                 key={qa.label}
// //                 to={qa.link}
// //                 className="group flex min-h-[48px] items-center gap-3 rounded-xl border border-line bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#b9d4bd] hover:shadow-lift motion-reduce:hover:translate-y-0"
// //               >
// //                 <span className="text-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transform-none" aria-hidden="true">
// //                   {qa.icon}
// //                 </span>
// //                 <span className="flex-1 text-sm font-bold">{qa.label}</span>
// //                 <ArrowUpRight
// //                   className="h-5 w-5 text-leaf transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
// //                   aria-hidden="true"
// //                 />
// //               </Link>
// //             ))}
// //           </div>
// //         </section>

// //         {/* Role-specific KPIs */}
// //         <section aria-label="Key numbers" className={`stagger mb-6 grid grid-cols-2 gap-4 ${kpiCols}`}>
// //           {kpis.map((k) => (
// //             <Kpi key={k.label} {...k} />
// //           ))}
// //         </section>

// //         {/* Job seekers only */}
// //         {role === "seeker" && (
// //           <p
// //             role="note"
// //             className="mb-8 rounded-r-lg border-l-4 border-saffron bg-saffron/10 py-2 pl-3 pr-3 text-sm text-ink"
// //           >
// //             Completing a course earns a completion certificate. It does not guarantee a job.
// //           </p>
// //         )}

// //         {/* Collapsible mission section */}
// //         <details className="group mb-8 overflow-hidden rounded-2xl border border-line bg-paper shadow-card">
// //           <summary className="flex min-h-[64px] cursor-pointer list-none items-center gap-4 p-4 transition-colors hover:bg-sage/50 [&::-webkit-details-marker]:hidden">
// //             <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-sage text-2xl" aria-hidden="true">
// //               🌾
// //             </div>
// //             <div className="flex-1">
// //               <h2 className="font-sans text-base font-bold text-forest">
// //                 Food Security &amp; Youth Employment Mission
// //               </h2>
// //               <p className="text-xs text-mute">Six services · supply chain · pilot · jobs</p>
// //             </div>
// //             <ChevronDown
// //               className="h-6 w-6 flex-none text-leaf2 transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none"
// //               aria-hidden="true"
// //             />
// //           </summary>

// //           <div className="border-t border-line p-4 pt-0">
// //             <div className="relative my-4 overflow-hidden rounded-2xl bg-gradient-to-br from-[#103b29] to-[#398653] p-6 text-white">
// //               <span
// //                 className="pointer-events-none absolute -bottom-4 right-4 select-none text-[7rem] leading-none opacity-15"
// //                 aria-hidden="true"
// //               >
// //                 🌾
// //               </span>
// //               <div className="relative z-10">
// //                 <span className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold tracking-wider">
// //                   🌱 SHAPIOO AI MISSION
// //                 </span>
// //                 <h3 className="mb-2 font-display text-2xl leading-tight md:text-3xl">
// //                   Better food access.
// //                   <br />
// //                   <span className="text-[#ffd17c]">Stronger local livelihoods.</span>
// //                 </h3>
// //                 <p className="max-w-lg text-sm text-sage">
// //                   One connected platform to help farmers reach buyers, local shops serve
// //                   families, households plan food spending, and young people build skills and
// //                   find work.
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="stagger mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
// //               {MISSION_CARDS.map((mc) => (
// //                 <Link key={mc.title} to={mc.link} className="card group/card flex flex-col p-4">
// //                   <div
// //                     className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-sage text-xl transition-transform duration-300 group-hover/card:-rotate-6 group-hover/card:scale-110 motion-reduce:transform-none"
// //                     aria-hidden="true"
// //                   >
// //                     {mc.icon}
// //                   </div>
// //                   <h3 className="mb-1 font-sans text-sm font-bold text-forest">{mc.title}</h3>
// //                   <p className="mb-3 flex-1 text-xs leading-relaxed text-mute">{mc.desc}</p>
// //                   <div className="mt-auto flex items-center justify-between border-t border-line pt-3 text-xs font-bold text-leaf2">
// //                     <span>{mc.action}</span>
// //                     <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
// //                   </div>
// //                 </Link>
// //               ))}
// //             </div>
// //           </div>
// //         </details>
// //       </div>
// //     </Layout>
// //   );
// // }


// import { useMemo } from "react";
// import { Link } from "react-router-dom";
// import { ChevronDown, ArrowUpRight } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import Layout from "../components/Layout";
// import CountUp from "../components/ui/CountUp";

// /* ------------------------------------------------------------------ */
// /* Static content (display only - no API calls on this page)           */
// /* ------------------------------------------------------------------ */

// const ROLE_LABEL: Record<string, string> = {
//   customer: "Customer",
//   farmer: "Farmer",
//   shop: "Shopkeeper",
//   trader: "Trader",
//   seeker: "Job seeker",
//   admin: "Admin",
// };

// const SUBTITLES: Record<string, string> = {
//   customer: "Plan your food budget and shop from local stores.",
//   farmer: "Check new offers and keep your listings fresh.",
//   shop: "Keep stock updated and confirm new orders quickly.",
//   trader: "Browse fresh crop listings and send offers.",
//   seeker: "Learn a new skill and apply for local jobs.",
//   admin: "Review pending verifications and low-stock alerts.",
// };

// interface QuickAction {
//   icon: string;
//   label: string;
//   link: string;
// }

// const QUICK_ACTIONS: Record<string, QuickAction[]> = {
//   customer: [
//     { icon: "🛍️", label: "Find essentials", link: "/shops" },
//     { icon: "🧺", label: "View cart", link: "/cart" },
//     { icon: "💰", label: "Food budget", link: "/budget" },
//   ],
//   farmer: [
//     { icon: "🌱", label: "List a crop", link: "/farmer" },
//     { icon: "🤝", label: "Review offers", link: "/farmer-offers" },
//     { icon: "🏭", label: "Find storage", link: "/warehouses" },
//   ],
//   shop: [
//     { icon: "📋", label: "Manage products", link: "/manage-products" },
//     { icon: "📦", label: "View orders", link: "/shop" },
//     { icon: "⚠️", label: "Stock alerts", link: "/alerts" },
//   ],
//   trader: [
//     { icon: "🌾", label: "Browse crops", link: "/market" },
//     { icon: "🤝", label: "My offers", link: "/trader-offers" },
//     { icon: "🏭", label: "Storage", link: "/warehouses" },
//   ],
//   seeker: [
//     { icon: "🎓", label: "Explore courses", link: "/courses" },
//     { icon: "💼", label: "Find jobs", link: "/jobs" },
//     { icon: "📄", label: "My applications", link: "/jobs" },
//   ],
//   admin: [
//     { icon: "✅", label: "Verify partners", link: "/admin/verify" },
//     { icon: "⚠️", label: "Stock alerts", link: "/alerts" },
//     { icon: "📦", label: "All orders", link: "/admin/orders" },
//   ],
// };

// interface KpiData {
//   label: string;
//   /** numeric value is animated with a count-up */
//   value?: number;
//   /** use for non-numeric values such as "3/4" */
//   text?: string;
//   prefix?: string;
//   suffix?: string;
//   sub?: string;
// }

// const MISSION_CARDS = [
//   { icon: "🌾", title: "AI Farmers Market", desc: "Explore crop listings, farmer-set prices and bulk supply.", link: "/market", action: "Browse market" },
//   { icon: "🏪", title: "AI Local Multi-Shops", desc: "Find groceries, fresh produce, dairy and daily essentials.", link: "/shops", action: "Explore shops" },
//   { icon: "🛡️", title: "Digital Food Security", desc: "Plan a monthly food budget, compare local prices and keep an eye on essentials.", link: "/budget", action: "Plan budget" },
//   { icon: "🐷", title: "Digital Food Savings", desc: "Choose a voluntary savings rate and review your savings ledger.", link: "/savings", action: "View savings" },
//   { icon: "🎓", title: "AI Skill Development", desc: "Build practical digital, shop-management and technical skills.", link: "/courses", action: "Explore skills" },
//   { icon: "💼", title: "Youth Jobs & Self-employment", desc: "Discover roles across local shops, delivery, warehouses and digital services.", link: "/jobs", action: "Find opportunities" },
// ];

// /* ------------------------------------------------------------------ */
// /* Small pieces                                                        */
// /* ------------------------------------------------------------------ */

// function Kpi({ label, value, text, prefix, suffix, sub }: KpiData) {
//   return (
//     <div className="kpi">
//       <span>{label}</span>
//       <b>
//         {text !== undefined ? (
//           text
//         ) : (
//           <CountUp value={value ?? 0} prefix={prefix} suffix={suffix} />
//         )}
//       </b>
//       {sub && <small>{sub}</small>}
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ */
// /* Page                                                                */
// /* ------------------------------------------------------------------ */

// export default function Dashboard() {
//   const { user, cartCount } = useAuth();
//   const role = user?.role || "customer";

//   const greeting = useMemo(() => {
//     const h = new Date().getHours();
//     return h < 12 ? "morning" : h < 17 ? "afternoon" : "evening";
//   }, []);

//   const today = useMemo(
//     () =>
//       new Date().toLocaleDateString("en-IN", {
//         weekday: "long",
//         day: "numeric",
//         month: "long",
//       }),
//     []
//   );

//   const firstName = user?.name?.split(" ")[0] ?? "";
//   const quickActions = QUICK_ACTIONS[role] ?? QUICK_ACTIONS.customer;

//   // Role-specific KPIs (same figures as before; wire to real data later)
//   const kpis: KpiData[] = useMemo(() => {
//     if (role === "customer") {
//       return [
//         { label: "Active orders", value: 0 },
//         { label: "Spent this month", value: 0, prefix: "₹", sub: "No budget set" },
//         { label: "Savings balance", value: 0, prefix: "₹", sub: "Saving 1% per order" },
//         { label: "Cart items", value: cartCount ?? 0 },
//       ];
//     }
//     if (role === "seeker") {
//       return [
//         { label: "Courses enrolled", value: 0 },
//         { label: "Completed", value: 0 },
//         { label: "Applications", value: 0 },
//       ];
//     }
//     if (role === "admin") {
//       return [
//         { label: "Verified shops", text: "3/4" },
//         { label: "Pending verifications", value: 3 },
//         { label: "Orders", value: 0 },
//         { label: "GMV", value: 0, prefix: "₹" },
//         { label: "Low-stock alerts", value: 4 },
//         { label: "Crop listings", value: 6 },
//       ];
//     }
//     return [
//       { label: "Active listings", value: 0 },
//       { label: "Pending offers", value: 0 },
//       { label: "Stock listed", value: 0, suffix: " kg" },
//       { label: "Storage bookings", value: 0 },
//     ];
//   }, [role, cartCount]);

//   const kpiCols = role === "seeker" ? "md:grid-cols-3" : "md:grid-cols-4";

//   return (
//     <Layout>
//       <div>
//         {/* Greeting */}
//         <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
//           <div>
//             <h1 className="mb-1 font-display text-3xl font-bold text-forest md:text-4xl">
//               Good {greeting}
//               {firstName ? `, ${firstName}` : ""}{" "}
//               <span className="wave" aria-hidden="true">
//                 👋
//               </span>
//             </h1>
//             <p className="text-sm text-mute">
//               {ROLE_LABEL[role] ?? role} dashboard · {today}
//             </p>
//             <p className="mt-1 text-sm text-mute">{SUBTITLES[role]}</p>
//           </div>
//           <span
//             className="live-dot cursor-help"
//             title="Demo mode: sample data and no real payments"
//           >
//             <i aria-hidden="true" />
//             Demo mode
//           </span>
//         </header>

//         {/* Quick actions */}
//         <section
//           aria-labelledby="quick-actions-title"
//           className="mb-8 rounded-2xl border border-line bg-gradient-to-r from-sage/70 to-paper p-4"
//         >
//           <div className="mb-3 flex flex-wrap items-center justify-between gap-1">
//             <h2 id="quick-actions-title" className="font-sans text-sm font-bold text-forest">
//               Quick actions
//             </h2>
//             <span className="text-xs text-mute">Jump straight into your tasks</span>
//           </div>
//           <div className="stagger grid grid-cols-1 gap-3 md:grid-cols-3">
//             {quickActions.map((qa) => (
//               <Link
//                 key={qa.label}
//                 to={qa.link}
//                 className="group flex min-h-[48px] items-center gap-3 rounded-xl border border-line bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#b9d4bd] hover:shadow-lift motion-reduce:hover:translate-y-0"
//               >
//                 <span className="text-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transform-none" aria-hidden="true">
//                   {qa.icon}
//                 </span>
//                 <span className="flex-1 text-sm font-bold">{qa.label}</span>
//                 <ArrowUpRight
//                   className="h-5 w-5 text-leaf transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
//                   aria-hidden="true"
//                 />
//               </Link>
//             ))}
//           </div>
//         </section>

//         {/* Role-specific KPIs */}
//         <section aria-label="Key numbers" className={`stagger mb-6 grid grid-cols-2 gap-4 ${kpiCols}`}>
//           {kpis.map((k) => (
//             <Kpi key={k.label} {...k} />
//           ))}
//         </section>

//         {/* Job seekers only */}
//         {role === "seeker" && (
//           <p
//             role="note"
//             className="mb-8 rounded-r-lg border-l-4 border-saffron bg-saffron/10 py-2 pl-3 pr-3 text-sm text-ink"
//           >
//             Completing a course earns a completion certificate. It does not guarantee a job.
//           </p>
//         )}

//         {/* Collapsible mission section */}
//         <details className="group mb-8 overflow-hidden rounded-2xl border border-line bg-paper shadow-card">
//           <summary className="flex min-h-[64px] cursor-pointer list-none items-center gap-4 p-4 transition-colors hover:bg-sage/50 [&::-webkit-details-marker]:hidden">
//             <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-sage text-2xl" aria-hidden="true">
//               🌾
//             </div>
//             <div className="flex-1">
//               <h2 className="font-sans text-base font-bold text-forest">
//                 Food Security &amp; Youth Employment Mission
//               </h2>
//               <p className="text-xs text-mute">Six services · supply chain · pilot · jobs</p>
//             </div>
//             <ChevronDown
//               className="h-6 w-6 flex-none text-leaf2 transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none"
//               aria-hidden="true"
//             />
//           </summary>

//           <div className="border-t border-line p-4 pt-0">
//             <div className="relative my-4 overflow-hidden rounded-2xl bg-gradient-to-br from-[#103b29] to-[#398653] p-6 text-white">
//               <span
//                 className="pointer-events-none absolute -bottom-4 right-4 select-none text-[7rem] leading-none opacity-15"
//                 aria-hidden="true"
//               >
//                 🌾
//               </span>
//               <div className="relative z-10">
//                 <span className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold tracking-wider">
//                   🌱 SHAPIOO AI MISSION
//                 </span>
//                 <h3 className="mb-2 font-display text-2xl leading-tight md:text-3xl">
//                   Better food access.
//                   <br />
//                   <span className="text-[#ffd17c]">Stronger local livelihoods.</span>
//                 </h3>
//                 <p className="max-w-lg text-sm text-sage">
//                   One connected platform to help farmers reach buyers, local shops serve
//                   families, households plan food spending, and young people build skills and
//                   find work.
//                 </p>
//               </div>
//             </div>

//             <div className="stagger mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
//               {MISSION_CARDS.map((mc) => (
//                 <Link key={mc.title} to={mc.link} className="card group/card flex flex-col p-4">
//                   <div
//                     className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-sage text-xl transition-transform duration-300 group-hover/card:-rotate-6 group-hover/card:scale-110 motion-reduce:transform-none"
//                     aria-hidden="true"
//                   >
//                     {mc.icon}
//                   </div>
//                   <h3 className="mb-1 font-sans text-sm font-bold text-forest">{mc.title}</h3>
//                   <p className="mb-3 flex-1 text-xs leading-relaxed text-mute">{mc.desc}</p>
//                   <div className="mt-auto flex items-center justify-between border-t border-line pt-3 text-xs font-bold text-leaf2">
//                     <span>{mc.action}</span>
//                     <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </details>
//       </div>
//     </Layout>
//   );
// }

import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import CountUp from "../components/ui/CountUp";

/* ------------------------------------------------------------------ */
/* Static content (display only - no API calls on this page)           */
/* ------------------------------------------------------------------ */

const ROLE_LABEL: Record<string, string> = {
  customer: "Customer",
  farmer: "Farmer",
  shop: "Shopkeeper",
  trader: "Trader",
  seeker: "Job seeker",
  admin: "Admin",
};

const SUBTITLES: Record<string, string> = {
  customer: "Plan your food budget and shop from local stores.",
  farmer: "Check new offers and keep your listings fresh.",
  shop: "Keep stock updated and confirm new orders quickly.",
  trader: "Browse fresh crop listings and send offers.",
  seeker: "Learn a new skill and apply for local jobs.",
  admin: "Review pending verifications and low-stock alerts.",
};

interface QuickAction {
  icon: string;
  label: string;
  link: string;
}

const QUICK_ACTIONS: Record<string, QuickAction[]> = {
  customer: [
    { icon: "🛍️", label: "Find essentials", link: "/shops" },
    { icon: "🧺", label: "View cart", link: "/cart" },
    { icon: "💰", label: "Food budget", link: "/budget" },
  ],
  farmer: [
    { icon: "🌱", label: "List a crop", link: "/farmer" },
    { icon: "🤝", label: "Review offers", link: "/farmer-offers" },
    { icon: "🏭", label: "Find storage", link: "/warehouses" },
  ],
  shop: [
    { icon: "📋", label: "Manage products", link: "/manage-products" },
    { icon: "📦", label: "View orders", link: "/shop" },
    { icon: "⚠️", label: "Stock alerts", link: "/alerts" },
  ],
  trader: [
    { icon: "🌾", label: "Browse crops", link: "/market" },
    { icon: "🤝", label: "My offers", link: "/trader-offers" },
    { icon: "🏭", label: "Storage", link: "/warehouses" },
  ],
  seeker: [
    { icon: "🎓", label: "Explore courses", link: "/courses" },
    { icon: "💼", label: "Find jobs", link: "/jobs" },
    { icon: "📄", label: "My applications", link: "/jobs" },
  ],
  admin: [
    { icon: "✅", label: "Verify partners", link: "/admin/verify" },
    { icon: "⚠️", label: "Stock alerts", link: "/alerts" },
    { icon: "📦", label: "All orders", link: "/admin/orders" },
  ],
};

interface KpiData {
  label: string;
  /** numeric value is animated with a count-up */
  value?: number;
  /** use for non-numeric values such as "3/4" */
  text?: string;
  prefix?: string;
  suffix?: string;
  sub?: string;
}

const MISSION_CARDS = [
  { icon: "🌾", title: "AI Farmers Market", desc: "Explore crop listings, farmer-set prices and bulk supply.", link: "/market", action: "Browse market" },
  { icon: "🏪", title: "AI Local Multi-Shops", desc: "Find groceries, fresh produce, dairy and daily essentials.", link: "/shops", action: "Explore shops" },
  { icon: "🛡️", title: "Digital Food Security", desc: "Plan a monthly food budget, compare local prices and keep an eye on essentials.", link: "/budget", action: "Plan budget" },
  { icon: "🐷", title: "Digital Food Savings", desc: "Choose a voluntary savings rate and review your savings ledger.", link: "/savings", action: "View savings" },
  { icon: "🎓", title: "AI Skill Development", desc: "Build practical digital, shop-management and technical skills.", link: "/courses", action: "Explore skills" },
  { icon: "💼", title: "Youth Jobs & Self-employment", desc: "Discover roles across local shops, delivery, warehouses and digital services.", link: "/jobs", action: "Find opportunities" },
];

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function Kpi({ label, value, text, prefix, suffix, sub }: KpiData) {
  return (
    <div className="kpi">
      <span>{label}</span>
      <b>
        {text !== undefined ? (
          text
        ) : (
          <CountUp value={value ?? 0} prefix={prefix} suffix={suffix} />
        )}
      </b>
      {sub && <small>{sub}</small>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Dashboard() {
  const { user, cartCount } = useAuth();
  const role = user?.role || "customer";

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    return h < 12 ? "morning" : h < 17 ? "afternoon" : "evening";
  }, []);

  const today = useMemo(
    () =>
      new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
    []
  );

  const firstName = user?.name?.split(" ")[0] ?? "";
  const quickActions = QUICK_ACTIONS[role] ?? QUICK_ACTIONS.customer;

  // Role-specific KPIs (same figures as before; wire to real data later)
  const kpis: KpiData[] = useMemo(() => {
    if (role === "customer") {
      return [
        { label: "Active orders", value: 0 },
        { label: "Spent this month", value: 0, prefix: "₹", sub: "No budget set" },
        { label: "Savings balance", value: 0, prefix: "₹", sub: "Saving 1% per order" },
        { label: "Cart items", value: cartCount ?? 0 },
      ];
    }
    if (role === "seeker") {
      return [
        { label: "Courses enrolled", value: 0 },
        { label: "Completed", value: 0 },
        { label: "Applications", value: 0 },
      ];
    }
    if (role === "admin") {
      return [
        { label: "Verified shops", text: "3/4" },
        { label: "Pending verifications", value: 3 },
        { label: "Orders", value: 0 },
        { label: "GMV", value: 0, prefix: "₹" },
        { label: "Low-stock alerts", value: 4 },
        { label: "Crop listings", value: 6 },
      ];
    }
    return [
      { label: "Active listings", value: 0 },
      { label: "Pending offers", value: 0 },
      { label: "Stock listed", value: 0, suffix: " kg" },
      { label: "Storage bookings", value: 0 },
    ];
  }, [role, cartCount]);

  return (
    <Layout>
      <div className="w-full">
        {/* Greeting */}
        <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="mb-1 font-display text-[1.65rem] font-bold tracking-[-0.025em] text-forest md:text-[2.1rem]">
              Good {greeting}
              {firstName ? `, ${firstName}` : ""}{" "}
              <span className="wave" aria-hidden="true">
                👋
              </span>
            </h1>
            <p className="text-[0.8125rem] text-mute">
              {ROLE_LABEL[role] ?? role} dashboard · {today}
            </p>
            <p className="mt-1 text-[0.8125rem] text-mute">{SUBTITLES[role]}</p>
          </div>
          <span
            className="live-dot cursor-help"
            title="Demo mode: sample data and no real payments"
          >
            <i aria-hidden="true" />
            Demo mode
          </span>
        </header>

        {/* Quick actions: cards share the full row evenly, wrap on narrow screens */}
        <section
          aria-labelledby="quick-actions-title"
          className="mb-6 rounded-2xl border border-line bg-gradient-to-r from-sage/70 to-paper p-4"
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-1">
            <h2 id="quick-actions-title" className="font-sans text-sm font-bold text-forest">
              Quick actions
            </h2>
            <span className="text-xs text-mute">Jump straight into your tasks</span>
          </div>
          <div className="stagger grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
            {quickActions.map((qa) => (
              <Link
                key={qa.label}
                to={qa.link}
                className="group flex min-h-[48px] items-center gap-3 rounded-xl border border-line bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#b9d4bd] hover:shadow-lift motion-reduce:hover:translate-y-0"
              >
                <span className="text-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transform-none" aria-hidden="true">
                  {qa.icon}
                </span>
                <span className="flex-1 text-sm font-bold">{qa.label}</span>
                <ArrowUpRight
                  className="h-5 w-5 text-leaf transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </section>

        {/* Role-specific KPIs: auto-fit stretches 3, 4 or 6 cards across the full width */}
        <section
          aria-label="Key numbers"
          className="stagger mb-6 grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(170px,1fr))]"
        >
          {kpis.map((k) => (
            <Kpi key={k.label} {...k} />
          ))}
        </section>

        {/* Job seekers only */}
        {role === "seeker" && (
          <p
            role="note"
            className="mb-6 rounded-r-lg border-l-4 border-saffron bg-saffron/10 py-2.5 pl-3 pr-3 text-sm text-ink"
          >
            Completing a course earns a completion certificate. It does not guarantee a job.
          </p>
        )}

        {/* Collapsible mission section */}
        <details className="group mb-6 overflow-hidden rounded-2xl border border-line bg-paper shadow-card">
          <summary className="flex min-h-[64px] cursor-pointer list-none items-center gap-4 p-4 transition-colors hover:bg-sage/50 [&::-webkit-details-marker]:hidden">
            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-sage text-2xl" aria-hidden="true">
              🌾
            </div>
            <div className="flex-1">
              <h2 className="font-sans text-base font-bold text-forest">
                Food Security &amp; Youth Employment Mission
              </h2>
              <p className="text-xs text-mute">Six services · supply chain · pilot · jobs</p>
            </div>
            <ChevronDown
              className="h-6 w-6 flex-none text-leaf2 transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </summary>

          <div className="border-t border-line p-4 pt-0">
            <div className="relative my-4 overflow-hidden rounded-2xl bg-gradient-to-br from-[#103b29] to-[#398653] p-6 text-white">
              <span
                className="pointer-events-none absolute -bottom-4 right-4 select-none text-[7rem] leading-none opacity-15"
                aria-hidden="true"
              >
                🌾
              </span>
              <div className="relative z-10">
                <span className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold tracking-wider">
                  🌱 SHAPIOO AI MISSION
                </span>
                <h3 className="mb-2 font-display text-2xl leading-tight md:text-3xl">
                  Better food access.
                  <br />
                  <span className="text-[#ffd17c]">Stronger local livelihoods.</span>
                </h3>
                <p className="max-w-2xl text-sm text-sage">
                  One connected platform to help farmers reach buyers, local shops serve
                  families, households plan food spending, and young people build skills and
                  find work.
                </p>
              </div>
            </div>

            {/* 1 / 2 / 3 columns so six cards always fill complete rows */}
            <div className="stagger mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
              {MISSION_CARDS.map((mc) => (
                <Link key={mc.title} to={mc.link} className="card group/card flex flex-col p-4">
                  <div
                    className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-sage text-xl transition-transform duration-300 group-hover/card:-rotate-6 group-hover/card:scale-110 motion-reduce:transform-none"
                    aria-hidden="true"
                  >
                    {mc.icon}
                  </div>
                  <h3 className="mb-1 font-sans text-sm font-bold text-forest">{mc.title}</h3>
                  <p className="mb-3 flex-1 text-xs leading-relaxed text-mute">{mc.desc}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-line pt-3 text-xs font-bold text-leaf2">
                    <span>{mc.action}</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </details>
      </div>
    </Layout>
  );
}