import React, { useEffect } from "react";
import MagazineCard from "../components/MagazineCard";
import useProductStore from "../store/useProductStore";
import useSEO from "../hooks/useSEO";

const MagazineArchive = () => {
  const { magazines, fetchProducts, loading } = useProductStore();

  useEffect(() => {
    fetchProducts(); // Refresh data on mount
  }, [fetchProducts]);

  useSEO({
    title: "Magazine Archive",
    description:
      "A seasonal exploration of footwear, philosophy, and the hands that build them.",
  });

  if (loading && magazines.length === 0) {
    return (
      <div className="bg-atelier-paper min-h-screen flex items-center justify-center italic font-serif opacity-40">
        Opening the archive...
      </div>
    );
  }

  return (
    <main className="bg-atelier-paper text-atelier-ink min-h-screen pt-40 pb-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <header className="max-w-3xl mb-24">
          <span className="text-[10px] tracking-[0.5em] uppercase font-sans font-bold opacity-40 block mb-4">
            Printed Matter
          </span>
          <h1 className="text-5xl md:text-8xl font-serif italic tracking-tighter mb-8 leading-[0.9]">
            The <span className="not-italic">Archive</span>
          </h1>
          <p className="text-xl font-serif italic opacity-70 leading-relaxed">
            A seasonal exploration of footwear, philosophy, and the hands that
            build them.
          </p>
        </header>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
          {magazines?.length > 0 ? (
            magazines.map((issue) => (
              <MagazineCard key={issue._id} issue={issue} />
            ))
          ) : (
            // A graceful empty state in the Atelier aesthetic
            <div className="col-span-full py-20 text-center border-y border-atelier-ink/5">
              <p className="font-serif italic opacity-40">
                The archive is currently empty.
              </p>
            </div>
          )}
        </div>

        {/* FOOTER CALLOUT */}
        <div className="mt-40 pt-20 border-t border-atelier-ink/5 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase font-sans opacity-40 mb-6">
            Physical copies available at the Atelier
          </p>
          <div className="inline-block h-12 w-[1px] bg-atelier-tan" />
        </div>
      </div>
    </main>
  );
};

export default MagazineArchive;
