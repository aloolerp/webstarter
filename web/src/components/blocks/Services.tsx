import React, { useEffect, useState } from 'react';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Define the Service interface
interface Service {
  header: string;
  description: string;
  meta_image: string;
  route: string;
  remark: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);

  const { data, error, isLoading } = useFrappeGetDocList('Front Service', {
    filters: [['published', '=', 1]],
    fields: ['header', 'description', 'meta_image', 'route', 'remark'],
    orderBy: {
      field: 'creation',
      order: 'asc',
    },
  });

  useEffect(() => {
    if (data) {
      setServices(data as Service[]);
    }
    if (error) {
      console.error('Error fetching services:', error);
    }
  }, [data, error]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Load 6 more services when "Show More" is clicked
  };

  return (
    <div className="p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore Our Services</h1>
        <p className="text-base text-muted-foreground">Discover the best services we have to offer. Tailored to meet your needs.</p>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: visibleCount }).map((_, index) => (
            <Skeleton key={index} className="h-56 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, visibleCount).map((service) => (
            <Card key={service.route} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative pt-[60%] overflow-hidden rounded-t-lg">
                  <img
                    src={service.meta_image}
                    alt={service.header}
                    className="absolute inset-0 object-cover w-full h-full hover:scale-105 transition-transform"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl font-semibold mb-2">{service.header}</CardTitle>
                <p className="text-sm mb-3 line-clamp-3">{service.description}</p>
              </CardContent>
              <CardFooter className="p-4">
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link to={service.route} className="flex items-center text-base">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {visibleCount < services.length && !isLoading && (
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
