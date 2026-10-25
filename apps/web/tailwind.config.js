// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         forest: "#133d2b",
//         leaf: "#2e8b57",
//         sage: "#e7efe3",
//         cream: "#fbf6ec",
//         paper: "#fffdf8",
//         saffron: "#f2a33a",
//         tomato: "#d9482f",
//         ink: "#1b241d",
//         mute: "#667064",
//         line: "#e6dfd0",
//       },
//       fontFamily: {
//         sans: ["DM Sans", "system-ui", "sans-serif"],
//         display: ["Fraunces", "Georgia", "serif"],
//       },
//     },
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "#133d2b",
        leaf: "#2e8b57",
        leaf2: "#1f6e45", // green TEXT on light backgrounds (6:1 contrast)
        sage: "#e7efe3",
        cream: "#fbf6ec",
        paper: "#fffdf8",
        saffron: "#f2a33a",
        tomato: "#d9482f",
        sky: "#3b82c4", // info only
        ink: "#1b241d",
        mute: "#667064",
        line: "#e6dfd0",
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"],
      },
      borderRadius: {
        card: "18px",
        modal: "22px",
      },
      boxShadow: {
        card: "0 1px 4px rgba(19,61,43,.07), 0 8px 22px rgba(19,61,43,.07)",
        lift: "0 14px 30px rgba(19,61,43,.12)",
        pop: "0 14px 35px rgba(10,40,25,.2)",
      },
      screens: {
        xs: "420px",
      },
      transitionTimingFunction: {
        rise: "cubic-bezier(.2,.8,.2,1)",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        wave: {
          "0%,45%,100%": { transform: "rotate(0)" },
          "7%,21%": { transform: "rotate(16deg)" },
          "14%,28%": { transform: "rotate(-10deg)" },
          "35%": { transform: "rotate(8deg)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(46,139,87,.55)" },
          "100%": { boxShadow: "0 0 0 9px rgba(46,139,87,0)" },
        },
        shake: {
          "20%,60%": { transform: "translateX(-4px)" },
          "40%,80%": { transform: "translateX(4px)" },
        },
      },
      animation: {
        rise: "rise .6s cubic-bezier(.2,.8,.2,1) both",
        wave: "wave 4s ease-in-out .5s infinite",
        shimmer: "shimmer 1.4s infinite",
        live: "pulseRing 1.8s ease-out infinite",
        shake: "shake .35s ease",
      },
    },
  },
  plugins: [],
}