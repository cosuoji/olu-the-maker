import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react"; // Using Lucide to match Search/Glossary

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show when user has scrolled down significantly
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-12 right-8 z-50 flex flex-col items-center gap-4 cursor-pointer group"
          onClick={scrollToTop}
        >
          {/* VERTICAL TEXT */}
          <span
            className="hidden sm:block text-atelier-ink text-[10px] uppercase tracking-[0.4em] font-sans font-bold transition-colors group-hover:text-atelier-tan"
            style={{ writingMode: "vertical-rl" }}
          >
            Return to Top
          </span>

          {/* THE LINE & ARROW */}
          <div className="flex flex-col items-center">
            {/* Architectural Line */}
            <div className="w-[1px] h-12 bg-atelier-ink/20 group-hover:bg-atelier-tan transition-colors relative">
              <motion.div
                className="absolute top-0 left-0 w-full bg-atelier-ink"
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Refined Arrow */}
            <motion.div
              className="mt-2 text-atelier-ink group-hover:text-atelier-tan transition-colors"
              whileHover={{ y: -5 }}
            >
              <ArrowUp size={18} strokeWidth={1} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
