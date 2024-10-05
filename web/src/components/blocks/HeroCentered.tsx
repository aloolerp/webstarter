import React from 'react';
import { Button } from '../ui/button';

interface HeroCenteredProps {
  header?: string;
  subtitle?: string;
  primary_label?: string;
  primary_url?: string;
  secondary_label?: string;
  secondary_url?: string;
  image?: string;
}

const HeroCentered: React.FC<HeroCenteredProps> = ({
  header,
  subtitle,
  primary_label,
  primary_url,
  secondary_label,
  secondary_url,
  image,
}) => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden py-2 lg:py-2">
        <div className="container">
          {/* Header and Subtitle */}
          <div className="max-w-2xl text-center mx-auto">
            {header && (
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {header}
              </h1>
            )}
            {subtitle && (
              <p className="mt-3 text-xl text-muted-foreground">{subtitle}</p>
            )}
          </div>
           {/* Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            {primary_url && primary_label && (
              <a href={primary_url}>
                <Button variant="default">{primary_label}</Button>
              </a>
            )}
            {secondary_url && secondary_label && (
              <a href={secondary_url}>
                <Button variant="outline">{secondary_label}</Button>
              </a>
            )}
          </div>


          {/* Image */}
          <div className="mt-10 relative max-w-5xl mx-auto">
            {image && (
              <img
                src={image}
                className="rounded-xl"
                alt={header || 'Hero Image'}
              />
            )}

            {/* Decorative Elements */}
            <div className="absolute bottom-12 -start-20 -z-[1] w-48 h-48 bg-gradient-to-b from-primary-foreground via-primary-foreground to-background p-px rounded-lg">
              <div className="w-48 h-48 rounded-lg bg-background/10" />
            </div>
            <div className="absolute -top-12 -end-20 -z-[1] w-48 h-48 bg-gradient-to-t from-primary-foreground via-primary-foreground to-background p-px rounded-full">
              <div className="w-48 h-48 rounded-full bg-background/10" />
            </div>
          </div>

                 </div>
      </div>
      {/* End Hero Section */}
    </>
  );
};

export default HeroCentered;