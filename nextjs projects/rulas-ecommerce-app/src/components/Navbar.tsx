// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link href="/" className="text-xl font-bold">
        🛍️ Rulas Shop
      </Link>
      <div className="flex gap-6 items-center">
        <Link href="/cart">Cart ({count})</Link>
        <Link href="/checkout">Checkout</Link>
      </div>
    </nav>
  );
}
