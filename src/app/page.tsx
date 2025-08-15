import Image from "next/image";
import Link from "next/link";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import productsData from "./data/products.json";

export default function Home() {
  const categories = [
    {
      name: "Baju Taekwondo",
      image: "/images/category/category-uniform.jpg",
      href: "/products?category=uniform",
    },
    {
      name: "Sabuk",
      image: "/images/category/category-belt.jpg",
      href: "/products?category=belt",
    },
    {
      name: "Pelindung",
      image: "/images/category/category-protector.jpg",
      href: "/products?category=protector",
    },
    {
      name: "Peralatan Latihan",
      image: "/images/category/category-training.jpg",
      href: "/products?category=training",
    },
  ];

  const featuredProducts = productsData.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative">
        <div className="relative bg-gray-900 text-white py-24 px-8">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero/herobg.jpeg"
              alt="Background"
              fill
              className="object-cover opacity-30"
            />
          </div>
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center relative z-10">
            <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Perlengkapan Taekwondo Berkualitas
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Maestro Sports - Supplier terpercaya untuk semua jenis peralatan
                bela diri di Indonesia
              </p>
              <Link
                href="/products"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg inline-block"
              >
                Belanja Sekarang
              </Link>
            </div>
            <div className="lg:w-1/2">
              <div className="relative h-64 md:h-96 w-full">
                <Image
                  src="/images/hero/hero-taekwondo.jpg"
                  alt="Peralatan Taekwondo"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Kategori Produk
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link key={index} href={category.href} className="block group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 group-hover:shadow-lg group-hover:-translate-y-1">
                  <div className="relative h-48 w-full">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-medium text-lg">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Produk Unggulan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
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
                  <p className="text-blue-600 font-bold">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                  <Link
                    href={`/products/${product.id}`}
                    className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md block text-center"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative h-64 md:h-96 w-full">
                <Image
                  src="/images/about/about-store.jpg"
                  alt="Maestro Sports Store"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">
                Tentang Maestro Sports
              </h2>
              <p className="text-gray-700 mb-4">
                Maestro Sports adalah supplier terpercaya untuk semua jenis
                peralatan bela diri di Indonesia. Dengan pengalaman
                bertahun-tahun, kami menyediakan perlengkapan taekwondo
                berkualitas tinggi untuk memenuhi kebutuhan atlet dan praktisi
                bela diri di seluruh Indonesia.
              </p>
              <p className="text-gray-700 mb-6">
                Kami berkomitmen untuk menyediakan produk berkualitas dengan
                harga terbaik dan pelayanan yang memuaskan untuk semua pelanggan
                kami.
              </p>
              <Link
                href="/about"
                className="inline-block border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Baca Selengkapnya
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
