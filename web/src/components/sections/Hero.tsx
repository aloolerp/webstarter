
import { Button } from "@/components/ui/button";  // Import Button for URL fields

interface HeroProps {
    title?: string;
    subtitle?: string;
    primary_action_label?: string;
    primary_action?: string;
    secondary_action_label?: string;
    secondary_action?: string;
    align?: 'left' | 'center' | 'right';  // Limit align options to 'left', 'center', or 'right'
}

const Hero = ({
    title,
    subtitle,
    primary_action_label,
    primary_action,
    secondary_action_label,
    secondary_action,
    align = 'left'  // Default alignment is 'left'
}: HeroProps) => {
    // Determine alignment classes based on the align prop
    const alignmentClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';

    return (
        <div className={`container mx-auto px-4 py-8 ${alignmentClass}`}>
            {title && (
                <h1 className="text-3xl font-bold mb-4">
                    {title}
                </h1>
            )}

            {subtitle && (
                <p className="text-lg text-muted-foreground mb-6">
                    {subtitle}
                </p>
            )}

            {/* Action Buttons */}
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
    );
};

export default Hero;
