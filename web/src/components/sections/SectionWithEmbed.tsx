
    import React from 'react';
    import { Button } from "@/components/ui/button";  // Import Button for URL fields

    interface SectionWithEmbedProps {
            title?: string;
        subtitle?: string;
        embed_html?: string;

    }

    const SectionWithEmbed = ({ title, subtitle, embed_html }: SectionWithEmbedProps) => {
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
                
                { embed_html && (
                    <div>
                        <p>{ embed_html }</p>
                    </div>
                )}
                
            </div>
        );
    }

    export default SectionWithEmbed;
    