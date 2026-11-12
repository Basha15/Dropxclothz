import React from 'react';
import { motion } from 'framer-motion';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0D0D0E]/65 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative bg-[#FAF8F5] w-full max-w-2xl border border-[#E8E3DA] shadow-2xl p-6 sm:p-8 my-8"
      >
        <button
          onClick={onClose}
          aria-label="Close size guide"
          className="absolute top-5 right-5 p-2 text-[#7A7670] hover:text-[#171719] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-[#C5A880] mb-1">
          <Ruler className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-widest font-semibold">
            INTERNATIONAL SIZE & FIT GUIDE
          </span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl text-[#171719]">
          Garment Measurements & Sizing
        </h3>
        <p className="text-xs text-[#7A7670] mt-1 max-w-lg leading-relaxed">
          Our silhouettes are cut according to international luxury ready-to-wear standards. Measurements are given in inches (in) and centimeters (cm).
        </p>

        {/* Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-[#171719] text-[#171719] uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">Chest (in/cm)</th>
                <th className="py-2.5 px-3">Waist (in/cm)</th>
                <th className="py-2.5 px-3">Hips (in/cm)</th>
                <th className="py-2.5 px-3">US / UK / EU</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E3DA] text-[#5A5852]">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[#171719]">XS</td>
                <td className="py-2.5 px-3">34-36 / 86-91</td>
                <td className="py-2.5 px-3">28-30 / 71-76</td>
                <td className="py-2.5 px-3">35-37 / 89-94</td>
                <td className="py-2.5 px-3">34 / 34 / 44</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[#171719]">S</td>
                <td className="py-2.5 px-3">36-38 / 91-96</td>
                <td className="py-2.5 px-3">30-32 / 76-81</td>
                <td className="py-2.5 px-3">37-39 / 94-99</td>
                <td className="py-2.5 px-3">36 / 36 / 46</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[#171719]">M</td>
                <td className="py-2.5 px-3">38-40 / 96-101</td>
                <td className="py-2.5 px-3">32-34 / 81-86</td>
                <td className="py-2.5 px-3">39-41 / 99-104</td>
                <td className="py-2.5 px-3">38 / 38 / 48</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[#171719]">L</td>
                <td className="py-2.5 px-3">40-42 / 101-107</td>
                <td className="py-2.5 px-3">34-36 / 86-91</td>
                <td className="py-2.5 px-3">41-43 / 104-109</td>
                <td className="py-2.5 px-3">40 / 40 / 50</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[#171719]">XL</td>
                <td className="py-2.5 px-3">42-44 / 107-112</td>
                <td className="py-2.5 px-3">36-38 / 91-96</td>
                <td className="py-2.5 px-3">43-45 / 109-114</td>
                <td className="py-2.5 px-3">42 / 42 / 52</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[#171719]">XXL</td>
                <td className="py-2.5 px-3">44-46 / 112-117</td>
                <td className="py-2.5 px-3">38-40 / 96-101</td>
                <td className="py-2.5 px-3">45-47 / 114-119</td>
                <td className="py-2.5 px-3">44 / 44 / 54</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-[#F2EDE4] border border-[#E0D8CA] rounded-sm text-xs text-[#5A5852] space-y-1">
          <p className="font-semibold text-[#171719]">Complimentary Fit Consultation</p>
          <p>
            Unsure between two sizes? Our fashion advisors are available for complimentary digital sizing and fit consultations via live chat or concierge email.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
