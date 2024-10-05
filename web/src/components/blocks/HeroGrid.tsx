import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface HeroGridProps {
  header?: string;
  tagline?: string;
  subtitle?: string;
  primary_label?: string;
  secondary_label?: string;
  secondary_url?: string;
  primary_url?: string;
  image?: string;
  image1?: string;
  image2?: string;
}

const HeroGrid = ({
  header,
  tagline,
  subtitle,
  primary_label,
  secondary_label,
  secondary_url,
  primary_url,
  image,
  image1,
  image2,
}: HeroGridProps) => {
  return (
    <div className="w-full ">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
          <div className="flex gap-4 flex-col">
            {/* Badge */}
            {tagline && (
              <div>
                <Badge variant="outline">{tagline}</Badge>
              </div>
            )}

            {/* Header and Subtitle */}
            <div className="flex gap-4 flex-col">
              {header && (
                <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
                  {header}
                </h1>
              )}
              {subtitle && (
                <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-row gap-4">
              {secondary_url && secondary_label && (
                <a href={secondary_url}>
                  <Button size="lg" className="gap-4" variant="outline">
                    {secondary_label} <PhoneCall className="w-4 h-4" />
                  </Button>
                </a>
              )}
              {primary_url && primary_label && (
                <a href={primary_url}>
                  <Button size="lg" className="gap-4">
                    {primary_label} <MoveRight className="w-4 h-4" />
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-8">
            {image && (
              <div className="bg-muted rounded-md aspect-square">
                <img src={image} alt="Hero Image" className="w-full h-full object-cover rounded-md" />
              </div>
            )}
            {image1 && (
              <div className="bg-muted rounded-md row-span-2">
                <img src={image1} alt="Hero Image 1" className="w-full h-full object-cover rounded-md" />
              </div>
            )}
            {image2 && (
              <div className="bg-muted rounded-md aspect-square">
                <img src={image2} alt="Hero Image 2" className="w-full h-full object-cover rounded-md" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroGrid;