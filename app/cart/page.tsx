"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

const DELIVERY_FEE = 3.99;
const FREE_DELIVERY_THRESHOLD = 35;

export default function CartPage() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-8xl mb-6">🛒</div>
        <h1 className="text-2xl font-bold text-stone-900 mb-3">
          Your cart is empty
        </h1>
        <p className="text-stone-500 mb-8">
          Add some delicious items from our menu!
        </p>
        <Link
          href="/products"
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3 rounded-full transition-colors"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-stone-900 mb-6">
        Your Cart ({items.length} item{items.length !== 1 ? "s" : ""})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-stone-100 p-4 flex gap-4 shadow-sm"
            >
              <Link href={`/product/${product.id}`} className="shrink-0 relative w-20 h-20 rounded-xl overflow-hidden">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/product/${product.id}`}
                  className="font-semibold text-stone-900 hover:text-amber-700 transition-colors block"
                >
                  {product.name}
                </Link>
                {product.category_name && (
                  <p className="text-stone-500 text-xs mt-0.5">{product.category_name}</p>
                )}
                <p className="text-amber-600 font-bold mt-1">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col items-end justify-between">
                {/* Qty controls */}
                <div className="flex items-center gap-2 border border-stone-200 rounded-full px-2 py-1">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-amber-700 font-bold"
                  >
                    −
                  </button>
                  <span className="w-5 text-center text-sm font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-amber-700 font-bold"
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <p className="font-bold text-stone-900">
                    ${(product.price * quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-xs text-red-500 hover:text-red-700 mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Promo code */}
          <div className="bg-amber-50 rounded-2xl border border-amber-200 p-4">
            <p className="text-sm font-medium text-amber-800 mb-2">
              🎁 Have a promo code?
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter code (e.g. ZAIQA20)"
                className="flex-1 border border-amber-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 bg-white"
              />
              <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-700 transition-colors">
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm sticky top-24">
            <h2 className="font-bold text-stone-900 text-lg mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Delivery</span>
                {deliveryFee === 0 ? (
                  <span className="text-green-600 font-medium">Free! 🎉</span>
                ) : (
                  <span>${deliveryFee.toFixed(2)}</span>
                )}
              </div>
              {subtotal < FREE_DELIVERY_THRESHOLD && (
                <div className="text-xs text-amber-700 bg-amber-50 rounded-lg p-2">
                  Add ${(FREE_DELIVERY_THRESHOLD - subtotal).toFixed(2)} more
                  for free delivery!
                </div>
              )}
              <div className="border-t border-stone-100 pt-3">
                <div className="flex justify-between font-bold text-stone-900 text-base">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-center py-3.5 rounded-full mt-5 transition-colors"
            >
              Proceed to Checkout →
            </Link>

            <Link
              href="/products"
              className="block text-center text-amber-600 hover:text-amber-700 text-sm mt-3 font-medium"
            >
              ← Continue Shopping
            </Link>

            <div className="flex items-center gap-2 text-xs text-stone-400 mt-4 justify-center">
              <span>🔒</span>
              <span>Secure checkout · Encrypted payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
