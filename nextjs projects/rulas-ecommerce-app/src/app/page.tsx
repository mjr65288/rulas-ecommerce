"use client";

import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";
import Image from "next/image";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  return (
    <div className=" text-black min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              title={product.title}
              subTitle={`$${product.price.toFixed(2)}`}
              className="shadow-md"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={300}
                className="w-full h-64 object-cover mb-2"
              />
              <p>{product.description}</p>
              <Button
                label="Add to Cart"
                className="mt-3"
                onClick={() => addToCart(product)}
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
