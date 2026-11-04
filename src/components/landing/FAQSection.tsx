import React, { useState } from 'react';
import { FAQ_ITEMS } from '../../data/mockData';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 px-6 border-t border-border">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] font-mono uppercase tracking-wider text-primary-dim mb-2">Inquiries</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-primary-muted leading-relaxed">
            Everything you need to know about PROFILEOS, data sovereignty, and asset generation.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-charcoal border border-border overflow-hidden transition-all duration-150"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-medium text-xs sm:text-sm text-primary hover:text-white transition-colors"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-primary-dim shrink-0 transition-transform duration-150 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-0 text-xs text-primary-dim leading-relaxed border-t border-border/40 animate-in fade-in duration-150">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

