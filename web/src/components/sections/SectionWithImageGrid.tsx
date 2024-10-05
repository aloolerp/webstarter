import React from 'react';

interface SectionWithImageGridProps {
    title?: string;
    subtitle?: string;
    image_1?: string;
    image_2?: string;
    image_3?: string;
    image_4?: string;
}

const SectionWithImageGrid = ({ title, subtitle, image_1, image_2, image_3, image_4 }: SectionWithImageGridProps) => {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Title */}
            {title && (
                <h2 className="text-3xl font-bold mb-4 text-center">
                    {title}
                </h2>
            )}

            {/* Subtitle */}
            {subtitle && (
                <p className="text-lg text-muted-foreground mb-6 text-center">
                    {subtitle}
                </p>
            )}

            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {image_1 && (
                    <div className="row-span-2">
                        <img
                            src={image_1}
                            alt="Image 1"
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                    </div>
                )}

                {image_2 && (
                    <div className="col-span-2 row-span-1">
                        <img
                            src={image_2}
                            alt="Image 2"
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                    </div>
                )}

                {image_3 && (
                    <div className="row-span-2">
                        <img
                            src={image_3}
                            alt="Image 3"
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                    </div>
                )}

                {image_4 && (
                    <div className="col-span-2 row-span-1">
                        <img
                            src={image_4}
                            alt="Image 4"
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SectionWithImageGrid;
