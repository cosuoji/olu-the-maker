import { create } from "zustand";
import { persist } from "zustand/middleware";
import API from "../api/axios.js";

const useOrderStore = create(
  persist(
    (set, get) => ({
      shippingAddress: {},
      paymentMethod: "Flutterwave", // Defaulting to your chosen gateway
      loading: false,
      error: null,
      order: null,

      // 1. Save Address locally
      saveShippingAddress: (data) => set({ shippingAddress: data }),

      // 2. Save Payment Method locally
      savePaymentMethod: (data) => set({ paymentMethod: data }),

      // 3. Fire the backend request to create the order in MongoDB
      createOrder: async (orderData) => {
        set({ loading: true, error: null });
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              // Authorization header will go here (pulling token from your userStore)
              // Authorization: `Bearer ${token}`
            },
          };

          const { data } = await API.post("/orders", orderData, config);

          set({ order: data, loading: false });
          return data; // Return the created order so the UI can use its ID for Flutterwave
        } catch (error) {
          set({
            error: error.response?.data?.message || error.message,
            loading: false,
          });
          return null;
        }
      },

      // 4. Reset after successful payment
      clearOrder: () => set({ order: null, error: null }),
    }),
    {
      name: "atelier-checkout-storage",
      // We only want to persist the address and payment method, not errors or temporary order objects
      partialize: (state) => ({
        shippingAddress: state.shippingAddress,
        paymentMethod: state.paymentMethod,
      }),
    },
  ),
);

export default useOrderStore;
