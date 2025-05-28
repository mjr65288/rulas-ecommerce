"use client";

import { useSearchParams } from "next/navigation";

export default function ConfirmationPage() {
  const params = useSearchParams();
  const orderId = params.get("orderId");

  return (
    <div className="max-w-xl mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">🎉 Thank you for your order!</h1>
      <p className="mb-2">Your order ID is:</p>
      <code className="block bg-gray-800 p-2 rounded">{orderId}</code>
    </div>
  );
}
