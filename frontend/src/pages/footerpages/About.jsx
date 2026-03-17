import React from "react";
import PageTransition from "../../components/PageTransition";
import useSEO from "../../hooks/useSEO";

const About = () => {
  useSEO({
    title: "About Us",
    description: "Learn about our story and mission.",
  });

  return (
    <>
      <PageTransition>
        <section className="bg-atelier-paper min-h-screen py-24 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <span className="text-[10px] tracking-[0.4em] uppercase opacity-60 mb-8 block font-sans">
              Our Heritage
            </span>

            <h1 className="text-4xl md:text-6xl font-serif italic mb-12 tracking-tighter text-atelier-ink">
              Crafting Purpose <br />
              <span className="not-italic">at the Bench.</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
              <div className="md:col-span-3">
                <p className="text-xl md:text-2xl leading-relaxed font-serif text-atelier-ink/90 italic">
                  At Olú the Maker, we believe shoes are more than just
                  footwear—they are a physical manifestation of identity and
                  tradition.
                </p>

                <div className="mt-12 space-y-8 font-serif text-lg leading-relaxed text-atelier-ink/80">
                  <p>
                    Founded with a focus on the "bespoke" spirit, every pair we
                    create is an intersection of Nigerian artisanry and global
                    luxury standards. Our mission is to move away from the
                    disposable, favoring the "Slow Fashion" philosophy that
                    prioritizes the longevity of the leather and the comfort of
                    the last.
                  </p>
                  <p>
                    From our workshops in Lagos to our creative inspirations in
                    London, we bridge two worlds to provide a contemporary
                    aesthetic for the modern individual who values substance as
                    much as style.
                  </p>
                </div>
              </div>

              {/* Sidebar decorative detail */}
              <div className="md:col-span-2 border-l border-atelier-ink/10 pl-8 pt-4">
                <h3 className="font-sans text-[10px] tracking-widest uppercase mb-4 opacity-50 font-bold">
                  The Pillars
                </h3>
                <ul className="space-y-4 font-serif italic text-lg">
                  <li>Hand-selected Leathers</li>
                  <li>Bespoke Last-making</li>
                  <li>Ethical Production</li>
                  <li>Timeless Silhouettes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </PageTransition>
    </>
  );
};

export default About;
