interface Hero2Props {
    title?: string;
    subtitle?: string;
    image?: string;
    primary_label?: string;
    primary_url?: string;
    secondary_label?: string;
    secondary_url?: string;
}

const Hero2 = ({ title, subtitle, image, primary_label, primary_url, secondary_label, secondary_url }: Hero2Props) => {
    return (
        <header>
            {/* Hero Container */}
            <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
                {/* Hero Content Grid */}
                <div className="grid items-center justify-items-start gap-8 sm:gap-20 lg:grid-cols-2">
                    
                    {/* Hero Text Content */}
                    <div className="flex flex-col">
                        {title && (
                            <h1 className="mb-4 text-4xl font-bold md:text-6xl">
                                {title}
                            </h1>
                        )}
                        {subtitle && (
                            <p className="mb-6 max-w-lg text-sm text-gray-500 sm:text-xl md:mb-10 lg:mb-12">
                                {subtitle}
                            </p>
                        )}
                        
                        {/* Hero Buttons */}
                        <div className="flex items-center">
                            {primary_url && primary_label && (
                                <a
                                    href={primary_url}
                                    className="mr-5 items-center rounded-md bg-black px-6 py-3 font-semibold text-white md:mr-6 lg:mr-8"
                                >
                                    {primary_label}
                                </a>
                            )}
                            {secondary_url && secondary_label && (
                                <a
                                    href={secondary_url}
                                    className="flex max-w-full items-center font-bold"
                                >
                                    <img
                                        src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94bd85e6cf98_ArrowUpRight%20(4).svg"
                                        alt=""
                                        className="mr-2 inline-block max-h-4 w-5"
                                    />
                                    <p>{secondary_label}</p>
                                </a>
                            )}
                        </div>
                    </div>
                    
                    {/* Hero Image */}
                    {image && (
                        <img
                            src={image}
                            alt="Hero Image"
                            className="inline-block h-full w-full max-w-2xl"
                            loading="lazy" 
                        />
                    )}
                </div>
            </div>
        </header>
    );
}

export default Hero2;