import React, { useState } from 'react';
import { Button } from "../ui/button"; // Button component
import { ArrowLeft, ArrowRight } from 'lucide-react'; // Icons for arrows

interface HeroCarouselProps {
  header?: string;
  subtitle?: string;
  description?: string;
  features: Array<{
    image: string;
    title: string;
    content: string;
  }>;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ header, subtitle, description, features }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className=" mx-auto flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
        
        {/* Left Section: Title, Subtitle, Description */}
        <div className="max-w-lg lg:w-1/2">
          {header && <h1 className="text-5xl lg:text-6xl font-extrabold mb-4">{header}</h1>}
          {subtitle && <h2 className="text-5xl lg:text-6xl font-light text-gray-400 mb-4">{subtitle}</h2>}
          {description && <p className="text-lg text-gray-600 mb-6">{description}</p>}

          {/* Navigation buttons */}
          <div className="flex space-x-4">
            <button onClick={handlePrevSlide} className="p-3 rounded-full bg-gray-200">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button onClick={handleNextSlide} className="p-3 rounded-full bg-gray-200">
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Right Section: Image Carousel */}
        <div className="relative lg:w-1/2 flex">
          <div className="relative rounded-lg overflow-hidden w-3/5 transition-all duration-500 ease-in-out">
            <img
              src={features[currentSlide].image}
              alt={`Slide ${currentSlide + 1}`}
              className="w-full h-[500px] object-cover rounded-lg shadow-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
              <h3 className="text-2xl font-bold">{features[currentSlide].title}</h3>
              <p className="text-base">{features[currentSlide].content}</p>
            </div>
          </div>

          {/* Partial Next Slide */}
          <div className="relative w-2/5 ml-2 ">
            <img
              src={features[(currentSlide + 1) % features.length].image}
              alt={`Slide ${(currentSlide + 1) % features.length + 1}`}
              className="w-full h-[500px] object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent px-4 py-4 text-white">
              <h3 className="text-2xl font-bold">{features[(currentSlide +1)% features.length].title}</h3>
              <p className="text-base">{features[(currentSlide +1)% features.length].content}</p>
            </div>
          </div>
        </div>

       
      </div>
       {/* Dots Indicator */}
       <div className="flex justify-center mt-6 space-x-2">
          {features.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-black w-4' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
    </section>
  );
};

export default HeroCarousel;