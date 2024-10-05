
interface FullWidthImageProps {
    image?: string;
    description?: string;
}

const FullWidthImage = ({ image, description }: FullWidthImageProps) => {
    return (
        <div className="w-full bg-background dark:bg-background py-8">
            {/* Image Section */}
            {image && (
                <div className="mb-6">
                    <img
                        src={image}
                        alt="Full Width Image"
                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                    />
                </div>
            )}

            {/* Description Section */}
            {description && (
                <div className="text-center">
                    <p className="text-lg text-foreground dark:text-foreground-muted">
                        {description}
                    </p>
                </div>
            )}
        </div>
    );
};

export default FullWidthImage;
