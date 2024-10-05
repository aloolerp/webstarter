import { useState } from 'react';
import { Button } from "../ui/button";
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
  icon?: string; // Icon name as string
  image?: string;
}

const FeatureSlide = ({
  header,
  subtitle,
  primary_label,
  primary_url,
  features,
}: FeatureSlideProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleFeatureClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="container mx-auto py-16">
      {/* Header and Subtitle */}
      <div className="mb-8">
        {header && (
          <h2 className="text-4xl font-bold text-left">{header}</h2>
        )}
        {subtitle && (
          <p className="text-lg text-left text-gray-600 mt-2">{subtitle}</p>
        )}
        {/* Primary Button */}
        {primary_url && primary_label && (
          <div className="mt-4">
            <a href={primary_url}>
              <Button variant="default">{primary_label}</Button>
            </a>
          </div>
        )}
      </div>
     

      {/* Two Columns */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Features List */}
        <div className="md:w-1/2 relative">
          {/* Background Indicator */}
          <div
            className="absolute top-0 left-0 w-full transition-all duration-300"
            style={{
              transform: `translateY(${activeIndex * 100}%)`,
              height: '100px', // Adjust based on item height
              backgroundColor: '#f3f4f6', // bg-gray-100
              borderRadius: '0.5rem', // rounded-lg
            }}
          ></div>

          {features &&
            features.map((item, idx) => {
              const isActive = idx === activeIndex;
              const IconComponent = Icons[item.icon as keyof typeof Icons];

              return (
                <div key={idx} className="relative z-10">
                  <button
                    onClick={() => handleFeatureClick(idx)}
                    className={`flex items-center w-full text-left p-4 transition-colors duration-200 ${
                      isActive ? 'text-primary' : 'hover:text-gray-700'
                    }`}
                    style={{ height: '100px' }} // Ensure consistent height
                  >
                    {IconComponent ? (
                      <IconComponent className="w-6 h-6 mr-4" />
                    ) : (
                      <Icons.Circle className="w-6 h-6 mr-4" />
                    )}
                    <span className="text-xl font-medium">{item.title}</span>
                  </button>
                  {/* Active Feature Content */}
                  {isActive && item.content && (
                    <div className="mt-2 px-4">
                      <p className="text-gray-700">{item.content}</p>
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {/* Right Column - Active Feature Image */}
        <div className="md:w-1/2">
          <div className="rounded-lg bg-gray-100 p-4">
            {features && features[activeIndex]?.image && (
              <img
                src={features[activeIndex].image}
                alt="Feature Image"
                className="w-full h-auto object-cover rounded-lg transition-opacity duration-500 ease-in-out opacity-0"
                style={{ opacity: 1 }}
                key={activeIndex} // key added to trigger re-mount
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSlide;