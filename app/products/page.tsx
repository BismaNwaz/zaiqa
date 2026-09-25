import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { fetchAllProducts, fetchAllCategories } from "@/lib/db";
import type { Product } from "@/lib/types";

export const revalidate = 3600;

async function ProductsGrid({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const search = typeof sp.search === "string" ? sp.search : "";
  const category = typeof sp.category === "string" ? sp.category : "";

  const [allProducts, categories] = await Promise.all([
    fetchAllProducts(),
    fetchAllCategories(),
  ]);

  let filtered: Product[] = allProducts;

  if (category) {
    const cat = categories.find((c) => c.slug === category);
    if (cat) {
      filtered = allProducts.filter((p) => p.category_id === cat.id);
    }
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  const activeCat = categories.find((c) => c.slug === category);

  return (
    <div className="flex gap-8">
      {/* Sidebar */}
      <aside className="hidden lg:block w-52 shrink-0">
        <div className="sticky top-24">
          <h3 className="font-bold text-stone-900 mb-3 text-sm uppercase tracking-wide">
            Categories
          </h3>
          <ul className="space-y-1">
            <li>
              <a
                href="/products"
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  !category
                    ? "bg-amber-600 text-white font-semibold"
                    : "text-stone-700 hover:bg-amber-50"
                }`}
              >
                All Items
              </a>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <a
                  href={`/products?category=${cat.slug}`}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    category === cat.slug
                      ? "bg-amber-600 text-white font-semibold"
                      : "text-stone-700 hover:bg-amber-50"
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Products */}
      <div className="flex-1">
        {/* Mobile category scroll */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 lg:hidden">
          <a
            href="/products"
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !category
                ? "bg-amber-600 text-white"
                : "bg-stone-100 text-stone-700"
            }`}
          >
            All
          </a>
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                category === cat.slug
                  ? "bg-amber-600 text-white"
                  : "bg-stone-100 text-stone-700"
              }`}
            >
              {cat.emoji} {cat.name}
            </a>
          ))}
        </div>

        {/* Result header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-stone-900">
              {activeCat ? `${activeCat.emoji} ${activeCat.name}` : search ? `Results for "${search}"` : "All Dishes"}
            </h1>
            <p className="text-stone-500 text-sm mt-0.5">
              {filtered.length} item{filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-stone-700 mb-2">
              Nothing found
            </h2>
            <p className="text-stone-500 mb-6">
              Try a different search or browse all categories.
            </p>
            <a
              href="/products"
              className="bg-amber-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-amber-700 transition-colors"
            >
              Browse All
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage({
  searchParams,
}: PageProps<never> & {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-stone-100 rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        }
      >
        <ProductsGrid searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
