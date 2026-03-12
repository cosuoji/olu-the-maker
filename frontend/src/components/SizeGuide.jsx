import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SizeGuide = () => {
  const [activeTab, setActiveTab] = useState("size");

  // Size conversion data
  const sizeData = [
    { eu: 36, uk: 3, us: 5 },
    { eu: 37, uk: 4, us: 6 },
    { eu: 38, uk: 5, us: 7 },
    { eu: 39, uk: 6, us: 8 },
    { eu: 40, uk: 7, us: 9 },
    { eu: 41, uk: 8, us: 10 },
    { eu: 42, uk: 9, us: 11 },
    { eu: 43, uk: 10, us: 12 },
    { eu: 44, uk: 11, us: 13 },
  ];

  return (
    <div className="max-w-xl mx-auto bg-atelier-paper text-atelier-ink shadow-2xl overflow-hidden border border-atelier-ink/10">
      {/* Tab Navigation */}
      <div className="flex border-b border-atelier-ink/10">
        <button
          className={`flex-1 py-5 px-4 focus:outline-none text-[10px] tracking-[0.3em] uppercase font-sans font-bold transition-all ${
            activeTab === "size"
              ? "text-atelier-ink border-b-2 border-atelier-ink"
              : "text-atelier-ink/40 hover:text-atelier-ink/70"
          }`}
          onClick={() => setActiveTab("size")}
        >
          What's my size
        </button>
        <button
          className={`flex-1 py-5 px-4 focus:outline-none text-[10px] tracking-[0.3em] uppercase font-sans font-bold transition-all ${
            activeTab === "measurement"
              ? "text-atelier-ink border-b-2 border-atelier-ink"
              : "text-atelier-ink/40 hover:text-atelier-ink/70"
          }`}
          onClick={() => setActiveTab("measurement")}
        >
          Measurement guide
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-8 md:p-12 min-h-[450px]">
        <AnimatePresence mode="wait">
          {activeTab === "size" ? (
            <motion.div
              key="size"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-serif italic text-2xl mb-6">
                Size Conversion
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-atelier-ink/20">
                  <thead>
                    <tr>
                      <th className="px-4 py-4 text-left text-[10px] tracking-[0.3em] font-sans font-bold uppercase opacity-50">
                        EU
                      </th>
                      <th className="px-4 py-4 text-left text-[10px] tracking-[0.3em] font-sans font-bold uppercase opacity-50">
                        UK
                      </th>
                      <th className="px-4 py-4 text-left text-[10px] tracking-[0.3em] font-sans font-bold uppercase opacity-50">
                        US
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-atelier-ink/10">
                    {sizeData.map((size, index) => (
                      <tr
                        key={index}
                        className="hover:bg-atelier-ink/5 transition-colors"
                      >
                        <td className="px-4 py-3 whitespace-nowrap font-sans text-sm">
                          {size.eu}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap font-sans text-sm opacity-70">
                          {size.uk}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap font-sans text-sm opacity-70">
                          {size.us}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="measurement"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-serif italic text-2xl mb-4">
                How to Measure
              </h3>
              <p className="font-serif italic opacity-80 leading-relaxed mb-6">
                To find the perfect fit, use a measuring tape to measure
                yourself following the steps below. We recommend that you keep
                the measuring tape loose and that you size up if you are
                in-between sizes.
              </p>

              <ol className="list-decimal pl-5 space-y-3 font-serif italic opacity-80 mb-10 marker:font-sans marker:text-[10px] marker:font-bold">
                <li>Place the tip of your bare foot against the wall.</li>
                <li>
                  Place your foot on a piece of paper on a flat, solid surface
                  and draw a line at the tip of your biggest toe.
                </li>
                <li>Measure the length between the two lines.</li>
                <li>
                  Refer to the chart below to find the corresponding shoe size.
                </li>
              </ol>

              <div className="p-6 bg-atelier-ink/5 border border-atelier-ink/10">
                <h4 className="text-[10px] tracking-[0.3em] uppercase font-sans font-bold mb-4">
                  Foot Length to Size
                </h4>
                <table className="min-w-full divide-y divide-atelier-ink/20">
                  <thead>
                    <tr>
                      <th className="text-left py-3 text-[10px] tracking-[0.3em] font-sans font-bold uppercase opacity-50">
                        Foot Length (cm)
                      </th>
                      <th className="text-left py-3 text-[10px] tracking-[0.3em] font-sans font-bold uppercase opacity-50">
                        EU Size
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-atelier-ink/10">
                    <tr className="hover:bg-white/50 transition-colors">
                      <td className="py-3 font-sans text-sm opacity-70">
                        22.5 - 23.0
                      </td>
                      <td className="py-3 font-sans text-sm">36</td>
                    </tr>
                    <tr className="hover:bg-white/50 transition-colors">
                      <td className="py-3 font-sans text-sm opacity-70">
                        23.0 - 23.5
                      </td>
                      <td className="py-3 font-sans text-sm">37</td>
                    </tr>
                    <tr className="hover:bg-white/50 transition-colors">
                      <td className="py-3 font-sans text-sm opacity-70">
                        23.5 - 24.0
                      </td>
                      <td className="py-3 font-sans text-sm">38</td>
                    </tr>
                    <tr className="hover:bg-white/50 transition-colors">
                      <td className="py-3 font-sans text-sm opacity-70">
                        24.0 - 24.5
                      </td>
                      <td className="py-3 font-sans text-sm">39</td>
                    </tr>
                    <tr className="hover:bg-white/50 transition-colors">
                      <td className="py-3 font-sans text-sm opacity-70">
                        24.5 - 25.0
                      </td>
                      <td className="py-3 font-sans text-sm">40</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SizeGuide;
