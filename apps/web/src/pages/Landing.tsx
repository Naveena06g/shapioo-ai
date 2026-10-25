// import { useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import {
//   ArrowUpRight,
//   ArrowDown,
//   AlertTriangle,
//   CloudRain,
//   Sprout,
//   TrendingUp,
//   ShoppingBasket,
//   Handshake,
//   PiggyBank,
//   Wallet,
//   type LucideIcon,
// } from "lucide-react";
// import CountUp from "../components/ui/CountUp";
// import Reveal from "../components/ui/Reveal";
// import PhotoTile from "../components/ui/PhotoTile";
// import { IMAGES, type ImageAsset } from "../lib/images";

// /* ------------------------------------------------------------------ */
// /* Content                                                             */
// /* ------------------------------------------------------------------ */

// const HERO_IMAGE = "/images/hero-farm.webp";
// const CONTENT_BOX = "mx-auto w-full max-w-[1680px] px-3 xs:px-4 md:px-8 lg:px-12";

// interface Pillar {
//   icon: string;
//   title: string;
//   desc: string;
//   image: ImageAsset;
// }

// const PILLARS: Pillar[] = [
//   { icon: "🌾", title: "AI Farmers Market", image: IMAGES.pillars.farmersMarket, desc: "Farmers can register crops, quantity, quality and availability; connect with traders and shopkeepers; view market information; explore demand forecasting and warehouse options." },
//   { icon: "🏪", title: "AI Local Multi-Shops", image: IMAGES.pillars.localShops, desc: "Bring kirana stores, fruit and vegetable stalls, rice and pulses shops, wholesalers, dairy stores, hotels and tiffin centres into a digital local network." },
//   { icon: "🛡️", title: "Digital Food Security Platform", image: IMAGES.pillars.foodSecurity, desc: "Plan essential household items and monthly budgets, compare prices across local shops, view stock information and surface areas that may need food-supply support." },
//   { icon: "🐷", title: "Digital Food Savings Policy", image: IMAGES.pillars.foodSavings, desc: "Design an optional, customer-consented way to set aside a small amount from purchases, with clear records, transparency and appropriate financial-partner and regulatory review." },
//   { icon: "🎓", title: "AI Skill Development Centers", image: IMAGES.pillars.skills, desc: "Build practical capabilities in digital shop management, billing, inventory, computer skills, marketing, agricultural digital services and technology." },
//   { icon: "💼", title: "Self-Employment & Jobs for Youth", image: IMAGES.pillars.jobs, desc: "Create pathways into digital billing, stock management, order handling, delivery, customer support, farmer coordination, warehousing and app support." },
// ];

// /**
//  * Super El Niño: how the effect could travel from the sky to the kitchen.
//  * Wording is deliberately conditional ("can", "could") and has no invented
//  * statistics: add numbers only with a cited source (IMD, NOAA, FAO).
//  */
// interface Step {
//   icon: LucideIcon;
//   title: string;
//   desc: string;
// }

// const EFFECT_CHAIN: Step[] = [
//   { icon: CloudRain, title: "Monsoon disruption", desc: "Delayed or uneven rains can upset sowing and harvest cycles." },
//   { icon: Sprout, title: "Lower crop yields", desc: "Stressed fields can mean less produce reaching the market." },
//   { icon: TrendingUp, title: "Rising food prices", desc: "Tighter supply can push up the cost of everyday staples." },
//   { icon: ShoppingBasket, title: "Household food stress", desc: "Families feel it first in the monthly grocery bill." },
// ];

// const RESPONSES: Step[] = [
//   { icon: Handshake, title: "Connect the supply", desc: "Farmers list crops and storage so buyers and shops can find supply early." },
//   { icon: PiggyBank, title: "Save for food", desc: "Optional, consented savings set aside a small amount from purchases." },
//   { icon: Wallet, title: "Plan and compare", desc: "Monthly budgets and local price comparison help families plan ahead." },
// ];

// const FLOW = [
//   { icon: "🧑‍🌾", label: "Farmer" },
//   { icon: "📱", label: "AI Farmer Market" },
//   { icon: "🏭", label: "Warehouse" },
//   { icon: "🚛", label: "Wholesale" },
//   { icon: "🏪", label: "Local shop" },
//   { icon: "👨‍👩‍👧‍👦", label: "Family" },
// ];

// const PILOT = [
//   { value: 1, label: "Mandal" },
//   { value: 20, label: "Farmers" },
//   { value: 20, label: "Local shops" },
//   { value: 500, label: "Families" },
// ];

// /* ------------------------------------------------------------------ */
// /* Scroll progress                                                     */
// /* ------------------------------------------------------------------ */

// function ScrollProgress() {
//   const bar = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     let raf = 0;
//     const update = () => {
//       raf = 0;
//       const el = document.documentElement;
//       const max = el.scrollHeight - el.clientHeight;
//       if (bar.current) bar.current.style.width = `${max > 0 ? (el.scrollTop / max) * 100 : 0}%`;
//     };
//     const onScroll = () => {
//       if (!raf) raf = requestAnimationFrame(update);
//     };
//     update();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     window.addEventListener("resize", onScroll);
//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", onScroll);
//       if (raf) cancelAnimationFrame(raf);
//     };
//   }, []);

//   return (
//     <div className="fixed left-0 top-0 z-[999] h-[3px] w-full" aria-hidden="true">
//       <div
//         ref={bar}
//         className="h-full w-0 bg-gradient-to-r from-saffron via-[#6fbd76] to-saffron shadow-[0_0_10px_rgba(242,163,58,.4)]"
//       />
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ */
// /* Page                                                                */
// /* ------------------------------------------------------------------ */

// export default function Landing() {
//   return (
//     <div className="min-h-screen bg-cream">
//       <ScrollProgress />

//       {/* Top bar */}
//       <header className={`${CONTENT_BOX} flex items-center justify-between py-4`}>
//         <Link
//           to="/"
//           className="font-display text-2xl font-extrabold text-forest transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
//           aria-label="SHAPIOO AI home"
//         >
//           🌾 SHAPIOO AI
//         </Link>
//         <nav className="flex gap-3" aria-label="Primary">
//           <a href="#services" className="btn btn-l btn-sm hidden md:inline-flex">
//             Explore mission
//           </a>
//           <Link to="/login" className="btn btn-d btn-sm">
//             Role-based login →
//           </Link>
//         </nav>
//       </header>

//       <main className={`${CONTENT_BOX} pb-16`}>
//         {/* ============================ HERO ============================ */}
//         <section
//           aria-labelledby="hero-title"
//           className="animate-card relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#103b29] via-[#216b43] to-[#398653] p-6 text-white shadow-pop sm:p-10 lg:flex lg:min-h-[calc(100dvh-6rem)] lg:items-center lg:p-14 xl:p-16"
//         >
//           <div
//             aria-hidden="true"
//             className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
//             style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
//           />
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-saffron/25 blur-3xl"
//           />
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute bottom-2 right-6 hidden select-none text-[11rem] leading-none opacity-10 -rotate-12 lg:block"
//           >
//             🌾
//           </div>

//           <div className="relative z-10 w-full">
//             <span className="mb-6 inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-bold tracking-wider">
//               FOOD SECURITY · DIGITAL SAVINGS · YOUTH EMPLOYMENT
//             </span>

//             <h1
//               id="hero-title"
//               className="mb-8 max-w-5xl text-balance font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl"
//             >
//               <span className="block">SHAPIOO AI Food&nbsp;Security&nbsp;&amp;</span>
//               <span className="block text-[#ffd17c]">Youth Employment Mission</span>
//             </h1>

//             <div className="grid items-end gap-8 lg:grid-cols-[1.3fr_1fr] xl:grid-cols-[1.5fr_1fr] xl:gap-12">
//               <div>
//                 <p className="mb-8 max-w-2xl text-base text-[#e2f2e6] sm:text-lg xl:text-xl">
//                   A plan to strengthen food security in the face of potential Super El Niño
//                   conditions, encourage responsible digital food savings, and create pathways to
//                   skills and self-employment through the SHAPIOO AI mobile app.
//                 </p>
//                 <div className="flex flex-wrap gap-3">
//                   <Link to="/login" className="btn btn-s px-8 py-3 text-base sm:text-lg">
//                     Get started · Choose your role
//                   </Link>
//                   <a
//                     href="#elnino"
//                     className="btn border border-white/60 bg-white/10 px-8 py-3 text-base text-white hover:bg-white/20 sm:text-lg"
//                   >
//                     Why it matters
//                     <ArrowDown className="h-5 w-5" aria-hidden="true" />
//                   </a>
//                 </div>
//               </div>

//               <aside
//                 aria-label="Proposed Phase 1 pilot targets"
//                 className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm xl:p-6"
//               >
//                 <div className="mb-4 flex items-center justify-between gap-2">
//                   <span className="text-xs font-bold tracking-wider text-[#ffd17c]">
//                     ANDHRA PRADESH · PILOT
//                   </span>
//                   <span className="rounded-full bg-saffron/90 px-2.5 py-0.5 text-[0.72rem] font-bold text-[#3a2300]">
//                     Proposed
//                   </span>
//                 </div>
//                 <dl className="grid grid-cols-4 gap-2 text-center lg:grid-cols-2 xl:grid-cols-4">
//                   {PILOT.map((p) => (
//                     <div key={p.label} className="rounded-xl bg-white/10 px-1 py-3">
//                       <dt className="text-[0.72rem] text-sage">{p.label}</dt>
//                       <dd className="font-display text-2xl font-bold text-white sm:text-3xl">
//                         <CountUp value={p.value} />
//                       </dd>
//                     </div>
//                   ))}
//                 </dl>
//                 <p className="mt-3 text-[0.72rem] leading-snug text-sage">
//                   Starting targets for one village or mandal, not live registrations or confirmed
//                   partners.
//                 </p>
//               </aside>
//             </div>
//           </div>
//         </section>

//         {/* ==================== SUPER EL NIÑO HIGHLIGHT ================== */}
//         <section id="elnino" aria-labelledby="elnino-title" className="mt-10 scroll-mt-6">
//           <Reveal>
//             <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-[#fdeccb] via-[#fff8e8] to-paper p-6 shadow-card sm:p-8 lg:p-10">
//               {/* Decorative sun, fully inside the card */}
//               <div
//                 className="pointer-events-none absolute right-6 top-4 select-none text-8xl leading-none opacity-[0.12]"
//                 aria-hidden="true"
//               >
//                 🌡️
//               </div>

//               <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
//                 {/* Left: the message */}
//                 <div>
//                   <span className="pill y mb-4">
//                     <AlertTriangle size={14} aria-hidden="true" />
//                     CLIMATE RISK · PLANNING SCENARIO
//                   </span>
//                   <h2
//                     id="elnino-title"
//                     className="mb-3 font-display text-[1.65rem] font-bold leading-[1.15] tracking-[-0.025em] text-[#8a5600] md:text-[2.1rem]"
//                   >
//                     The Super El Niño challenge
//                   </h2>
//                   <p className="max-w-xl text-[0.9375rem] leading-[1.55] text-ink">
//                     Climate experts warn of a potential <strong>Super El Niño</strong> that could
//                     disrupt monsoon patterns, reduce crop yields and push up food prices across
//                     India. SHAPIOO AI is designed as a proactive response: connecting local supply
//                     chains, enabling digital food savings and helping families plan reliable access
//                     to essential staples before shortages hit.
//                   </p>
//                   <p className="mt-4 max-w-xl text-[0.8125rem] leading-[1.5] text-mute">
//                     This is a planning scenario, not a forecast. SHAPIOO AI aims to improve
//                     visibility and coordination; it does not prevent climate impacts.
//                   </p>
//                 </div>

//                 {/* Right: how the effect travels */}
//                 <div>
//                   <h3 className="mb-4 font-sans text-sm font-bold uppercase tracking-[0.06em] text-[#8a5600]">
//                     How the effect could travel
//                   </h3>
//                   <ol className="relative space-y-4 before:absolute before:bottom-5 before:left-5 before:top-5 before:w-px before:bg-[#8a5600]/25">
//                     {EFFECT_CHAIN.map((step, i) => (
//                       <li key={step.title}>
//                         <Reveal delay={i * 90}>
//                           <div className="relative flex items-start gap-4">
//                             <span
//                               className="relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full border border-[#8a5600]/25 bg-white text-[#8a5600] shadow-sm"
//                               aria-hidden="true"
//                             >
//                               <step.icon size={20} />
//                             </span>
//                             <div className="pt-0.5">
//                               <p className="font-sans text-base font-bold leading-[1.3] text-forest">
//                                 <span className="mr-1.5 text-[0.8125rem] font-bold text-[#8a5600]">
//                                   {i + 1}.
//                                 </span>
//                                 {step.title}
//                               </p>
//                               <p className="text-[0.8125rem] leading-[1.5] text-mute">{step.desc}</p>
//                             </div>
//                           </div>
//                         </Reveal>
//                       </li>
//                     ))}
//                   </ol>
//                 </div>
//               </div>

//               {/* Response row */}
//               <div className="relative z-10 mt-8 border-t border-[#8a5600]/20 pt-6">
//                 <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
//                   <h3 className="font-display text-xl font-bold text-forest">
//                     How SHAPIOO AI responds
//                   </h3>
//                   <a
//                     href="#services"
//                     className="inline-flex min-h-11 items-center gap-1 text-sm font-bold text-leaf2 hover:text-forest"
//                   >
//                     See the six pillars
//                     <ArrowDown className="h-4 w-4" aria-hidden="true" />
//                   </a>
//                 </div>
//                 <ul className="grid gap-3.5 sm:grid-cols-3">
//                   {RESPONSES.map((r, i) => (
//                     <li key={r.title}>
//                       <Reveal delay={i * 90} className="h-full">
//                         <div className="flex h-full gap-3 rounded-2xl border border-line bg-white/80 p-4">
//                           <span
//                             className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-sage text-leaf2"
//                             aria-hidden="true"
//                           >
//                             <r.icon size={20} />
//                           </span>
//                           <div>
//                             <p className="font-sans text-sm font-bold text-forest">{r.title}</p>
//                             <p className="mt-0.5 text-[0.8125rem] leading-[1.5] text-mute">
//                               {r.desc}
//                             </p>
//                           </div>
//                         </div>
//                       </Reveal>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </Reveal>
//         </section>

//         {/* ========================== SIX PILLARS ========================= */}
//         <section id="services" aria-labelledby="pillars-title" className="mt-14 scroll-mt-6">
//           <Reveal className="mb-8">
//             <h2 id="pillars-title" className="mb-2 font-display text-3xl font-bold text-forest">
//               Six pillars. One connected mission.
//             </h2>
//             <p className="max-w-2xl text-mute">
//               Explore how SHAPIOO AI is designed to connect agricultural supply, neighbourhood
//               retail, household food planning, voluntary savings and youth livelihoods.
//             </p>
//           </Reveal>

//           <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
//             {PILLARS.map((s, i) => (
//               <Reveal key={s.title} delay={(i % 3) * 80} className="h-full">
//                 <Link to="/login" className="card group flex h-full min-h-[200px] flex-col">
//                   <PhotoTile
//                     src={s.image.src}
//                     alt={s.image.alt}
//                     fallback={s.icon}
//                     className="mb-4"
//                   />
//                   <h3 className="mb-2 font-sans text-lg font-bold text-forest">{s.title}</h3>
//                   <p className="text-sm leading-relaxed text-mute">{s.desc}</p>
//                   <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-bold text-leaf2 transition-colors group-hover:text-forest">
//                     Explore service
//                     <ArrowUpRight
//                       className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
//                       aria-hidden="true"
//                     />
//                   </span>
//                 </Link>
//               </Reveal>
//             ))}
//           </div>
//         </section>

//         {/* ========================= FARM-TO-FAMILY ======================== */}
//         <section aria-labelledby="flow-title" className="mt-16">
//           <Reveal>
//             <h2 id="flow-title" className="mb-6 font-display text-3xl font-bold text-forest">
//               A stronger farm-to-family food network
//             </h2>
//             <div className="card">
//               <p className="mb-2 text-xs text-mute md:hidden">Swipe sideways to see the full flow →</p>
//               <div className="overflow-x-auto pb-2">
//                 <ol className="flex min-w-[640px] items-stretch gap-2">
//                   {FLOW.map((step, i) => (
//                     <li key={step.label} className="flex flex-1 items-center gap-2">
//                       <div className="flex-1 rounded-xl border border-[#dfe9d9] bg-sage/60 p-4 text-center transition-transform duration-200 hover:-translate-y-1 motion-reduce:hover:translate-y-0 xl:p-6">
//                         <div className="mb-2 text-2xl" aria-hidden="true">
//                           {step.icon}
//                         </div>
//                         <div className="text-sm font-bold text-forest">{step.label}</div>
//                       </div>
//                       {i < FLOW.length - 1 && (
//                         <span className="font-black text-[#b18a3c]" aria-hidden="true">
//                           →
//                         </span>
//                       )}
//                     </li>
//                   ))}
//                 </ol>
//               </div>
//               <p className="mt-4 text-xs text-mute">
//                 The proposed system aims to improve visibility and coordination. It does not
//                 guarantee food availability or prevent climate impacts; results depend on
//                 real-world partners, infrastructure and reliable data.
//               </p>
//             </div>
//           </Reveal>
//         </section>

//         {/* ============================ FOOTER ============================ */}
//         <Reveal>
//           <footer className="mt-16 flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-sm text-mute">
//             <span>🌾 SHAPIOO AI · Food Security &amp; Youth Employment Mission</span>
//             <span>Concept and demo experience · Not a live government or financial service</span>
//           </footer>
//         </Reveal>
//       </main>
//     </div>
//   );
// }

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDown, AlertTriangle } from "lucide-react";
import { EFFECT_CHAIN, RESPONSES } from "../lib/elnino";
import CountUp from "../components/ui/CountUp";
import Reveal from "../components/ui/Reveal";
import PhotoTile from "../components/ui/PhotoTile";
import { IMAGES, type ImageAsset } from "../lib/images";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const HERO_IMAGE = "/images/hero-farm.webp";
const CONTENT_BOX = "mx-auto w-full max-w-[1680px] px-3 xs:px-4 md:px-8 lg:px-12";

interface Pillar {
  icon: string;
  title: string;
  desc: string;
  image: ImageAsset;
}

const PILLARS: Pillar[] = [
  { icon: "🌾", title: "AI Farmers Market", image: IMAGES.pillars.farmersMarket, desc: "Farmers can register crops, quantity, quality and availability; connect with traders and shopkeepers; view market information; explore demand forecasting and warehouse options." },
  { icon: "🏪", title: "AI Local Multi-Shops", image: IMAGES.pillars.localShops, desc: "Bring kirana stores, fruit and vegetable stalls, rice and pulses shops, wholesalers, dairy stores, hotels and tiffin centres into a digital local network." },
  { icon: "🛡️", title: "Digital Food Security Platform", image: IMAGES.pillars.foodSecurity, desc: "Plan essential household items and monthly budgets, compare prices across local shops, view stock information and surface areas that may need food-supply support." },
  { icon: "🐷", title: "Digital Food Savings Policy", image: IMAGES.pillars.foodSavings, desc: "Design an optional, customer-consented way to set aside a small amount from purchases, with clear records, transparency and appropriate financial-partner and regulatory review." },
  { icon: "🎓", title: "AI Skill Development Centers", image: IMAGES.pillars.skills, desc: "Build practical capabilities in digital shop management, billing, inventory, computer skills, marketing, agricultural digital services and technology." },
  { icon: "💼", title: "Self-Employment & Jobs for Youth", image: IMAGES.pillars.jobs, desc: "Create pathways into digital billing, stock management, order handling, delivery, customer support, farmer coordination, warehousing and app support." },
];

const FLOW = [
  { icon: "🧑‍🌾", label: "Farmer" },
  { icon: "📱", label: "AI Farmer Market" },
  { icon: "🏭", label: "Warehouse" },
  { icon: "🚛", label: "Wholesale" },
  { icon: "🏪", label: "Local shop" },
  { icon: "👨‍👩‍👧‍👦", label: "Family" },
];

const PILOT = [
  { value: 1, label: "Mandal" },
  { value: 20, label: "Farmers" },
  { value: 20, label: "Local shops" },
  { value: 500, label: "Families" },
];

/* ------------------------------------------------------------------ */
/* Scroll progress                                                     */
/* ------------------------------------------------------------------ */

function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      if (bar.current) bar.current.style.width = `${max > 0 ? (el.scrollTop / max) * 100 : 0}%`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[999] h-[3px] w-full" aria-hidden="true">
      <div
        ref={bar}
        className="h-full w-0 bg-gradient-to-r from-saffron via-[#6fbd76] to-saffron shadow-[0_0_10px_rgba(242,163,58,.4)]"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Landing() {
  return (
    <div className="min-h-screen bg-cream">
      <ScrollProgress />

      {/* Top bar */}
      <header className={`${CONTENT_BOX} flex items-center justify-between py-4`}>
        <Link
          to="/"
          className="font-display text-2xl font-extrabold text-forest transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
          aria-label="SHAPIOO AI home"
        >
          🌾 SHAPIOO AI
        </Link>
        <nav className="flex gap-3" aria-label="Primary">
          <a href="#services" className="btn btn-l btn-sm hidden md:inline-flex">
            Explore mission
          </a>
          <Link to="/login" className="btn btn-d btn-sm">
            Role-based login →
          </Link>
        </nav>
      </header>

      <main className={`${CONTENT_BOX} pb-16`}>
        {/* ============================ HERO ============================ */}
        <section
          aria-labelledby="hero-title"
          className="animate-card relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#103b29] via-[#216b43] to-[#398653] p-6 text-white shadow-pop sm:p-10 lg:flex lg:min-h-[calc(100dvh-6rem)] lg:items-center lg:p-14 xl:p-16"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
            style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-saffron/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 right-6 hidden select-none text-[11rem] leading-none opacity-10 -rotate-12 lg:block"
          >
            🌾
          </div>

          <div className="relative z-10 w-full">
            <span className="mb-6 inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-bold tracking-wider">
              FOOD SECURITY · DIGITAL SAVINGS · YOUTH EMPLOYMENT
            </span>

            <h1
              id="hero-title"
              className="mb-8 max-w-5xl text-balance font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              <span className="block">SHAPIOO AI Food&nbsp;Security&nbsp;&amp;</span>
              <span className="block text-[#ffd17c]">Youth Employment Mission</span>
            </h1>

            <div className="grid items-end gap-8 lg:grid-cols-[1.3fr_1fr] xl:grid-cols-[1.5fr_1fr] xl:gap-12">
              <div>
                <p className="mb-8 max-w-2xl text-base text-[#e2f2e6] sm:text-lg xl:text-xl">
                  A plan to strengthen food security in the face of potential Super El Niño
                  conditions, encourage responsible digital food savings, and create pathways to
                  skills and self-employment through the SHAPIOO AI mobile app.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/login" className="btn btn-s px-8 py-3 text-base sm:text-lg">
                    Get started · Choose your role
                  </Link>
                  <a
                    href="#elnino"
                    className="btn border border-white/60 bg-white/10 px-8 py-3 text-base text-white hover:bg-white/20 sm:text-lg"
                  >
                    Why it matters
                    <ArrowDown className="h-5 w-5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <aside
                aria-label="Proposed Phase 1 pilot targets"
                className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm xl:p-6"
              >
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold tracking-wider text-[#ffd17c]">
                    ANDHRA PRADESH · PILOT
                  </span>
                  <span className="rounded-full bg-saffron/90 px-2.5 py-0.5 text-[0.72rem] font-bold text-[#3a2300]">
                    Proposed
                  </span>
                </div>
                <dl className="grid grid-cols-4 gap-2 text-center lg:grid-cols-2 xl:grid-cols-4">
                  {PILOT.map((p) => (
                    <div key={p.label} className="rounded-xl bg-white/10 px-1 py-3">
                      <dt className="text-[0.72rem] text-sage">{p.label}</dt>
                      <dd className="font-display text-2xl font-bold text-white sm:text-3xl">
                        <CountUp value={p.value} />
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-[0.72rem] leading-snug text-sage">
                  Starting targets for one village or mandal, not live registrations or confirmed
                  partners.
                </p>
              </aside>
            </div>
          </div>
        </section>

        {/* ==================== SUPER EL NIÑO HIGHLIGHT ================== */}
        <section id="elnino" aria-labelledby="elnino-title" className="mt-10 scroll-mt-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-[#fdeccb] via-[#fff8e8] to-paper p-6 shadow-card sm:p-8 lg:p-10">
              {/* Decorative sun, fully inside the card */}
              <div
                className="pointer-events-none absolute right-6 top-4 select-none text-8xl leading-none opacity-[0.12]"
                aria-hidden="true"
              >
                🌡️
              </div>

              <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
                {/* Left: the message */}
                <div>
                  <span className="pill y mb-4">
                    <AlertTriangle size={14} aria-hidden="true" />
                    CLIMATE RISK · PLANNING SCENARIO
                  </span>
                  <h2
                    id="elnino-title"
                    className="mb-3 font-display text-[1.65rem] font-bold leading-[1.15] tracking-[-0.025em] text-[#8a5600] md:text-[2.1rem]"
                  >
                    The Super El Niño challenge
                  </h2>
                  <p className="max-w-xl text-[0.9375rem] leading-[1.55] text-ink">
                    Climate experts warn of a potential <strong>Super El Niño</strong> that could
                    disrupt monsoon patterns, reduce crop yields and push up food prices across
                    India. SHAPIOO AI is designed as a proactive response: connecting local supply
                    chains, enabling digital food savings and helping families plan reliable access
                    to essential staples before shortages hit.
                  </p>
                  <p className="mt-4 max-w-xl text-[0.8125rem] leading-[1.5] text-mute">
                    This is a planning scenario, not a forecast. SHAPIOO AI aims to improve
                    visibility and coordination; it does not prevent climate impacts.
                  </p>
                </div>

                {/* Right: how the effect travels */}
                <div>
                  <h3 className="mb-4 font-sans text-sm font-bold uppercase tracking-[0.06em] text-[#8a5600]">
                    How the effect could travel
                  </h3>
                  <ol className="relative space-y-4 before:absolute before:bottom-5 before:left-5 before:top-5 before:w-px before:bg-[#8a5600]/25">
                    {EFFECT_CHAIN.map((step, i) => (
                      <li key={step.title}>
                        <Reveal delay={i * 90}>
                          <div className="relative flex items-start gap-4">
                            <span
                              className="relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full border border-[#8a5600]/25 bg-white text-[#8a5600] shadow-sm"
                              aria-hidden="true"
                            >
                              <step.icon size={20} />
                            </span>
                            <div className="pt-0.5">
                              <p className="font-sans text-base font-bold leading-[1.3] text-forest">
                                <span className="mr-1.5 text-[0.8125rem] font-bold text-[#8a5600]">
                                  {i + 1}.
                                </span>
                                {step.title}
                              </p>
                              <p className="text-[0.8125rem] leading-[1.5] text-mute">{step.desc}</p>
                            </div>
                          </div>
                        </Reveal>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Response row */}
              <div className="relative z-10 mt-8 border-t border-[#8a5600]/20 pt-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-xl font-bold text-forest">
                    How SHAPIOO AI responds
                  </h3>
                  <a
                    href="#services"
                    className="inline-flex min-h-11 items-center gap-1 text-sm font-bold text-leaf2 hover:text-forest"
                  >
                    See the six pillars
                    <ArrowDown className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
                <ul className="grid gap-3.5 sm:grid-cols-3">
                  {RESPONSES.map((r, i) => (
                    <li key={r.title}>
                      <Reveal delay={i * 90} className="h-full">
                        <div className="flex h-full gap-3 rounded-2xl border border-line bg-white/80 p-4">
                          <span
                            className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-sage text-leaf2"
                            aria-hidden="true"
                          >
                            <r.icon size={20} />
                          </span>
                          <div>
                            <p className="font-sans text-sm font-bold text-forest">{r.title}</p>
                            <p className="mt-0.5 text-[0.8125rem] leading-[1.5] text-mute">
                              {r.desc}
                            </p>
                          </div>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ========================== SIX PILLARS ========================= */}
        <section id="services" aria-labelledby="pillars-title" className="mt-14 scroll-mt-6">
          <Reveal className="mb-8">
            <h2 id="pillars-title" className="mb-2 font-display text-3xl font-bold text-forest">
              Six pillars. One connected mission.
            </h2>
            <p className="max-w-2xl text-mute">
              Explore how SHAPIOO AI is designed to connect agricultural supply, neighbourhood
              retail, household food planning, voluntary savings and youth livelihoods.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {PILLARS.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 80} className="h-full">
                <Link to="/login" className="card group flex h-full min-h-[200px] flex-col">
                  <PhotoTile
                    src={s.image.src}
                    alt={s.image.alt}
                    fallback={s.icon}
                    className="mb-4"
                  />
                  <h3 className="mb-2 font-sans text-lg font-bold text-forest">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-mute">{s.desc}</p>
                  <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-bold text-leaf2 transition-colors group-hover:text-forest">
                    Explore service
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ========================= FARM-TO-FAMILY ======================== */}
        <section aria-labelledby="flow-title" className="mt-16">
          <Reveal>
            <h2 id="flow-title" className="mb-6 font-display text-3xl font-bold text-forest">
              A stronger farm-to-family food network
            </h2>
            <div className="card">
              <p className="mb-2 text-xs text-mute md:hidden">Swipe sideways to see the full flow →</p>
              <div className="overflow-x-auto pb-2">
                <ol className="flex min-w-[640px] items-stretch gap-2">
                  {FLOW.map((step, i) => (
                    <li key={step.label} className="flex flex-1 items-center gap-2">
                      <div className="flex-1 rounded-xl border border-[#dfe9d9] bg-sage/60 p-4 text-center transition-transform duration-200 hover:-translate-y-1 motion-reduce:hover:translate-y-0 xl:p-6">
                        <div className="mb-2 text-2xl" aria-hidden="true">
                          {step.icon}
                        </div>
                        <div className="text-sm font-bold text-forest">{step.label}</div>
                      </div>
                      {i < FLOW.length - 1 && (
                        <span className="font-black text-[#b18a3c]" aria-hidden="true">
                          →
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
              <p className="mt-4 text-xs text-mute">
                The proposed system aims to improve visibility and coordination. It does not
                guarantee food availability or prevent climate impacts; results depend on
                real-world partners, infrastructure and reliable data.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ============================ FOOTER ============================ */}
        <Reveal>
          <footer className="mt-16 flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-sm text-mute">
            <span>🌾 SHAPIOO AI · Food Security &amp; Youth Employment Mission</span>
            <span>Concept and demo experience · Not a live government or financial service</span>
          </footer>
        </Reveal>
      </main>
    </div>
  );
}