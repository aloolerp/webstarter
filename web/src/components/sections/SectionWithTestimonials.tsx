
import { Button } from "@/components/ui/button";  // Import Button for URL fields

interface Testimonial {
    full_name: string;
    content: string;
    designation?: string;
    image?: string;
    url?: string;
}

interface SectionWithTestimonialsProps {
    title?: string;
    subtitle?: string;
    columns?: number;  // Number of columns for the grid
    testimonials?: Testimonial[];  // Array of testimonials
}

const SectionWithTestimonials = ({ title, subtitle, columns = 3, testimonials }: SectionWithTestimonialsProps) => {
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

            {/* Testimonials Grid */}
            {testimonials && testimonials.length > 0 && (
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                            {testimonial.image && (
                                <img
                                    src={testimonial.image}
                                    alt={`${testimonial.full_name}'s avatar`}
                                    className="w-16 h-16 rounded-full mx-auto mb-4"
                                />
                            )}
                            <h4 className="text-lg font-semibold text-center">{testimonial.full_name}</h4>
                            {testimonial.designation && (
                                <p className="text-sm text-muted-foreground text-center mb-2">
                                    {testimonial.designation}
                                </p>
                            )}
                            <p className="text-gray-600 dark:text-gray-400 text-center">
                                {testimonial.content}
                            </p>
                            {testimonial.url && (
                                <div className="mt-4 text-center">
                                    <a href={testimonial.url}>
                                        <Button variant="default">Learn More</Button>
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SectionWithTestimonials;
