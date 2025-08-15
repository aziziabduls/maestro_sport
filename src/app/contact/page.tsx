"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dalam implementasi nyata, kirim data form ke backend/API
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    // Reset form fields
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gray-800 text-white py-42 px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold">Hubungi Kami</h1>
            <p className="mt-2">
              Silakan hubungi kami jika Anda memiliki pertanyaan atau ingin
              melakukan pemesanan
            </p>
          </div>
        </div>

        {/* Contact Content */}
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-bold mb-6">Informasi Kontak</h2>
              <div className="space-y-4 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
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
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Alamat</p>
                    <p className="mt-1 text-sm text-gray-600">
                      Jl. Raya Kebayoran Lama No. 42 A (sebelah gg. madrasah 1),{" "}
                      <br />
                      Sukabumi Utara - Kebon Jeruk, JAKARTA BARAT 11540
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      Telepon & WhatsApp
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      0853.6800.7800 / 0818.999.621
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="mt-1 text-sm text-gray-600">
                      info@maestrosports.com
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-bold mb-6">Jam Operasional</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-2 text-sm text-gray-900">
                      Senin - Jumat
                    </td>
                    <td className="py-2 text-sm text-gray-900">
                      09:00 - 17:00 WIB
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm text-gray-900">Sabtu</td>
                    <td className="py-2 text-sm text-gray-900">
                      09:00 - 15:00 WIB
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm text-gray-900">Minggu</td>
                    <td className="py-2 text-sm text-gray-900">Tutup</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm text-gray-900">
                      Hari Libur Nasional
                    </td>
                    <td className="py-2 text-sm text-gray-900">Tutup</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold mb-6">Kirim Pesan</h2>
              {isSubmitted ? (
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-green-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">
                        Pesan Terkirim
                      </h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>
                          Terima kasih telah menghubungi kami. Tim kami akan
                          segera merespons pesan Anda.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
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
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Subjek*
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Pilih Subjek</option>
                        <option value="order">Pertanyaan Pemesanan</option>
                        <option value="product">Informasi Produk</option>
                        <option value="payment">Konfirmasi Pembayaran</option>
                        <option value="other">Lainnya</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Pesan*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Kirim Pesan
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="mt-16">
            <h2 className="text-xl font-bold mb-6">Lokasi Kami</h2>
            <div className="relative h-96 w-full bg-gray-200 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Peta Lokasi Maestro Sports</p>
                {/* Dalam implementasi nyata, tambahkan peta Google Maps atau peta lainnya di sini */}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
