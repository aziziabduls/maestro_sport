import { Suspense } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CheckoutClient from "./CheckoutClient";

export default function CheckoutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 mt-10">Checkout</h1>

          <Suspense fallback={<div>Loading...</div>}>
            <CheckoutClient />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
