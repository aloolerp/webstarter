import { useState, useEffect } from 'react';
import { useFrappeGetDocList } from 'frappe-react-sdk';


interface TabProject {
    header: string;
    subtitle: string;
    image: string;
    project_name: string;
}

interface ProjectTabsProps {
    header?: string;
    subtitle?: string;
    type?: string;  // The type field to determine if it's a Tabs section
}

const ProjectTabs = ({ header, subtitle, type }: ProjectTabsProps) => {
    const [activeTab, setActiveTab] = useState(0);
    const [tabProjects, setTabProjects] = useState<TabProject[]>([]);

    // Fetch projects with type 'Tabs'
    const { data: projects, error: projectsError } = useFrappeGetDocList<TabProject>('Front Project', {
        fields: ['project_name','header', 'subtitle', 'image'],
        filters: [['type', '=', 'Tabs']],
    });

    useEffect(() => {
        if (projects) {
            setTabProjects(projects);
        }
    }, [projects]);

    if (projectsError) return <p>Error fetching project tabs.</p>;
    if (!projects || projects.length === 0) return <p>No projects found.</p>;

    const currentProject = tabProjects[activeTab];

    return (
        <section className="relative  py-8">
             <h1 className="text-5xl font-bold text-gray-800">What we do</h1>
             <p className="text-gray-600 text-lg mt-2">Discover some of our most recent and innovative projects.</p>
            <div className="container mx-auto px-4">
                <div className="max-w-xl mb-8">
                    {header && <h2 className="text-3xl font-bold sm:text-4xl">{header}</h2>}
                    {subtitle && <p className="mt-4 text-gray-300">{subtitle}</p>}
                </div>

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
                                    {project.project_name}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {currentProject && (
                    <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
                        {currentProject.image && (
                            <div className="sm:w-2/3">
                                <img src={currentProject.image} alt={currentProject.header} className="rounded-lg w-full h-auto object-cover" />
                            </div>
                        )}
                        <div className="sm:w-2/3">
                            <h3 className="text-xl font-bold mb-4">{currentProject.header}</h3>
                            <p className="text-gray-300">{currentProject.subtitle}</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectTabs;