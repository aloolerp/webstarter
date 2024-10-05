import React, { useState, useEffect } from 'react';
import { Input } from "../ui/input"; // ShadCN Input component
import { Checkbox } from "../ui/checkbox"; // ShadCN Checkbox component
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../ui/select"; // ShadCN Select components
import { RotateCcw } from "lucide-react"; // Lucide icon for reset button
import { useFrappeGetDocList } from 'frappe-react-sdk'; // Frappe React SDK hook to fetch document lists

interface FilterComponentProps {
    doctype?: string;
    add_sort?: boolean;
    filters?: Array<FilterComponentItemProps>; // Dynamic filters array
    display_fields?: string[]; // Fields required for display, even if not used in filters
    children: (filteredDocs: any[]) => React.ReactNode; // Render prop to display filtered data
}


interface FilterComponentItemProps {
    search_field?: string; // Name of the field to search
    type?: string; // Type of the field: Data, Select, Check
    options?: string; // Comma-separated options for Select type
}

const FilterComponent = ({ doctype, add_sort, filters, display_fields, children }: FilterComponentProps) => {
    const [filterValues, setFilterValues] = useState<{ [key: string]: any }>({});
    const [filteredDocs, setFilteredDocs] = useState<any[]>([]);
    const [sortOption, setSortOption] = useState<string>('created_asc');

    // Collect all fields to be fetched (search fields + display fields)
    const fieldsToFetch = [
        'name',
        'creation',
        ...filters?.map(filter => filter.search_field || ''), // Search fields
        ...(display_fields || []) // Display fields
    ].filter(Boolean); // Ensure no empty values

    // Fetch the documents dynamically from Frappe, including search fields and display fields
    const { data: docs, error, isLoading } = useFrappeGetDocList(doctype || '', {
        fields: fieldsToFetch
    });

    // Rest of the logic remains the same...


    // Initialize filters with default values
    useEffect(() => {
        const defaultFilterValues: { [key: string]: any } = {};

        filters?.forEach((filter) => {
            if (filter.type === 'Check') {
                defaultFilterValues[filter.search_field || ''] = undefined; // No default filtering for checkboxes
            } else if (filter.type === 'Select') {
                defaultFilterValues[filter.search_field || ''] = 'all'; // Default: All
            } else if (filter.type === 'Data') {
                defaultFilterValues[filter.search_field || ''] = ''; // Default for Data fields: empty
            }
        });

        setFilterValues(defaultFilterValues);
    }, [filters]);

    // Handle the input changes dynamically based on the search field
    const handleInputChange = (field: string, value: any) => {
        setFilterValues(prevValues => ({ ...prevValues, [field]: value }));
    };

    // Reset filters to default values
    const resetFilters = () => {
        const resetValues: { [key: string]: any } = {};
        filters?.forEach((filter) => {
            if (filter.type === 'Check') {
                resetValues[filter.search_field || ''] = undefined; // Reset check to undefined
            } else if (filter.type === 'Select') {
                resetValues[filter.search_field || ''] = 'all'; // Reset select to 'all'
            } else if (filter.type === 'Data') {
                resetValues[filter.search_field || ''] = ''; // Reset data to empty string
            }
        });
        setFilterValues(resetValues);
    };

    // Apply filtering and sorting logic
    useEffect(() => {
        if (docs) {
            let filtered = docs;

            // Apply filters from the filterValues state
            filters?.forEach((filter) => {
                const key = filter.search_field || '';
                const filterValue = filterValues[key];

                if (filterValue !== undefined && filterValue !== 'all') {
                    if (filter.type === 'Check') {
                        // Handle Check type (boolean) filtering
                        filtered = filtered.filter(doc => doc[key] === filterValue);
                    } else if (filter.type === 'Select') {
                        // Use exact match for Select fields
                        filtered = filtered.filter(doc => doc[key]?.toString().toLowerCase() === filterValue.toString().toLowerCase());
                    } else if (filter.type === 'Data') {
                        // Use partial match for Data fields
                        filtered = filtered.filter(doc => doc[key]?.toString().toLowerCase().includes(filterValue.toString().toLowerCase()));
                    }
                }
            });

            // Apply sorting logic
            filtered = filtered.sort((a, b) => {
                if (sortOption === 'created_asc') {
                    return new Date(a.creation).getTime() - new Date(b.creation).getTime();
                } else if (sortOption === 'created_desc') {
                    return new Date(b.creation).getTime() - new Date(a.creation).getTime();
                } else if (sortOption.includes('asc')) {
                    return a[sortOption.replace('_asc', '')]?.localeCompare(b[sortOption.replace('_asc', '')]);
                } else if (sortOption.includes('desc')) {
                    return b[sortOption.replace('_desc', '')]?.localeCompare(a[sortOption.replace('_desc', '')]);
                }
                return 0;
            });

            setFilteredDocs(filtered);
        }
    }, [docs, filterValues, sortOption, filters]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;

    return (
        <div>
            {/* {doctype && (
                <div>
                    <h2>{doctype} Filters</h2>
                </div>
            )} */}

            {/* Render dynamic filters */}
            <div className="flex space-x-4 mb-4">
                {filters && filters.map((filter, idx) => (
                    <div key={idx} className="mb-4">
                        {/* Render input based on type */}
                        {filter.type === 'Data' && (
                            <Input
                                type="text"
                                placeholder={`Search by ${filter.search_field}`}
                                value={filterValues[filter.search_field] || ''}
                                onChange={(e) => handleInputChange(filter.search_field || '', e.target.value)}
                                className="w-full max-w-sm"
                            />
                        )}

                        {filter.type === 'Select' && filter.options && (
                            <Select
                                onValueChange={(value) => handleInputChange(filter.search_field || '', value)}
                                value={filterValues[filter.search_field]} // Bind value to Select
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder={`Select ${filter.search_field}`} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="all">All</SelectItem> {/* Default "All" option */}
                                        {filter.options.split(',').map((option, optionIdx) => (
                                            <SelectItem key={optionIdx} value={option.trim()}>
                                                {option.trim()}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}

                        {filter.type === 'Check' && (
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id={filter.search_field}
                                    checked={filterValues[filter.search_field] === true}
                                    onCheckedChange={(checked) => handleInputChange(filter.search_field || '', !!checked)}
                                />
                                <label htmlFor={filter.search_field} className="text-sm font-medium">
                                    {filter.search_field}
                                </label>
                            </div>
                        )}
                    </div>
                ))}

                {/* Sort option if enabled */}
                {add_sort && (
                    <div className="mb-4">
                        <Select
                            onValueChange={(value) => setSortOption(value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="created_asc">Created (Oldest)</SelectItem>
                                    <SelectItem value="created_desc">Created (Latest)</SelectItem>
                                    <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                                    <SelectItem value="name_desc">Name (Z-A)</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {/* Reset button */}
                <div>
                    <button
                        onClick={resetFilters}
                        className="inline-flex items-center space-x-2 p-2  rounded  hover:text-primary"
                    >
                        <RotateCcw className="h-4 w-4" />
                        <span>Reset Filters</span>
                    </button>
                </div>
            </div>

            {/* Render filtered docs using children */}
            {children(filteredDocs)}

            {/* If no documents are found */}
            {filteredDocs.length === 0 && <p>No documents found.</p>}
        </div>
    );
};

export default FilterComponent;