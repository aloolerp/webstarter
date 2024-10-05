import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StatItem {
  description?: string;
  amount?: number;
  progress_value?: number;
  progress_description?: string;
  percentage_change?: number;
}

interface StatsComponentProps {
  title?: string;
  subtitle?: string;
  items: StatItem[]; // Array of stats items
}

const StatsComponent: React.FC<StatsComponentProps> = ({
  title,
  subtitle,
  items,
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title and Subtitle */}
      <div className="mb-8 text-center">
        {title && <h2 className="text-4xl font-bold mb-2">{title}</h2>}
        {subtitle && <p className="text-lg text-muted-foreground">{subtitle}</p>}
      </div>

      {/* Grid of Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item, index) => {
          const isPositiveChange = (item.percentage_change || 0) >= 0;

          return (
            <Card key={index} className="w-full">
              <CardHeader>
                <CardDescription>{item.description}</CardDescription>
                <CardTitle className="text-4xl mt-2">
                  {item.amount || 0}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {item.progress_description}
                </div>
              </CardContent>

              <CardFooter className="flex items-center">
                <Progress
                  value={item.progress_value || 0}
                  aria-label={item.progress_description}
                  className="flex-1 mr-2"
                />
                <div
                  className={`text-sm ${
                    isPositiveChange ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {isPositiveChange ? "+" : ""}
                  {item.percentage_change || 0}%
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StatsComponent;
