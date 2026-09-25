"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/types";

const SPICE_COLORS: Record<string, string> = {
  mild: "bg-green-100 text-green-700",
  medium: "bg-amber-100 text-amber-700",
  hot: "bg-orange-100 text-orange-700",
  "extra-hot": "bg-red-100 text-red-700",
};

const SPICE_LABELS: Record<string, string> = {
  mild: "🌿 Mild",
  medium: "🌶 Medium",
  hot: "🌶🌶 Hot",
  "extra-hot": "🌶🌶🌶 Extra Hot",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.round(rating) ? "text-amber-400" : "text-stone-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();

  return (
    <div className="product-card animate-fade-in-up bg-white rounded-2xl overflow-hidden group border border-stone-100">
      {/* Image */}
      <Link href={`/product/${product.id}`} className="block relative h-52 overflow-hidden">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.is_featured && (
          <span className="absolute top-2 left-2 bg-amber-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            ⭐ Featured
          </span>
        )}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold text-sm bg-black/60 px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category + Spice */}
        <div className="flex items-center gap-2 mb-1.5">
          {product.category_name && (
            <span className="text-xs text-stone-500">{product.category_name}</span>
          )}
          {product.spice_level && (
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                SPICE_COLORS[product.spice_level]
              }`}
            >
              {SPICE_LABELS[product.spice_level]}
            </span>
          )}
        </div>

        {/* Name */}
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-stone-900 text-sm hover:text-amber-700 transition-colors line-clamp-2 mb-1">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-stone-500 text-xs line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-stone-500">
            {product.rating.toFixed(1)} ({product.reviews_count.toLocaleString()})
          </span>
        </div>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-stone-900">
              ${product.price.toFixed(2)}
            </span>
            {product.serves && (
              <span className="text-xs text-stone-400 ml-1">/ {product.serves} serving{product.serves > 1 ? "s" : ""}</span>
            )}
          </div>
          <button
            onClick={() => addItem(product)}
            disabled={!product.in_stock}
            className="btn-cart bg-amber-600 hover:bg-amber-700 disabled:bg-stone-300 text-white text-sm font-semibold px-3 py-1.5 rounded-lg"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
