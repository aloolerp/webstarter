import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; // Assuming you're using Shadcn's Tabs component
import { useFrappeGetDocList } from 'frappe-react-sdk'; // React Frappe SDK

interface Service {
  name: string;
}

interface Project {
  name: string;
  category: string;
  description: string;
}

const ServiceTabs: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<string>('All');

  // Fetch services (Front Service Doctype)
  const { data: serviceData, error: serviceError } = useFrappeGetDocList<Service>('Front Service', { fields: ['name'] });

  // Fetch all projects (Front Project Doctype)
  const { data: projectData, error: projectError } = useFrappeGetDocList<Project>('Front Project', { fields: ['name', 'category', 'description'] });

  useEffect(() => {
    if (serviceData) {
      setServices(serviceData);
    }

    if (projectData) {
      setProjects(projectData);
      setFilteredProjects(projectData); // Initially show all projects
    }
  }, [serviceData, projectData]);

  const handleTabClick = (serviceName: string) => {
    setActiveTab(serviceName);
    if (serviceName === 'All') {
      setFilteredProjects(projects); // Show all projects if 'All' is selected
    } else {
      // Filter projects based on the selected service
      const filtered = projects.filter(project => project.category == serviceName);
      setFilteredProjects(filtered);
    }
  };

  if (serviceError || projectError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="w-full">
      {/* Tabs for services */}
      <Tabs value={activeTab} onValueChange={handleTabClick}>
        <TabsList>
          <TabsTrigger value="All">All</TabsTrigger>
          {services.map(service => (
            <TabsTrigger key={service.name} value={service.name}>
              {service.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab content showing the projects */}
        <TabsContent value={activeTab}>
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {filteredProjects.map(project => (
                <div key={project.name} className="p-4 border rounded shadow">
                  <h3 className="text-lg font-bold">{project.name}</h3>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4">No projects available for {activeTab}</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServiceTabs;
