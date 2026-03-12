import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus, FiSearch } from "react-icons/fi";
import { Search, ChevronDown } from "lucide-react";

/* --------------------------------------------
   SHIPPING DATA
-------------------------------------------- */
const shippingData = [
  {
    category: "General Shipping",
    slug: "general",
    items: [
      {
        id: "processing-time",
        q: "How long does order processing take?",
        a: "Orders are processed within 1–3 business days. Once dispatched, you’ll receive a confirmation email with tracking details.",
      },
      {
        id: "where-ship-from",
        q: "Where do you ship from?",
        a: "All orders are shipped directly from our fulfillment partners depending on your location and product availability.",
      },
    ],
  },
  {
    category: "International Shipping",
    slug: "international",
    items: [
      {
        id: "international-availability",
        q: "Do you ship internationally?",
        a: "Yes. We ship worldwide using trusted courier partners. Available options and pricing are shown at checkout.",
      },
      {
        id: "customs-duties",
        q: "Will I pay customs or import duties?",
        a: "International orders may be subject to customs duties or import taxes. These charges are the responsibility of the recipient.",
      },
    ],
  },
  {
    category: "Delivery Times",
    slug: "delivery-times",
    items: [
      {
        id: "delivery-estimates",
        q: "How long does delivery take?",
        a: "Delivery times vary by location. Domestic orders typically arrive within 3–5 business days, while international orders may take 7–14 business days.",
      },
      {
        id: "delays",
        q: "What happens if my delivery is delayed?",
        a: "While delays are rare, they can occur due to customs or courier issues. Our support team is happy to assist if your order takes longer than expected.",
      },
    ],
  },
  {
    category: "Tracking & Issues",
    slug: "tracking",
    items: [
      {
        id: "tracking-order",
        q: "How do I track my order?",
        a: "Once your order ships, you’ll receive a tracking number via email. You can use this to monitor delivery progress.",
      },
      {
        id: "missing-package",
        q: "What if my package is lost or missing?",
        a: "If your tracking shows delivered but you haven’t received your order, please contact us within 48 hours so we can assist.",
      },
    ],
  },
];

const ShippingItem = ({ item, isOpen, onToggle }) => (
  <div
    id={item.id}
    className="border-b border-atelier-ink/10 py-8 scroll-mt-28 group"
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between text-left"
    >
      <h4
        className={`text-lg md:text-xl font-serif tracking-tight transition-all duration-300 ${isOpen ? "text-atelier-tan italic" : "text-atelier-ink"}`}
      >
        {item.q}
      </h4>
      <ChevronDown
        className={`transition-transform duration-500 ${isOpen ? "rotate-180 text-atelier-tan" : "text-atelier-ink/30"}`}
        size={20}
        strokeWidth={1}
      />
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="overflow-hidden"
        >
          <p className="mt-6 text-atelier-ink/70 leading-relaxed font-serif text-lg max-w-2xl">
            {item.a}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/* --------------------------------------------
    MAIN PAGE
-------------------------------------------- */
const Shipping = () => {
  const [openId, setOpenId] = useState(null);
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (!search) return shippingData;
    return shippingData
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.q.toLowerCase().includes(search.toLowerCase()) ||
            item.a.toLowerCase().includes(search.toLowerCase()),
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [search]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    shippingData.forEach((section) => {
      section.items.forEach((item) => {
        if (item.id === hash) {
          setOpenId(item.id);
          document
            .getElementById(item.id)
            ?.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }, []);

  return (
    <>
      <main className="bg-atelier-paper min-h-screen text-atelier-ink">
        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-6 pt-32 pb-20 text-center">
          <span className="text-[10px] tracking-[0.4em] uppercase opacity-50 font-sans block mb-4">
            The Atelier Guide
          </span>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl md:text-6xl font-serif italic tracking-tighter mb-6"
          >
            Logistics <span className="not-italic">&</span> Delivery
          </motion.h1>
          <p className="font-serif text-lg text-atelier-ink/60 max-w-xl mx-auto italic">
            Ensuring your handcrafted pairs arrive with the same care they were
            made with.
          </p>

          {/* SEARCH - Clean Underline Style */}
          <div className="relative max-w-md mx-auto mt-16 border-b border-atelier-ink/20 focus-within:border-atelier-tan transition-colors">
            <Search
              className="absolute left-0 top-1/2 -translate-y-1/2 text-atelier-ink/30"
              size={18}
              strokeWidth={1.5}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="SEARCH TOPICS..."
              className="w-full pl-8 pr-4 py-3 bg-transparent text-[10px] tracking-[0.2em] focus:outline-none uppercase font-sans placeholder:text-atelier-ink/30"
            />
          </div>
        </section>

        {/* CONTENT SECTION */}
        <section className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-[250px_1fr] gap-16">
          {/* STICKY SIDEBAR */}
          <aside className="hidden md:block sticky top-32 h-fit border-l border-atelier-ink/10 pl-6">
            <nav className="space-y-6">
              {shippingData.map((section) => (
                <a
                  key={section.slug}
                  href={`#${section.items[0].id}`}
                  className="block text-[10px] uppercase tracking-[0.2em] text-atelier-ink/40 hover:text-atelier-tan transition-colors font-bold"
                >
                  {section.category}
                </a>
              ))}
            </nav>
          </aside>

          {/* SHIPPING CONTENT */}
          <div className="max-w-3xl">
            {filteredData.map((section) => (
              <div key={section.slug} className="mb-20">
                <h3 className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-8 font-sans font-bold">
                  {section.category}
                </h3>

                {section.items.map((item) => (
                  <ShippingItem
                    key={item.id}
                    item={item}
                    isOpen={openId === item.id}
                    onToggle={() =>
                      setOpenId(openId === item.id ? null : item.id)
                    }
                  />
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Shipping;
