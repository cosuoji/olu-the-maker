// store/useProductStore.js
import { create } from "zustand";
import API from "../api/axios"; // Adjust path to your API file

const useProductStore = create((set, get) => ({
  products: [],
  magazines: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await API.get("/products");
      const allProducts = response.data;

      set({
        products: allProducts,
        // Automatically filter magazines for the archive
        magazines: allProducts.filter((p) => p.category === "Magazine"),
        loading: false,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Helper to find a specific product by slug (better for SEO)
  getProductBySlug: (slug) => {
    return get().products.find((p) => p.slug === slug);
  },
}));

export default useProductStore;
