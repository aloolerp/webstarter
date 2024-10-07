import React, { useState } from 'react';
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  title?: string;
  subtitle?: string;
  items?: {
    title: string;
    content: string;
    image?: string;
  }[];
}

const Carousel: React.FC<CarouselProps> = ({ title, subtitle, items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : items!.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < items!.length - 1 ? prevIndex + 1 : 0));
  };

  const getPreviousIndex = () => currentIndex > 0 ? currentIndex - 1 : items!.length - 1;

  const getNextIndex = () => currentIndex < items!.length - 1 ? currentIndex + 1 : 0;

  return (
    <div className="py-10 relative">
      {/* Title and Subtitle */}
      {title && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">{subtitle}</p>
        </div>
      )}

      {/* Carousel */}
      {items && items.length > 0 && (
        <div className="flex items-center justify-center relative">
         
          {/* Previous Item */}
          <div className="flex flex-col items-center mr-28">
            <div className="w-full h-36  overflow-hidden mb-4 opacity-60 hover:opacity-80 transition-opacity">
              <img
                src={items[getPreviousIndex()].image}
                alt="Previous"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        {/* Previous Button */}
        <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevious}
            className="p-2 border rounded-full hover:bg-primary hover:text-white  dark:hover:bg-primary dark:hover:text-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          {/* Current Item */}
          <div className="w-full max-w-lg mx-4">
            <CardContent className="p-6">
              {/* Image */}
              {items[currentIndex].image && (
                <div className="mb-4">
                  <img
                    src={items[currentIndex].image}
                    alt={items[currentIndex].title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Title */}
              {items[currentIndex].title && (
                <h3 className="text-2xl font-bold text-gray-900 text-center dark:text-white mb-2">{items[currentIndex].title}</h3>
              )}

              {/* Content */}
              {items[currentIndex].content && (
                <p className="text-gray-600 font-semibold text-center dark:text-gray-300 mb-4">$
                  {items[currentIndex].content}
                </p>
              )}

              {/* Shop Now Button */}
              <div className="text-center">
                <Button variant="default" className="rounded-full">
                  Shop Now  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </div>
          {/* Next Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="p-2 border rounded-full hover:bg-primary hover:text-white  dark:hover:bg-primary dark:hover:text-white"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Next Item */}
          <div className="flex flex-col items-center ml-28">
            <div className="w-full h-36 overflow-hidden mb-4 opacity-60 hover:opacity-80 transition-opacity">
              <img
                src={items[getNextIndex()].image}
                alt="Next"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Carousel;
