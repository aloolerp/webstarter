import React from 'react';

interface CoverImageProps {
    image?: string;
    description?: string;
}

const CoverImage = ({ image, description }: CoverImageProps) => {
    return (
        <div className="container mx-auto px-4 py-8 md:px-8 lg:py-12">
            {/* Image Section */}
            {image && (
                <div className="mb-6">
                    <img
                        src={image}
                        alt="Cover Image"
                        className="w-full h-auto rounded-lg shadow-lg object-cover"
                    />
                </div>
            )}

            {/* Description Section */}
            {description && (
                <div className="text-center">
                    <p className="text-lg text-foreground dark:text-foreground-muted">
                        {description}
                    </p>
                </div>
            )}
        </div>
    );
};

export default CoverImage;
