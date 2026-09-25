import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { fetchFeaturedProducts, fetchAllCategories } from "@/lib/db";

export const revalidate = 3600; // revalidate every hour

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    fetchFeaturedProducts(),
    fetchAllCategories(),
  ]);

  return (
    <div>
      {/* ──── HERO ──── */}
      <section className="relative min-h-[520px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1920&q=80&auto=format&fit=crop"
          alt="Authentic Pakistani food"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-xl">
            <p className="text-amber-200 font-semibold text-sm uppercase tracking-widest mb-3">
              🌙 Authentic · Halal · Delivered Fresh
            </p>
            <h1 className="text-white font-bold text-4xl sm:text-5xl leading-tight mb-4">
              Real Flavors from
              <br />
              <span className="text-amber-200">the Subcontinent</span>
            </h1>
            <p className="text-white/90 text-lg mb-8">
              From saffron-kissed biryani to smoky seekh kebabs — every dish
              crafted from authentic recipes passed down through generations.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="bg-white text-amber-700 font-bold px-6 py-3 rounded-full hover:bg-amber-50 transition-colors shadow-lg"
              >
                Order Now →
              </Link>
              <Link
                href="/products?category=rice-biryani"
                className="border-2 border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
              >
                🍚 Biryani Menu
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-10">
              {[
                { value: "50+", label: "Authentic Dishes" },
                { value: "4.8★", label: "Avg Rating" },
                { value: "30 min", label: "Delivery" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-white font-bold text-xl">{value}</div>
                  <div className="text-amber-200 text-xs">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──── ANNOUNCEMENT BANNER ──── */}
      <div className="bg-green-800 text-green-50 text-center py-3 px-4 text-sm font-medium">
        🎉 Free delivery on orders above $35 · Use code{" "}
        <span className="bg-green-700 px-2 py-0.5 rounded font-mono">ZAIQA20</span>{" "}
        for 20% off your first order!
      </div>

      {/* ──── CATEGORIES ──── */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-stone-900">
            Browse by Category
          </h2>
          <Link
            href="/products"
            className="text-amber-600 hover:text-amber-700 font-medium text-sm"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group flex flex-col items-center p-4 bg-white rounded-2xl border border-stone-100 hover:border-amber-300 hover:shadow-md transition-all duration-200"
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                {cat.emoji}
              </div>
              <span className="text-xs font-semibold text-stone-700 text-center leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ──── FEATURED PRODUCTS ──── */}
      <section className="bg-amber-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-stone-900">
                ⭐ Chef&apos;s Picks
              </h2>
              <p className="text-stone-500 text-sm mt-1">
                Our most-loved dishes, handpicked for you
              </p>
            </div>
            <Link
              href="/products"
              className="text-amber-600 hover:text-amber-700 font-medium text-sm"
            >
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ──── WHY ZAIQA ──── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-stone-900 text-center mb-10">
          Why Choose Zaiqa?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: "🌿",
              title: "100% Halal",
              desc: "Every ingredient is certified halal. We source only from trusted suppliers.",
            },
            {
              icon: "👨‍🍳",
              title: "Authentic Recipes",
              desc: "Traditional recipes passed down through generations, unchanged.",
            },
            {
              icon: "🚀",
              title: "Fast Delivery",
              desc: "Hot, fresh food at your door in 30 minutes or less.",
            },
            {
              icon: "❤️",
              title: "Made with Love",
              desc: "Every dish prepared fresh daily with the finest ingredients.",
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="text-center p-6 bg-white rounded-2xl border border-stone-100 hover:border-amber-200 hover:shadow-sm transition-all"
            >
              <div className="text-4xl mb-3">{icon}</div>
              <h3 className="font-bold text-stone-900 mb-2">{title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ──── SPECIALTY BANNER ──── */}
      <section className="bg-stone-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">
            This Weekend
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            🍛 Special Karahi Night
          </h2>
          <p className="text-stone-300 text-lg mb-8 max-w-xl mx-auto">
            Order any karahi dish this weekend and get a complimentary garlic
            naan and raita. Limited time offer!
          </p>
          <Link
            href="/products?category=curries"
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3 rounded-full transition-colors inline-block"
          >
            Order Karahi Now
          </Link>
        </div>
      </section>

      {/* ──── TESTIMONIALS ──── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-stone-900 text-center mb-10">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              name: "Sana K.",
              city: "London",
              rating: 5,
              review:
                "The biryani took me straight back to my daadi&apos;s kitchen in Lahore. Absolutely authentic!",
            },
            {
              name: "Ahmed R.",
              city: "Birmingham",
              rating: 5,
              review:
                "Best seekh kebabs I&apos;ve had outside of Pakistan. The charcoal flavor is spot on.",
            },
            {
              name: "Priya M.",
              city: "Manchester",
              rating: 5,
              review:
                "I order from Zaiqa every Friday. The Nihari is unbelievably good. Always fresh and hot!",
            },
          ].map(({ name, city, rating, review }) => (
            <div
              key={name}
              className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm"
            >
              <div className="flex mb-3">
                {[...Array(rating)].map((_, i) => (
                  <span key={i} className="text-amber-400">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-stone-700 text-sm leading-relaxed mb-4 italic">
                &quot;{review}&quot;
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">
                  {name[0]}
                </div>
                <div>
                  <div className="font-semibold text-stone-900 text-sm">{name}</div>
                  <div className="text-stone-400 text-xs">{city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
