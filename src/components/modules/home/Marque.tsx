"use client";
import Marquee from "react-fast-marquee";
import { Star } from "lucide-react";

const ReviewMarquee = () => {
  const reviews = [
    {
      name: "Sarah J.",
      rating: 5,
      text: "Absolutely stunning properties! Best rental experience ever.",
    },
    {
      name: "Mike R.",
      rating: 4,
      text: "Great service and beautiful locations. Will book again!",
    },
    {
      name: "Emma L.",
      rating: 5,
      text: "Exceeded all our expectations. Truly memorable stay.",
    },
    {
      name: "David K.",
      rating: 5,
      text: "Flawless from start to finish. Highly recommended!",
    },
  ];

  return (
    <div className="py-8 my-20 relative overflow-hidden">
      {/* Gradient overlays */}
      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white via-white/50 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white via-white/50 to-transparent z-10 pointer-events-none"></div>

      <Marquee 
        speed={40}
        gradient={false}
        pauseOnHover
        direction="right"
        autoFill
        className="overflow-hidden relative z-0"
      >
        {reviews.map((review, index) => (
          <div 
            key={index}
            className={`mx-4 ${index % 2 === 0 ? 
              'rotate-8 hover:rotate-0 transform transition-all duration-500' : 
              '-rotate-8 hover:rotate-0 transform transition-all duration-500'}`}
          >
            <div className="w-72 h-50 p-6 mx-5 bg-white rounded-2xl shadow-lg border border-slate-100 flex flex-col justify-between">
              {/* Stars */}
              <div className="flex items-center gap-2">
                {[...Array(review.rating)].map((_, i) => (
                  <Star 
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              
              {/* Review text */}
              <p className="text-slate-600 text-lg leading-tight">
                {review.text}
              </p>
              
              {/* Author */}
              <div className="text-right">
                <h4 className="font-semibold text-indigo-600">{review.name}</h4>
                <p className="text-sm text-slate-400">Verified Guest</p>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ReviewMarquee;