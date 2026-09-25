"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export default function Header() {
  const { itemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-amber-600 shadow-md">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">🍛</span>
          <div>
            <span className="text-white font-bold text-xl tracking-tight">
              Zaiqa
            </span>
            <span className="block text-amber-200 text-[10px] leading-none font-medium tracking-widest uppercase">
              Authentic Flavors
            </span>
          </div>
        </Link>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="flex-1 flex items-center max-w-2xl mx-auto"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search biryani, kebabs, curries..."
            className="flex-1 px-4 py-2 rounded-l-full text-stone-900 text-sm outline-none focus:ring-2 focus:ring-green-600 bg-white"
          />
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-r-full font-medium text-sm transition-colors"
          >
            Search
          </button>
        </form>

        {/* Nav icons */}
        <nav className="flex items-center gap-3 shrink-0">
          <Link
            href="/orders"
            className="text-white hover:text-amber-100 text-sm hidden sm:flex flex-col items-center"
          >
            <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-xs">Orders</span>
          </Link>

          <Link href="/cart" className="relative text-white hover:text-amber-100">
            <div className="flex flex-col items-center">
              <div className="relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {itemCount > 0 && (
                  <span className="badge-new absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </div>
              <span className="text-xs mt-0.5">Cart</span>
            </div>
          </Link>
        </nav>
      </div>

      {/* Category nav bar */}
      <div className="bg-amber-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6 overflow-x-auto py-2 text-sm text-amber-100 hide-scrollbar">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-1.5 hover:text-white font-medium shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              All Categories
            </button>
            <div className="w-px h-4 bg-amber-500" />
            {[
              { href: "/products?category=rice-biryani", label: "🍚 Biryani" },
              { href: "/products?category=grills-bbq", label: "🍗 Grills" },
              { href: "/products?category=curries", label: "🥘 Curries" },
              { href: "/products?category=breads", label: "🫓 Breads" },
              { href: "/products?category=snacks", label: "🥟 Snacks" },
              { href: "/products?category=sweets", label: "🍬 Sweets" },
              { href: "/products?category=drinks", label: "🥤 Drinks" },
              { href: "/products?category=spices", label: "🌶️ Spices" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="hover:text-white shrink-0 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
