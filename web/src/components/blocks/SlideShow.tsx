import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/button';

interface FrontService {
  header: string;
  subtitle: string;
  category: string;
  image: string;
  name: string;
}

const SlideShow = () => {
  const [services, setServices] = useState<FrontService[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Fetch the services from the Front Service doctype
  const { data: serviceData, error } = useFrappeGetDocList<FrontService>('Front Service', {
    fields: ['header', 'subtitle', 'category', 'image', 'name'],
    filters: [['published', '=', 1]], // Assuming there's a 'published' field to filter published services
  });

  useEffect(() => {
    if (serviceData && serviceData.length > 0) {
      setServices(serviceData);
    }
  }, [serviceData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === services.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [services.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  if (error) return <p>Error loading services data.</p>;

  return (
    <div className="relative w-full h-[700px] mx-auto">
      <div className="relative h-full">
        {services.length > 0 && (
          <>
            {services.map((service, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={service.image}
                  alt={service.header}
                  className="w-full h-full object-cover"
                />
                <div className="absolute  inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
                  <div className=" md:p-32 text-white  space-y-4">
                    <h2 className="text-3xl  sm:text-4xl font-bold">{service.header}</h2>
                    <p className="text-lg  sm:text-xl">{service.subtitle}</p>
                    <Button
                      variant="link"
                      onClick={() => navigate(`/web/service/${service.name}`)}
                      className="bg-primary text-white px-6 py-2 rounded-md shadow hover:bg-primary"
                    >
                      View
                      <ArrowUpRight className='w-4' />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {services.length > 1 && (
        <>
          <div className="absolute bottom-4 right-4 flex items-center space-x-2 z-20">
            <button
              onClick={handlePrevSlide}
              className="bg-white bg-opacity-75 hover:bg-opacity-100 text-primary p-2 m-4 rounded-full shadow"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextSlide}
              className="bg-white bg-opacity-75 hover:bg-opacity-100 text-primary p-2 rounded-full shadow"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
            {services.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2  rounded-full transition-all duration-400 ${
                  index === currentSlide ? 'bg-primary w-6' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SlideShow;