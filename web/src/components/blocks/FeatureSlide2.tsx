import  { useState } from 'react';
import * as Icons from 'lucide-react';

interface FeatureSlideProps {
  header?: string;
  subtitle?: string;
  primary_label?: string;
  primary_url?: string;
  features?: Array<FeatureSlideItemProps>;
}

interface FeatureSlideItemProps {
  title?: string;
  content?: string;
  icon?: string; // Icon name as string (not used in this version)
  image?: string;
}

const FeatureSlide2 = ({
  header,
  subtitle,
  primary_label,
  primary_url,
  features,
}: FeatureSlideProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Constants for card dimensions
  const CARD_WIDTH = 350; // Adjusted card width
  const CARD_GAP = 16; // Total horizontal gap (px-2 on each side)
  const CARD_TOTAL_WIDTH = CARD_WIDTH + CARD_GAP; // Total width per card

  const totalFeatures = features ? features.length : 0;

  // Loop through items when reaching the ends
  const prevFeature = () => {
    setCurrentIndex((prevIndex) =>
      totalFeatures
        ? (prevIndex - 1 + totalFeatures) % totalFeatures
        : prevIndex
    );
  };

  const nextFeature = () => {
    setCurrentIndex((prevIndex) =>
      totalFeatures ? (prevIndex + 1) % totalFeatures : prevIndex
    );
  };

  return (
    <section className="container mx-auto py-16">
      {/* Two Columns */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column */}
        <div className="md:w-1/3 flex flex-col justify-between">
          <div>
            {header && <h2 className="text-4xl font-bold text-left">{header}</h2>}
            {subtitle && (
              <p className="text-lg text-left text-gray-600 mt-2">{subtitle}</p>
            )}
            {/* Primary Button */}
            {primary_url && primary_label && (
              <div className="mt-4">
                <a href={primary_url}>
                  <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark">
                    {primary_label}
                  </button>
                </a>
              </div>
            )}
          </div>
          {/* Navigation Icons */}
          <div className="flex mt-4 text-primary space-x-4">
            <button
              onClick={prevFeature}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              <Icons.ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextFeature}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              <Icons.ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:w-2/3 relative overflow-hidden">
          {/* Cards Container */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (CARD_TOTAL_WIDTH)}px)`,
            }}
          >
            {features &&
              // Concatenate features to allow smooth looping
              [...features, ...features].map((feature, index) => (
                <div
                  key={index}
                  className="w-[350px] flex-shrink-0 px-2"
                >
                  {/* Card */}
                  <div className="rounded-lg overflow-hidden shadow-lg relative">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-96 object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    {/* Text Content */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold">{feature.title}</h3>
                      <p className="mt-2">{feature.content}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSlide2;