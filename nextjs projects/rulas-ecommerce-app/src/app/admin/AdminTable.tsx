'use client';

import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface Order {
  id: string;
  name: string;
  email: string;
  address: string;
  total: number;
  createdAt: string;
  items: {
    title: string;
    price: number;
    quantity: number;
  }[];
}

export default function AdminTable() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/api/admin/orders')
      .then(res => res.json())
      .then(setOrders);
  }, []);

  return (
    <DataTable value={orders} paginator rows={5} tableStyle={{ minWidth: '50rem' }}>
      <Column field="name" header="Customer" />
      <Column field="email" header="Email" />
      <Column field="total" header="Total ($)" body={row => row.total.toFixed(2)} />
      <Column field="createdAt" header="Date" body={row => new Date(row.createdAt).toLocaleString()} />
      <Column
        header="Items"
        body={row => (
          <ul className="text-sm">
            {row.items.map((item: { title: string; quantity: number }, i: number) => (
              <li key={i}>🛒 {item.title} × {item.quantity}</li>
            ))}
          </ul>
        )}
      />
    </DataTable>
  );
}
