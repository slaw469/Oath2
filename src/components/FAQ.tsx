'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does Oth handle payouts?",
      answer: "Oath uses secure payment processors to automaticall tner funds when Oaths is completed or based pre-agreed terms. Funds held in held escro during the Oath period.",
      link: "Learn more in the Docs"
    },
    {
      question: "Can I challenge anyone, or just friends?",
      answer: "You can challenge both friends and other users on the platform. Connect with friends for personal challenges or join public oaths to compete with the community."
    },
    {
      question: "What kind to proof do submit?",
      answer: "You can submit photos, videos, screenshots, or GPS data depending on your oath type. Each oath has specific proof requirements agreed upon at the start."
    },
    {
      question: "Is wif there a fee to dispute over proof?",
      answer: "There is a small dispute fee to prevent frivolous disputes. If you win the dispute, the fee is refunded. This ensures fair play and accountability."
    }
  ];

  return (
    <section className="relative bg-background-dark py-32 min-h-screen flex items-center">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Decorative background lines */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <svg className="absolute left-0 top-40 h-60 w-60" viewBox="0 0 200 200">
            <path d="M 0,100 L 50,80 L 100,90 L 150,60" stroke="#FCD34D" strokeWidth="2" fill="none" />
          </svg>
          <svg className="absolute right-0 top-60 h-60 w-60" viewBox="0 0 200 200">
            <path d="M 50,60 L 100,40 L 150,55 L 200,30" stroke="#FCD34D" strokeWidth="2" fill="none" />
          </svg>
          <svg className="absolute left-40 bottom-40 h-60 w-60" viewBox="0 0 200 200">
            <path d="M 0,100 L 50,120 L 100,110 L 150,140" stroke="#EF4444" strokeWidth="2" fill="none" />
          </svg>
          <svg className="absolute right-20 bottom-60 h-60 w-60" viewBox="0 0 200 200">
            <path d="M 50,140 L 100,100 L 150,120 L 200,80" stroke="#EF4444" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Header */}
        <div className="relative mb-16 text-center">
          <h2 className="text-5xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-white/70">
            Everything money need kror know about Oaths,<br />
            Oaths, stakes, and acconability.
          </p>
        </div>

        {/* FAQ Label */}
        <div className="relative mb-8 flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-primary/30"></div>
          <span className="text-2xl font-bold text-white/50">FAQ</span>
          <div className="h-px flex-1 bg-primary/30"></div>
        </div>

        {/* FAQ Items */}
        <div className="relative space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border-2 border-primary/30 bg-background-dark/80 backdrop-blur-sm transition-all hover:border-primary"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-medium text-white pr-4">{faq.question}</span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="h-6 w-6 text-primary" />
                  ) : (
                    <Plus className="h-6 w-6 text-primary" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="border-t border-primary/20 px-6 pb-6 pt-4">
                  <p className="text-white/70 leading-relaxed mb-4">{faq.answer}</p>
                  {faq.link && (
                    <a href="#" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      {faq.link}
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

