import { Button } from "../ui/button";  // Import Button for URL fields

interface CtaProps {
  title?: string;
  highlighted?: string;
  description?: string;
  primary_label?: string;
  primary_url?: string;
  secondary_label?: string;
  secondary_url?: string;
}

const Cta = ({ 
  title, 
  highlighted, 
  description, 
  primary_label, 
  primary_url, 
  secondary_label, 
  secondary_url 
}: CtaProps) => {
  return (
    <section className="bg-muted/50 py-8  sm:my-16">
      <div className="container lg:grid lg:grid-cols-2 place-items-center">
        <div className="lg:col-start-1">
          <h2 className="text-3xl md:text-4xl font-bold">
            {title}{" "}
            {highlighted && (
              <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                {highlighted}
              </span>
            )}
          </h2>

          {description && (
            <p className="text-muted-foreground text-xl mt-4 mb-8 lg:mb-0">
              {description}
            </p>
          )}
        </div>

        <div className="space-y-4 lg:col-start-2">
          {primary_url && primary_label && (
            <a href={primary_url}>
              <Button className="w-full md:mr-4 md:w-auto">{primary_label}</Button>
            </a>
          )}
          {secondary_url && secondary_label && (
            <a href={secondary_url}>
              <Button variant="outline" className="w-full md:w-auto">
                {secondary_label}
              </Button>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cta;