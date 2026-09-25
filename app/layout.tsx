import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";

export const metadata: Metadata = {
  title: "Zaiqa — Authentic South Asian Flavors",
  description:
    "Order authentic Pakistani and South Asian food online. Fresh biryani, kebabs, curries, and more delivered to your door.",
  keywords: "Pakistani food, biryani, kebabs, curries, South Asian, halal, delivery",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
