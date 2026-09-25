export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  emoji: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string;
  category_name?: string;
  rating: number;
  reviews_count: number;
  is_featured: boolean;
  in_stock: boolean;
  weight?: string;
  origin?: string;
  spice_level?: "mild" | "medium" | "hot" | "extra-hot";
  ingredients?: string;
  serves?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  items: CartItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  status: "pending" | "confirmed" | "preparing" | "out_for_delivery" | "delivered";
  payment_method: string;
  notes?: string;
  created_at: string;
}
