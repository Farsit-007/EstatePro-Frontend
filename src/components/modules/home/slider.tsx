"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

const InteractiveCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const slides = [
    {
      title: "Find Your Dream Rental!",
      description: "Discover luxury cabins with breathtaking views",
      image:
        "/1.jpg",
      color: "bg-emerald-100",
    },
    {
      title: "Your Next Home Awaits!",
      description: "Modern apartments in city centers",
      image:
       "/2.jpg",
      color: "bg-sky-100",
    },
    {
      title: "Rent the Perfect Place!",
      description: "Wake up to ocean waves every morning",
      image:
        "/3.jpg",
      color: "bg-amber-100",
    },
  ];

  useEffect(() => {
    if (!paused) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % slides?.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [paused,slides?.length]);

  const goNext = () => setActiveIndex((prev) => (prev + 1) % slides?.length);
  const goPrev = () =>
    setActiveIndex((prev) => (prev - 1 + slides?.length) % slides?.length);

  return (
    <div
      className="relative w-full group  px-4 md:px-0 my-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[600px] overflow-hidden rounded-3xl shadow-2xl">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.83,0,0.17,1)] ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: `perspective(1200px) rotateX(${
                index === activeIndex ? "0deg" : "15deg"
              }) scale(${index === activeIndex ? 1 : 0.95})`,
            }}
          >
            <div
              className={`absolute inset-0 ${slide.color} rounded-3xl mix-blend-multiply`}
            />
            <Image
              src={slide.image}
              alt={slide.title}
              width={2400}
              height={2400}
              className="w-full h-full object-cover transform rounded-3xl transition-transform duration-1000"
            />

            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-12 text-white bg-gradient-to-t from-black/80 via-black/50 to-transparent">
              <h2 className="text-3xl md:text-5xl font-bold mb-4  animate-slideUp">
                {slide.title}
              </h2>
              <p className="text-xl animate-slideUp delay-100">
                {slide.description}
              </p>
            </div>
           
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
      >
        <ArrowLeft className="h-8 w-8 text-white" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
      >
        <ArrowRight className="h-8 w-8 text-white" />
      </Button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default InteractiveCarousel;
