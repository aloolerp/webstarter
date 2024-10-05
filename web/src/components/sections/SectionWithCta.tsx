import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";  // Import Button for URL fields
// import Confetti from 'react-confetti'; 

interface SectionWithCtaProps {
    title?: string;
    subtitle?: string;
    cta_label?: string;
    cta_url?: string;
    cta_description?: string;
    show_confetti?: boolean;
}

const SectionWithCta = ({ title, subtitle, cta_label, cta_url, cta_description, show_confetti }: SectionWithCtaProps) => {

    // Confetti state
    useEffect(() => {
        if (show_confetti) {
            // Add any specific confetti logic here, such as duration
        }
    }, [show_confetti]);

    return (
        <div className="container bg-accent mx-auto px-4 py-8 text-center">
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
            
            {/* Call to Action Button */}
            {cta_url && cta_label && (
                <a href={cta_url} className="inline-block">
                    <Button variant="default">{cta_label}</Button>
                </a>
            )}
        
            {/* CTA Description */}
            {cta_description && (
                <div className="mt-4">
                    <p className="text-md text-gray-600 dark:text-gray-400">
                        {cta_description}
                    </p>
                </div>
            )}
            
            {/* Show Confetti Animation */}
            {/* {show_confetti && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                />
            )} */}
        </div>
    );
};

export default SectionWithCta;
