'use client';

import { useCart } from '@/context/CartContext';
import { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const toast = useRef<Toast>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.address) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Missing fields',
        detail: 'Please fill out all fields',
      });
      return;
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form, cart, total }),
      });

      if (!res.ok) throw new Error('Failed to place order');

      const data = await res.json();
      clearCart();
      window.location.href = `/confirmation?orderId=${data.orderId}`;
    } catch (err) {
      toast.current?.show({
        severity: 'error',
        summary: `Error: ${err}`,
        detail: 'Something went wrong while placing your order.',
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 text-white">
      <Toast ref={toast} />
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid gap-4 mb-8">
        <div className="p-float-label">
          <InputText
            id="name"
            name="name"
            value={form.name}
            onChange={handleInput}
            className="w-full"
          />
          <label htmlFor="name">Name</label>
        </div>

        <div className="p-float-label">
          <InputText
            id="email"
            name="email"
            value={form.email}
            onChange={handleInput}
            className="w-full"
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="p-float-label">
          <InputText
            id="address"
            name="address"
            value={form.address}
            onChange={handleInput}
            className="w-full"
          />
          <label htmlFor="address">Address</label>
        </div>
      </div>

      <div className="mb-4 text-lg font-medium">
        Order Total: ${total.toFixed(2)}
      </div>

      <Button
        label="Place Order"
        className="p-button-success"
        onClick={handleSubmit}
        disabled={cart.length === 0}
      />
    </div>
  );
}
