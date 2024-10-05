import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

// Dynamic icon loader function
const loadIcon = async (iconName: string) => {
  try {
    const { [iconName]: ImportedIcon } = await import("lucide-react");
    return ImportedIcon;
  } catch (error) {
    console.error(`Icon "${iconName}" not found.`, error);
    return null;
  }
};

interface HeroWithFeaturesItemProps {
  title?: string;
  icon?: string;
}

interface HeroWithFeaturesProps {
  header?: string;
  subtitle?: string;
  image?: string;
  image_position?: "Right" | "Left";
  primary_label?: string;
  primary_url?: string;
  items?: Array<HeroWithFeaturesItemProps>;
}

const HeroWithFeatures: React.FC<HeroWithFeaturesProps> = ({
  header,
  subtitle,
  image,
  image_position = "Right", // default to "Right"
  primary_label,
  primary_url,
  items,
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0">
      {/* Conditionally position the image based on image_position */}
      {image_position === "Left" && image && (
        <div className="lg:w-1/2">
          <img
            src={image}
            alt="Feature image"
            className="max-w-full h-auto "
          />
        </div>
      )}

      <div className="lg:w-1/2 space-y-6">
        {header && <h1 className="text-3xl font-bold">{header}</h1>}
        {subtitle && <p className="text-xl text-gray-600">{subtitle}</p>}

        <div className="mb-8">
          {items &&
            items.map((item, idx) => (
              <FeatureItem key={idx} title={item.title} icon={item.icon} />
            ))}
        </div>

        {primary_url && primary_label && (
          <a href={primary_url}>
            <Button variant="default">{primary_label}</Button>
          </a>
        )}
      </div>

      {image_position === "Right" && image && (
        <div className="lg:w-1/2">
          <img
            src={image}
            alt="Feature image"
            className="max-w-full h-auto"
          />
        </div>
      )}
    </div>
  );
};

// Feature item with dynamic icon loading
const FeatureItem: React.FC<HeroWithFeaturesItemProps> = ({ title, icon }) => {
  const [IconComponent, setIconComponent] = useState<React.ElementType | null>(
    null
  );

  useEffect(() => {
    if (icon) {
      loadIcon(icon).then((icon) => setIconComponent(() => icon));
    }
  }, [icon]);

  return (
    <div className="flex items-center space-x-2 mb-8">
      {IconComponent && (
        <IconComponent className="w-6 h-6 text-primary" aria-hidden="true" />
      )}
      {title && <p className="text-lg font-medium">{title}</p>}
    </div>
  );
};

export default HeroWithFeatures;