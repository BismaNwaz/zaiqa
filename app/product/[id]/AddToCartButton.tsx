"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/types";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);

  const inCart = items.find((i) => i.product.id === product.id);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={handleAdd}
        disabled={!product.in_stock || added}
        className={`flex-1 font-bold py-3 px-6 rounded-full text-base transition-all ${
          added
            ? "bg-green-600 text-white"
            : product.in_stock
            ? "bg-amber-600 hover:bg-amber-700 text-white active:scale-95"
            : "bg-stone-300 text-stone-500 cursor-not-allowed"
        }`}
      >
        {added ? "✓ Added to Cart!" : !product.in_stock ? "Out of Stock" : "Add to Cart"}
      </button>
      {inCart && (
        <a
          href="/cart"
          className="flex-1 text-center font-bold py-3 px-6 rounded-full border-2 border-amber-600 text-amber-700 hover:bg-amber-50 transition-colors text-base"
        >
          View Cart ({inCart.quantity})
        </a>
      )}
    </div>
  );
}
