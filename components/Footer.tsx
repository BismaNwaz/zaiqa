"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🍛</span>
              <div>
                <div className="text-white font-bold text-xl">Zaiqa</div>
                <div className="text-amber-400 text-xs tracking-widest uppercase">
                  Authentic Flavors
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Bringing the authentic tastes of Pakistan and South Asia to your
              doorstep. Fresh, authentic, and made with love.
            </p>
            <div className="flex gap-3 mt-4">
              {["📱", "📘", "📸"].map((icon, i) => (
                <button
                  key={i}
                  className="text-xl hover:scale-110 transition-transform"
                  onClick={() => {}}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/products", label: "Browse All" },
                { href: "/products?category=rice-biryani", label: "Biryani" },
                { href: "/products?category=grills-bbq", label: "Grills & BBQ" },
                { href: "/products?category=sweets", label: "Sweets" },
                { href: "/orders", label: "My Orders" },
                { href: "/cart", label: "Cart" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Information</h3>
            <ul className="space-y-2 text-sm">
              {["About Us", "How It Works", "Quality Promise", "FAQ", "Contact Us"].map(
                (item) => (
                  <li key={item}>
                    <button
                      onClick={() => {}}
                      className="hover:text-amber-400 transition-colors text-left"
                    >
                      {item}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact & Hours</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>123 Biryani Lane, London, UK</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+44 20 7946 0958</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <span>hello@zaiqafoods.com</span>
              </li>
              <li className="mt-3">
                <div className="text-white font-medium text-xs uppercase tracking-wide mb-1">
                  Delivery Hours
                </div>
                <div>Mon–Fri: 11am – 10pm</div>
                <div>Sat–Sun: 10am – 11pm</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} Zaiqa Foods Ltd. All rights reserved.
          </p>
          <div className="flex gap-4">
            <button onClick={() => {}} className="hover:text-stone-300">
              Privacy Policy
            </button>
            <button onClick={() => {}} className="hover:text-stone-300">
              Terms of Service
            </button>
            <button onClick={() => {}} className="hover:text-stone-300">
              Cookie Settings
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span>🔒</span>
            <span>Secure Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
