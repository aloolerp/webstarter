import React from "react";
import { Button } from "../ui/button";

interface SectionWithImageProps {
  title?: string;
  subtitle?: string;
  image?: string;
  primary_label?: string;
  primary_url?: string;
  secondary_label?: string;
  secondary_url?: string;
}

const SectionWithImage: React.FC<SectionWithImageProps> = ({
  title,
  subtitle,
  image,
  primary_label,
  primary_url,
  secondary_label,
  secondary_url,
}) => {
  return (
    <section className="relative py-12  overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

          {/* Text Section */}
          <div className="lg:w-1/2 text-center lg:text-left space-y-4 lg:space-y-6">
            {title && (
              <h2 className="text-4xl font-bold  tracking-tight animate-fadeInUp">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="text-lg  animate-fadeInUp delay-100">
                {subtitle}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6 animate-fadeInUp delay-200">
              {primary_url && primary_label && (
                <a href={primary_url}>
                  <Button variant="default" className="w-full sm:w-auto">
                    {primary_label}
                  </Button>
                </a>
              )}

              {secondary_url && secondary_label && (
                <a href={secondary_url}>
                  <Button variant="outline" className="w-full sm:w-auto">
                    {secondary_label}
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end animate-fadeInUp delay-300">
            {image && (
              <div className="relative max-w-lg w-full transform hover:scale-105 transition-transform duration-500">
                <img
                  src={image}
                  alt="Section Image"
                  className="rounded-xl shadow-2xl object-cover w-full h-auto"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black to-transparent opacity-30"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none z-[-1]">
        <div className="absolute w-64 h-64 bg-blue-100 rounded-full -top-24 -left-24 opacity-30 animate-float"></div>
        <div className="absolute w-80 h-80 bg-purple-200 rounded-full -bottom-24 -right-24 opacity-20 animate-float delay-1000"></div>
      </div>
    </section>
  );
};

export default SectionWithImage;