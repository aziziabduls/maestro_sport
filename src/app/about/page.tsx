import Image from "next/image";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gray-800 text-white py-42 px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold">Tentang Kami</h1>
            <p className="mt-2">
              Mengenal lebih dekat Maestro Sports, supplier terpercaya peralatan
              bela diri di Indonesia
            </p>
          </div>
        </div>

        {/* About Content */}
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/about-store.jpg"
                alt="Maestro Sports Store"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Maestro Sports</h2>
              <p className="text-gray-700 mb-4">
                Maestro Sports adalah supplier terpercaya untuk semua jenis
                peralatan bela diri di Indonesia. Didirikan dengan semangat
                untuk mendukung perkembangan olahraga bela diri di Indonesia,
                kami menyediakan perlengkapan taekwondo berkualitas tinggi untuk
                memenuhi kebutuhan atlet dan praktisi bela diri.
              </p>
              <p className="text-gray-700 mb-4">
                Kami berkomitmen untuk menyediakan produk-produk berkualitas
                tinggi dengan harga yang terjangkau. Semua produk kami dipilih
                dengan teliti untuk memastikan kualitas dan keamanan bagi para
                pengguna.
              </p>
              <p className="text-gray-700">
                Dengan pengalaman bertahun-tahun dalam industri ini, Maestro
                Sports memahami kebutuhan para atlet dan klub bela diri. Itulah
                mengapa kami selalu berusaha memberikan pelayanan terbaik dan
                produk berkualitas untuk mendukung prestasi olahraga bela diri
                Indonesia.
              </p>
            </div>
          </div>

          {/* Vision and Mission */}
          <div className="bg-gray-100 rounded-lg p-8 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Visi</h3>
                <p className="text-gray-700">
                  Menjadi supplier peralatan bela diri terkemuka di Indonesia
                  yang mendukung perkembangan olahraga bela diri nasional dengan
                  penyediaan produk berkualitas tinggi dan pelayanan terbaik.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Misi</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    Menyediakan peralatan bela diri berkualitas tinggi dengan
                    harga terjangkau
                  </li>
                  <li>Memberikan pelayanan terbaik untuk pelanggan</li>
                  <li>
                    Mendukung perkembangan olahraga bela diri di Indonesia
                  </li>
                  <li>
                    Mengutamakan kepuasan pelanggan dalam setiap transaksi
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Hubungi Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Informasi Kontak</h3>
                <div className="space-y-3">
                  <p className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-3 mt-0.5 text-blue-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    <span>
                      Jl. Raya Kebayoran Lama No. 42 A (sebelah gg. madrasah 1),{" "}
                      <br />
                      Sukabumi Utara - Kebon Jeruk, JAKARTA BARAT 11540
                    </span>
                  </p>
                  <p className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-3 text-blue-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                    <span>Phone/WA: 0853.6800.7800 / 0818.999.621</span>
                  </p>
                  <p className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-3 text-blue-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                      />
                    </svg>
                    <span>SMS: 085.6800.7800</span>
                  </p>
                  <p className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-3 text-blue-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293c.271-.363.734-.527 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
                      />
                    </svg>
                    <span>Fax: 021.5365.3905</span>
                  </p>
                  <p className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-3 text-blue-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                    <span>Email: info@maestrosports.com</span>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Jam Operasional</h3>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium mb-2">Senin - Jumat</p>
                      <p className="text-gray-700">09:00 - 17:00 WIB</p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Sabtu</p>
                      <p className="text-gray-700">09:00 - 15:00 WIB</p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Minggu</p>
                      <p className="text-gray-700">Tutup</p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Hari Libur Nasional</p>
                      <p className="text-gray-700">Tutup</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
