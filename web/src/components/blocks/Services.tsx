import React, { useEffect, useState } from "react";
import { useFrappeGetDocList } from "frappe-react-sdk";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as LucideIcons from "lucide-react";

// Define the Service interface
interface Service {
  name: string;
  header: string;
  description: string;
  meta_image: string;
  route: string;
  remark: string;
  parent_front_service: string;
  icon: string;
}

// Define the ServicesProps interface
interface ServicesProps {
  show_tabs: "0" | "1";
  use_icons: "0" | "1";
}

const Services: React.FC<ServicesProps> = ({ show_tabs, use_icons }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const { data, error, isLoading } = useFrappeGetDocList("Front Service", {
    filters: [["published", "=", 1]],
    fields: [
      "name",
      "header",
      "description",
      "meta_image",
      "route",
      "remark",
      "parent_front_service",
      "icon",
    ],
    orderBy: {
      field: "creation",
      order: "asc",
    },
  });

  useEffect(() => {
    if (data) {
      setServices(data as Service[]);
      // Extract unique categories
      const uniqueCategories = [
        "All",
        ...new Set(
          data
            .map((service: Service) => service.parent_front_service)
            .filter(Boolean)
        ),
      ];
      setCategories(uniqueCategories);
    }
    if (error) {
      console.error("Error fetching services:", error);
    }
  }, [data, error]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const filteredServices =
    show_tabs === "0"
      ? services
      : activeCategory === "All"
      ? services
      : services.filter(
          (service) => service.parent_front_service === activeCategory
        );

  return (
    <div className="p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore Our Services</h1>
        <p className="text-base text-muted-foreground">
          Discover the best services we have to offer. Tailored to meet your
          needs.
        </p>
      </div>

      {show_tabs == "1" && categories.length > 1 && (
        <Tabs defaultValue="All" className="mb-6">
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: visibleCount }).map((_, index) => (
            <Skeleton key={index} className="h-56 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.slice(0, visibleCount).map((service) => (
            <Card
              key={service.route}
              className="hover:shadow-lg transition-shadow overflow-hidden"
            >
              <CardHeader className="p-6">
                {use_icons == "1" && service.icon ? (
                  <div className="flex flex-col items-left mb-2">
                    {React.createElement(
                      LucideIcons[service.icon as keyof typeof LucideIcons] ||
                        LucideIcons.HelpCircle,
                      { size: 32, className: "text-primary mb-2" }
                    )}
                    <CardTitle className="text-xl font-semibold">
                      {service.header}
                    </CardTitle>
                  </div>
                ) : (
                  <>
                    {service.meta_image && (
                      <img
                        src={service.meta_image}
                        alt={service.header}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <CardTitle className="text-xl font-semibold mb-3">
                      {service.header}
                    </CardTitle>
                  </>
                )}
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {service.description}
                </p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button
                  variant="link"
                  asChild
                  className="p-0 h-auto hover:no-underline"
                >
                  <Link
                    to={`/service/${service.name}`}
                    className="flex items-center text-base text-primary"
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {visibleCount < filteredServices.length && !isLoading && (
        <div className="flex justify-center mt-6">
          <Button variant="outline" onClick={handleShowMore}>
            Show More
          </Button>
        </div>
      )}
    </div>
  );
};

export default Services;
