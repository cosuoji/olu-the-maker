import { create } from "zustand";
import { persist } from "zustand/middleware";
import API from "../api/axios"; // Adjust path to your API file

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: localStorage.getItem("token") || null,
      isAuthenticated: !!localStorage.getItem("token"),

      register: async (credentials) => {
        try {
          const res = await API.post("/auth/", credentials);
          const { user, token } = res.data;

          localStorage.setItem("token", token);
          set({ user, token, isAuthenticated: true });
          return { success: true };
        } catch (error) {
          return {
            success: false,
            error: error.response?.data?.message || "Registration failed",
          };
        }
      },

      // Login Action
      login: async (credentials) => {
        try {
          const res = await API.post("/auth/login", credentials);
          const { user, token } = res.data;

          localStorage.setItem("token", token);
          set({ user, token, isAuthenticated: true });
          return { success: true };
        } catch (error) {
          return {
            success: false,
            error: error.response?.data?.message || "Login failed",
          };
        }
      },

      // Logout Action
      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null, isAuthenticated: false });
        window.location.href = "/auth";
      },
      // Inside your create(persist(...)) block
      updateProfile: async (profileData) => {
        try {
          const res = await API.put("/auth/profile", profileData);
          set({ user: res.data }); // Update global state with the new database values
          return { success: true };
        } catch (error) {
          return {
            success: false,
            error: error.response?.data?.message || "Could not update dossier",
          };
        }
      },

      toggleWishlist: async (productId) => {
        try {
          const res = await API.post("/users/wishlist", { productId });
          // Update only the wishlist field in the user object
          set((state) => ({
            user: { ...state.user, wishlist: res.data },
          }));
          return { success: true };
        } catch (error) {
          return { success: false };
        }
      },

      // Fetch Profile (to check if user is admin on load)
      checkAuth: async () => {
        try {
          const res = await API.get("/auth/profile");
          set({ user: res.data, isAuthenticated: true });
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          set({ user: null, isAuthenticated: false });
        }
      },
    }),
    { name: "oluthemaker-user-storage" },
  ),
);

export default useUserStore;
