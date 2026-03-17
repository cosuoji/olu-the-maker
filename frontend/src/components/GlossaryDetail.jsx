import { useParams, Link } from "react-router-dom";
import { glossary } from "../data/glossaryData";
import { motion } from "framer-motion";
import useSEO from "../hooks/useSEO";

export default function GlossaryDetail() {
  const { term } = useParams();
  const entry = glossary.find(
    (item) => item.term.toLowerCase() === term.toLowerCase(),
  );

  if (!entry) {
    return (
      <main className="bg-atelier-paper text-atelier-ink min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif italic mb-6">Entry Not Found</h1>
          <Link
            to="/glossary"
            className="text-[10px] tracking-[0.3em] uppercase font-sans border-b border-atelier-ink pb-1"
          >
            Return to Lexicon
          </Link>
        </div>
      </main>
    );
  }

  useSEO({
    title: entry.term,
    description: entry.description,
  });

  return (
    <main className="bg-atelier-paper text-atelier-ink min-h-screen pt-40 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12"
        >
          {/* Metadata Sidebar */}
          <div className="md:col-span-1 space-y-8">
            <Link
              to="/glossary"
              className="text-[10px] tracking-[0.3em] uppercase font-sans font-bold opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2"
            >
              ← Back
            </Link>

            {entry.category && (
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase font-sans opacity-30 block mb-2">
                  Category
                </span>
                <p className="font-serif italic text-lg opacity-70">
                  {entry.category}
                </p>
              </div>
            )}
          </div>

          {/* Content Body */}
          <div className="md:col-span-3">
            <h1 className="text-5xl md:text-7xl font-serif italic tracking-tighter mb-8">
              {entry.term}
            </h1>

            <div className="h-[1px] w-20 bg-atelier-tan mb-10" />

            <p className="text-xl md:text-2xl font-serif leading-relaxed text-atelier-ink/80 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left">
              {entry.definition}
            </p>

            <div className="mt-20 pt-10 border-t border-atelier-ink/10">
              <p className="text-[10px] tracking-[0.3em] uppercase font-sans opacity-30 leading-loose">
                Olú the Maker Atelier • Technical Documentation <br />
                Subject: {entry.category || "General Terminology"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
