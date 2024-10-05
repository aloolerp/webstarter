import { Button } from "../ui/button";  // Import Button for URL fields

    interface HeroSectionProps {
            title?: string;
        highlighted?: string;
        subtitle?: string;
        image?: string;
        primary_label?: string;
        primary_url?: string;
        secondary_label?: string;
        secondary_url?: string;

    }

    const HeroSection = ({ title, highlighted, subtitle, image, primary_label, primary_url, secondary_label, secondary_url }: HeroSectionProps) => {
        return (
            <div>
    
                { title && (
                    <div>
                        <p>{ title }</p>
                    </div>
                )}
                
                { highlighted && (
                    <div>
                        <p>{ highlighted }</p>
                    </div>
                )}
                
                { subtitle && (
                    <div>
                        <p>{ subtitle }</p>
                    </div>
                )}
                
                { image && (
                    <div>
                        <img src={ image } alt="Image" />
                    </div>
                )}
            
                { primary_url && primary_label && (
                    <a href={ primary_url }>
                        <Button variant="default">{ primary_label }</Button>
                    </a>
                )}
            
                { secondary_url && secondary_label && (
                    <a href={ secondary_url }>
                        <Button variant="outline">{ secondary_label }</Button>
                    </a>
                )}
            
            </div>
        );
    }

    export default HeroSection;