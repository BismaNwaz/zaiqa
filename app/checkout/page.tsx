"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { createOrder } from "@/lib/db";

const DELIVERY_FEE = 3.99;
const FREE_DELIVERY_THRESHOLD = 35;

type Step = "delivery" | "payment" | "review" | "success";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>("delivery");
  const [orderId, setOrderId] = useState<string | null>(null);

  const [delivery, setDelivery] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    notes: "",
  });

  const [payment, setPayment] = useState({
    method: "card" as "card" | "cash",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  async function placeOrder() {
    const order = await createOrder({
      customer_name: delivery.name,
      customer_email: delivery.email,
      customer_phone: delivery.phone,
      delivery_address: `${delivery.address}, ${delivery.city} ${delivery.postcode}`,
      items,
      subtotal,
      delivery_fee: deliveryFee,
      total,
      status: "confirmed",
      payment_method: payment.method,
      notes: delivery.notes,
    });

    if (order) {
      setOrderId(order.id);

      // Save to localStorage so the orders page shows this order
      try {
        const storedOrder = {
          id: order.id,
          date: new Date().toISOString(),
          status: "confirmed" as const,
          total,
          customer_name: delivery.name,
          delivery_address: `${delivery.address}, ${delivery.city} ${delivery.postcode}`,
          payment_method: payment.method,
          items: items.map(({ product, quantity }) => ({
            product: {
              id: product.id,
              name: product.name,
              price: product.price,
              image_url: product.image_url,
            },
            quantity,
          })),
        };
        const existing = JSON.parse(localStorage.getItem("zaiqa-orders") || "[]");
        localStorage.setItem("zaiqa-orders", JSON.stringify([storedOrder, ...existing]));
      } catch {
        // localStorage unavailable — order still completes
      }

      clearCart();
      setStep("success");
    }
  }

  if (items.length === 0 && step !== "success") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-8xl mb-6">🛒</div>
        <h1 className="text-2xl font-bold text-stone-900 mb-3">
          Your cart is empty
        </h1>
        <Link
          href="/products"
          className="bg-amber-600 text-white font-bold px-8 py-3 rounded-full hover:bg-amber-700 transition-colors"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="text-8xl mb-6">🎉</div>
        <h1 className="text-2xl font-bold text-stone-900 mb-3">
          Order Placed!
        </h1>
        <p className="text-stone-600 mb-2">
          Thank you, {delivery.name || "valued customer"}!
        </p>
        {orderId && (
          <p className="text-stone-500 text-sm mb-6">
            Order ID:{" "}
            <span className="font-mono font-medium text-stone-700">{orderId}</span>
          </p>
        )}
        <div className="bg-green-50 rounded-2xl p-6 mb-8 text-left border border-green-200">
          <h2 className="font-semibold text-green-800 mb-3">What&apos;s Next?</h2>
          {[
            { emoji: "✅", text: "Order confirmed — we're preparing your food" },
            { emoji: "🍳", text: "Our chefs are cooking your fresh meal" },
            { emoji: "🛵", text: "Delivery rider will pick up in ~15 min" },
            { emoji: "📦", text: "Estimated delivery: 25–40 minutes" },
          ].map(({ emoji, text }) => (
            <div key={text} className="flex items-center gap-3 text-sm text-green-700 mb-2">
              <span>{emoji}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3 justify-center">
          <Link
            href="/orders"
            className="bg-amber-600 text-white font-bold px-6 py-3 rounded-full hover:bg-amber-700 transition-colors"
          >
            Track Order
          </Link>
          <Link
            href="/products"
            className="border-2 border-amber-600 text-amber-700 font-bold px-6 py-3 rounded-full hover:bg-amber-50 transition-colors"
          >
            Order Again
          </Link>
        </div>
      </div>
    );
  }

  const steps: { key: Step; label: string; emoji: string }[] = [
    { key: "delivery", label: "Delivery", emoji: "📍" },
    { key: "payment", label: "Payment", emoji: "💳" },
    { key: "review", label: "Review", emoji: "📋" },
  ];

  const stepIndex = steps.findIndex((s) => s.key === step);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-stone-900 mb-6">Checkout</h1>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                i <= stepIndex
                  ? "bg-amber-600 text-white"
                  : "bg-stone-100 text-stone-500"
              }`}
            >
              <span>{s.emoji}</span>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-0.5 w-6 ${
                  i < stepIndex ? "bg-amber-600" : "bg-stone-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {/* STEP 1: Delivery */}
          {step === "delivery" && (
            <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
              <h2 className="font-bold text-stone-900 text-lg mb-5">
                📍 Delivery Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "name", label: "Full Name", type: "text", placeholder: "Fatima Khan", col: 2 },
                  { key: "email", label: "Email Address", type: "email", placeholder: "fatima@example.com", col: 1 },
                  { key: "phone", label: "Phone Number", type: "tel", placeholder: "+44 7911 123456", col: 1 },
                  { key: "address", label: "Delivery Address", type: "text", placeholder: "123 Green Lane, Flat 2", col: 2 },
                  { key: "city", label: "City", type: "text", placeholder: "London", col: 1 },
                  { key: "postcode", label: "Postcode", type: "text", placeholder: "E1 6RF", col: 1 },
                ].map(({ key, label, type, placeholder, col }) => (
                  <div key={key} className={col === 2 ? "sm:col-span-2" : ""}>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      {label}
                    </label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={delivery[key as keyof typeof delivery]}
                      onChange={(e) =>
                        setDelivery((d) => ({ ...d, [key]: e.target.value }))
                      }
                      className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Delivery Notes (optional)
                  </label>
                  <textarea
                    placeholder="Ring the bell, leave at door, etc."
                    value={delivery.notes}
                    onChange={(e) =>
                      setDelivery((d) => ({ ...d, notes: e.target.value }))
                    }
                    rows={2}
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 resize-none"
                  />
                </div>
              </div>
              <button
                onClick={() => setStep("payment")}
                disabled={!delivery.name || !delivery.email || !delivery.address}
                className="mt-5 w-full bg-amber-600 hover:bg-amber-700 disabled:bg-stone-300 text-white font-bold py-3 rounded-full transition-colors"
              >
                Continue to Payment →
              </button>
            </div>
          )}

          {/* STEP 2: Payment */}
          {step === "payment" && (
            <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
              <h2 className="font-bold text-stone-900 text-lg mb-5">
                💳 Payment Method
              </h2>
              <div className="flex gap-3 mb-5">
                {[
                  { value: "card", label: "💳 Card", desc: "Visa, Mastercard, Amex" },
                  { value: "cash", label: "💵 Cash", desc: "Pay at delivery" },
                ].map(({ value, label, desc }) => (
                  <button
                    key={value}
                    onClick={() =>
                      setPayment((p) => ({
                        ...p,
                        method: value as "card" | "cash",
                      }))
                    }
                    className={`flex-1 border-2 rounded-xl p-3 text-left transition-colors ${
                      payment.method === value
                        ? "border-amber-600 bg-amber-50"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <div className="font-semibold text-sm">{label}</div>
                    <div className="text-xs text-stone-500 mt-0.5">{desc}</div>
                  </button>
                ))}
              </div>

              {payment.method === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      value={payment.cardNumber}
                      onChange={(e) =>
                        setPayment((p) => ({
                          ...p,
                          cardNumber: e.target.value
                            .replace(/\D/g, "")
                            .replace(/(.{4})/g, "$1 ")
                            .trim(),
                        }))
                      }
                      className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">
                        Expiry
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={payment.expiry}
                        onChange={(e) =>
                          setPayment((p) => ({ ...p, expiry: e.target.value }))
                        }
                        className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        maxLength={4}
                        value={payment.cvv}
                        onChange={(e) =>
                          setPayment((p) => ({ ...p, cvv: e.target.value }))
                        }
                        className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 font-mono"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-stone-400 flex items-center gap-1">
                    <span>🔒</span>
                    <span>Your card details are encrypted and never stored</span>
                  </p>
                </div>
              )}

              {payment.method === "cash" && (
                <div className="bg-stone-50 rounded-xl p-4 text-sm text-stone-600">
                  <p>
                    Pay in cash when your order arrives. Please have the exact
                    amount ready.
                  </p>
                  <p className="font-bold text-stone-900 mt-2">
                    Amount due: ${total.toFixed(2)}
                  </p>
                </div>
              )}

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => setStep("delivery")}
                  className="flex-1 border-2 border-stone-200 text-stone-700 font-semibold py-3 rounded-full hover:border-stone-300 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep("review")}
                  className="flex-2 flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-full transition-colors"
                >
                  Review Order →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Review */}
          {step === "review" && (
            <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
              <h2 className="font-bold text-stone-900 text-lg mb-5">
                📋 Review Your Order
              </h2>

              <div className="mb-4 p-3 bg-stone-50 rounded-xl text-sm">
                <p className="font-medium text-stone-900">
                  📍 {delivery.name}
                </p>
                <p className="text-stone-600">
                  {delivery.address}, {delivery.city} {delivery.postcode}
                </p>
                <p className="text-stone-600">{delivery.email} · {delivery.phone}</p>
              </div>

              <div className="space-y-3 mb-5">
                {items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-2 rounded-xl"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-stone-900 text-sm truncate">
                        {product.name}
                      </p>
                      <p className="text-stone-500 text-xs">
                        {quantity} × ${product.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-bold text-stone-900 text-sm">
                      ${(product.price * quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("payment")}
                  className="flex-1 border-2 border-stone-200 text-stone-700 font-semibold py-3 rounded-full hover:border-stone-300 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={placeOrder}
                  className="flex-1 bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-full transition-colors"
                >
                  ✓ Place Order · ${total.toFixed(2)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div>
          <div className="bg-white rounded-2xl border border-stone-100 p-5 shadow-sm sticky top-24">
            <h3 className="font-bold text-stone-900 mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm mb-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-stone-600">
                  <span className="truncate mr-2">
                    {quantity}× {product.name}
                  </span>
                  <span className="shrink-0">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-stone-100 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Delivery</span>
                {deliveryFee === 0 ? (
                  <span className="text-green-600 font-medium">Free</span>
                ) : (
                  <span>${deliveryFee.toFixed(2)}</span>
                )}
              </div>
              <div className="flex justify-between font-bold text-stone-900 text-base pt-1 border-t border-stone-100">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}