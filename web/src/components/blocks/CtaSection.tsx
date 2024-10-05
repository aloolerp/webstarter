import React from 'react';
import { Button } from "../ui/button"; // Import your button component

interface CtaSectionProps {
  title?: string;
  highlighted?: string;
  description?: string;
  primary_label?: string;
  primary_url?: string;
  secondary_label?: string;
  secondary_url?: string;
  image?: string;
}

const CtaSection: React.FC<CtaSectionProps> = ({
  title,
  highlighted,
  description,
  primary_label,
  primary_url,
  secondary_label,
  secondary_url,
  image,
}) => {
  return (
    <section className="bg-gray-50 py-16 px-4 lg:py-24">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
        
        {/* Text Section */}
        <div className="max-w-lg lg:max-w-md">
          {highlighted && (
            <h2 className="text-lg font-semibold text-primary mb-2">
              {highlighted}
            </h2>
          )}
          {title && (
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-lg text-gray-600 mb-6">
              {description}
            </p>
          )}

          {/* Buttons */}
          <div className="flex space-x-4">
            {primary_url && primary_label && (
              <a href={primary_url}>
                <Button className="bg-primary text-white">
                  {primary_label}
                </Button>
              </a>
            )}
            {secondary_url && secondary_label && (
              <a href={secondary_url}>
                <Button variant="outline">{secondary_label}</Button>
              </a>
            )}
          </div>
        </div>

        {/* Image Section */}
        {image && (
          <div className="w-full lg:w-1/2">
            <img
              src={image}
              alt={title}
              className="rounded-lg object-cover shadow-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default CtaSection;