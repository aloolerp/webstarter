import React from "react";

interface LogoSetProps {
  logo1?: string;
  logo2?: string;
  logo3?: string;
  logo4?: string;
  logo5?: string;
  logo7?: string;
  logo8?: string;
  logo9?: string;
  logo10?: string;
}

const LogoSet: React.FC<LogoSetProps> = ({
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo7,
  logo8,
  logo9,
  logo10,
}) => {
  const logos = [logo1, logo2, logo3, logo4, logo5, logo7, logo8, logo9, logo10].filter(Boolean); // Filter out empty logos

  return (
    <section className="relative py-12 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Our Partners</h2>
        <p className="text-gray-600 mt-2">
          We proudly collaborate with these great companies.
        </p>
      </div>

      {/* Scrolling logos */}
      <div className="relative overflow-hidden">
        {/* Fading effect on the far sides */}
        <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10"></div>

        {/* Logos scrolling container */}
        <div className="flex space-x-8 animate-marquee">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 min-w-[100px] h-16 md:h-20 lg:h-24 p-2 transform hover:scale-105 transition duration-500"
            >
              <img
                src={logo}
                alt={`Logo ${index + 1}`}
                className="h-full max-w-full object-contain"
              />
            </div>
          ))}

          {/* Repeat logos to make the scrolling infinite */}
          {logos.map((logo, index) => (
            <div
              key={`repeat-${index}`}
              className="flex-shrink-0 min-w-[100px] h-16 md:h-20 lg:h-24 p-2 transform hover:scale-105 transition duration-500"
            >
              <img
                src={logo}
                alt={`Logo repeat ${index + 1}`}
                className="h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoSet;