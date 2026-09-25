/**
 * Database layer — tries Supabase first, falls back to static data
 */
import { getSupabase, isSupabaseConfigured } from "./supabase";
import {
  PRODUCTS,
  CATEGORIES,
  getProductById as staticGetById,
  getFeaturedProducts as staticGetFeatured,
  searchProducts as staticSearch,
} from "./data";
import type { Product, Category, Order } from "./types";

export async function fetchAllProducts(): Promise<Product[]> {
  const db = getSupabase();
  if (!isSupabaseConfigured || !db) return PRODUCTS;
  const { data, error } = await db
    .from("products")
    .select("*, categories(name)")
    .order("is_featured", { ascending: false });
  if (error || !data) return PRODUCTS;
  return data.map((p: Record<string, unknown>) => ({
    ...p,
    category_name: (p.categories as { name: string } | null)?.name ?? "",
  })) as Product[];
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const db = getSupabase();
  if (!isSupabaseConfigured || !db) return staticGetById(id) ?? null;
  const { data, error } = await db
    .from("products")
    .select("*, categories(name)")
    .eq("id", id)
    .single();
  if (error || !data) return staticGetById(id) ?? null;
  return { ...data, category_name: (data.categories as { name: string } | null)?.name ?? "" } as Product;
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const db = getSupabase();
  if (!isSupabaseConfigured || !db) return staticGetFeatured();
  const { data, error } = await db
    .from("products")
    .select("*, categories(name)")
    .eq("is_featured", true)
    .limit(8);
  if (error || !data) return staticGetFeatured();
  return data.map((p: Record<string, unknown>) => ({
    ...p,
    category_name: (p.categories as { name: string } | null)?.name ?? "",
  })) as Product[];
}

export async function fetchAllCategories(): Promise<Category[]> {
  const db = getSupabase();
  if (!isSupabaseConfigured || !db) return CATEGORIES;
  const { data, error } = await db.from("categories").select("*").order("name");
  if (error || !data) return CATEGORIES;
  return data as Category[];
}

export async function searchProductsDB(query: string): Promise<Product[]> {
  const db = getSupabase();
  if (!isSupabaseConfigured || !db) return staticSearch(query);
  const { data, error } = await db
    .from("products")
    .select("*, categories(name)")
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`);
  if (error || !data) return staticSearch(query);
  return data.map((p: Record<string, unknown>) => ({
    ...p,
    category_name: (p.categories as { name: string } | null)?.name ?? "",
  })) as Product[];
}

export async function createOrder(
  order: Omit<Order, "id" | "created_at">
): Promise<Order> {
  const db = getSupabase();
  const fallback: Order = {
    ...order,
    id: `ORD-${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  if (!isSupabaseConfigured || !db) return fallback;
  const { data, error } = await db
    .from("orders")
    .insert([order])
    .select()
    .single();
  if (error || !data) {
    console.error("Order creation error:", error);
    return fallback;
  }
  return data as Order;
}
