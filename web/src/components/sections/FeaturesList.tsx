import React, { useEffect, useState } from "react";
import { ChevronRightIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define the interface for each item
interface FeaturesListItem {
  title: string;
  content: string;
  icon?: string;
  primary_url?: string;
  primary_label?: string;
}

// Define the interface for the props
interface FeaturesListProps {
  header?: string;
  subtitle?: string;
  link_url?: string;
  link_label?: string;
  items: FeaturesListItem[];
  type: "Style 1" | "Style 2" | "Style 3"; // Select field to choose between the styles
 
}

// Dynamic icon loader function
const loadIcon = async (iconName: string) => {
  try {
    const { [iconName]: ImportedIcon } = await import("lucide-react");
    return ImportedIcon;
  } catch (error) {
    console.error(`Icon "${iconName}" not found.`, error);
    return null;
  }
};

const FeaturesList: React.FC<FeaturesListProps> = ({
  header,
  subtitle,
  link_url,
  link_label,
  items,
  type,
 
}) => {
  return (
    <>
      {/* Conditionally render styles based on the selected type */}
      {type === "Style 1" ? (
        <Style1
          items={items}
          header={ header}
          subtitle={subtitle}
        />
      ) : type === "Style 2" ? (
        <Style2
          items={items}
          header={header}
          subtitle={subtitle}
          link_url={ link_url}
          link_label={ link_label}
        />
      ) : (
        <Style3
          items={items}
          header={header}
          subtitle={subtitle}
        />
      )}
    </>
  );
};

// Style 1 - Previous style
const Style1: React.FC<{
  items: FeaturesListItem[];
  header?: string;
  subtitle?: string;
}> = ({ items, header, subtitle }) => {
  return (
    <div className=" py-2 lg:py-2">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-6">
        {/* Header and Subtitle */}
        {header && (
          <div className="col-span-full mb-8">
            <h2 className="text-3xl font-bold">{header}</h2>
            {subtitle && <p className="text-lg text-muted-foreground">{subtitle}</p>}
          </div>
        )}
        {items.map((item, index) => {
          const [IconComponent, setIconComponent] = useState<React.ElementType | null>(null);

          useEffect(() => {
            if (item.icon) {
              loadIcon(item.icon).then((icon) => setIconComponent(() => icon));
            }
          }, [item.icon]);

          return (
            <a
              key={index}
              href={item.primary_url || "#"}
              className="group flex flex-col justify-center hover:bg-primary/10 rounded-lg p-4 md:p-7"
            >
              {/* Icon */}
              <div className="flex justify-center items-center w-12 bg-primary h-12 border rounded-lg">
                {IconComponent ? (
                  <IconComponent className="flex-shrink-0  w-6 h-6 text-primary-foreground" />
                ) : (
                  <div className="w-6 h-6"></div>
                )}
              </div>

              {/* Content */}
              <div className="mt-5">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-1 text-muted-foreground">{item.content}</p>

                {/* Link */}
                {item.primary_label && (
                  <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm decoration-2 group-hover:underline font-medium">
                    {item.primary_label}
                    <ChevronRightIcon className="flex-shrink-0 w-4 h-4" />
                  </span>
                )}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

// Style 2 - Last style you provided
const Style2: React.FC<{
  items: FeaturesListItem[];
  header?: string;
  subtitle?: string;
  link_url?: string;
  link_label?: string;
}> = ({ items, header, subtitle, link_url, link_label }) => {
  return (
    <div className=" py-8 lg:py-8">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left column for header, subtitle, and link */}
        <div className="lg:w-3/4">
          {header && (
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              {header}
            </h2>
          )}
          {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
          {link_url && link_label && (
            <p className="mt-5">
              <a
                className="inline-flex items-center gap-x-1 group font-medium hover:underline underline-offset-4"
                href={link_url}
              >
                {link_label}
                <ChevronRightIcon className="flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1" />
              </a>
            </p>
          )}
        </div>

        {/* Right column for items */}
        <div className="space-y-6 lg:space-y-10">
          {items.map((item, index) => {
            const [IconComponent, setIconComponent] = useState<React.ElementType | null>(null);

            useEffect(() => {
              if (item.icon) {
                loadIcon(item.icon).then((icon) => setIconComponent(() => icon));
              }
            }, [item.icon]);

            return (
              <div className="flex" key={index}>
                {/* Icon */}
                <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-primary text-primary-foreground">
                  {IconComponent ? <IconComponent className="flex-shrink-0 w-5 h-5" /> : null}
                </span>
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1 text-muted-foreground">{item.content}</p>
                  {item.primary_url && item.primary_label && (
                    <a
                      href={item.primary_url}
                      className="inline-flex items-center gap-x-1 group font-medium hover:underline underline-offset-4 mt-2"
                    >
                      {item.primary_label}
                      <ChevronRightIcon className="flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Style 3 - Stacked Cards
const Style3: React.FC<{
  items: FeaturesListItem[];
  header?: string;
  subtitle?: string;
}> = ({ items, header, subtitle }) => {
  return (
    <div className="container py-8 lg:py-8">
      {header && (
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">{header}</h2>
          {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
        </div>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {items.map((item, index) => {
          const [IconComponent, setIconComponent] = useState<React.ElementType | null>(null);

          useEffect(() => {
            if (item.icon) {
              loadIcon(item.icon).then((icon) => setIconComponent(() => icon));
            }
          }, [item.icon]);

          return (
            <Card key={index}>
              <CardHeader className="pb-4 flex-row items-center gap-4">
                <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-2 bg-primary">
                  {IconComponent ? (
                    <IconComponent className="w-6 h-6 text-primary-foreground" />
                  ) : null}
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>{item.content}</CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturesList;
