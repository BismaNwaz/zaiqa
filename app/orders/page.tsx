import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/data";

// Demo orders data (in a real app these would come from Supabase)
const DEMO_ORDERS = [
  {
    id: "ORD-2024-001",
    date: "2024-09-24",
    status: "delivered" as const,
    total: 45.97,
    items: [
      { product: PRODUCTS[0], quantity: 2 }, // Chicken Biryani
      { product: PRODUCTS[3], quantity: 1 }, // Seekh Kebab
      { product: PRODUCTS[9], quantity: 1 }, // Butter Naan
    ],
  },
  {
    id: "ORD-2024-002",
    date: "2024-09-20",
    status: "delivered" as const,
    total: 28.97,
    items: [
      { product: PRODUCTS[6], quantity: 1 }, // Chicken Karahi
      { product: PRODUCTS[11], quantity: 2 }, // Samosa
      { product: PRODUCTS[14], quantity: 1 }, // Mango Lassi
    ],
  },
];

const STATUS_CONFIG = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700", emoji: "⏳" },
  confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-700", emoji: "✅" },
  preparing: { label: "Preparing", color: "bg-orange-100 text-orange-700", emoji: "🍳" },
  out_for_delivery: { label: "On the way", color: "bg-purple-100 text-purple-700", emoji: "🛵" },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-700", emoji: "📦" },
};

export default function OrdersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-stone-900">My Orders</h1>
        <Link
          href="/products"
          className="bg-amber-600 text-white font-semibold px-4 py-2 rounded-full text-sm hover:bg-amber-700 transition-colors"
        >
          + New Order
        </Link>
      </div>

      {DEMO_ORDERS.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-8xl mb-6">📋</div>
          <h2 className="text-xl font-semibold text-stone-700 mb-2">
            No orders yet
          </h2>
          <p className="text-stone-500 mb-6">
            Place your first order and enjoy authentic South Asian flavors!
          </p>
          <Link
            href="/products"
            className="bg-amber-600 text-white font-bold px-8 py-3 rounded-full hover:bg-amber-700 transition-colors"
          >
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {DEMO_ORDERS.map((order) => {
            const status = STATUS_CONFIG[order.status];
            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden"
              >
                {/* Order header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-mono font-semibold text-stone-900 text-sm">
                        {order.id}
                      </p>
                      <p className="text-stone-400 text-xs mt-0.5">
                        Placed on {new Date(order.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${status.color}`}
                    >
                      {status.emoji} {status.label}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-stone-900">
                      ${order.total.toFixed(2)}
                    </p>
                    <p className="text-stone-400 text-xs mt-0.5">
                      {order.items.reduce((sum, i) => sum + i.quantity, 0)} items
                    </p>
                  </div>
                </div>

                {/* Order items */}
                <div className="p-5">
                  <div className="flex gap-2 mb-4 overflow-x-auto">
                    {order.items.map(({ product, quantity }) => (
                      <div key={product.id} className="relative shrink-0">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-stone-100">
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                        {quantity > 1 && (
                          <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                            {quantity}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 text-sm text-stone-600">
                      {order.items
                        .map(
                          ({ product, quantity }) =>
                            `${quantity}× ${product.name}`
                        )
                        .join(", ")}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Link
                        href="/products"
                        className="text-sm font-semibold text-amber-600 hover:text-amber-700 border border-amber-200 px-3 py-1.5 rounded-full transition-colors"
                      >
                        Reorder
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tip */}
      <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-200 text-sm text-amber-800">
        <p className="font-medium mb-1">💡 Connect your account</p>
        <p>
          Sign in to see your full order history and track live orders.{" "}
          <button className="font-semibold underline">Create account →</button>
        </p>
      </div>
    </div>
  );
}
