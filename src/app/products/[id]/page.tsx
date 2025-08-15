import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import productsData from "../../data/products.json";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await params karena sekarang Promise di Next.js 15
  const { id } = await params;
  const productId = parseInt(id);
  const product = productsData.find((p) => p.id === productId);

  // Jika produk tidak ditemukan, tampilkan halaman 404
  if (!product) {
    notFound();
  }

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

              <ProductDetailClient product={product} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
