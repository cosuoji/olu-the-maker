import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import useProductStore from "../store/useProductStore";
import useSEO from "../hooks/useSEO";

const FILTERS = {
  categories: ["Oxford", "Loafer", "Derby", "Boot"],
  colors: ["Black", "Dark Brown", "Oxblood", "Tan"],
  sizes: ["39", "40", "41", "42", "43", "44", "45"],
  widths: ["D (Standard)", "E (Wide)", "EE (Extra Wide)"],
  materials: ["Museum Calf", "Suede", "Box Calf"],
  soles: ["Single Leather", "Double Leather", "Vibram"],
  lasts: ["Lagos", "London", "Tokyo"],
};

const INITIAL_FILTERS = {
  categories: "All",
  colors: "All",
  sizes: "All",
  widths: "All",
  materials: "All",
  soles: "All",
  lasts: "All",
};

const Store = () => {
  const { products, fetchProducts, loading } = useProductStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(INITIAL_FILTERS);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = (key, value) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setActiveFilters(INITIAL_FILTERS);
  };

  // --- REWRITTEN FILTER LOGIC ---
  const filteredProducts = products.filter((product) => {
    if (product.category === "Magazine") return false;

    return Object.entries(activeFilters).every(([key, value]) => {
      if (value === "All") return true;

      const details = product.shoeDetails;
      if (!details) return false;

      // Map UI Keys to DB Keys
      const mapping = {
        categories: details.style,
        colors: details.color,
        sizes: details.sizes,
        widths: details.width,
        materials: details.material,
        soles: details.soles,
        lasts: details.last,
      };

      const dbValue = mapping[key];

      // Since your DB stores these as Arrays (e.g., style: ["Derby"]), check inclusion
      if (Array.isArray(dbValue)) {
        return dbValue.some(
          (v) => String(v).includes(value) || String(v) === String(value),
        );
      }

      return String(dbValue) === String(value);
    });
  });

  useSEO({
    title: "Store",
    description: "Browse our collection of bespoke and Made to Order shoes",
  });

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen pt-40 text-center font-serif italic">
        Curating the collection...
      </div>
    );
  }

  return (
    <main className="bg-atelier-paper text-atelier-ink min-h-screen pt-32 pb-32">
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-atelier-ink/40 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-atelier-paper z-50 shadow-2xl p-10 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-[10px] tracking-[0.5em] uppercase font-bold opacity-40">
                  Filter Atelier
                </h2>
                <div className="flex gap-6">
                  <button
                    onClick={resetFilters}
                    className="text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100"
                  >
                    [ Reset ]
                  </button>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-[10px] uppercase tracking-widest"
                  >
                    [ Close ]
                  </button>
                </div>
              </div>

              <div className="space-y-10">
                {Object.entries(FILTERS).map(([key, options]) => (
                  <div key={key}>
                    <h3 className="text-[10px] tracking-[0.3em] uppercase font-bold mb-4 border-b border-atelier-ink/10 pb-2">
                      {key}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleFilterChange(key, "All")}
                        className={`px-3 py-1 text-[11px] font-serif italic border transition-all ${
                          activeFilters[key] === "All"
                            ? "bg-atelier-ink text-white"
                            : "border-atelier-ink/10"
                        }`}
                      >
                        All
                      </button>
                      {options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleFilterChange(key, opt)}
                          className={`px-3 py-1 text-[11px] font-serif italic border transition-all ${
                            activeFilters[key] === opt
                              ? "bg-atelier-ink text-white"
                              : "border-atelier-ink/10"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <section className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16 border-b border-atelier-ink/10 pb-8">
          <div>
            <span className="text-[10px] tracking-[0.5em] uppercase font-bold opacity-40 block mb-2">
              Bespoke Inventory
            </span>
            <h1 className="text-5xl font-serif italic">The Collection</h1>
          </div>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-4 group"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold">
              Filter Selection
            </span>
            <div className="w-10 h-10 rounded-full border border-atelier-ink/20 flex items-center justify-center group-hover:bg-atelier-ink group-hover:text-white transition-all">
              +
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {filteredProducts.map((product) => (
            <Link
              key={product._id}
              to={`/store/${product.slug}`}
              className="group block"
            >
              <div className="aspect-[4/5] overflow-hidden mb-6 bg-atelier-ink/5">
                <img
                  src={product?.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="flex justify-between items-start">
                <h3 className="font-serif italic text-xl">{product.name}</h3>
                <span className="font-sans text-sm">${product.price}</span>
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center opacity-40 font-serif italic">
            No commissions match these specific criteria.
          </div>
        )}
      </section>
    </main>
  );
};

export default Store;
