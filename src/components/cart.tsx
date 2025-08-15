"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCartStore } from "@/lib/store";
import { useToast } from "@/lib/use-toast";
import { Minus, Plus, ShoppingCart, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function CartButton() {
  const [open, setOpen] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="relative p-2 text-white hover:text-[#f1e20f] hover:bg-transparent"
        >
          <ShoppingCart className="h-6 w-6" />
          {totalItems() > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems()}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Keranjang Belanja</DialogTitle>
          <DialogDescription>
            Daftar produk yang Anda tambahkan ke keranjang.
          </DialogDescription>
        </DialogHeader>
        <CartItems setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

function CartItems({ setOpen }: { setOpen: (open: boolean) => void }) {
  const { items, removeItem, updateItemQuantity, totalPrice } = useCartStore();
  const { toast } = useToast();

  const handleRemoveItem = (id: number, size: string, name: string) => {
    removeItem(id, size);
    toast({
      description: `${name} telah dihapus dari keranjang.`,
    });
  };

  const handleUpdateQuantity = (id: number, size: string, quantity: number) => {
    updateItemQuantity(id, size, quantity);
  };

  if (items.length === 0) {
    return (
      <div className="py-6 text-center">
        <p className="text-gray-500 mb-4">Keranjang belanja Anda kosong.</p>
        <Button onClick={() => setOpen(false)} className="mt-2">
          Lanjutkan Belanja
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="max-h-[50vh] overflow-y-auto space-y-4 pr-2">
        {items.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center space-x-4">
              <div className="relative h-16 w-16 overflow-hidden rounded">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-gray-500">Ukuran: {item.size}</p>
                <p className="text-sm font-medium">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center border rounded">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.size, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.size, item.quantity + 1)
                  }
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 h-8 w-8 p-0"
                onClick={() => handleRemoveItem(item.id, item.size, item.name)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t">
        <div className="flex justify-between font-medium text-lg">
          <span>Total:</span>
          <span>Rp {totalPrice().toLocaleString("id-ID")}</span>
        </div>
      </div>

      <DialogFooter className="flex justify-between sm:justify-between gap-4 pt-4">
        <Button variant="outline" onClick={() => setOpen(false)}>
          Lanjutkan Belanja
        </Button>
        <Button asChild>
          <Link href="/checkout">Checkout</Link>
        </Button>
      </DialogFooter>
    </div>
  );
}
