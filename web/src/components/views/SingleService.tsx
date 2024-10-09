import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFrappeGetDoc, useFrappeGetDocList } from 'frappe-react-sdk';
import * as LucideIcons from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Service {
  name: string;
  header: string;
  description: string;
  meta_image: string;
  icon: string;
  content: string;
}

interface Project {
  name: string;
  header: string;
  description: string;
}

const SingleService: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [activeTab, setActiveTab] = useState('main');
  const [activeChild, setActiveChild] = useState<string | null>(null);
  
  const { data: service, error, isLoading } = useFrappeGetDoc('Front Service', name as string);
  const { data: childServices } = useFrappeGetDocList('Front Service', {
    fields: ['name', 'header', 'description'],
    filters: [['parent_front_service', '=', name]],
  });
  const { data: projects } = useFrappeGetDocList('Front Project', {
    fields: ['name', 'header', 'description'],
    filters: [['category', '=', activeTab === 'main' ? name : activeTab]],
  });

  useEffect(() => {
    if (childServices && childServices.length > 0) {
      setActiveChild(childServices[0].name);
    }
  }, [childServices]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-64 w-full mb-8" />
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">Error loading service: {error.message}</div>;
  }

  const { header, description, meta_image, icon, content } = service as Service;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {meta_image && (
          <img src={meta_image} alt={header} className="w-full h-64 object-cover rounded-lg shadow-lg mb-8" />
        )}
        <h1 className="text-4xl font-bold mb-4 flex items-center">
          {icon && React.createElement(
            LucideIcons[icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle,
            { size: 36, className: "text-primary mr-4" }
          )}
          {header}
        </h1>
        <p className="text-xl text-muted-foreground mb-8">{description}</p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="main">Main Content</TabsTrigger>
            {childServices && childServices.map((childService: Service) => (
              <TabsTrigger key={childService.name} value={childService.name}>{childService.header}</TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="main">
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
            {projects && projects.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Related Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project: Project) => (
                    <div key={project.name} className="p-6 bg-white rounded-lg shadow-md">
                      <h4 className="text-lg font-semibold mb-2">{project.header}</h4>
                      <p className="text-gray-600">{project.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          {childServices && childServices.map((childService: Service) => (
            <TabsContent key={childService.name} value={childService.name}>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{childService.header}</h2>
                <p className="text-gray-600 mb-4">{childService.description}</p>
                <Link to={`/service/${childService.name}`} className="text-primary hover:underline">
                  Learn more about {childService.header}
                </Link>
              </div>
              
              {projects && projects.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Related Projects</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project: Project) => (
                      <div key={project.name} className="p-6 bg-white rounded-lg shadow-md">
                        <h4 className="text-lg font-semibold mb-2">{project.header}</h4>
                        <p className="text-gray-600">{project.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-12">
          <Button size="lg">Get Started</Button>
        </div>
      </div>
    </div>
  );
};

export default SingleService;