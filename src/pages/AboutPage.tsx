import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Feather, Scissors } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] py-14">
      {/* 1. Hero Editorial Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold">
            THE HOUSE MANIFESTO
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#171719] mt-3 font-normal leading-[1.08]">
            Permanence Over Novelty.
          </h1>
          <p className="text-xs sm:text-base text-[#7A7670] mt-4 font-light leading-relaxed">
            DROP X was born as an intentional rebellion against the accelerating pace and disposable obsolescence of contemporary fashion. We craft garments designed to be worn across decades.
          </p>
        </div>

        {/* Large Cinematic Banner */}
        <div className="relative aspect-[16/8] sm:aspect-[21/9] overflow-hidden bg-[#171719] shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=85"
            alt="The Atelier Workshop"
            className="w-full h-full object-cover object-center filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 sm:p-14">
            <p className="font-serif italic text-xl sm:text-3xl text-[#E8DEC8] font-light max-w-xl">
              "We do not design for the season; we construct for posterity."
            </p>
          </div>
        </div>
      </section>

      {/* 2. Core Pillars */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-8 bg-[#F4EFEB] border border-[#E8E3DA] space-y-4">
            <Scissors className="w-6 h-6 text-[#C5A880]" />
            <h3 className="font-serif text-2xl text-[#171719] font-normal">
              Architectural Silhouette
            </h3>
            <p className="text-xs text-[#5A5852] font-light leading-relaxed">
              Every garment begins not with decoration, but with geometric balance. Structured shoulders, floating chest canvases, and fluid drapes allow the body to occupy space with dignity and quiet authority.
            </p>
          </div>

          <div className="p-8 bg-[#F4EFEB] border border-[#E8E3DA] space-y-4">
            <Feather className="w-6 h-6 text-[#C5A880]" />
            <h3 className="font-serif text-2xl text-[#171719] font-normal">
              Uncompromising Provenance
            </h3>
            <p className="text-xs text-[#5A5852] font-light leading-relaxed">
              We exclusively use natural fibers of certified ethical origin: Biella virgin wools, sand-washed Mulberry silk, and Inner Mongolian cashmeres. Never synthetic plastics or microfibers.
            </p>
          </div>

          <div className="p-8 bg-[#F4EFEB] border border-[#E8E3DA] space-y-4">
            <ShieldCheck className="w-6 h-6 text-[#C5A880]" />
            <h3 className="font-serif text-2xl text-[#171719] font-normal">
              Small Batch Discipline
            </h3>
            <p className="text-xs text-[#5A5852] font-light leading-relaxed">
              We produce strictly limited editions of 100 to 200 units per style to eliminate deadstock and preserve true exclusivity. Once a numbered archive edition sells out, it is not reproduced.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Textile Origin Map */}
      <section id="textiles" className="py-20 bg-[#F5F2EB] border-y border-[#E8E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
              WHERE OUR GARMENTS BEGIN
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#171719] mt-2 font-normal">
              Ethical Fiber Provenance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                region: 'Biella, Italy',
                textile: 'Super 150s Virgin Wool',
                desc: 'Historic mills nestled at the foot of the Italian Alps utilizing alpine glacial waters to wash raw fleeces with unmatched purity.'
              },
              {
                region: 'Lake Como, Italy',
                textile: '22-Momme Mulberry Silk',
                desc: 'Centuries of Italian silk mastery produce lustrous sand-washed crepes with unmatched fluid weight and organic drape.'
              },
              {
                region: 'Inner Mongolia',
                textile: '7-Gauge Cashmere',
                desc: 'Hand-combed during natural spring molting by nomadic pastoralists upholding traditional cruelty-free stewardship.'
              },
              {
                region: 'Tuscany, Italy',
                textile: 'Vachetta Calfskin',
                desc: 'Slowly tanned in wooden barrels using chestnut and mimosa barks, yielding buttery leather that burnishes with beautiful patina.'
              }
            ].map((origin, idx) => (
              <div key={idx} className="p-6 bg-white border border-[#E8E3DA] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block mb-1">
                    0{idx + 1} • {origin.region}
                  </span>
                  <h4 className="font-serif text-xl text-[#171719] font-medium">{origin.textile}</h4>
                  <p className="text-xs text-[#7A7670] mt-3 font-light leading-relaxed">{origin.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Atelier Life */}
      <section id="ateliers" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
              THE CUTTERS & SEAMSTRESSES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#171719] font-normal leading-tight">
              Honoring Thirty Years of Sartorial Fluency
            </h2>
            <p className="text-xs sm:text-sm text-[#5A5852] font-light leading-relaxed">
              A DROP X blazer requires more than twenty hours of precision manual work. From hand-padded lapels to pick-stitched hems, our craftspeople execute techniques passed down through generations of Italian tailors.
            </p>
            <p className="text-xs sm:text-sm text-[#5A5852] font-light leading-relaxed">
              When you wear DROP X, you carry the dedication of master artisans who take profound pride in seeing their handiwork live gracefully on real human beings across the globe.
            </p>

            <div className="pt-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#171719] hover:bg-black text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium transition-colors"
              >
                <span>Explore The Creations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85"
              alt="Model tailoring"
              className="w-full aspect-[3/4] object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=85"
              alt="Artisan tailor"
              className="w-full aspect-[3/4] object-cover mt-8"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
