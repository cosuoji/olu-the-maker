import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";

// Import your images
import last1Bg from "../../assets/lasts/last1.png";
import last2Bg from "../../assets/lasts/last2.png";
import last3Bg from "../../assets/lasts/last3.png";

const lastsData = [
  {
    id: "last1",
    name: "The Classic",
    subName: "Form 001 / Round",
    description:
      "A timeless silhouette, balanced for the traditional gentleman.",
    modalContent:
      "The Classic last is the foundation of the Olú collection. Designed for premium box calf leather, it features a generous toe box and a standard instep, making it the most versatile form for Oxfords and Derbies.",
    specs: {
      ToeShape: "Rounded",
      IntendedUse: "Formal / Dress",
      FitProfile: "Standard",
      Construction: "Traditional Hand-Welted",
    },
    bg: last1Bg,
  },
  {
    id: "last2",
    name: "The Sporty",
    subName: "Form 002 / Kinetic",
    description:
      "Engineered for movement, without sacrificing the atelier aesthetic.",
    modalContent:
      "Form 002 is inspired by 1960s tennis silhouettes but built with dress shoe precision. It features a wider forefoot and a lowered heel drop for all-day comfort in more casual environments.",
    specs: {
      ToeShape: "Soft Square",
      IntendedUse: "Casual / Travel",
      FitProfile: "Wide",
      Construction: "Modern Bluberi",
    },
    bg: last2Bg,
  },
  {
    id: "last3",
    name: "The Elegant",
    subName: "Form 003 / Taper",
    description:
      "A sharp, aggressive silhouette for the contemporary sartorialist.",
    modalContent:
      "The Elegant last is our most technical form. It tapers sharply at the toe to create a 'chisel' effect, lengthening the leg line. Preferred for bespoke gala commissions and sleek Chelsea boots.",
    specs: {
      ToeShape: "Tapered Chisel",
      IntendedUse: "Formal / Gala",
      FitProfile: "Slim",
      Construction: "Refined Italian",
    },
    bg: last3Bg,
  },
];

const OurLasts = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const activeLast = lastsData[activeIndex];

  /* PARALLAX FOR DEPTH */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgX = useTransform(mouseX, [-0.5, 0.5], ["-2%", "2%"]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], ["-2%", "2%"]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden bg-atelier-ink text-atelier-paper"
    >
      {/* 1. CENTERED IMAGE FRAME */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLast.id}
            initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ x: bgX, y: bgY }}
            className="w-full h-full md:w-[80%] md:h-[80%] flex items-center justify-center"
          >
            <img
              src={activeLast.bg}
              alt={activeLast.name}
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. TOP NAV: PROGRESS & BRAND */}
      <div className="absolute top-10 inset-x-10 flex justify-between items-start z-20">
        <div>
          <span className="text-[10px] tracking-[0.4em] uppercase font-sans opacity-50 block mb-1">
            Last Archive
          </span>
          <p className="font-serif italic text-lg">{activeLast.subName}</p>
        </div>
        <div className="font-sans text-[10px] tracking-[0.3em] opacity-50">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(lastsData.length).padStart(2, "0")}
        </div>
      </div>

      {/* 3. BOTTOM CONTENT: TITLE & TRIGGER */}
      <div className="absolute bottom-12 left-10 right-10 flex flex-col md:flex-row justify-between items-end z-20">
        <div className="max-w-xl">
          <motion.h1
            key={activeLast.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-serif italic tracking-tighter mb-4"
          >
            {activeLast.name}
          </motion.h1>
          <p className="font-serif text-lg opacity-60 italic max-w-sm leading-tight">
            "{activeLast.description}"
          </p>
        </div>

        <div className="flex flex-col items-end gap-8 mt-10 md:mt-0">
          {/* Thumbnail Strip */}
          <div className="flex gap-3">
            {lastsData.map((last, index) => (
              <div
                key={last.id}
                onClick={() => setActiveIndex(index)}
                className={`w-12 h-16 cursor-pointer border transition-all duration-500 overflow-hidden ${
                  index === activeIndex
                    ? "border-atelier-paper opacity-100 scale-110"
                    : "border-white/10 opacity-30"
                }`}
              >
                <img
                  src={last.bg}
                  className="w-full h-full object-cover scale-150"
                  alt="thumb"
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="group flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase font-sans font-bold"
          >
            <span className="border-b border-transparent group-hover:border-atelier-paper transition-all">
              Explore Specification
            </span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-atelier-paper group-hover:text-atelier-ink transition-all">
              +
            </div>
          </button>
        </div>
      </div>

      {/* 4. TECHNICAL MODAL (ATELIER BLUEPRINT STYLE) */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-atelier-ink/90 backdrop-blur-md z-40"
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-10 z-50 flex items-center justify-center pointer-events-none"
            >
              <div className="bg-atelier-paper text-atelier-ink p-8 md:p-16 max-w-4xl w-full pointer-events-auto border border-atelier-ink/5 shadow-2xl">
                <div className="flex justify-between items-start mb-12">
                  <span className="text-[10px] tracking-[0.4em] uppercase font-sans font-bold opacity-40">
                    Technical Sheet / {activeLast.id}
                  </span>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="uppercase text-[10px] tracking-widest font-bold hover:text-atelier-tan"
                  >
                    Close ✕
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-16">
                  <div>
                    <h2 className="text-4xl font-serif italic mb-6">
                      {activeLast.name}
                    </h2>
                    <p className="font-serif text-lg leading-relaxed opacity-80 mb-8">
                      {activeLast.modalContent}
                    </p>
                  </div>

                  <div className="space-y-6 border-l border-atelier-ink/10 pl-8">
                    {Object.entries(activeLast.specs).map(([label, value]) => (
                      <div key={label}>
                        <p className="text-[10px] tracking-widest uppercase font-sans opacity-40 mb-1">
                          {label}
                        </p>
                        <p className="font-serif text-xl italic">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OurLasts;
