import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/button';

interface SlidesProps {
  doctype: string; // Doctype to fetch records from
  fields: Array<{
    fieldname: string;
    type: 'Header' | 'Subtitle' | 'Category' | 'Image'; // Field type selection
  }>;
}

const Slides = ({ doctype, fields }: SlidesProps) => {
  const [items, setItems] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Determine which fields to fetch based on the user's configuration
  const fieldNames = fields.map(field => field.fieldname);

  // Fetch records dynamically based on the selected doctype
  const { data: records, error } = useFrappeGetDocList<any>(doctype, {
    fields: [...fieldNames, 'name'], // Fetch all specified fields and 'name' for navigation
    filters: [['published', '=', 1]], // Assuming there's a 'published' field to filter published records
  });

  useEffect(() => {
    if (records && records.length > 0) {
      setItems(records);
    }
  }, [records]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [items.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  // Helper function to get field values based on type
  const getFieldValue = (item: any, type: string) => {
    const field = fields.find(f => f.type === type);
    return field ? item[field.fieldname] : '';
  };

  if (error) return <p>Error loading data from {doctype}.</p>;

  return (
    <div className="relative w-full h-[700px] mx-auto">
      <div className="relative h-full">
        {items.length > 0 && (
          <>
            {items.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                {/* Image */}
                <img
                  src={getFieldValue(item, 'Image')}
                  alt={getFieldValue(item, 'Header')}
                  className="w-full h-full object-cover"
                />

                {/* Overlay with Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
                  <div className="md:p-32 text-white space-y-4">
                    {/* Header */}
                    <h2 className="text-3xl sm:text-4xl font-bold">
                      {getFieldValue(item, 'Header')}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg sm:text-xl">
                      {getFieldValue(item, 'Subtitle')}
                    </p>

                    {/* Button to view details */}
                    <Button
                      variant="link"
                      onClick={() => navigate(`/web/projects/${item.name}`)}
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

      {items.length > 1 && (
        <>
          {/* Navigation Arrows */}
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

          {/* Dots for current slide */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
            {items.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-400 ${
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

export default Slides;