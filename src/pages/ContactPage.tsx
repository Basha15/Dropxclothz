import React, { useState } from 'react';
import { Mail, Phone, Clock, Check, ChevronDown, ChevronUp, Send, HelpCircle, Package, RefreshCw } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Order Tracking & Delivery Status',
    message: ''
  });

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: 'Order Tracking & Delivery Status', message: '' });
    }, 2500);
  };

  const faqs = [
    {
      q: 'How are DROPX garments shipped and packaged?',
      a: 'All clothing orders are dispatched in custom breathable wardrobe garment covers via express air courier (DHL Express or FedEx International Priority) with full transit insurance. Orders over $100 / ₹5,000 receive complimentary courier delivery.'
    },
    {
      q: 'What is the complimentary returns and exchanges policy?',
      a: 'We offer a complimentary 30-day return policy on all unworn clothing items with original brand security tags intact. Simply use the prepaid return courier label included in your box, or contact our concierge to schedule a door-to-door courier pickup.'
    },
    {
      q: 'How do I choose the correct size for my clothing?',
      a: 'Every product page includes an International Size Guide with chest, waist, and hip measurements across XS, S, M, L, XL, and XXL. If you are between sizes, our fit description indicates whether the garment is cut oversized, relaxed, or tailored.'
    },
    {
      q: 'How should pure virgin wool and cashmere knitwear be preserved?',
      a: 'Rest knitwear for 24 hours between wearings. Use structured wide-shoulder hangers for coats and blazers. Store cashmeres folded in breathable cotton bags with natural cedar blocks. Never hang heavy knit sweaters on wire hangers.'
    },
    {
      q: 'Can I cancel or modify my online order after placing it?',
      a: 'Yes, within 2 hours of placing your order before dispatch processing begins, you can contact concierge to adjust sizes, colors, or shipping addresses.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold">
            CLIENT CARE & CONCIERGE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#171719] mt-3 font-normal">
            Customer Concierge
          </h1>
          <p className="text-xs sm:text-sm text-[#7A7670] mt-3 font-light leading-relaxed">
            Our international customer support team is available seven days a week to assist with styling inquiries, sizing guidance, order tracking, and returns.
          </p>
        </div>

        {/* 2-Column Grid: Contact Form & Retail Hubs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-[#E8E3DA]">
          {/* Left Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 border border-[#E8E3DA] shadow-sm">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#171719] mb-2 font-normal">
              Send an Inquiry
            </h2>
            <p className="text-xs text-[#7A7670] mb-8 font-light">
              Send our concierge team a message and we will respond within 4 hours.
            </p>

            {formSubmitted ? (
              <div className="p-8 bg-[#F5F2EB] border border-[#C5A880] text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#171719] text-[#C5A880] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#171719]">Inquiry Dispatched</h3>
                <p className="text-xs text-[#5A5852] max-w-md mx-auto">
                  Thank you. Your message has been routed to our Head Concierge. An advisor will contact you shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 text-xs uppercase tracking-wider text-[#171719] underline font-medium"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5A5852] mb-1.5 font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full bg-[#FAF8F5] border border-[#E8E3DA] px-3.5 py-3 text-sm text-[#171719] focus:outline-none focus:border-[#171719]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5A5852] mb-1.5 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. eleanor@vance.com"
                      className="w-full bg-[#FAF8F5] border border-[#E8E3DA] px-3.5 py-3 text-sm text-[#171719] focus:outline-none focus:border-[#171719]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5A5852] mb-1.5 font-medium">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8E3DA] px-3.5 py-3 text-sm text-[#171719] focus:outline-none focus:border-[#171719]"
                  >
                    <option value="Order Tracking & Delivery Status">Order Tracking & Delivery Status</option>
                    <option value="Garment Sizing & Fit Guidance">Garment Sizing & Fit Guidance</option>
                    <option value="Returns, Exchanges & Refunds">Returns, Exchanges & Refunds</option>
                    <option value="Fabric Care & Preservation">Fabric Care & Preservation</option>
                    <option value="VIP Client Membership & Perks">VIP Client Membership & Perks</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5A5852] mb-1.5 font-medium">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How may our customer concierge assist you today?"
                    className="w-full bg-[#FAF8F5] border border-[#E8E3DA] p-3.5 text-sm text-[#171719] focus:outline-none focus:border-[#171719]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#171719] hover:bg-[#C5A880] text-[#FAF8F5] hover:text-[#0D0D0E] text-xs uppercase tracking-[0.25em] font-medium transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Concierge</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Info: Client Care Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block">
                DIRECT CONTACT CHANNELS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#171719] font-normal">
                Always at Your Service
              </h3>
              <p className="text-xs text-[#5A5852] font-light leading-relaxed">
                Connect with our international clothing advisors for styling questions, dispatch queries, or wholesale opportunities.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 bg-white border border-[#E8E3DA]">
                  <Mail className="w-5 h-5 text-[#C5A880] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171719]">Concierge Desk</h4>
                    <p className="text-xs text-[#5A5852]">concierge@dropx-atelier.com</p>
                    <p className="text-[10px] text-[#8C8880] mt-0.5">Average reply time under 4 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white border border-[#E8E3DA]">
                  <Phone className="w-5 h-5 text-[#C5A880] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171719]">Telephone Concierge</h4>
                    <p className="text-xs text-[#5A5852]">+1 (800) 492-DROP / +91 11 4982 7000</p>
                    <p className="text-[10px] text-[#8C8880] mt-0.5">Mon–Sat: 09:00 – 21:00 UTC</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white border border-[#E8E3DA]">
                  <Clock className="w-5 h-5 text-[#C5A880] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171719]">Dispatch Operations</h4>
                    <p className="text-xs text-[#5A5852]">Same-day courier dispatch for orders confirmed before 14:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Global Retail Hubs */}
            <div className="p-6 bg-[#F5F2EB] border border-[#E8E3DA] space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
                FLAGSHIP BOUTIQUES
              </span>
              <p className="text-xs text-[#171719] font-medium">New York • Paris • Milan • London • Mumbai</p>
              <p className="text-[11px] text-[#7A7670]">
                Experience our garments in person at our partner flagship retail locations worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <section id="faq" className="pt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
              KNOWLEDGE BASE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171719] mt-2 font-normal">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-[#E8E3DA] border-y border-[#E8E3DA]">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-5">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left text-sm sm:text-base font-serif text-[#171719] hover:text-[#C5A880] transition-colors gap-4"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 flex-shrink-0" />}
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-xs sm:text-sm text-[#5A5852] font-light leading-relaxed pr-6">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
