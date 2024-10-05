import { Button } from '../ui/button';  // Import Button for primary action
import * as Icons from 'lucide-react';  // Dynamic import for Lucide icons

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
  icon?: string;  // Dynamic icon name
  image?: string;
}

const FeatureSlide4 = ({ header, subtitle, primary_label, primary_url, features }: FeatureSlideProps) => {
  // Dynamically import icons from Lucide
  const renderIcon = (iconName: string | undefined) => {
    const LucideIcon = iconName ? Icons[iconName as keyof typeof Icons] : Icons.Circle;
    return <LucideIcon className="w-8 h-8 text-primary" />;
  };

  return (
    <section className="container mx-auto py-16">
      {/* Header, Subtitle, and Primary Button */}
      <div className="flex justify-between items-center mb-10">
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

      {/* Bento Grid Layout for Features */}
      <div className="grid md:grid-cols-4 gap-4">
        {features && features.length > 0 && (
          features.map((feature, index) => (
            <div
              key={index}
              className={`relative p-4 rounded-lg h-64 flex justify-start items-end text-white bg-gray-800 bg-cover bg-center shadow-md ${
                index === 0 ? 'md:col-span-3' : index > 1 ? 'md:col-span-2' : ''
              }`}
              style={{
                backgroundImage: feature.image ? `url(${feature.image})` : 'none',
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 rounded-lg"></div>

              {/* Feature Content */}
              <div className="relative z-10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  {renderIcon(feature.icon)} {/* Render dynamic icon */}
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-sm">{feature.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default FeatureSlide4;