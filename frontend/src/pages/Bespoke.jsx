import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const processSteps = [
  {
    number: "01",
    title: "The Dialogue & Measure",
    description:
      "Whether in our Lagos studio, London pop-up, or via a digital consultation, we begin by discussing your lifestyle, aesthetic preferences, and biomechanics. Precise measurements and foot impressions are taken.",
    image:
      "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop", // Leather swatches/tape measure
  },
  {
    number: "02",
    title: "Carving the Last",
    description:
      "A block of hornbeam wood is hand-carved to replicate the exact anatomy of your foot. This wooden 'last' becomes your personal blueprint, kept in our archives for all future commissions.",
    image:
      "https://images.unsplash.com/photo-1605810753066-1608922dbbc2?q=80&w=1200&auto=format&fit=crop", // Wooden lasts
  },
  {
    number: "03",
    title: "The Fitting Shoe",
    description:
      "Before cutting into your chosen exhibition-grade leather, we build a prototype shoe. During the fitting, we assess the volume, instep, and heel grip, making micro-adjustments to the wooden last.",
    image:
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1200&auto=format&fit=crop", // Workshop workbench
  },
  {
    number: "04",
    title: "The Final Commission",
    description:
      "Over 200 individual steps culminate in the final hand-welted pair. Hand-dyed, hand-stitched, and meticulously polished, your shoes are delivered with bespoke lasted shoetrees.",
    image:
      "https://images.unsplash.com/photo-1616406432452-07bc5938759d?q=80&w=1200&auto=format&fit=crop", // Finished luxury shoe
  },
];

const Bespoke = () => {
  return (
    <main className="bg-atelier-paper text-atelier-ink min-h-screen pt-32 pb-32">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 mb-40 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <span className="text-[10px] tracking-[0.5em] uppercase font-sans font-bold text-atelier-tan">
            Bespoke
          </span>
          <h1 className="text-5xl md:text-8xl font-serif italic tracking-tighter leading-none">
            The Art of the <br />
            <span className="not-italic">Commission</span>
          </h1>
          <p className="text-xl font-serif italic opacity-70 leading-relaxed pt-6">
            A bespoke pair of shoes is not merely purchased; it is commissioned.
            It is a dialogue between the maker and the wearer, resulting in a
            silhouette unique to your anatomy.
          </p>
        </motion.div>
      </section>

      {/* THE PROCESS (Alternating Editorial Layout) */}
      <section className="max-w-6xl mx-auto px-6 space-y-32 md:space-y-48 mb-40">
        {processSteps.map((step, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={step.number}
              className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${isEven ? "" : "md:flex-row-reverse"}`}
            >
              {/* IMAGE BLOCK */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="w-full md:w-1/2 relative aspect-[4/5] group"
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-atelier-ink/5 group-hover:bg-transparent transition-colors duration-700" />
              </motion.div>

              {/* TEXT BLOCK */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full md:w-1/2 space-y-6"
              >
                <span className="text-[10px] tracking-[0.4em] uppercase font-sans font-bold opacity-30 block">
                  Phase {step.number}
                </span>
                <h2 className="text-4xl md:text-5xl font-serif italic tracking-tighter">
                  {step.title}
                </h2>
                <div className="h-[1px] w-12 bg-atelier-tan/50" />
                <p className="text-lg font-serif italic opacity-70 leading-relaxed max-w-md">
                  {step.description}
                </p>
              </motion.div>
            </div>
          );
        })}
      </section>

      {/* LEAD TIME & PRICING TRANSPARENCY */}
      <section className="bg-atelier-ink text-white py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-3xl font-serif italic tracking-tighter">
            Expectations & Investment
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left border-y border-white/10 py-12">
            <div>
              <span className="text-[10px] tracking-[0.4em] uppercase font-sans font-bold text-atelier-tan block mb-4">
                Timeline
              </span>
              <p className="font-serif italic opacity-80 leading-relaxed">
                Initial commissions require approximately 6 to 8 months,
                allowing time for the trial fitting and last refinements.
                Subsequent commissions on your established last take 4 to 6
                months.
              </p>
            </div>
            <div>
              <span className="text-[10px] tracking-[0.4em] uppercase font-sans font-bold text-atelier-tan block mb-4">
                Investment
              </span>
              <p className="font-serif italic opacity-80 leading-relaxed">
                Bespoke commissions begin at $2,500. Prices adjust based on the
                complexity of the pattern and the rarity of the chosen hides
                (e.g., Museum Calf, Shell Cordovan, or Exotics).
              </p>
            </div>
          </div>

          {/* CTA BUTTON */}
          <div className="pt-8">
            <Link
              to="/contact"
              className="inline-block px-12 py-5 bg-white text-atelier-ink text-[10px] tracking-[0.3em] font-sans font-bold hover:bg-atelier-tan hover:text-white transition-colors duration-500 uppercase"
            >
              Request a Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Bespoke;
