import { useEffect, useState } from 'react';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Interface for the component props
interface AloolPagesProps {
  doctype: string;
  heading: string;
  subheading: string;
  path: string;
  
}

// Interface for the generic page content
interface PageContent {
  name: string;
  header: string;
  description: string;
  meta_image: string;
  route: string;
  category: string;
  [key: string]: unknown; // Allow for additional fields
}

const AloolPages = ({ doctype, heading, subheading, path }: AloolPagesProps) => {
  const [pages, setPages] = useState<PageContent[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');

  const { data, error, isLoading } = useFrappeGetDocList<PageContent>(doctype, {
    filters: [['published', '=', 1]],
    fields: ['name', 'header', 'description', 'meta_image', 'route', 'category'],
    orderBy: {
      field: 'creation',
      order: 'asc',
    },
  });

  useEffect(() => {
    if (data) {
      setPages(data);
      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(data.map(page => page.category).filter(Boolean))];
      setCategories(uniqueCategories);
    }
    if (error) {
      console.error(`Error fetching ${doctype} pages:`, error);
    }
  }, [data, error, doctype]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const filteredPages = activeCategory === 'All'
    ? pages
    : pages.filter(page => page.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{heading}</h1>
        <p className="text-base text-muted-foreground">{subheading}</p>
      </div>

      {categories.length > 1 && (
        <Tabs defaultValue="All" className="mb-6">
          <TabsList>
            {categories.map(category => (
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
          {filteredPages.slice(0, visibleCount).map((page) => (
            <Card key={page.name} className="flex flex-col">
              {page.meta_image && (
                <img src={page.meta_image} alt={page.header} className="w-full h-48 object-cover rounded-t-lg" />
              )}
              <CardHeader>
                <CardTitle>{page.header}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{page.description}</p>
              </CardContent>
              <CardFooter>
                <Link to={`/${path}/${page.name}?doctype=${encodeURIComponent(doctype)}`} className="inline-flex items-center">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {visibleCount < filteredPages.length && !isLoading && (
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