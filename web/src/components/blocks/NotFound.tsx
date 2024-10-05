import React from 'react';
import { Button } from "../ui/button";  // Import Button for URL fields

interface NotFoundProps {
    title?: string;
    subtitle?: string;
    image?: string;
    primary_label?: string;
    primary_url?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ title, subtitle, image, primary_label, primary_url }) => {
    return (
        <div className="flex flex-col items-center justify-center ">
            {image && (
                <div className="mb-8 w-full max-w-md">
                    <img src={image} alt="Not Found" className="w-full h-auto object-cover rounded-lg " />
                </div>
            )}
            
            {title && (
                <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
                    {title}
                </h1>
            )}
            
            {subtitle && (
                <p className="text-lg text-gray-600 mb-8 text-center">
                    {subtitle}
                </p>
            )}
            
            {primary_url && primary_label && (
                <a href={primary_url}>
                    <Button variant="default" className="px-6 py-3 text-lg">
                        {primary_label}
                    </Button>
                </a>
            )}
        </div>
    );
}

export default NotFound;