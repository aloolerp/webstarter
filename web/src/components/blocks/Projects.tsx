import React, { useEffect, useState } from 'react';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Update the Project interface
interface Project {
  header: string;
  description: string;
  meta_image: string;
  route: string;
  remark: string;
  category: string; // Add category field
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');

  const { data, error, isLoading } = useFrappeGetDocList('Front Project', {
    filters: [['published', '=', 1]],
    fields: ['header', 'description', 'meta_image', 'route', 'remark', 'category'], // Add category to fields
    orderBy: {
      field: 'creation',
      order: 'asc',
    },
  });

  useEffect(() => {
    if (data) {
      setProjects(data as Project[]);
      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(data.map((project: Project) => project.category))];
      setCategories(uniqueCategories);
    }
    if (error) {
      console.error('Error fetching projects:', error);
    }
  }, [data, error]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore Our Projects</h1>
        <p className="text-base text-muted-foreground">Discover our latest and greatest projects. Innovative solutions for real-world challenges.</p>
      </div>

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

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: visibleCount }).map((_, index) => (
            <Skeleton key={index} className="h-56 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.slice(0, visibleCount).map((project) => (
            <Card key={project.route} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative pt-[60%] overflow-hidden rounded-t-lg">
                  <img
                    src={project.meta_image}
                    alt={project.header}
                    className="absolute inset-0 object-cover w-full h-full hover:scale-105 transition-transform"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl font-semibold mb-2">{project.header}</CardTitle>
                <p className="text-sm mb-3 line-clamp-3">{project.description}</p>
              </CardContent>
              <CardFooter className="p-4">
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link to={project.route} className="flex items-center text-base">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {visibleCount < filteredProjects.length && !isLoading && (
        <div className="flex justify-center mt-6">
          <Button variant="outline" onClick={handleShowMore}>
            Show More
          </Button>
        </div>
      )}
    </div>
  );
};

export default Projects;