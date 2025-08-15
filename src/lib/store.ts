import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number, size: string) => void;
  updateItemQuantity: (id: number, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          (i) => i.id === item.id && i.size === item.size
        );

        if (existingItemIndex > -1) {
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += 1;
          set({ items: updatedItems });
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] });
        }
      },

      removeItem: (id, size) => {
        const { items } = get();
        set({
          items: items.filter(
            (item) => !(item.id === id && item.size === size)
          ),
        });
      },

      updateItemQuantity: (id, size, quantity) => {
        const { items } = get();
        const updatedItems = items.map((item) => {
          if (item.id === id && item.size === size) {
            return { ...item, quantity: Math.max(1, quantity) };
          }
          return item;
        });

        set({ items: updatedItems });
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      totalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
