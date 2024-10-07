import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import FilterComponent from '../blocks/FilterComponent';

const FrontService = () => {
    const navigate = useNavigate();

    return (
        <section className="py-16">
            <div className="container mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold">Our Latest Services</h1>
                    <p className="text-gray-500 text-lg">Discover some of our most recent and innovative services.</p>
                </div>

                {/* Render Prop pattern */}
                <FilterComponent
                    doctype="Front Service"
                    add_sort={true}
                    filters={[
                        { search_field: 'header', type: 'Data' },
                        // { search_field: 'subtitle', type: 'Data' },
                        { search_field: 'category', type: 'Select', options: 'Web Development,Design,Consulting' },
                      
                    ]}
                    display_fields={['subtitle', 'image', 'route']} 
                >
                    {(filteredServices) => (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                            {filteredServices.map((service, index) => (
                                <div
                                    key={index}
                                    className={`p-4 border rounded-lg shadow-lg bg-white ${service.featured ? 'lg:col-span-2 lg:row-span-2' : ''}`}
                                >
                                    {service.image && (
                                        <img
                                            src={service.image}
                                            alt={service.header}
                                            className={`mb-4 w-full object-cover ${service.featured ? 'h-64' : 'h-40'} rounded-t-lg`}
                                        />
                                    )}
                                    <div className="px-4 py-2">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{service.category}</span>
                                        </div>
                                        <h2 className="text-xl font-semibold mt-2 mb-1">{service.header}</h2>
                                        <p className="text-gray-600 mb-2">{service.subtitle}</p>
                                        <div className="flex items-center">
                                            <Button variant="link" onClick={() => navigate(`/web/service/${service.name}`)}>View</Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </FilterComponent>
            </div>
        </section>
    );
};

export default FrontService;