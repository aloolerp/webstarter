

interface AboutSectionProps {
    title?: string;
    description?: string;
    image?: string;
  }
  
  const AboutSection = ({ title, description, image }: AboutSectionProps) => {
    return (
      <section className=" ">
        <div className="bg-muted/50 border rounded-lg py-12">
          <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
            
            {/* Image */}
            {image && (
              <img
                src={image}
                alt="About section image"
                className="w-[300px] object-contain rounded-lg"
              />
            )}
  
            {/* Text Content */}
            <div className="bg-green-0 flex flex-col justify-between">
              <div className="pb-6">
                
                {/* Title */}
                {title && (
                  <h2 className="text-3xl md:text-4xl font-bold">
                    <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                      {title}
                    </span>
                  </h2>
                )}
                
                {/* Description */}
                {description && (
                  <p className="text-xl text-muted-foreground mt-4">
                    {description}
                  </p>
                )}
              </div>
  
              {/* You can add components like "Statistics" here if needed */}
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutSection;
  