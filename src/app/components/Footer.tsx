import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Maestro Sports</h3>
            <p className="text-gray-300 text-sm">
              Supplier terpercaya untuk semua jenis peralatan bela diri di
              Indonesia.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak Kami</h3>
            <address className="not-italic text-gray-300 text-sm">
              <p className="mb-2">
                Jl. Raya Kebayoran Lama No. 42 A (Gg. Madrasah 1), Sukabumi
                Utara - Kebon Jeruk, JAKARTA BARAT 11540
              </p>
              <p className="mb-2">
                <span className="block">
                  Phone/WA: 0853.6800.7800 / 0818.999.621
                </span>
                <span className="block">SMS: 085.6800.7800</span>
                <span className="block">Fax: 021.5365.3905</span>
                <span className="block">Email: info@maestrosports.com</span>
              </p>
            </address>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-300 hover:text-white"
                >
                  Produk
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white"
                >
                  Kontak
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} Maestro Sports. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
