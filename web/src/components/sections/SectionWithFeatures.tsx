import React from 'react';

// Define the props based on the provided JSON structure
interface Feature {
  idx: number;
  title: string;
  content: string;
  name: string;
  url?: string;   // Optional URL field
  icon?: string;  // Optional Icon field
}

interface DynamicFeatureProps {
  title: string;
  subtitle: string;
  columns: string;
  features: Feature[];
}

const SectionWithFeatures: React.FC<DynamicFeatureProps> = ({ title, subtitle, columns, features }) => {
  // Ensure columns is a valid number and default to 3 if not provided
  const columnsCount = parseInt(columns, 10) || 3;

  // Create dynamic grid class based on the columns value
  const gridClass = `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columnsCount} gap-6`;

  return (
    <section className="p-6">
      <div className="container">
        {/* Title and Subtitle */}
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-gray-500 mb-6">{subtitle}</p>

        {/* Features List */}
        <div className={gridClass}>
          {features.map((feature) => (
            <div key={feature.idx} className="p-4 rounded-lg shadow-md bg-white">
              {/* Icon */}
              {feature.icon && (
                <div className="mb-4">
                  <img src={feature.icon} alt={feature.title} className="w-12 h-12 object-cover rounded-full" />
                </div>
              )}

              {/* Title (with optional URL) */}
              {feature.url ? (
                <a href={feature.url} className="text-xl font-semibold mb-2 hover:underline">
                  {feature.title}
                </a>
              ) : (
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              )}

              {/* Content */}
              <p className="text-gray-600">{feature.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



export default SectionWithFeatures;
