"use client";

import { CartButton } from "@/components/cart";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/images/logo/logo.png"
                alt="Maestro Sports Logo"
                width={150}
                height={40}
                className="block h-10 w-auto rounded-sm"
              />
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink href="/" isActive={pathname === "/"}>
                Beranda
              </NavLink>
              <NavLink
                href="/products"
                isActive={
                  pathname === "/products" || pathname.startsWith("/products/")
                }
              >
                Produk
              </NavLink>
              <NavLink href="/about" isActive={pathname === "/about"}>
                Tentang Kami
              </NavLink>
              <NavLink href="/contact" isActive={pathname === "/contact"}>
                Kontak
              </NavLink>
            </div>
          </div>

          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="mr-2 text-white hover:text-[#f1e20f] hover:bg-transparent"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>

            <CartButton />

            <Button
              variant="ghost"
              size="sm"
              className="sm:hidden ml-2 text-white hover:text-[#f1e20f] hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-4 space-y-1">
            <MobileNavLink href="/" isActive={pathname === "/"}>
              Beranda
            </MobileNavLink>
            <MobileNavLink
              href="/products"
              isActive={
                pathname === "/products" || pathname.startsWith("/products/")
              }
            >
              Produk
            </MobileNavLink>
            <MobileNavLink href="/about" isActive={pathname === "/about"}>
              Tentang Kami
            </MobileNavLink>
            <MobileNavLink href="/contact" isActive={pathname === "/contact"}>
              Kontak
            </MobileNavLink>
          </div>
        </div>
      )}

      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Cari Produk</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearch} className="mt-4">
            <div className="flex items-center border rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Cari produk taekwondo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 focus:outline-none"
                autoFocus
              />
              <Button
                type="submit"
                className="bg-[#f1e20f] hover:bg-[#f1e20f]/90 text-black rounded-none"
              >
                <Search className="h-4 w-4 mr-2" />
                Cari
              </Button>
            </div>
          </form>
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Kategori Populer:</h4>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/products?category=uniform"
                className="px-3 py-1 bg-[#f1e20f]/10 text-[#f1e20f] rounded-full text-sm hover:bg-[#f1e20f]/20"
                onClick={() => setIsSearchOpen(false)}
              >
                Baju Taekwondo
              </Link>
              <Link
                href="/products?category=belt"
                className="px-3 py-1 bg-[#f1e20f]/10 text-[#f1e20f] rounded-full text-sm hover:bg-[#f1e20f]/20"
                onClick={() => setIsSearchOpen(false)}
              >
                Sabuk
              </Link>
              <Link
                href="/products?category=protector"
                className="px-3 py-1 bg-[#f1e20f]/10 text-[#f1e20f] rounded-full text-sm hover:bg-[#f1e20f]/20"
                onClick={() => setIsSearchOpen(false)}
              >
                Pelindung
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
}

function NavLink({
  href,
  children,
  isActive = false,
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
        ${
          isActive
            ? "border-[#f1e20f] text-[#f1e20f]"
            : "border-transparent text-gray-200 hover:text-[#f1e20f] hover:border-[#f1e20f]"
        }
      `}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  isActive = false,
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        block pl-3 pr-4 py-2 border-l-4 text-base font-medium
        ${
          isActive
            ? "bg-[#f1e20f]/10 border-[#f1e20f] text-[#f1e20f]"
            : "border-transparent text-gray-200 hover:bg-[#f1e20f]/10 hover:border-[#f1e20f] hover:text-[#f1e20f]"
        }
      `}
    >
      {children}
    </Link>
  );
}
