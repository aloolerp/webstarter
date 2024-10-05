import { useEffect, useState } from "react";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "../ui/carousel";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Testimonial1Props {
  header?: string;
  subtitle?: string;
  items?: Array<Testimonial1ItemProps>;
}

interface Testimonial1ItemProps {
  title?: string;
  content?: string;
  author?: string;
  image?: string;
}

const Testimonial1 = ({ header, subtitle, items }: Testimonial1Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const autoScroll = setInterval(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent((prev) => prev + 1);
      }
    }, 4000);

    return () => clearInterval(autoScroll);
  }, [api]);

  return (
    <div className="w-full ">
      <div className=" mx-auto">
        <div className="flex flex-col gap-10">
          {/* Header */}
          {header && (
            <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
              {header}
            </h2>
          )}

          {/* Subtitle */}
          {subtitle && (
            <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
              {subtitle}
            </p>
          )}

          {/* Carousel for testimonials */}
          {items && items.length > 0 && (
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {items.map((item, index) => (
                  <CarouselItem className="lg:basis-1/2" key={index}>
                    <div className="bg-muted rounded-md h-full lg:col-span-2 p-6 aspect-video flex justify-between flex-col">
                      {/* Avatar or Default Icon */}
                      {item.image ? (
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={item.image} />
                          <AvatarFallback>{item.author?.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <User className="w-8 h-8 stroke-1" />
                      )}

                      <div className="flex flex-col gap-4">
                        {/* Title */}
                        {item.title && (
                          <h3 className="text-xl tracking-tight">
                            {item.title}
                          </h3>
                        )}

                        {/* Content */}
                        {item.content && (
                          <p className="text-muted-foreground max-w-xs text-base">
                            {item.content}
                          </p>
                        )}

                        {/* Author */}
                        {item.author && (
                          <p className="flex flex-row gap-2 text-sm items-center">
                            <span className="text-muted-foreground">By</span>
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={item.image} />
                              <AvatarFallback>{item.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{item.author}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonial1;