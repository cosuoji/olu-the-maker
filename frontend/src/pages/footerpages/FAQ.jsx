import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react"; // Switched to Lucide for consistency
import useSEO from "../../hooks/useSEO";

/* --------------------------------------------
   FAQ DATA
-------------------------------------------- */
const faqData = [
  {
    category: "Shopping & Orders",
    slug: "orders",
    items: [
      {
        id: "international-shipping",
        q: "Do you ship internationally?",
        a: "Yes. We ship worldwide using trusted courier partners. Shipping fees and delivery timelines are calculated at checkout.",
      },
      {
        id: "modify-order",
        q: "Can I modify or cancel my order?",
        a: "Orders can be modified or canceled within 12 hours of purchase. After this window, orders enter processing.",
      },
    ],
  },
  {
    category: "Shoes & Craft",
    slug: "craft",
    items: [
      {
        id: "where-made",
        q: "Where are your shoes made?",
        a: "Our shoes are handcrafted in small batches by skilled artisans using premium, responsibly sourced materials.",
      },
      {
        id: "shoe-care",
        q: "How do I care for my shoes?",
        a: "Store in a cool, dry place. Clean gently with a soft brush or cloth. Care instructions are included with every pair.",
      },
    ],
  },
  {
    category: "Magazine",
    slug: "magazine",
    items: [
      {
        id: "magazine-content",
        q: "What is featured in your magazine?",
        a: "Our magazine explores craftsmanship, culture, design, and thoughtful storytelling beyond footwear.",
      },
      {
        id: "digital-magazine",
        q: "Is the magazine available digitally?",
        a: "Currently, the magazine is available in print only. Digital editions may be introduced later.",
      },
    ],
  },
  {
    category: "Shipping & Returns",
    slug: "returns",
    items: [
      {
        id: "return-policy",
        q: "What is your return policy?",
        a: "Unused items can be returned within 7 days of delivery, in original condition and packaging.",
      },
      {
        id: "return-shipping",
        q: "Who covers return shipping?",
        a: "Return shipping costs are covered by the customer unless the item arrived damaged or incorrect.",
      },
    ],
  },
];

const FAQItem = ({ item, isOpen, onToggle }) => (
  <div
    id={item.id}
    className="border-b border-atelier-ink/10 py-8 scroll-mt-28 group"
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between text-left"
    >
      <h4
        className={`text-lg md:text-xl font-serif tracking-tight transition-colors duration-300 ${isOpen ? "text-atelier-tan italic" : "text-atelier-ink"}`}
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

const FAQ = () => {
  const [openId, setOpenId] = useState(null);
  const [search, setSearch] = useState("");

  /* --------------------------------------------
     SEARCH FILTER
  -------------------------------------------- */
  const filteredData = useMemo(() => {
    if (!search) return faqData;

    return faqData
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

  /* --------------------------------------------
     DEEP LINK OPEN
  -------------------------------------------- */
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    faqData.forEach((section) => {
      section.items.forEach((item) => {
        if (item.id === hash) {
          setOpenId(item.id);
          document.getElementById(item.id)?.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    });
  }, []);

  /* --------------------------------------------
     SEO FAQ SCHEMA
  -------------------------------------------- */
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.flatMap((section) =>
        section.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      ),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => document.head.removeChild(script);
  }, []);

  useSEO({
    title: "FAQ",
    description:
      "Find answers to frequently asked questions about our services and support.",
  });

  return (
    <main className="bg-atelier-paper min-h-screen text-atelier-ink">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-32 pb-20 text-center">
        <span className="text-[10px] tracking-[0.4em] uppercase opacity-50 font-sans block mb-4">
          Support & Logistics
        </span>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl md:text-6xl font-serif italic tracking-tighter"
        >
          Frequently Asked <span className="not-italic">Details</span>
        </motion.h1>

        {/* SEARCH - Minimalist style */}
        <div className="relative max-w-md mx-auto mt-12 border-b border-atelier-ink/20 focus-within:border-atelier-tan transition-colors">
          <Search
            className="absolute left-0 top-1/2 -translate-y-1/2 text-atelier-ink/30"
            size={18}
            strokeWidth={1.5}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="SEARCH OUR ARCHIVE..."
            className="w-full pl-8 pr-4 py-3 bg-transparent text-xs tracking-[0.2em] focus:outline-none uppercase font-sans"
          />
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-[250px_1fr] gap-16">
        {/* STICKY NAV */}
        <aside className="hidden md:block sticky top-32 h-fit border-l border-atelier-ink/10 pl-6">
          <nav className="space-y-6">
            {faqData.map((section) => (
              <a
                key={section.slug}
                href={`#${section.items[0].id}`}
                className="block text-[10px] uppercase tracking-[0.2em] text-atelier-ink/40 hover:text-atelier-tan transition-colors"
              >
                {section.category}
              </a>
            ))}
          </nav>
        </aside>

        {/* FAQ LIST */}
        <div className="max-w-3xl">
          {filteredData.map((section) => (
            <div key={section.slug} className="mb-20">
              <h3 className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-8 font-sans font-bold">
                {section.category}
              </h3>

              {section.items.map((item) => (
                <FAQItem
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
  );
};

export default FAQ;
