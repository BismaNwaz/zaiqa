import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "./AddToCartButton";
import { fetchProductById, fetchAllProducts } from "@/lib/db";

export const revalidate = 3600;

export async function generateStaticParams() {
  const products = await fetchAllProducts();
  return products.map((p) => ({ id: p.id }));
}

const SPICE_LABELS: Record<string, string> = {
  mild: "🌿 Mild",
  medium: "🌶 Medium",
  hot: "🌶🌶 Hot",
  "extra-hot": "🌶🌶🌶 Extra Hot",
};

export default async function ProductPage(props: PageProps<"/product/[id]">) {
  const { id } = await props.params;
  const product = await fetchProductById(id);

  if (!product) notFound();

  const allProducts = await fetchAllProducts();
  const related = allProducts
    .filter((p) => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-stone-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-amber-600">Home</Link>
        <span>›</span>
        <Link href="/products" className="hover:text-amber-600">Menu</Link>
        {product.category_name && (
          <>
            <span>›</span>
            <Link
              href={`/products?category=${product.category_id}`}
              className="hover:text-amber-600"
            >
              {product.category_name}
            </Link>
          </>
        )}
        <span>›</span>
        <span className="text-stone-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {product.is_featured && (
            <div className="absolute top-4 left-4 bg-amber-600 text-white text-sm font-bold px-3 py-1 rounded-full">
              ⭐ Chef&apos;s Pick
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          {/* Category badge */}
          {product.category_name && (
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wide mb-2">
              {product.category_name}
            </span>
          )}

          <h1 className="text-3xl font-bold text-stone-900 mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  className={s <= Math.round(product.rating) ? "text-amber-400" : "text-stone-300"}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-stone-700 font-medium">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-stone-400 text-sm">
              ({product.reviews_count.toLocaleString()} reviews)
            </span>
          </div>

          <p className="text-stone-600 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Meta badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {product.spice_level && (
              <span className="bg-amber-50 text-amber-700 border border-amber-200 text-sm px-3 py-1 rounded-full font-medium">
                {SPICE_LABELS[product.spice_level]}
              </span>
            )}
            {product.serves && (
              <span className="bg-green-50 text-green-700 border border-green-200 text-sm px-3 py-1 rounded-full font-medium">
                🍽 Serves {product.serves}
              </span>
            )}
            {product.origin && (
              <span className="bg-stone-50 text-stone-700 border border-stone-200 text-sm px-3 py-1 rounded-full font-medium">
                📍 {product.origin}
              </span>
            )}
            <span className="bg-blue-50 text-blue-700 border border-blue-200 text-sm px-3 py-1 rounded-full font-medium">
              ✅ Halal Certified
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-4xl font-bold text-stone-900">
              ${product.price.toFixed(2)}
            </span>
            {product.serves && (
              <span className="text-stone-400 text-sm ml-2">
                (${(product.price / product.serves).toFixed(2)} per serving)
              </span>
            )}
          </div>

          {/* Add to cart */}
          <AddToCartButton product={product} />

          {/* Delivery info */}
          <div className="mt-6 p-4 bg-green-50 rounded-2xl border border-green-100">
            <div className="flex items-center gap-2 text-green-800 text-sm">
              <span className="text-lg">🚀</span>
              <span className="font-medium">Express delivery in 30 minutes</span>
            </div>
            <p className="text-green-700 text-xs mt-1 ml-7">
              Free delivery on orders above $35 · Delivered hot and fresh
            </p>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-stone-900 mb-5">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.id}`}
                className="bg-white rounded-2xl border border-stone-100 hover:border-amber-300 hover:shadow-md transition-all overflow-hidden group"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={p.image_url}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="25vw"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-stone-900 text-sm">{p.name}</h3>
                  <p className="text-amber-600 font-bold mt-1">${p.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
