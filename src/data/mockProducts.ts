import type { Product, ProductCategory, ProductAudience } from '@/shared/types'
import { slugify } from '@/shared/lib/utils'

const UNSPLASH = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

const imageSets: Record<ProductCategory, string[]> = {
  movie: [
    UNSPLASH('1539109136881-029369031791f'),
    UNSPLASH('1578632767115-351597cf2477'),
    UNSPLASH('1556821840-3a63f95609a7'),
  ],
  anime: [
    UNSPLASH('1612036782180-bf6be0d1b4ae'),
    UNSPLASH('1612198187320-b5aa6c40019b'),
    UNSPLASH('1611348524140-53c9ffd7e0e6'),
  ],
  casual: [
    UNSPLASH('1521572163474-6864f9cf17ab'),
    UNSPLASH('1554568212-0e342bd6f732'),
    UNSPLASH('1503342217505-9d7a7b4a1b1e'),
  ],
  customize: [
    UNSPLASH('1558171813-4c030d41d619'),
    UNSPLASH('1434389676629-aa2c9daec413'),
    UNSPLASH('1489987707024-779dc7a3a0b0'),
  ],
}

const catalog: Array<{
  name: string
  category: ProductCategory
  audience: ProductAudience
  price: number
  compareAt?: number
  featured?: boolean
}> = [
  {
    name: 'Noir Cinema Oversized Tee',
    category: 'movie',
    audience: 'men',
    price: 4490,
    featured: true,
  },
  {
    name: 'Golden Reel Hoodie',
    category: 'movie',
    audience: 'unisex',
    price: 8990,
    compareAt: 10990,
  },
  {
    name: 'Director Cut Varsity',
    category: 'movie',
    audience: 'men',
    price: 12490,
    featured: true,
  },
  { name: 'Premiere Night Bomber', category: 'movie', audience: 'women', price: 14990 },
  { name: 'Celluloid Stitch Crew', category: 'movie', audience: 'unisex', price: 5490 },
  { name: 'Frame 24 Graphic Tee', category: 'movie', audience: 'women', price: 3990 },
  { name: 'Silver Screen Track Pants', category: 'movie', audience: 'men', price: 6990 },
  { name: 'Matinee Embroidered Cap', category: 'movie', audience: 'unisex', price: 2490 },
  { name: 'Epic Saga Longline', category: 'anime', audience: 'men', price: 4790, featured: true },
  {
    name: 'Spirit Realm Hoodie',
    category: 'anime',
    audience: 'unisex',
    price: 9490,
    compareAt: 11490,
  },
  { name: 'Neon District Tee', category: 'anime', audience: 'women', price: 4290 },
  { name: 'Mecha Panel Jacket', category: 'anime', audience: 'men', price: 13990, featured: true },
  { name: 'Cherry Blossom Kimono Top', category: 'anime', audience: 'women', price: 7990 },
  { name: 'Power Level Crop Hoodie', category: 'anime', audience: 'women', price: 8490 },
  { name: 'Studio Arc Sweatshirt', category: 'anime', audience: 'unisex', price: 5990 },
  { name: 'Ink Wash Anime Tee', category: 'anime', audience: 'men', price: 3890 },
  {
    name: 'Limited Drop Collector Tee',
    category: 'anime',
    audience: 'unisex',
    price: 5490,
    compareAt: 6490,
  },
  {
    name: 'Charcoal Essential Tee',
    category: 'casual',
    audience: 'men',
    price: 2990,
    featured: true,
  },
  { name: 'Luxe Relaxed Hoodie', category: 'casual', audience: 'unisex', price: 7490 },
  { name: 'Tailored Street Polo', category: 'casual', audience: 'men', price: 4490 },
  { name: 'Minimal Wide-Leg Pants', category: 'casual', audience: 'women', price: 6490 },
  {
    name: 'Monogram Knit Sweater',
    category: 'casual',
    audience: 'women',
    price: 8990,
    featured: true,
  },
  {
    name: 'Weekend Lounge Set',
    category: 'casual',
    audience: 'unisex',
    price: 10990,
    compareAt: 12990,
  },
  { name: 'Structured Blazer Layer', category: 'casual', audience: 'women', price: 15990 },
  { name: 'Heritage Oxford Shirt', category: 'casual', audience: 'men', price: 5490 },
  { name: 'Urban Cargo Joggers', category: 'casual', audience: 'men', price: 5990 },
  { name: 'Silk Touch Tank', category: 'casual', audience: 'women', price: 2490 },
  {
    name: 'Bespoke Atelier Jacket',
    category: 'customize',
    audience: 'unisex',
    price: 24990,
    featured: true,
  },
  { name: 'Custom Monogram Hoodie', category: 'customize', audience: 'unisex', price: 12990 },
  { name: 'Personalized Film Poster Tee', category: 'customize', audience: 'men', price: 5990 },
  { name: 'Custom Anime Portrait Tee', category: 'customize', audience: 'women', price: 6490 },
  { name: 'Embroidered Name Varsity', category: 'customize', audience: 'men', price: 14990 },
  { name: 'Made-to-Measure Denim', category: 'customize', audience: 'women', price: 18990 },
  {
    name: 'Wedding Party Custom Set',
    category: 'customize',
    audience: 'unisex',
    price: 34990,
    compareAt: 39990,
  },
  { name: 'Corporate Logo Bundle', category: 'customize', audience: 'unisex', price: 19990 },
  { name: 'Heritage Crest Embroidery', category: 'customize', audience: 'men', price: 8990 },
  {
    name: 'Photo Print Memory Hoodie',
    category: 'customize',
    audience: 'women',
    price: 11490,
    featured: true,
  },
  { name: 'Signature Stitch Bomber', category: 'customize', audience: 'unisex', price: 21990 },
  { name: 'Limited Collab Custom Drop', category: 'customize', audience: 'men', price: 16990 },
  { name: 'Anniversary Edition Coat', category: 'customize', audience: 'women', price: 28990 },
  { name: 'Archive Reprint Tee', category: 'movie', audience: 'unisex', price: 3590 },
  { name: 'Midnight Premiere Set', category: 'movie', audience: 'women', price: 11990 },
  { name: 'Cosplay Ready Base Layer', category: 'anime', audience: 'unisex', price: 3290 },
  { name: 'Studio Ghibli Inspired Tee', category: 'anime', audience: 'women', price: 4590 },
  { name: 'Elevated Daily Chinos', category: 'casual', audience: 'men', price: 6990 },
  { name: 'Resort Linen Shirt', category: 'casual', audience: 'women', price: 4990 },
]

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const

export const MOCK_PRODUCTS: Product[] = catalog.map((item, index) => {
  const id = `prod-${String(index + 1).padStart(3, '0')}`
  const imgs = imageSets[item.category]
  const imgIndex = index % imgs.length
  return {
    id,
    name: item.name,
    slug: slugify(item.name),
    description: `${item.name} — crafted with premium cotton blends and Aurelo's signature gold-thread detailing. Designed for ${item.audience === 'unisex' ? 'everyone' : item.audience}. Part of our ${item.category} collection.`,
    price: item.price,
    compareAtPrice: item.compareAt,
    category: item.category,
    audience: item.audience,
    images: [
      imgs[imgIndex],
      imgs[(imgIndex + 1) % imgs.length],
      imgs[(imgIndex + 2) % imgs.length],
    ],
    sizes: [...sizes],
    tags: [item.category, item.audience, 'premium', 'aurelo'],
    rating: 4 + (index % 10) / 10,
    reviewCount: 12 + ((index * 7) % 120),
    featured: item.featured,
    inStock: index % 17 !== 0,
  }
})

export const MOCK_REVIEWS = MOCK_PRODUCTS.slice(0, 8).flatMap((p, i) => [
  {
    id: `rev-${p.id}-1`,
    productId: p.id,
    author: 'Ayesha K.',
    rating: 5,
    title: 'Exceptional quality',
    body: 'The fabric weight and stitching are far above typical streetwear. Worth every rupee.',
    date: '2026-03-12',
    verified: true,
  },
  {
    id: `rev-${p.id}-2`,
    productId: p.id,
    author: 'Hassan M.',
    rating: 4,
    title: 'True to size',
    body: 'Fits perfectly. Delivery to Lahore was faster than expected.',
    date: '2026-02-28',
    verified: true,
  },
  {
    id: `rev-${p.id}-3`,
    productId: p.id,
    author: 'Sana R.',
    rating: 5,
    title: 'Luxury feel',
    body: 'The gold accents in person look incredible. Already ordered another colorway.',
    date: '2026-01-15',
    verified: i % 2 === 0,
  },
])
