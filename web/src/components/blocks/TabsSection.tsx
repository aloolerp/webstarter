import { useState, useEffect } from 'react';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@radix-ui/react-icons';

interface TabProject {
  [key: string]: any;  // Making the fields dynamic
}

interface ProjectTabsProps {
  doctype: string;  // The dynamic doctype to fetch data from
  header?: string;
  subtitle?: string;
  route?: string;
  fields: Array<{
    fieldname: string;
    type: 'Title' | 'Content' | 'Image';  // Field type to identify how to render
  }>;
}

const TabsSection = ({ doctype, header, subtitle, route, fields }: ProjectTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabProjects, setTabProjects] = useState<TabProject[]>([]);

  // Extract the field names that need to be fetched from the doctype
  const fieldNames = fields.map(field => field.fieldname);

  // Fetch projects based on the provided dynamic doctype and fields
  const { data: projects, error: projectsError } = useFrappeGetDocList<TabProject>(doctype, {
    fields: ['name', ...fieldNames],  // Fetch all dynamic fields
    filters: [['tab', '=', 1]],  // Assuming 'tab' field exists in the doctype
  });

  useEffect(() => {
    if (projects) {
      setTabProjects(projects);
    }
  }, [projects]);

  if (projectsError) return <p>Error fetching project tabs.</p>;
  if (!projects || projects.length === 0) return <p>No projects found.</p>;

  const currentProject = tabProjects[activeTab];

  // Function to get the value of a specific field type
  const getFieldValue = (item: TabProject, type: string) => {
    const field = fields.find(f => f.type === type);
    return field ? item[field.fieldname] : '';
  };

  return (
    <section className="relative py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mb-8">
          {header && <h2 className="text-3xl font-bold sm:text-4xl">{header}</h2>}
          {subtitle && <p className="mt-4 text-gray-600">{subtitle}</p>}
        </div>

        {/* Tabs Navigation */}
        <div className="mb-4">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-6" aria-label="Tabs">
              {tabProjects.map((project, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`inline-flex items-center gap-2 px-1 pb-4 text-sm font-medium text-gray-500 ${
                    activeTab === index ? 'border-b-2 border-primary text-primary' : 'hover:text-gray-700'
                  }`}
                >
                  {project.header || `Tab ${index + 1}`}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Dynamic Project Content */}
        {currentProject && (
          <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
            {/* Image Field */}
            {getFieldValue(currentProject, 'Image') && (
              <div className="sm:w-2/3">
                <img
                  src={getFieldValue(currentProject, 'Image')}
                  alt={getFieldValue(currentProject, 'Title')}
                  className="rounded-lg w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Title and Content Fields */}
            <div className="sm:w-2/3">
              {getFieldValue(currentProject, 'Title') && (
                <h3 className="text-xl font-bold mb-4">{getFieldValue(currentProject, 'Title')}</h3>
              )}
              {getFieldValue(currentProject, 'Content') && (
                <p className="text-gray-300">{getFieldValue(currentProject, 'Content')}</p>
              )}
              {route && currentProject.name && (
                <Link 
                  to={`${route}/${currentProject.name}`}
                  className="mt-4 inline-block  py-2 hover:text-primary transition-colors"
                >
                  View Project <ArrowRightIcon className="w-4 h-4 inline-block" />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TabsSection;