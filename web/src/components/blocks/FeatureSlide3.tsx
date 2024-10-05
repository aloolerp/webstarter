import { useState } from 'react';
import { Button } from '../ui/button'; // Import Button for the primary button
import * as Icons from 'lucide-react'; // Dynamic icon import from Lucide

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
  icon?: string; // Icon name, dynamically loaded
  image?: string;
}

const FeatureSlide3 = ({ header, subtitle, primary_label, primary_url, features }: FeatureSlideProps) => {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0); // Track active feature

  // Get the active feature
  const activeFeature = features && features[activeFeatureIndex];

  // Dynamically import icons from Lucide
  const renderIcon = (iconName: string | undefined) => {
    const LucideIcon = iconName ? Icons[iconName as keyof typeof Icons] : Icons.Circle;
    return <LucideIcon className="w-6 h-6 text-primary" />;
  };

  return (
    <section className="container mx-auto py-16">
      {/* Header and Subtitle */}
      <div className="flex justify-between items-center mb-8">
        <div>
          {header && <h2 className="text-4xl font-bold">{header}</h2>}
          {subtitle && <p className="text-lg text-gray-600 mt-2">{subtitle}</p>}
        </div>
        {primary_url && primary_label && (
          <a href={primary_url}>
            <Button variant="default">{primary_label}</Button>
          </a>
        )}
      </div>

      {/* Gray Rounded Container for Tabs and Image */}
      <div className="bg-gray-100 rounded-lg p-8 shadow-md">
        {/* Tabs (Feature Cards) */}
        <div className="flex overflow-x-auto gap-4 pb-6 mb-6 ">
          {features &&
            features.map((feature, index) => (
              <div
                key={index}
                onClick={() => setActiveFeatureIndex(index)} // Set the active feature when clicked
                className={`cursor-pointer p-4 rounded-lg min-w-[200px] transition-all duration-300 ${
                  activeFeatureIndex === index ? 'bg-white shadow-md' : 'bg-gray-200 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  {renderIcon(feature.icon)} {/* Render Icon */}
                  <h4 className="text-lg font-semibold">{feature.title}</h4>
                </div>
                <p className="text-sm mt-2 text-gray-600">{feature.content}</p>
              </div>
            ))}
        </div>

        {/* Active Feature Image */}
        {activeFeature && (
          <div className="flex justify-center mt-8">
            <div className="w-full max-w-3xl  rounded-lg ">
              <img
                src={activeFeature.image}
                alt={activeFeature.title}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeatureSlide3;