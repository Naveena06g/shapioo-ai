// src/lib/elnino.ts
// Shared copy for the Super El Niño section (Landing + Dashboard).
// Wording is deliberately conditional ("can", "could") and has no invented
// statistics: add numbers only with a cited source (IMD, NOAA, FAO).

import {
  CloudRain,
  Sprout,
  TrendingUp,
  ShoppingBasket,
  Handshake,
  PiggyBank,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export interface Step {
  icon: LucideIcon;
  title: string;
  desc: string;
}

/** How the effect could travel from the sky to the kitchen. */
export const EFFECT_CHAIN: Step[] = [
  { icon: CloudRain, title: "Monsoon disruption", desc: "Delayed or uneven rains can upset sowing and harvest cycles." },
  { icon: Sprout, title: "Lower crop yields", desc: "Stressed fields can mean less produce reaching the market." },
  { icon: TrendingUp, title: "Rising food prices", desc: "Tighter supply can push up the cost of everyday staples." },
  { icon: ShoppingBasket, title: "Household food stress", desc: "Families feel it first in the monthly grocery bill." },
];

/** How SHOPIOO AI is designed to respond. */
export const RESPONSES: Step[] = [
  { icon: Handshake, title: "Connect the supply", desc: "Farmers list crops and storage so buyers and shops can find supply early." },
  { icon: PiggyBank, title: "Save for food", desc: "Optional, consented savings set aside a small amount from purchases." },
  { icon: Wallet, title: "Plan and compare", desc: "Monthly budgets and local price comparison help families plan ahead." },
];
