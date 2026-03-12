import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const CookieSettingsPage = () => {
  const [currentConsent, setCurrentConsent] = useState(
    localStorage.getItem("cookieConsent") || "None",
  );

  const handleUpdate = (choice) => {
    localStorage.setItem("cookieConsent", choice);
    setCurrentConsent(choice);
    window.dispatchEvent(new Event("cookieConsentUpdated"));
    toast.success(`Preferences Updated: ${choice}`, {
      style: {
        borderRadius: "0px",
        background: "#1A1A1A",
        color: "#F8F4EF",
        fontFamily: "serif",
      },
    });
  };

  return (
    <main className="bg-atelier-paper text-atelier-ink min-h-screen">
      <section className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <span className="text-[10px] tracking-[0.4em] uppercase opacity-50 font-sans block mb-6">
          User Preferences
        </span>
        <h1 className="text-4xl md:text-6xl font-serif italic tracking-tighter mb-8">
          Cookie <span className="not-italic">&</span> Experience
        </h1>
        <div className="h-[1px] w-full bg-atelier-ink/10 mt-16" />
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <span className="text-[10px] tracking-[0.3em] uppercase font-sans font-bold opacity-30">
              Status
            </span>
          </div>

          <div className="md:col-span-3">
            <p className="font-serif text-xl mb-12 italic">
              Current selection:{" "}
              <span className="text-atelier-tan not-italic uppercase font-sans text-sm tracking-widest ml-2">
                {currentConsent}
              </span>
            </p>

            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-serif mb-4">
                  Functional & Experience Cookies
                </h3>
                <p className="text-atelier-ink/70 font-serif leading-relaxed mb-8">
                  These allow us to remember your preferences and ensure the
                  "Digital Atelier" functions as intended, including your cart
                  and login sessions.
                </p>

                <div className="flex gap-6">
                  <button
                    onClick={() => handleUpdate("Accepted")}
                    className="bg-atelier-ink text-atelier-paper px-8 py-4 text-[10px] tracking-[0.2em] uppercase font-sans font-bold hover:bg-atelier-tan transition-colors"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={() => handleUpdate("Rejected")}
                    className="border border-atelier-ink/20 px-8 py-4 text-[10px] tracking-[0.2em] uppercase font-sans font-bold hover:bg-atelier-ink hover:text-atelier-paper transition-all"
                  >
                    Reject Optional
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CookieSettingsPage;
