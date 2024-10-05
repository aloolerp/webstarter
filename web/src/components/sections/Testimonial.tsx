
    import React from 'react';
    import { Button } from "@/components/ui/button";  // Import Button for URL fields

    interface TestimonialProps {
            logo?: string;
        name?: string;
        content?: string;

    }

    const Testimonial = ({ logo, name, content }: TestimonialProps) => {
        return (
            <div>
    
                { logo && (
                    <div>
                        <img src={ logo } alt="Logo" />
                    </div>
                )}
            
                { name && (
                    <div>
                        <p>{ name }</p>
                    </div>
                )}
                
                { content && (
                    <div>
                        <p>{ content }</p>
                    </div>
                )}
                
            </div>
        );
    }

    export default Testimonial;
    