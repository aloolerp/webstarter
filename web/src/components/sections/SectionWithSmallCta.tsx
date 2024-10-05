
    import React from 'react';
    import { Button } from "@/components/ui/button";  // Import Button for URL fields

    interface SectionWithSmallCtaProps {
            title?: string;
        subtitle?: string;
        cta_label?: string;
        cta_url?: string;

    }

    const SectionWithSmallCta = ({ title, subtitle, cta_label, cta_url }: SectionWithSmallCtaProps) => {
        return (
            <div>
    
                { title && (
                    <div>
                        <p>{ title }</p>
                    </div>
                )}
                
                { subtitle && (
                    <div>
                        <p>{ subtitle }</p>
                    </div>
                )}
                
                { cta_url && cta_label && (
                    <a href={ cta_url }>
                        <Button variant="default">{ cta_label }</Button>
                    </a>
                )}
            
            </div>
        );
    }

    export default SectionWithSmallCta;
    