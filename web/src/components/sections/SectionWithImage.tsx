import React from 'react';

interface SectionWithImageProps {
    title?: string;
    subtitle?: string;
    image?: string;
    image_description?: string;
    align?: 'left' | 'center' | 'right'; // Alignment options
}

const SectionWithImage = ({ title, subtitle, image, image_description, align = 'left' }: SectionWithImageProps) => {
    // Determine alignment class based on the align prop
    const alignmentClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';

    return (
        <div className={`container mx-auto px-4 py-8 ${alignmentClass}`}>
            {/* Title */}
            {title && (
                <h2 className="text-3xl font-bold mb-4">
                    {title}
                </h2>
            )}

            {/* Subtitle */}
            {subtitle && (
                <p className="text-lg text-muted-foreground mb-6">
                    {subtitle}
                </p>
            )}

            {/* Image */}
            {image && (
                <div className="mb-6">
                    <img
                        src={image}
                        alt={image_description || 'Image'}
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                </div>
            )}

            {/* Image Description */}
            {image_description && (
                <p className="text-md text-gray-600 dark:text-gray-400 mb-4">
                    {image_description}
                </p>
            )}
        </div>
    );
};

export default SectionWithImage;
