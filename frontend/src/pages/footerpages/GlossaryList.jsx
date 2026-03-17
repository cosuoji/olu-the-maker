import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react"; // Matching your other pages
import { glossary } from "../../data/glossaryData";
import { motion } from "framer-motion";
import useSEO from "../../hooks/useSEO";

export default function GlossaryList() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return glossary.filter((item) =>
      item.term.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const grouped = filtered.reduce((acc, item) => {
    const letter = item.term[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(item);
    return acc;
  }, {});

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useSEO({
    title: "Glossary",
    description: "Browse the glossary of terms used in the brand.",
  });

  return (
    <main className="bg-atelier-paper text-atelier-ink min-h-screen pt-32 pb-32">
      <div className="max-w-5xl mx-auto px-6">
        {/* HEADER */}
        <header className="mb-20">
          <span className="text-[10px] tracking-[0.4em] uppercase opacity-50 font-sans block mb-4 text-center md:text-left">
            Knowledge Base
          </span>
          <h1 className="text-5xl md:text-7xl font-serif italic tracking-tighter text-center md:text-left">
            Shoe <span className="not-italic">Lexicon</span>
          </h1>
        </header>

        {/* SEARCH BAR - Refined to match Shipping/FAQ */}
        <div className="relative max-w-md mb-16 border-b border-atelier-ink/20 focus-within:border-atelier-tan transition-colors">
          <Search
            className="absolute left-0 top-1/2 -translate-y-1/2 text-atelier-ink/30"
            size={18}
            strokeWidth={1.5}
          />
          <input
            type="text"
            placeholder="SEARCH TERMS..."
            className="w-full pl-8 pr-4 py-3 bg-transparent text-[10px] tracking-[0.2em] focus:outline-none uppercase font-sans placeholder:text-atelier-ink/30"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-16">
          {/* STICKY ALPHABET NAV */}
          <aside className="md:w-12 h-fit md:sticky md:top-32 hidden md:block">
            <div className="flex flex-col gap-2">
              {alphabet.map((letter) => (
                <a
                  key={letter}
                  href={`#${letter}`}
                  className={`text-[10px] font-sans font-bold transition-all hover:text-atelier-tan ${
                    grouped[letter]
                      ? "opacity-100"
                      : "opacity-10 pointer-events-none"
                  }`}
                >
                  {letter}
                </a>
              ))}
            </div>
          </aside>

          {/* LIST CONTENT */}
          <div className="flex-1 space-y-24">
            {alphabet.map((letter) =>
              grouped[letter] ? (
                <section key={letter} id={letter} className="scroll-mt-32">
                  <h2 className="text-4xl font-serif italic border-b border-atelier-ink/10 pb-4 mb-8">
                    {letter}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    {grouped[letter].map((item, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ x: 5 }}
                        className="group border-b border-atelier-ink/5 py-4"
                      >
                        <Link
                          to={`/glossary/${item.term.toLowerCase()}`}
                          className="flex justify-between items-baseline group-hover:text-atelier-tan transition-colors"
                        >
                          <span className="text-xl font-serif">
                            {item.term}
                          </span>
                          <span className="text-[10px] tracking-widest font-sans opacity-30">
                            VIEW ENTRY
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </section>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
