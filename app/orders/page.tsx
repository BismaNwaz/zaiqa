"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type OrderStatus = "pending" | "confirmed" | "preparing" | "out_for_delivery" | "delivered";

interface StoredOrder {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  customer_name: string;
  delivery_address: string;
  payment_method: string;
  items: Array<{
    product: {
      id: string;
      name: string;
      price: number;
      image_url: string;
    };
    quantity: number;
  }>;
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; emoji: string }> = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700", emoji: "⏳" },
  confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-700", emoji: "✅" },
  preparing: { label: "Preparing", color: "bg-orange-100 text-orange-700", emoji: "🍳" },
  out_for_delivery: { label: "On the way", color: "bg-purple-100 text-purple-700", emoji: "🛵" },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-700", emoji: "📦" },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("zaiqa-orders");
      if (raw) {
        setOrders(JSON.parse(raw));
      }
    } catch {
      // localStorage unavailable
    }
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-stone-400">
        Loading orders…
      </div>
    );
  }

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

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-8xl mb-6">📋</div>
          <h2 className="text-xl font-semibold text-stone-700 mb-2">No orders yet</h2>
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
          {orders.map((order) => {
            const status = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.confirmed;
            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden"
              >
                {/* Order header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div>
                      <p className="font-mono font-semibold text-stone-900 text-sm">
                        {order.id}
                      </p>
                      <p className="text-stone-400 text-xs mt-0.5">
                        Placed on{" "}
                        {new Date(order.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${status.color}`}>
                      {status.emoji} {status.label}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-stone-900">${order.total.toFixed(2)}</p>
                    <p className="text-stone-400 text-xs mt-0.5">
                      {order.items.reduce((s, i) => s + i.quantity, 0)} items
                    </p>
                  </div>
                </div>

                {/* Order items */}
                <div className="p-5">
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
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

                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex-1 text-sm text-stone-600">
                      {order.items
                        .map(({ product, quantity }) => `${quantity}× ${product.name}`)
                        .join(", ")}
                    </div>
                    {order.delivery_address && (
                      <p className="text-xs text-stone-400 w-full truncate">
                        📍 {order.delivery_address}
                      </p>
                    )}
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

      <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-200 text-sm text-amber-800">
        <p className="font-medium mb-1">📱 Order history</p>
        <p>Your orders are saved on this device. Place an order to see it here.</p>
      </div>
    </div>
  );
}