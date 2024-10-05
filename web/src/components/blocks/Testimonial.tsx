"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { useFrappeGetDoc } from "frappe-react-sdk";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

interface FrontListItem {
  title?: string;
  content?: string;
  image?: string;
  primary_url?: string;
  primary_label?: string;
  author?: string;
  position?: string;
  rating?: number;
  slidesPerView: number; // Ensure this property is valid or replace it with a valid one
}

interface FrontListData {
  header: string;
  subtitle: string;
  items: FrontListItem[]; // Child table containing the list items
}

const Testimonial = ({
  frontListName = "Testimonial",
}: {
  frontListName?: string;
}) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | undefined>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Fetching the Front List document, including its child table (items)
  const { data: frontListData, error } = useFrappeGetDoc<FrontListData>(
    "Front List", // Doctype
    frontListName, // Document name (like "Projects")
    {
      filters: [["type", "=", "Testimonial"]],
      limit: 1,
      order_by: "creation desc",
    }
  );

  useEffect(() => {
    if (!carouselApi) return;

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };

    updateSelection();
    carouselApi.on("select", updateSelection);

    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  if (error)
    return (
      <div>
        <p>Error loading front list data.</p>
      </div>
    );

  return (
    <section className="py-32">
      <div className="container">
        {frontListData && (
          <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
            <div>
              <p className="mb-6 text-xs font-medium uppercase tracking-wider">
                {frontListData.header}
              </p>
              <h2 className="mb-3 text-xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
                {frontListData.subtitle}
              </h2>
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
        )}
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            loop: true, // Enable looping
            breakpoints: {
              "(max-width: 768px)": {
                // Use correct property or remove if not needed
              },
              "(min-width: 769px)": {
                // Use correct property or remove if not needed
              },
            },
          }}
        >
          <CarouselContent className="ml-[calc(theme(container.padding)-20px)] mr-[calc(theme(container.padding))] 2xl:ml-[calc(50vw-700px+theme(container.padding)-20px)] 2xl:mr-[calc(50vw-700px+theme(container.padding))]">
            {frontListData?.items.map((item, index) => (
              <CarouselItem key={index} className="pl-[20px] md:max-w-[452px]">
                <div className="group flex flex-col justify-between bg-white p-6 shadow-sm rounded-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(item.rating || 0)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-6 h-6 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-col items-start gap-2">
                    <div className="flex flex-col items-start">
                      <h3 className="text-lg font-bold text-gray-900">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col-2 gap-2 items-center">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-full"
                      />
                      <AvatarFallback className="flex items-center justify-center w-full h-full rounded-full bg-gray-200 text-gray-700">
                        {item.author?.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <p className="mt-2 font-semibold text-gray-700">
                        {item.author}
                      </p>
                      <p className="text-gray-700 ">{item.content}</p>
                      <p className="text-gray-700 ">{item.position}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};
export default Testimonial;