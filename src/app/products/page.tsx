import { Suspense } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductsClient from "./ProductsClient";

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductsClient />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
