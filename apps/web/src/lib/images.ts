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
      src: "/images/pillar-farmers-market.jpg",
      alt: "A farmer arranging fresh vegetables at a market stall",
    },
    localShops: {
      src: "/images/pillar-local-shops.jpg",
      alt: "A shopkeeper at the counter of a neighbourhood kirana store",
    },
    foodSecurity: {
      src: "/images/pillar-food-security.jpg",
      alt: "A family unpacking groceries together at home",
    },
    foodSavings: {
      src: "/images/pillar-food-savings.jpg",
      alt: "A savings jar and a phone showing a small saved amount",
    },
    skills: {
      src: "/images/pillar-skills.jpg",
      alt: "Young people learning together in a computer training class",
    },
    jobs: {
      src: "/images/pillar-jobs.jpg",
      alt: "A young worker using a tablet to manage stock in a shop",
    },
  },
} satisfies Record<string, Record<string, ImageAsset>>;