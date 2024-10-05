import React from 'react';
import { Button } from "@/components/ui/button";  // Import Button for URL fields

interface HeroWithRightImageProps {
    title?: string;
    subtitle?: string;
    image?: string;
    contain_image?: boolean;  // Check field to contain the image within a container
    primary_action_label?: string;
    primary_action?: string;
    secondary_action_label?: string;
    secondary_action?: string;
}

const HeroWithRightImage = ({
    title,
    subtitle,
    image,
    contain_image = false,  // Default to false
    primary_action_label,
    primary_action,
    secondary_action_label,
    secondary_action
}: HeroWithRightImageProps) => {
    return (
        <div className="container mx-auto  lg:flex lg:items-center lg:justify-between">
            {/* Text Section */}
            <div className="lg:w-1/2 mb-8 lg:mb-0">
                {title && (
                    <h1 className="text-3xl font-bold mb-4 sm:text-4xl md:text-5xl">
                        {title}
                    </h1>
                )}
                {subtitle && (
                    <p className="text-lg text-muted-foreground sm:text-xl mb-6">
                        {subtitle}
                    </p>
                )}

                {/* Buttons */}
                <div className="space-x-4">
                    {primary_action && primary_action_label && (
                        <a href={primary_action}>
                            <Button variant="default">{primary_action_label}</Button>
                        </a>
                    )}
                    {secondary_action && secondary_action_label && (
                        <a href={secondary_action}>
                            <Button variant="outline">{secondary_action_label}</Button>
                        </a>
                    )}
                </div>
            </div>

            {/* Image Section */}
            {image && (
                <div
                    className={`lg:w-1/2 ${contain_image ? 'p-4 bg-background rounded-lg shadow-lg' : ''}`}
                >
                    <img
                        src={image}
                        alt="Hero Image"
                        className={`${contain_image ? 'w-full h-auto object-contain' : 'w-full h-auto object-cover'}`}
                    />
                </div>
            )}
        </div>
    );
};

export default HeroWithRightImage;
