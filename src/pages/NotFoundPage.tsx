import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-[#FAF8F5]">
      <div className="w-16 h-16 rounded-full bg-[#F0ECE1] flex items-center justify-center text-[#7A7670] mb-6">
        <Compass className="w-8 h-8" />
      </div>

      <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block mb-2">
        ERROR 404
      </span>

      <h1 className="font-serif text-4xl sm:text-6xl text-[#171719] font-light">
        Silhouette Not Found
      </h1>

      <p className="mt-4 text-xs sm:text-sm text-[#7A7670] max-w-md mx-auto leading-relaxed font-light">
        The garment, collection, or archive page you are attempting to view has been retired, re-indexed, or moved.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <Link
          to="/"
          className="px-8 py-3.5 bg-[#171719] hover:bg-[#C5A880] text-white hover:text-[#0D0D0E] text-xs uppercase tracking-widest font-medium transition-colors"
        >
          Return to Atelier Home
        </Link>
        <Link
          to="/shop"
          className="px-8 py-3.5 border border-[#171719] text-[#171719] hover:bg-[#171719] hover:text-white text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2"
        >
          <span>Explore All Collections</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
