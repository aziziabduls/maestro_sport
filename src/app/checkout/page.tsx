"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { useToast } from "@/lib/use-toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import productsData from "../data/products.json";

export default function CheckoutPage() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");
  const { items, totalPrice, clearCart } = useCartStore();

  // State untuk form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "bca",
  });

  // State untuk menampilkan order summary
  const [showSummary, setShowSummary] = useState(false);
  const [orderSummary, setOrderSummary] = useState("");

  // State untuk data produk (untuk mode single product)
  const [singleProduct, setSingleProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutMode, setCheckoutMode] = useState<"cart" | "single">("cart");

  // Mengambil data produk saat komponen dimuat
  useEffect(() => {
    // Jika ada productId di URL, gunakan mode single product
    if (productId) {
      setCheckoutMode("single");
      const parsedId = parseInt(productId);
      const foundProduct = productsData.find((p) => p.id === parsedId);

      if (foundProduct) {
        setSingleProduct({
          ...foundProduct,
          quantity: 1,
          size: foundProduct.sizes[0], // Default ke ukuran pertama
        });
      }
    } else {
      // Jika tidak ada productId, gunakan keranjang belanja
      setCheckoutMode("cart");

      // Jika keranjang kosong, kembali ke halaman produk
      if (items.length === 0) {
        toast({
          description:
            "Keranjang belanja Anda kosong. Silakan tambahkan produk terlebih dahulu.",
          variant: "destructive",
        });
        router.push("/products");
      }
    }

    setIsLoading(false);
  }, [productId, items, router, toast]);

  // Handle form input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "size" && singleProduct) {
      // Jika yang diubah adalah ukuran, update juga state produk
      setSingleProduct((prev: any) => ({
        ...prev,
        size: value,
      }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let summary = "";

    if (checkoutMode === "single" && singleProduct) {
      // Generate order summary untuk single product
      summary = `
*PESANAN MAESTRO SPORTS*
----------------------------------
Produk: ${singleProduct.name}
Ukuran: ${singleProduct.size}
Harga: Rp ${singleProduct.price.toLocaleString("id-ID")}
----------------------------------
*DATA PEMBELI*
Nama: ${formData.name}
Email: ${formData.email}
Telepon: ${formData.phone}
Alamat: ${formData.address}, ${formData.city}, ${formData.postalCode}
----------------------------------
*METODE PEMBAYARAN*
${formData.paymentMethod.toUpperCase()}
${
  formData.paymentMethod === "bca"
    ? "No. Rekening: 1234567890 (a.n. Maestro Sports)"
    : formData.paymentMethod === "bni"
    ? "No. Rekening: 0987654321 (a.n. Maestro Sports)"
    : formData.paymentMethod === "mandiri"
    ? "No. Rekening: 1122334455 (a.n. Maestro Sports)"
    : "No. Rekening: 5566778899 (a.n. Maestro Sports)"
}
----------------------------------
Total: Rp ${singleProduct.price.toLocaleString("id-ID")}
      `;
    } else if (checkoutMode === "cart" && items.length > 0) {
      // Generate order summary untuk cart
      const productsDetail = items
        .map(
          (item) => `
Produk: ${item.name}
Ukuran: ${item.size}
Jumlah: ${item.quantity}
Harga: Rp ${item.price.toLocaleString("id-ID")}
Subtotal: Rp ${(item.price * item.quantity).toLocaleString("id-ID")}
----------------------------------`
        )
        .join("\n");

      summary = `
*PESANAN MAESTRO SPORTS*
----------------------------------
${productsDetail}
*DATA PEMBELI*
Nama: ${formData.name}
Email: ${formData.email}
Telepon: ${formData.phone}
Alamat: ${formData.address}, ${formData.city}, ${formData.postalCode}
----------------------------------
*METODE PEMBAYARAN*
${formData.paymentMethod.toUpperCase()}
${
  formData.paymentMethod === "bca"
    ? "No. Rekening: 1234567890 (a.n. Maestro Sports)"
    : formData.paymentMethod === "bni"
    ? "No. Rekening: 0987654321 (a.n. Maestro Sports)"
    : formData.paymentMethod === "mandiri"
    ? "No. Rekening: 1122334455 (a.n. Maestro Sports)"
    : "No. Rekening: 5566778899 (a.n. Maestro Sports)"
}
----------------------------------
Total: Rp ${totalPrice().toLocaleString("id-ID")}
      `;
    }

    setOrderSummary(summary);
    setShowSummary(true);

    // Jika checkout dari cart, kosongkan keranjang setelah checkout
    if (checkoutMode === "cart") {
      clearCart();
    }
  };

  // Generate WhatsApp link dengan order summary
  const getWhatsAppLink = () => {
    const phoneNumber = "6285368007800"; // Nomor WA Maestro Sports
    const encodedMessage = encodeURIComponent(orderSummary);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  // Jika produk sedang dimuat
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-12 px-8 flex items-center justify-center">
          <p>Memuat data pesanan...</p>
        </main>
        <Footer />
      </div>
    );
  }

  // Jika mode single product tapi produk tidak ditemukan
  if (checkoutMode === "single" && !singleProduct) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-12 px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Produk Tidak Ditemukan</h1>
            <p className="mb-8">Produk yang Anda cari tidak tersedia.</p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            >
              Kembali ke Halaman Produk
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Jika mode cart tapi keranjang kosong
  if (checkoutMode === "cart" && items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-12 px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Keranjang Kosong</h1>
            <p className="mb-8">
              Tidak ada produk dalam keranjang belanja Anda.
            </p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            >
              Belanja Sekarang
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          {!showSummary ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Formulir Checkout */}
              <div className="lg:col-span-2">
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <h2 className="text-xl font-semibold mb-6">
                    Informasi Pengiriman
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Nama Lengkap*
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nomor Telepon*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Alamat Lengkap*
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Kota*
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="postalCode"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Kode Pos*
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {checkoutMode === "single" && singleProduct && (
                    <div className="mb-6">
                      <label
                        htmlFor="size"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Ukuran*
                      </label>
                      <select
                        id="size"
                        name="size"
                        value={singleProduct.size}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        {singleProduct.sizes.map((size: string) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <h2 className="text-xl font-semibold mt-8 mb-6">
                    Metode Pembayaran
                  </h2>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="bca"
                        name="paymentMethod"
                        value="bca"
                        checked={formData.paymentMethod === "bca"}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="bca"
                        className="ml-2 block text-sm font-medium text-gray-700"
                      >
                        Bank BCA
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="bni"
                        name="paymentMethod"
                        value="bni"
                        checked={formData.paymentMethod === "bni"}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="bni"
                        className="ml-2 block text-sm font-medium text-gray-700"
                      >
                        Bank BNI
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="mandiri"
                        name="paymentMethod"
                        value="mandiri"
                        checked={formData.paymentMethod === "mandiri"}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="mandiri"
                        className="ml-2 block text-sm font-medium text-gray-700"
                      >
                        Bank Mandiri
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="bri"
                        name="paymentMethod"
                        value="bri"
                        checked={formData.paymentMethod === "bri"}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="bri"
                        className="ml-2 block text-sm font-medium text-gray-700"
                      >
                        Bank BRI
                      </label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Selesaikan Pesanan
                  </Button>
                </form>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-6">
                    Ringkasan Pesanan
                  </h2>

                  {checkoutMode === "single" && singleProduct ? (
                    // Single product summary
                    <div className="flex items-center pb-4 mb-4 border-b border-gray-200">
                      <div className="relative h-20 w-20 rounded-md overflow-hidden mr-4">
                        <Image
                          src={singleProduct.image}
                          alt={singleProduct.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{singleProduct.name}</h3>
                        <p className="text-sm text-gray-600">
                          Ukuran: {singleProduct.size}
                        </p>
                        <p className="mt-1 font-semibold">
                          Rp {singleProduct.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  ) : (
                    // Cart items summary
                    <div className="space-y-4 mb-4">
                      {items.map((item) => (
                        <div
                          key={`${item.id}-${item.size}`}
                          className="flex items-center pb-4 border-b border-gray-200"
                        >
                          <div className="relative h-16 w-16 rounded-md overflow-hidden mr-4">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-600">
                              Ukuran: {item.size}
                            </p>
                            <div className="flex justify-between items-center mt-1">
                              <p className="text-sm">
                                {item.quantity} x Rp{" "}
                                {item.price.toLocaleString("id-ID")}
                              </p>
                              <p className="font-semibold">
                                Rp{" "}
                                {(item.price * item.quantity).toLocaleString(
                                  "id-ID"
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pb-4 mb-4 border-b border-gray-200">
                    <div className="flex justify-between mb-2">
                      <p className="text-gray-600">Subtotal</p>
                      <p>
                        Rp{" "}
                        {(checkoutMode === "single"
                          ? singleProduct?.price
                          : totalPrice()
                        ).toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Pengiriman</p>
                      <p>Gratis</p>
                    </div>
                  </div>

                  <div className="flex justify-between font-semibold">
                    <p>Total</p>
                    <p>
                      Rp{" "}
                      {(checkoutMode === "single"
                        ? singleProduct?.price
                        : totalPrice()
                      ).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center justify-center text-green-600 mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-16 h-16"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-center mb-6">
                  Pesanan Diterima!
                </h2>

                <div className="mb-8">
                  <p className="text-center mb-4">
                    Silakan salin ringkasan pesanan berikut dan konfirmasi
                    pesanan Anda melalui WhatsApp.
                  </p>

                  <div className="bg-gray-100 p-4 rounded-md mb-4">
                    <pre className="whitespace-pre-wrap text-sm">
                      {orderSummary}
                    </pre>
                  </div>

                  <div className="text-center space-y-4">
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(orderSummary);
                        toast({
                          description: "Ringkasan pesanan telah disalin!",
                        });
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Salin Ringkasan Pesanan
                    </Button>

                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded inline-block"
                    >
                      Konfirmasi Pesanan via WhatsApp
                    </a>

                    <Link
                      href="/"
                      className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded inline-block mt-4"
                    >
                      Kembali ke Beranda
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
