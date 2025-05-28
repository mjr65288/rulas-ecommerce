"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-white">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="grid gap-6">
        {cart.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            subTitle={`$${item.price.toFixed(2)} x ${item.quantity}`}
            className="shadow-md"
          >
            <div className="flex items-center gap-2 mt-2">
              <Button
                icon="pi pi-minus"
                className="p-button-outlined p-button-sm"
                onClick={() => decreaseQuantity(item.id)}
              />
              <span className="font-semibold text-lg">{item.quantity}</span>
              <Button
                icon="pi pi-plus"
                className="p-button-outlined p-button-sm"
                onClick={() => increaseQuantity(item.id)}
              />
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <Image
                src={item.image}
                alt={item.title}
                width={128}
                height={128}
                className="rounded object-cover"
              />
              <div className="flex flex-col justify-between w-full text-left">
                <p className="mb-3">{item.description}</p>
                <div className="mt-auto">
                  <Button
                    label="Remove"
                    className="p-button-danger"
                    onClick={() => removeFromCart(item.id)}
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-xl font-semibold">
        Total: ${total.toFixed(2)}
      </div>

      <div className="flex gap-4 mt-4">
        <Button
          label="Clear Cart"
          className="p-button-secondary"
          onClick={clearCart}
        />
        <Button label="Checkout" className="p-button-success" />
      </div>
    </div>
  );
}
