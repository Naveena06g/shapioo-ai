// import { useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import { ArrowUpRight, ArrowDown } from "lucide-react";
// import CountUp from "../components/ui/CountUp";
// import Reveal from "../components/ui/Reveal";

// /* ------------------------------------------------------------------ */
// /* Content                                                             */
// /* ------------------------------------------------------------------ */

// /**
//  * Optional hero photo. Drop a file at apps/web/public/images/hero-farm.webp
//  * (about 1600x900, under 150 KB). If the file is missing nothing breaks:
//  * a CSS background simply doesn't paint.
//  */
// const HERO_IMAGE = "/images/hero-farm.webp";

// /**
//  * One shared width + gutter rule for the header and the page body so their
//  * edges always line up. Gutters: 12px (<420), 16px, 32px (md), 48px (lg+).
//  * The 1680px cap only matters on ultra-wide monitors; remove it for truly edge-to-edge.
//  */
// const CONTENT_BOX = "mx-auto w-full max-w-[1680px] px-3 xs:px-4 md:px-8 lg:px-12";

// const PILLARS = [
//   { icon: "🌾", title: "AI Farmers Market", desc: "Farmers can register crops, quantity, quality and availability; connect with traders and shopkeepers; view market information; explore demand forecasting and warehouse options." },
//   { icon: "🏪", title: "AI Local Multi-Shops", desc: "Bring kirana stores, fruit and vegetable stalls, rice and pulses shops, wholesalers, dairy stores, hotels and tiffin centres into a digital local network." },
//   { icon: "🛡️", title: "Digital Food Security Platform", desc: "Plan essential household items and monthly budgets, compare prices across local shops, view stock information and surface areas that may need food-supply support." },
//   { icon: "🐷", title: "Digital Food Savings Policy", desc: "Design an optional, customer-consented way to set aside a small amount from purchases, with clear records, transparency and appropriate financial-partner and regulatory review." },
//   { icon: "🎓", title: "AI Skill Development Centers", desc: "Build practical capabilities in digital shop management, billing, inventory, computer skills, marketing, agricultural digital services and technology." },
//   { icon: "💼", title: "Self-Employment & Jobs for Youth", desc: "Create pathways into digital billing, stock management, order handling, delivery, customer support, farmer coordination, warehousing and app support." },
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
// /* Thin reading-progress bar at the very top (pure scroll indicator)   */
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
//           {/* Optional photo layer (silent if the file does not exist) */}
//           <div
//             aria-hidden="true"
//             className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
//             style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
//           />
//           {/* Soft saffron glow, top-right */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-saffron/25 blur-3xl"
//           />
//           {/* Big wheat watermark, fully inside the hero so it never looks cropped */}
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

//             {/*
//               Two intentional lines. The non-breaking spaces keep "Security &" together,
//               so the ampersand can never be left alone on its own line.
//             */}
//             <h1
//               id="hero-title"
//               className="mb-8 max-w-5xl text-balance font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl"
//             >
//               <span className="block">SHAPIOO AI Food&nbsp;Security&nbsp;&amp;</span>
//               <span className="block text-[#ffd17c]">Youth Employment Mission</span>
//             </h1>

//             <div className="grid items-end gap-8 lg:grid-cols-[1.3fr_1fr] xl:grid-cols-[1.5fr_1fr] xl:gap-12">
//               {/* Left: message + actions */}
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
//                     href="#services"
//                     className="btn border border-white/60 bg-white/10 px-8 py-3 text-base text-white hover:bg-white/20 sm:text-lg"
//                   >
//                     Discover the six pillars
//                     <ArrowDown className="h-5 w-5" aria-hidden="true" />
//                   </a>
//                 </div>
//               </div>

//               {/* Right: pilot targets */}
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

//           {/* 1 / 2 / 3 columns so six cards always make complete rows */}
//           <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
//             {PILLARS.map((s, i) => (
//               <Reveal key={s.title} delay={(i % 3) * 80} className="h-full">
//                 <Link to="/login" className="card group flex h-full min-h-[200px] flex-col">
//                   <div
//                     className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sage text-3xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transform-none"
//                     aria-hidden="true"
//                   >
//                     {s.icon}
//                   </div>
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
import { ArrowUpRight, ArrowDown } from "lucide-react";
import CountUp from "../components/ui/CountUp";
import Reveal from "../components/ui/Reveal";
import PhotoTile from "../components/ui/PhotoTile";
import { IMAGES, type ImageAsset } from "../lib/images";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

/**
 * Optional hero photo. Drop a file at apps/web/public/images/hero-farm.webp
 * (about 1600x900, under 150 KB). If the file is missing nothing breaks:
 * a CSS background simply doesn't paint.
 */
const HERO_IMAGE = "/images/hero-farm.webp";

/**
 * One shared width + gutter rule for the header and the page body so their
 * edges always line up. Gutters: 12px (<420), 16px, 32px (md), 48px (lg+).
 * The 1680px cap only matters on ultra-wide monitors; remove it for truly edge-to-edge.
 */
const CONTENT_BOX = "mx-auto w-full max-w-[1680px] px-3 xs:px-4 md:px-8 lg:px-12";

interface Pillar {
  /** Emoji fallback, used if the photo file is missing */
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
/* Thin reading-progress bar at the very top (pure scroll indicator)   */
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
          {/* Optional photo layer (silent if the file does not exist) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
            style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
          />
          {/* Soft saffron glow, top-right */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-saffron/25 blur-3xl"
          />
          {/* Big wheat watermark, fully inside the hero so it never looks cropped */}
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

            {/*
              Two intentional lines. The non-breaking spaces keep "Security &" together,
              so the ampersand can never be left alone on its own line.
            */}
            <h1
              id="hero-title"
              className="mb-8 max-w-5xl text-balance font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              <span className="block">SHAPIOO AI Food&nbsp;Security&nbsp;&amp;</span>
              <span className="block text-[#ffd17c]">Youth Employment Mission</span>
            </h1>

            <div className="grid items-end gap-8 lg:grid-cols-[1.3fr_1fr] xl:grid-cols-[1.5fr_1fr] xl:gap-12">
              {/* Left: message + actions */}
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
                    href="#services"
                    className="btn border border-white/60 bg-white/10 px-8 py-3 text-base text-white hover:bg-white/20 sm:text-lg"
                  >
                    Discover the six pillars
                    <ArrowDown className="h-5 w-5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Right: pilot targets */}
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

          {/* 1 / 2 / 3 columns so six cards always make complete rows */}
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