"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { useToast } from "@/lib/use-toast";
import { Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import productsData from "../data/products.json";

export default function ProductsPage() {
  const { toast } = useToast();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const query = searchParams.get("q");

  const [searchQuery, setSearchQuery] = useState(query || "");

  // Filter produk berdasarkan kategori dan pencarian
  const filteredProducts = productsData.filter((product) => {
    // Filter berdasarkan kategori jika ada
    const matchesCategory = category ? product.category === category : true;

    // Filter berdasarkan pencarian jika ada
    const matchesSearch = query
      ? product.name.toLowerCase().includes(query.toLowerCase())
      : // || product.description.toLowerCase().includes(query.toLowerCase())
        ///NOTE - kalo mau cari berdasarkan deskripsi bisa uncoment code diatas
        true;

    return matchesCategory && matchesSearch;
  });

  const categories = [
    { name: "Semua", value: "all" },
    { name: "Baju Taekwondo", value: "uniform" },
    { name: "Sabuk", value: "belt" },
    { name: "Pelindung", value: "protector" },
    { name: "Peralatan Latihan", value: "training" },
  ];

  const handleAddToCart = (product: any) => {
    // Menggunakan ukuran default pertama
    const defaultSize = product.sizes[0];

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: defaultSize,
    });

    toast({
      description: `${product.name} telah ditambahkan ke keranjang.`,
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      params.set("q", searchQuery);
      router.push(`/products?${params.toString()}`);
    } else {
      // Jika pencarian kosong, hapus parameter q
      if (category) {
        router.push(`/products?category=${category}`);
      } else {
        router.push("/products");
      }
    }
  };

  // Update searchQuery ketika query parameter berubah
  useEffect(() => {
    setSearchQuery(query || "");
  }, [query]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gray-800 text-white py-42 px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold">Produk Taekwondo</h1>
            <p className="mt-2 mb-6">
              Temukan perlengkapan taekwondo terbaik untuk kebutuhan Anda
            </p>
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex w-full max-w-lg">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Cari produk..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-10 rounded-md border-1 border-blue-500 text-white-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-3 flex items-center bg-blue-500 rounded-r-md text-white-500 hover:text-blue-600"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Filter and Products */}
        <div className="max-w-7xl mx-auto px-8 py-12">
          {/* Category Filter */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Kategori</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.value}
                  href={
                    cat.value === "all"
                      ? query
                        ? `/products?q=${query}`
                        : "/products"
                      : query
                      ? `/products?category=${cat.value}&q=${query}`
                      : `/products?category=${cat.value}`
                  }
                  className={`px-4 py-2 rounded-full border text-sm font-medium ${
                    category === cat.value || (!category && cat.value === "all")
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Results */}
          {query && (
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4">
                Hasil pencarian untuk "{query}"
                <span className="text-gray-500 ml-2">
                  ({filteredProducts.length} produk)
                </span>
              </h2>
              {filteredProducts.length === 0 && (
                <div className="bg-gray-100 p-8 rounded-lg text-center">
                  <p className="text-gray-600 mb-4">
                    Tidak ada produk yang ditemukan untuk kata kunci "{query}".
                  </p>
                  <Button
                    onClick={() => {
                      if (category) {
                        router.push(`/products?category=${category}`);
                      } else {
                        router.push("/products");
                      }
                    }}
                    variant="outline"
                  >
                    Hapus Pencarian
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2">{product.name}</h3>
                  <p className="text-blue-600 font-bold mb-3">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                  <div className="flex gap-2">
                    <Link
                      href={`/products/${product.id}`}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium py-2 px-4 rounded-lg text-center"
                    >
                      Lihat Detail
                    </Link>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Products Message */}
          {filteredProducts.length === 0 && !query && (
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <p className="text-gray-600">
                Tidak ada produk yang tersedia untuk kategori ini.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
