import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      isCartOpen: false,

      // UI Toggles
      toggleCart: () => set({ isCartOpen: !get().isCartOpen }),
      setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

      addToCart: (product, qty = 1) => {
        set((state) => {
          // Create a unique ID string based on the product ID and its selected options.
          // This ensures a Size 40 shoe and Size 42 shoe sit in the cart separately.
          const uniqueId = `${product.id || product._id}-${product.size || "none"}-${product.width || "none"}-${product.format || "none"}`;

          const existingItemIndex = state.cartItems.findIndex(
            (item) => item.cartItemId === uniqueId,
          );

          if (existingItemIndex > -1) {
            // Item with exact configuration exists, increase quantity
            const updatedItems = [...state.cartItems];
            updatedItems[existingItemIndex].qty += qty;
            return { cartItems: updatedItems, isCartOpen: true };
          }

          // New configuration, add to array
          return {
            cartItems: [
              ...state.cartItems,
              { ...product, cartItemId: uniqueId, qty },
            ],
            isCartOpen: true, // Auto-open drawer on add
          };
        });
      },

      removeFromCart: (cartItemId) =>
        set((state) => ({
          cartItems: state.cartItems.filter((x) => x.cartItemId !== cartItemId),
        })),

      updateQuantity: (cartItemId, newQty) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, qty: Math.max(1, newQty) } // Prevent quantity from going below 1
              : item,
          ),
        })),

      clearCart: () => set({ cartItems: [] }),
    }),
    { name: "atelier-cart-storage" },
  ),
);

export default useCartStore;
