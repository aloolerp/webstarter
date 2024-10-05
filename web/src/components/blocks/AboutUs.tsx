import React from 'react';
import { Eye, Target, Heart } from 'lucide-react';  // Importing icons

interface AboutUsProps {
    title?: string;
    subtitle?: string;
    cover_image?: string;
    vision?: string;
    mission?: string;
    values?: string;
    background?: string;
}

const AboutUs: React.FC<AboutUsProps> = ({ title, subtitle, cover_image, vision, mission, values, background }) => {
    return (
        <section className=" text-gray-800">
            {/* Cover Image and Title */}
            {cover_image && (
                <div className="relative h-96 overflow-hidden">
                    <img src={cover_image} alt="Cover" className="object-cover w-full h-full" />
                    {title && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <h1 className="text-5xl font-bold text-white">{title}</h1>
                        </div>
                    )}
                </div>
            )}

            <div className="container mx-auto px-6 py-12">
                {/* Subtitle */}
                {subtitle && (
                    <div className="mb-12 text-center">
                        <p className="text-2xl text-grey">{subtitle}</p>
                    </div>
                )}

                {/* Vision, Mission, Values */}
                <div className="grid grid-cols-1 mt-20 mb-20 md:grid-cols-3 gap-8 text-center">
                    {vision && (
                        <div className="p-6 bg-white shadow-md rounded-lg transform transition-transform hover:scale-105">
                            <Eye className="w-12 h-12 text-primary mb-4 mx-auto" /> {/* Vision Icon */}
                            <h2 className="text-xl font-bold mb-4 text-primary">Our Vision</h2>
                            <p>{vision}</p>
                        </div>
                    )}
                    {mission && (
                        <div className="p-6 bg-white shadow-md rounded-lg transform transition-transform hover:scale-105">
                            <Target className="w-12 h-12 text-primary mb-4 mx-auto" /> {/* Mission Icon */}
                            <h2 className="text-xl font-bold mb-4 text-primary">Our Mission</h2>
                            <p>{mission}</p>
                        </div>
                    )}
                    {values && (
                        <div className="p-6 bg-white shadow-md rounded-lg transform transition-transform hover:scale-105">
                            <Heart className="w-12 h-12 text-primary mb-4 mx-auto" /> {/* Values Icon */}
                            <h2 className="text-xl font-bold mb-4 text-primary">Our Values</h2>
                            <p>{values}</p>
                        </div>
                    )}
                </div>

                {/* Background */}
                {background && (
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-center mb-6">Our Background</h2>
                        <p className="text-lg leading-relaxed">{background}</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default AboutUs;
