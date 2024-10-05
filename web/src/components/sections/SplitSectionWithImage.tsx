import React from 'react';
import { Button } from "@/components/ui/button";  // Import Button for URL fields

interface SplitSectionWithImageProps {
    title?: string;
    content?: string;
    image?: string;
    image_on_right?: boolean; // Controls whether the image is on the right
    link_label?: string;
    link_url?: string;
    split?: string; // Defines the column split
    vertical_align?: 'Top' | 'Middle'; // Defines the vertical alignment
}

const SplitSectionWithImage = ({ title, content, image, image_on_right = false, link_label, link_url, split = '3 columns - 9 columns', vertical_align = 'Top' }: SplitSectionWithImageProps) => {
    // Map split options to Tailwind column classes
    const splitClasses = {
        '3 columns - 9 columns': 'lg:grid-cols-2', // Default to 2 columns for larger screens
        '4 columns - 8 columns': 'lg:grid-cols-4',
        '5 columns - 7 columns': 'lg:grid-cols-5',
        '6 columns - 6 columns': 'lg:grid-cols-6',
        '7 columns - 5 columns': 'lg:grid-cols-7',
        '8 columns - 4 columns': 'lg:grid-cols-8',
        '9 columns - 3 columns': 'lg:grid-cols-9',
    };

    // Determine vertical alignment class
    const verticalAlignClass = vertical_align === 'Middle' ? 'items-center' : 'items-start';

    return (
        <div className={`container mx-auto px-4 py-14 grid grid-cols-1 gap-4 ${splitClasses[split]} ${verticalAlignClass}`}>
            {/* Content and Image */}
            {image_on_right ? (
                <>
                    {/* Content first for smaller screens */}
                    <div className="lg:order-1">
                        {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
                        {content && <p className="text-lg mb-4">{content}</p>}
                        {link_url && link_label && (
                            <a href={link_url}>
                                <Button variant="default">{link_label}</Button>
                            </a>
                        )}
                    </div>
                    {/* Image */}
                    {image && (
                        <div className="lg:order-2">
                            <img src={image} alt="Image" className="w-full h-auto object-contain rounded-lg shadow-lg" />
                        </div>
                    )}
                </>
            ) : (
                <>
                    {/* Content */}
                    <div className="lg:order-2">
                        {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
                        {content && <p className="text-lg mb-4">{content}</p>}
                        {link_url && link_label && (
                            <a href={link_url}>
                                <Button variant="default">{link_label}</Button>
                            </a>
                        )}
                    </div>
                    {/* Image */}
                    {image && (
                        <div className="lg:order-1">
                            <img src={image} alt="Image" className="w-full h-auto object-contain rounded-lg shadow-lg" />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SplitSectionWithImage;
