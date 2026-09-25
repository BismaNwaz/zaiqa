import type { Category, Product } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Rice & Biryani",
    slug: "rice-biryani",
    description: "Fragrant, layered rice dishes cooked with aromatic spices",
    image_url:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80&auto=format&fit=crop",
    emoji: "🍚",
  },
  {
    id: "cat-2",
    name: "Grills & BBQ",
    slug: "grills-bbq",
    description: "Tender marinated meats cooked over open flame",
    image_url:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80&auto=format&fit=crop",
    emoji: "🍗",
  },
  {
    id: "cat-3",
    name: "Curries",
    slug: "curries",
    description: "Rich, slow-cooked gravies bursting with authentic flavors",
    image_url:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80&auto=format&fit=crop",
    emoji: "🥘",
  },
  {
    id: "cat-4",
    name: "Breads",
    slug: "breads",
    description: "Freshly baked naan, roti, and paratha",
    image_url:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80&auto=format&fit=crop",
    emoji: "🫓",
  },
  {
    id: "cat-5",
    name: "Snacks",
    slug: "snacks",
    description: "Crispy appetizers and street food favorites",
    image_url:
      "https://images.unsplash.com/photo-1601050690117-7a1f3e1e35fe?w=600&q=80&auto=format&fit=crop",
    emoji: "🥟",
  },
  {
    id: "cat-6",
    name: "Sweets",
    slug: "sweets",
    description: "Traditional mithai and desserts to satisfy your sweet tooth",
    image_url:
      "https://images.unsplash.com/photo-1605197161470-5e43fb0d4b95?w=600&q=80&auto=format&fit=crop",
    emoji: "🍬",
  },
  {
    id: "cat-7",
    name: "Drinks",
    slug: "drinks",
    description: "Refreshing lassi, chai, and traditional beverages",
    image_url:
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80&auto=format&fit=crop",
    emoji: "🥤",
  },
  {
    id: "cat-8",
    name: "Spices",
    slug: "spices",
    description: "Premium spice blends and condiments from across the subcontinent",
    image_url:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80&auto=format&fit=crop",
    emoji: "🌶️",
  },
];

export const PRODUCTS: Product[] = [
  // Rice & Biryani
  {
    id: "p-1",
    name: "Chicken Biryani",
    description:
      "Aromatic basmati rice layered with tender chicken, saffron, and whole spices. A celebration in every bite.",
    price: 15.99,
    image_url:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80&auto=format&fit=crop",
    category_id: "cat-1",
    category_name: "Rice & Biryani",
    rating: 4.9,
    reviews_count: 342,
    is_featured: true,
    in_stock: true,
    serves: 2,
    spice_level: "medium",
    origin: "Lahore, Pakistan",
  },
  {
    id: "p-2",
    name: "Beef Biryani",
    description:
      "Slow-cooked beef dum biryani with caramelized onions, dried plums, and fragrant rice. Rich and indulgent.",
    price: 17.99,
    image_url:
      "https://images.unsplash.com/photo-1603360946369-dc9bb6258aaf?w=800&q=80&auto=format&fit=crop",
    category_id: "cat-1",
    category_name: "Rice & Biryani",
    rating: 4.8,
    reviews_count: 218,
    is_featured: true,
    in_stock: true,
    serves: 2,
    spice_level: "hot",
    origin: "Karachi, Pakistan",
  },
  {
    id: "p-3",
    name: "Vegetable Pulao",
    description:
      "Light and fragrant rice cooked with seasonal vegetables and whole spices. Perfect comfort food.",
    price: 11.99,
    image_url:
      "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&q=80&auto=format&fit=crop",
    category_id: "cat-1",
    category_name: "Rice & Biryani",
    rating: 4.5,
    reviews_count: 89,
    is_featured: false,
    in_stock: true,
    serves: 2,
    spice_level: "mild",
    origin: "Punjab",
  },

  // Grills & BBQ
  {
    id: "p-4",
    name: "Seekh Kebab (6 pcs)",
    description:
      "Hand-minced beef kebabs blended with fresh herbs and spices, grilled on skewers over charcoal.",
    price: 13.99,
    image_url:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80&auto=format&fit=crop",
    category_id: "cat-2",
    category_name: "Grills & BBQ",
    rating: 4.9,
    reviews_count: 267,
    is_featured: true,
    in_stock: true,
    spice_level: "medium",
    origin: "Peshawar, Pakistan",
  },
  {
    id: "p-5",
    name: "Chapli Kebab (4 pcs)",
    description:
      "Peshwari-style flat beef patties with coriander seeds, tomatoes, and green chilies. A NWFP specialty.",
    price: 14.99,
    image_url:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80&auto=format&fit=crop",
    category_id: "cat-2",
    category_name: "Grills & BBQ",
    rating: 4.8,
    reviews_count: 195,
    is_featured: true,
    in_stock: true,
    spice_level: "hot",
    origin: "KPK, Pakistan",
  },
  {
    id: "p-6",
    name: "Chicken Tikka (8 pcs)",
    description:
      "Bone-in chicken marinated in yogurt and spices, grilled to perfection with smoky char.",
    price: 16.99,
    image_url:
      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80&auto=format&fit=crop",
    category_id: "cat-2",
    category_name: "Grills & BBQ",
    rating: 4.7,
    reviews_count: 312,
    is_featured: false,
    in_stock: true,
    spice_level: "medium",
    origin: "Punjab, Pakistan",
  },

  // Curries
  {
    id: "p-7",
    name: "Chicken Karahi",
    description:
      "Restaurant-style chicken karahi cooked in a wok with fresh tomatoes, ginger, and green chilies.",
    price: 16.99,
    image_url:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80&auto=format&fit=crop",
    category_id: "cat-3",
    category_name: "Curries",
    rating: 4.8,
    reviews_count: 401,
    is_featured: true,
    in_stock: true,
    spice_level: "hot",
    serves: 2,
    origin: "Pakistan",
  },
  {
    id: "p-8",
    name: "Nihari",
    description:
      "Slow-braised beef shank stew simmered overnight with whole spices. A royal breakfast turned dinner staple.",
    price: 18.99,
    image_url:
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&q=80&auto=format&fit=crop",
    category_id: "cat-3",
    category_name: "Curries",
    rating: 4.9,
    reviews_count: 278,
    is_featured: true,
    in_stock: true,
    spice_level: "hot",
    serves: 2,
    origin: "Old Delhi / Lahore",
  },
  {
    id: "p-9",
    name: "Haleem",
    description:
      "A beloved slow-cooked stew of wheat, lentils, and tender mutton. Topped with crispy onions and lemon.",
    price: 14.99,
    image_url:
      "https://images.unsplash.com/photo-1577303935007-0d306ee638cf?w=800&q=80&auto=format&fit=crop",
    category_id: "cat-3",
    category_name: "Curries",
    rating: 4.7,
    reviews_count: 156,
    is_featured: false,
    in_stock: true,
    spice_level: "medium",
    serves: 2,
    origin: "Hyderabad, Pakistan",
  },

  // Breads
  {
    id: "p-10",
    name: "Butter Naan (4 pcs)",
    description:
      "Soft, pillowy naan brushed with butter and baked in a tandoor. The perfect accompaniment to any curry.",
    price: 4.99,
    image_url:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80&auto=format&fit=crop",
    category_id: "cat-4",
    category_name: "Breads",
    rating: 4.6,
    reviews_count: 523,
    is_featured: false,
    in_stock: true,
    spice_level: "mild",
  },
  {
    id: "p-11",
    name: "Garlic Naan (4 pcs)",
    description:
      "Classic naan topped with roasted garlic and fresh coriander. Irresistibly aromatic.",
    price: 5.49,
    image_url:
      "https://images.unsplash.com/photo-1568600891597-0c23e3cc0c73?w=800&q=80&auto=format&fit=crop",
    category_id: "cat-4",
    category_name: "Breads",
    rating: 4.7,
    reviews_count: 298,
    is_featured: false,
    in_stock: true,
    spice_level: "mild",
  },

  // Snacks
  {
    id: "p-12",
    name: "Samosa (6 pcs)",
    description:
      "Crispy pastry triangles filled with spiced potatoes and peas. A timeless South Asian snack.",
    price: 7.99,
    image_url:
      "https://images.unsplash.com/photo-1601050690117-7a1f3e1e35fe?w=800&q=80&auto=format&fit=crop",
    category_id: "cat-5",
    category_name: "Snacks",
    rating: 4.8,
    reviews_count: 445,
    is_featured: true,
    in_stock: true,
    spice_level: "medium",
    origin: "Punjab",
  },

  // Sweets
  {
    id: "p-13",
    name: "Gulab Jamun (8 pcs)",
    description:
      "Soft milk-solid dumplings soaked in rose-scented sugar syrup. Pure indulgence.",
    price: 8.99,
    image_url:
      "https://images.unsplash.com/photo-1605197161470-5e43fb0d4b95?w=800&q=80&auto=format&fit=crop",
    category_id: "cat-6",
    category_name: "Sweets",
    rating: 4.9,
    reviews_count: 389,
    is_featured: true,
    in_stock: true,
    origin: "Subcontinent",
  },
  {
    id: "p-14",
    name: "Kheer (500ml)",
    description:
      "Creamy rice pudding cooked with whole milk, cardamom, and topped with pistachios and saffron.",
    price: 6.99,
    image_url:
      "https://images.unsplash.com/photo-1613448856706-2f35e4ff1e89?w=800&q=80&auto=format&fit=crop",
    category_id: "cat-6",
    category_name: "Sweets",
    rating: 4.6,
    reviews_count: 167,
    is_featured: false,
    in_stock: true,
    origin: "Pakistan",
  },

  // Drinks
  {
    id: "p-15",
    name: "Mango Lassi (16oz)",
    description:
      "Thick, creamy blend of fresh Alphonso mangoes and tangy yogurt. Refreshingly sweet.",
    price: 5.99,
    image_url:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=80&auto=format&fit=crop",
    category_id: "cat-7",
    category_name: "Drinks",
    rating: 4.8,
    reviews_count: 501,
    is_featured: true,
    in_stock: true,
    origin: "Punjab",
  },
  {
    id: "p-16",
    name: "Kashmiri Chai",
    description:
      "Pink tea brewed with Kashmiri tea leaves, milk, and cardamom. Topped with crushed pistachios.",
    price: 4.99,
    image_url:
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&q=80&auto=format&fit=crop",
    category_id: "cat-7",
    category_name: "Drinks",
    rating: 4.7,
    reviews_count: 234,
    is_featured: false,
    in_stock: true,
    origin: "Kashmir",
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return PRODUCTS.filter((p) => p.category_id === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.is_featured);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.category_name && p.category_name.toLowerCase().includes(q))
  );
}