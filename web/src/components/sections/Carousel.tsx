import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel as ShadcnCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CarouselProps {
  title?: string;
  subtitle?: string;
  columns?: number; // Number of visible columns
  items?: {
    title: string;
    content: string;
    icon?: string;
    image?: string;
  }[];
}

const Carousel: React.FC<CarouselProps> = ({ title, subtitle,  items }) => {
  return (
    <div className="py-10 relative">
      {/* Title and Subtitle */}
      {title && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">{subtitle}</p>
        </div>
      )}

      {/* Carousel */}
      {items && (
        <ShadcnCarousel className="w-full relative">
          <CarouselContent className="-ml-1">
            {items.map((item, index) => (
              // <CarouselItem key={index} className={`pl-1 md:basis-1/${columns} lg:basis-1/${columns}`}>
              <CarouselItem key={index} className={`pl-1 md:basis-1/3 lg:basis-1/3`}>
                <div className="p-1">
                  <Card>
                    <CardContent className="p-4">
                      {/* Image */}
                      {item.image && (
                        <div className="mb-4">
                          <img src={item.image} alt={item.title} className="w-full h-60 object-cover rounded-lg" />
                        </div>
                      )}

                      {/* Icon */}
                      {item.icon && (
                        <div className="flex justify-center mb-4">
                          <img src={item.icon} alt={item.title} className="w-12 h-12 object-contain" />
                        </div>
                      )}

                      {/* Title */}
                      {item.title && (
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                      )}

                      {/* Content */}
                      {item.content && (
                        <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Carousel Previous and Next Buttons */}
          <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2" />
          <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2" />
        </ShadcnCarousel>
      )}
    </div>
  );
};

export default Carousel;
