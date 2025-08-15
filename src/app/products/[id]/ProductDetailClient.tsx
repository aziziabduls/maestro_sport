"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { useToast } from "@/lib/use-toast";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  features: string[];
  sizes: string[];
  stock: number;
}

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const { toast } = useToast();
  const addItem = useCartStore((state) => state.addItem);
  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        description: "Silakan pilih ukuran terlebih dahulu.",
        variant: "destructive",
      });
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
    });

    toast({
      description: `${product.name} telah ditambahkan ke keranjang.`,
    });
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Ukuran</h2>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <Button
              key={size}
              variant={selectedSize === size ? "default" : "outline"}
              onClick={() => setSelectedSize(size)}
              className={selectedSize === size ? "bg-blue-600" : ""}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Stok: <span className="font-medium">{product.stock}</span> tersedia
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button
          onClick={handleAddToCart}
          className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <ShoppingCart className="h-5 w-5" />
          Tambahkan ke Keranjang
        </Button>
        <Button
          asChild
          variant="secondary"
          className="flex-1 bg-gray-800 hover:bg-gray-900 text-white"
        >
          <Link href={`/checkout?product=${product.id}`}>Beli Sekarang</Link>
        </Button>
      </div>
    </>
  );
}
