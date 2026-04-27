import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  isDrawerOpen: boolean; // <-- NEW
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  openDrawer: () => void; // <-- NEW
  closeDrawer: () => void; // <-- NEW
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false, // <-- NEW (Starts closed)
      
      addItem: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === product.id);
        
        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          });
        } else {
          set({ items: [...currentItems, { ...product, quantity: 1 }] });
        }
        // 🔥 BONUS: Automatically open the drawer when an item is added!
        set({ isDrawerOpen: true }); 
      },

      removeItem: (id) => set({ items: get().items.filter((item) => item.id !== id) }),
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      
      // NEW FUNCTIONS
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
    }),
    {
      name: 'laqta-cart-storage', 
      // We don't want to save the open/closed state to local storage, only the items
      partialize: (state) => ({ items: state.items }),
    }
  )
);