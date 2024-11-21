'use client';

import React from 'react';
import { cn } from "@/lib/utils";

interface CarouselProps {
  images: string[];
  className?: string;
}

export function Carousel({ images, className }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
    className={cn(
      "relative w-full max-w-[80%] mx-auto overflow-hidden items-center justify-center rounded-lg shadow-md md:max-w-[60%] lg:max-w-[80%]",
      className
    )}
  >
      {/* Slides */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full object-cover"
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
      >
        &larr;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
      >
        &rarr;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "h-2 w-2 cursor-pointer rounded-full bg-gray-300",
              currentIndex === index && "bg-black"
            )}
          />
        ))}
      </div>
    </div>
  );
}
