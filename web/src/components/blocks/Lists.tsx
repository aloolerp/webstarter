
import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button'; // Assume ShadCN UI Button
import { useFrappeGetDocList } from 'frappe-react-sdk';

interface ListsProps {
    doctype: string;
    title?: string;
    subtitle?: string;
    columns?: number; // Number of columns for grid layout
    has_pagination?: boolean; // Toggle pagination
    pagination_limit?: number; // Limit for items per page
    fields: Array<ListsItemProps>; // Fields for list and detail views
    has_view?: boolean; // Check if view button should be added
    base_route?: string; // Base route for view button (e.g., /web/projects)
}

interface ListsItemProps {
    fieldname: string;
    type: 'Title' | 'Subtitle' | 'Image' | 'Link' | 'Icon'; // Field type options
    show: 'List' | 'Detail' | 'Both'; // Where to show the field
}

const Lists = ({
    doctype,
    title,
    subtitle,
    columns = 3,
    has_pagination = false,
    pagination_limit = 5,
    fields,
    has_view = false,
    base_route = ''
}: ListsProps) => {
    const navigate = useNavigate();
    const [docs, setDocs] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    // Ensure 'name' field is always fetched along with other fields
    const { data, error, isLoading } = useFrappeGetDocList(doctype, {
        fields: ['name', ...fields.map(field => field.fieldname)], // Always include the 'name' field
        limit_start: (currentPage - 1) * pagination_limit,
        limit_page_length: has_pagination ? pagination_limit : undefined,
    });

    // Set documents and pagination based on fetched data
    useEffect(() => {
        if (data) {
            setDocs(data);
            if (has_pagination) {
                const total_count = data.length; // Replace with actual total count if available
                setTotalPages(Math.ceil(total_count / pagination_limit));
            }
        }
    }, [data, has_pagination]);

    // Handle pagination
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };
    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;

    return (
        <div className="container mx-auto py-8">
            {/* Title */}
            {title && (
                <h2 className="text-3xl font-bold mb-4 text-center">{title}</h2>
            )}

            {/* Subtitle */}
            {subtitle && (
                <p className="text-lg text-muted-foreground mb-6 text-center">{subtitle}</p>
            )}

            {/* List of documents */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
                {docs.map((doc, idx) => (
                    <div key={idx} className="p-4 rounded-lg shadow-md bg-white">
                        {fields.map((field, fieldIdx) => (
                            // Only show fields that are set to show in List or Both
                            (field.show === 'List' || field.show === 'Both') && (
                                <div key={fieldIdx} className="mb-2">
                                    {field.type === 'Title' && (
                                        <h3 className="text-xl font-semibold">{doc[field.fieldname]}</h3>
                                    )}
                                    {field.type === 'Subtitle' && (
                                        <p className="text-sm text-muted-foreground">{doc[field.fieldname]}</p>
                                    )}
                                    {field.type === 'Image' && doc[field.fieldname] && (
                                        <img
                                            src={doc[field.fieldname]}
                                            alt={doc[field.fieldname]}
                                            className="w-full h-40 object-cover rounded"
                                        />
                                    )}
                                    {field.type === 'Link' && doc[field.fieldname] && (
                                        <a href={doc[field.fieldname]} className="text-primary underline">
                                            View
                                        </a>
                                    )}
                                    {field.type === 'Icon' && (
                                        <i className={`icon-${doc[field.fieldname]}`}></i> // Replace with actual icon logic
                                    )}
                                </div>
                            )
                        ))}

                        {/* View Button */}
                        {has_view  && doc.name && (
                            <div className="mt-4">
                                <Button
                                    variant="link"
                                    onClick={() => navigate(`/web/views/${doc.name}`)} // Correctly use 'doc.name'
                                >
                                    View
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {has_pagination && totalPages > 1 && (
                <div className="flex justify-center space-x-4 mt-6">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        Previous
                    </button>
                    <span className="self-center">Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Lists;