import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000); // Slight delay for elegance
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (choice) => {
    localStorage.setItem("cookieConsent", choice);
    window.dispatchEvent(new Event("cookieConsentUpdated"));
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xl"
        >
          <div className="bg-atelier-ink text-atelier-paper p-6 md:p-8 shadow-2xl border border-atelier-paper/10 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <span className="text-[10px] tracking-[0.3em] uppercase opacity-50 font-sans block mb-2">
                Protocol
              </span>
              <p className="font-serif italic text-lg leading-snug">
                We use cookies to refine your digital experience at the Atelier.
              </p>
            </div>

            <div className="flex gap-4 items-center">
              <button
                onClick={() => handleChoice("Rejected")}
                className="text-[10px] tracking-[0.2em] uppercase font-sans font-bold hover:text-atelier-tan transition-colors"
              >
                Decline
              </button>
              <button
                onClick={() => handleChoice("Accepted")}
                className="bg-atelier-paper text-atelier-ink px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-sans font-bold hover:bg-atelier-tan transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
