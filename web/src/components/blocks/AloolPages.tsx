import { useEffect, useState } from 'react';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';


// Define the AloolPage interface
interface AloolPage {
  doctype: string;
  name: string;
  heading: string;
  subheading: string;
  header: string;
  description: string;
  meta_image: string;
  route: string;
  path: string;
  remark: string;
}

const AloolPages = ({ doctype, path, heading, subheading }: { doctype: string; path: string, heading: string, subheading: string }) => {
  const [pages, setPages] = useState<AloolPage[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);


  const { data, error, isLoading } = useFrappeGetDocList<AloolPage>(doctype, {
    filters: [['published', '=', 1]],
    fields: ['*'],
    orderBy: {
      field: 'creation',
      order: 'asc',
    },
  });

  useEffect(() => {
    if (data) {
      setPages(data as AloolPage[]);
    }
    if (error) {
      console.error('Error fetching Alool pages:', error);
    }
  }, [data, error]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{heading}</h1>
        <p className="text-base text-muted-foreground">{subheading}</p>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: visibleCount }).map((_, index) => (
            <Skeleton key={index} className="h-56 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pages.slice(0, visibleCount).map((page) => (
            <Card key={page.route} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative pt-[60%] overflow-hidden rounded-t-lg">
                  <img
                    src={page.meta_image}
                    alt={page.header}
                    className="absolute inset-0 object-cover w-full h-full hover:scale-105 transition-transform"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl font-semibold mb-2">{page.header}</CardTitle>
                <p className="text-sm mb-3 line-clamp-3">{page.description}</p>
              </CardContent>
              <CardFooter className="p-4">
              <Button variant="link" asChild className="p-0 h-auto">
                  <Link 
                    to={`/${path}/${page.name}?doctype=${encodeURIComponent(doctype)}`} 
                    className="flex items-center text-base"
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {visibleCount < pages.length && !isLoading && (
        <div className="flex justify-center mt-6">
          <Button variant="outline" onClick={handleShowMore}>
            Show More
          </Button>
        </div>
      )}
    </div>
  );
};

export default AloolPages;