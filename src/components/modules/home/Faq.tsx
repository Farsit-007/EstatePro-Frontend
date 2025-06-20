"use client";
import { useState } from "react";
import { ArrowDown, HelpCircle, Sparkles } from "lucide-react";

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const questions = [
    {
      q: "How do I book a property?",
      a: "Search for your destination, choose dates, and book instantly through our secure platform.",
    },
    {
      q: "What's the cancellation policy?",
      a: "Most properties offer free cancellation up to 7 days before check-in. Check individual listings for details.",
    },
    {
      q: "How do I become a host?",
      a: "Create a host account, list your property, and our team will guide you through the verification process.",
    },
    {
      q: "Are pets allowed?",
      a: "Many properties are pet-friendly! Use our pet-friendly filter during your search.",
    },
  ];

  return (
    <section className="py-16 my-10 bg-gray-50 rounded-2xl relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-gray-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gray-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <Sparkles className="w-12 h-12 text-gray-900 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-black">
            Your Questions Answered
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Quick answers to common queries about booking and hosting
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((item, index) => (
            <div 
              key={item.q}
              className={`group cursor-pointer transition-all duration-300 ${
                activeIndex === index ? 'ring-2 ring-gray-500' : 'hover:ring-1 hover:ring-gray-200'
              } bg-white rounded-2xl p-6 shadow-sm hover:shadow-md`}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.q}
                    </h3>
                    <ArrowDown className={`w-5 h-5 text-gray-600 transition-transform ${
                      activeIndex === index ? 'rotate-180' : ''
                    }`} />
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${
                    activeIndex === index ? 'max-h-40 mt-4' : 'max-h-0'
                  }`}>
                    <p className="text-gray-600 pl-2 border-l-4 border-gray-100">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating bubbles */}
        <div className="absolute top-1/3 left-20 -translate-y-1/2 w-8 h-8 rounded-full bg-purple-100/40 blur-sm animate-float" />
        <div className="absolute top-2/4 right-32 -translate-y-1/2 w-6 h-6 rounded-full bg-blue-100/40 blur-sm animate-float-delayed" />
      </div>
    </section>
  );
};