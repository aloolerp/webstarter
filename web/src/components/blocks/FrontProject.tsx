import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import { Button } from '../ui/button';

interface FrontProject {
    header: string;
    subtitle: string;
    published_on: string;
    category: string;
    route: string;
    image: string;
    designer: string;
    featured: 0 | 1;
    name: string;
}

const FrontProject = () => {
    const [frontProject, setFrontProject] = useState<FrontProject[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<FrontProject[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeCategory, setActiveCategory] = useState('All');
    const projectsPerPage = 6;
    const navigate = useNavigate();

    // Fetch published projects
    const { data: projects, error: projectsError } = useFrappeGetDocList<FrontProject>('Front Project', {
        fields: ['name', 'header', 'subtitle', 'published_on', 'category', 'route', 'image', 'designer', 'featured'],
        filters: [['published', '=', 1]],  // Fetch only published projects
    });

    useEffect(() => {
        if (projects) {
            // Separate featured project and sort the rest by published date
            const sortedProjects = [...projects].sort((a, b) => b.featured - a.featured || new Date(b.published_on).getTime() - new Date(a.published_on).getTime());
            setFrontProject(sortedProjects);
            setFilteredProjects(sortedProjects);
        }
    }, [projects]);

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
        if (category === 'All') {
            setFilteredProjects(frontProject);
        } else {
            setFilteredProjects(frontProject.filter(project => project.category === category));
        }
        setCurrentPage(1); // Reset to the first page when category changes
    };

    // Calculate the current projects to display based on pagination
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    if (projectsError) return <p>Error fetching Projects</p>;

    // Get unique categories for tabs
    const categories = ['All', ...new Set(frontProject.map(project => project.category))];

    return (
        <section>
            <div className="container mx-auto">
            <div className="text-center mb-20 p-10 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                    <h1 className="text-5xl font-bold text-gray-800">Our Recent Projects</h1>
                    <p className="text-gray-600 text-lg mt-2">Discover some of our most recent and innovative projects.</p>
                </div>
                {/* Tabs for Categories */}
                <div className="mb-14 border-b border-gray-200">
                    <nav className="flex space-x-4 overflow-x-auto">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => handleCategoryChange(category)}
                                className={`px-3 py-2 text-sm font-medium ${
                                    activeCategory === category ? 'text-primary border-b-2 border-primary' : 'text-gray-500'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </nav>
                </div>

               

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentProjects.map((project, index) => (
                        <article
                            key={index}
                            className="relative overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105"
                        >
                            {project.image && (
                                <img
                                    src={project.image}
                                    alt={project.header}
                                    className="absolute inset-0 h-full w-full object-cover"
                                    
                                />
                            )}
                            <div className="relative bg-gradient-to-t from-gray-900/60 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
                                <div className="p-4 sm:p-6">
                                    <time className="block text-xs text-white/90">
                                        {new Date(project.published_on).toLocaleDateString()}
                                    </time>
                                    <a href="#" onClick={() => navigate(`/web/projects/${project.name}`)}>
                                        <h3 className="mt-0.5 font-semibold text-lg text-white hover:text-primary">{project.header}</h3>
                                    </a>
                                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-white/95">
                                        {project.subtitle}
                                    </p>
                                    <span className="p-4 text-xs bg-white/50 text-black px-2 py-1 rounded-full">{project.category}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="mt-28 mb-20 flex justify-center items-center">
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <span className="mx-4 text-lg text-gray-800">
                        {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default FrontProject;