import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Item {
    title: string;
    content: string;
}

interface SectionWithCollapsibleContentProps {
    title?: string;
    subtitle?: string;
    align?: 'left' | 'center' | 'right'; // Alignment options
    items?: Item[];  // Items is an array of objects with title and content
}

const SectionWithCollapsibleContent = ({ title, subtitle, align = 'left', items }: SectionWithCollapsibleContentProps) => {
    // Determine alignment class based on the align prop
    const alignmentClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';

    return (
        <div className={`container mx-auto  mb-10 px-20 py-8 ${alignmentClass}`}>
            {/* Section Title */}
            {title && (
                <h2 className="text-3xl text-center font-bold mb-4">
                    {title}
                </h2>
            )}

            {/* Section Subtitle */}
            {subtitle && (
                <p className="text-lg text-center text-muted-foreground mb-6">
                    {subtitle}
                </p>
            )}

            {/* Accordion Items */}
            {items && items.length > 0 && (
                <Accordion type="single" collapsible className="space-y-4 ">
                    {items.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-xl font-semibold ">{item.title}</AccordionTrigger>
                            <AccordionContent>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {item.content}
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            )}
        </div>
    );
};

export default SectionWithCollapsibleContent;
