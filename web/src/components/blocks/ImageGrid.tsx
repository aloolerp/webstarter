import  { useState } from 'react';

interface ImageGridProps {
    image1?: string;
    image2?: string;
    image3?: string;
    image4?: string;
    image5?: string;
}

const ImageGrid = ({ image1, image2, image3, image4, image5 }: ImageGridProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const images = [
        { src: image1, alt: 'Image 1' },
        { src: image2, alt: 'Image 2' },
        { src: image3, alt: 'Image 3' },
        { src: image4, alt: 'Image 4' },
        { src: image5, alt: 'Image 5' },
    ].filter(image => image.src);  // Filter out undefined images

    const openLightbox = (src: string) => {
        setSelectedImage(src);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    return (
        <div className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-2.5 lg:pb-16 pb-10">
                <h2 className="w-full text-center text-gray-900 text-4xl font-bold leading-normal">Our Gallery</h2>
                <div className="w-full text-center text-gray-600 text-lg">Step into a realm where art comes to life.</div>
            </div>
            <div className="gallery grid grid-cols-1 md:grid-cols-3 gap-8">
                {images.map((image, index) => (
                    <div key={index} className={`md:col-span-${index === 0 || index === 1 ? '6' : '4'} h-[277px] w-full rounded-3xl`}>
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full cursor-pointer"
                            onClick={() => openLightbox(image.src!)}
                        />
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div className="lightbox fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={closeLightbox}>
                    <span className="close absolute top-5 right-10 text-white text-4xl cursor-pointer" onClick={closeLightbox}>&times;</span>
                    <img src={selectedImage} alt="Lightbox Image" className="lightbox-image max-w-full max-h-full" />
                </div>
            )}
        </div>
    );
};

export default ImageGrid;