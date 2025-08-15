"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { useToast } from "@/lib/use-toast";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import productsData from "../../data/products.json";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { toast } = useToast();
  const addItem = useCartStore((state) => state.addItem);
  const [selectedSize, setSelectedSize] = useState("");

  // Mengambil data produk berdasarkan ID
  // Gunakan React.use() untuk unwrap params
  const unwrappedParams = React.use(params);
  const productId = parseInt(unwrappedParams.id);
  const product = productsData.find((p) => p.id === productId);

  // Jika produk tidak ditemukan, tampilkan halaman 404
  if (!product) {
    notFound();
  }

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
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex text-sm">
              <li className="mr-2">
                <Link href="/" className="text-gray-500 hover:text-gray-900">
                  Beranda
                </Link>
              </li>
              <li className="mx-2 text-gray-500">/</li>
              <li className="mr-2">
                <Link
                  href="/products"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Produk
                </Link>
              </li>
              <li className="mx-2 text-gray-500">/</li>
              <li className="text-gray-900">{product.name}</li>
            </ol>
          </nav>

          {/* Product Detail */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative h-96 w-full bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-2xl text-blue-600 font-bold mb-6">
                Rp {product.price.toLocaleString("id-ID")}
              </p>

              <div className="mb-6">
                <h2 className="text-lg font-medium mb-2">Deskripsi</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-medium mb-2">Fitur</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

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
                  Stok: <span className="font-medium">{product.stock}</span>{" "}
                  tersedia
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
                  <Link href={`/checkout?product=${productId}`}>
                    Beli Sekarang
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
