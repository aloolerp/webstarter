
    import React from 'react';
    import { Button } from "@/components/ui/button";  // Import Button for URL fields

    interface SlideshowProps {
            website_slideshow?: string;

    }

    const Slideshow = ({ website_slideshow }: SlideshowProps) => {
        return (
            <div>
    
                { website_slideshow && (
                    <div>
                        <p>{ website_slideshow }</p>
                    </div>
                )}
                
            </div>
        );
    }

    export default Slideshow;
    