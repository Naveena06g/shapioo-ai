// src/lib/images.ts
// Single source of truth for photo paths, so a page never hard-codes one.
// Files live in apps/web/public/images/ (target: 640 x 480, under 150 KB each).
// Edit the `alt` text so it describes the photo you actually chose.

export interface ImageAsset {
  src: string;
  alt: string;
}

export const IMAGES = {
  pillars: {
    farmersMarket: {
      src: "/images/WhatsApp Image 2026-10-25 at 23.21.01.jpeg",
      alt: "A farmer arranging fresh vegetables at a market stall",
    },
    localShops: {
      src: "/images/WhatsApp Image 2026-10-25 at 23.24.19.jpeg",
      alt: "A shopkeeper at the counter of a neighbourhood kirana store",
    },
    foodSecurity: {
      src: "/images/WhatsApp Image 2026-10-25 at 23.28.26.jpeg",
      alt: "A family unpacking groceries together at home",
    },
    foodSavings: {
      src: "/images/WhatsApp Image 2026-10-25 at 23.31.25.jpeg",
      alt: "A savings jar and a phone showing a small saved amount",
    },
    skills: {
      src: "/images/WhatsApp Image 2026-10-25 at 23.45.11.jpeg",
      alt: "Young people learning together in a computer training class",
    },
    jobs: {
      src: "/images/WhatsApp Image 2026-10-25 at 23.47.38.jpeg",
      alt: "A young worker using a tablet to manage stock in a shop",
    },
  },
} satisfies Record<string, Record<string, ImageAsset>>;