import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import type { CarouselApi } from '../ui/carousel';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

interface GallerySectionProps {
  header?: string;
  tagline?: string;
  primary_label?: string;
  primary_url?: string;
  items?: Array<GallerySectionItemProps>;
}

interface GallerySectionItemProps {
  title?: string;
  content?: string;
  image?: string;
  link_label?: string;
  link_url?: string;
}

const GallerySection = ({ header, tagline, primary_label, primary_url, items }: GallerySectionProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) return;

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };

    updateSelection();
    carouselApi.on('select', updateSelection);

    return () => {
      carouselApi.off('select', updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="py-32">
      <div className="container">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div>
            {tagline && (
              <div className="mb-6 text-xs font-medium uppercase tracking-wider text-muted">
                {tagline}
              </div>
            )}
            {header && (
              <h2 className="mb-3 text-xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
                {header}
              </h2>
            )}
            {primary_url && primary_label && (
              <a
                href={primary_url || '#'}
                className="group flex items-center text-xs font-medium md:text-base lg:text-lg"
              >
                 {primary_label}
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </a>
            )}
          </div>
          <div className="mt-8 flex shrink-0 items-center justify-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              '(max-width: 768px)': {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-[calc(theme(container.padding)-20px)] mr-[calc(theme(container.padding))] 2xl:ml-[calc(50vw-700px+theme(container.padding)-20px)] 2xl:mr-[calc(50vw-700px+theme(container.padding))]">
            {items?.map((item, idx) => (
              <CarouselItem key={idx} className="pl-[20px] md:max-w-[452px]">
                <a
                  href={item.link_url || '#'}
                  className="group flex flex-col justify-between"
                >
                  <div>
                    {item.image && (
                      <div className="flex aspect-[3/2] text-clip rounded-xl">
                        <div className="flex-1">
                          <div className="relative size-full origin-bottom transition duration-300 group-hover:scale-105">
                            <img
                              src={item.image}
                              alt={item.title || 'Gallery Image'}
                              className="size-full object-cover object-center"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {item.title && (
                    <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
                      {item.title}
                    </div>
                  )}
                  {item.content && (
                    <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
                      {item.content}
                    </div>
                  )}
                  {item.link_label && (
                    <div className="flex items-center text-sm">
                      {item.link_label}
                      <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  )}
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default GallerySection;