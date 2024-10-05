import React, { useEffect, useRef } from "react";
import { Button } from "../ui/button";

interface HeroProps {
  title?: string;
  subtitle?: string;
  image?: string;
  primary_label?: string;
  primary_url?: string;
  secondary_label?: string;
  secondary_url?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  image,
  primary_label,
  primary_url,
  secondary_label,
  secondary_url,
}) => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Parallax scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`; // Adjust speed factor here
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center py-32 text-center overflow-hidden">
      {/* Image Background with Parallax */}
      {image && (
        <div
          ref={parallaxRef}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <img
            src={image}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 animate-fadeIn">
        {/* Title */}
        {title && (
          <h1 className="text-5xl font-extrabold leading-tight  sm:text-6xl lg:text-7xl mb-6 animate-slideInUp">
            {title}
          </h1>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p className="text-lg text-gray-400 sm:text-xl lg:text-2xl mb-8 animate-slideInUp delay-100">
            {subtitle}
          </p>
        )}

        {/* Buttons */}
        <div className="flex justify-center space-x-4 animate-slideInUp delay-200">
          {primary_url && primary_label && (
            <a href={primary_url}>
              <Button variant="default" size="lg">
                {primary_label}
              </Button>
            </a>
          )}

          {secondary_url && secondary_label && (
            <a href={secondary_url}>
              <Button variant="outline" size="lg">
                {secondary_label}
              </Button>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;