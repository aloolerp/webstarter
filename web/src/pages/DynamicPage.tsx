import React, { Suspense } from "react";
import { useParams} from "react-router-dom";
import {Helmet} from "react-helmet";  // Import react-helmet for SEO
import { useFrappeGetDocList, useFrappeGetDoc } from "frappe-react-sdk";

import getBlockStyles from "@/utils/getBlockStyles";
import NotFound from "./NotFound";
import { Skeleton } from "@/components/ui/skeleton";
// Utility function to sanitize the template name
const sanitizeTemplateName = (template: string) => {
  return template
    .split(" ") // Split by spaces
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(""); // Join them together with no spaces
};



const DynamicPage: React.FC = () => {
  const { pageName } = useParams();


  // Fetch only published front pages
  const { data: publishedPages, error: pagesError } = useFrappeGetDocList("Front Page", {
    fields: ["name", "title", "published"],
    filters: [["published", "=", 1]], // Only fetch pages where published is checked
  });

    // Fetch the front page document by name
    const { data: frontPageData, error, isValidating } = useFrappeGetDoc("Front Page", pageName || "");

  // Check if the page is published
  const isPagePublished = publishedPages?.some((page: any) => page.name === pageName);

  // If page is not published, navigate to a default page
  if (!isPagePublished && publishedPages) {
   
    return <NotFound/>;
  }



  // Handle loading state
  if (isValidating || !publishedPages) {
    return (
      <div className="py-10">
      {/* Skeletons for the loading state */}
      <Skeleton className="h-8 w-full mb-4" /> {/* Title placeholder */}
      <Skeleton className="h-4 w-3/4 mb-6" /> {/* Subtitle placeholder */}
      <Skeleton className="h-64 w-full" /> {/* Main content placeholder */}
    </div>
    );
  }

  // Handle error state
  if (error || pagesError) {
    return <NotFound/>;
  }

  // Check if we got the data
  if (!frontPageData) {
    return <div>No data available for this page</div>;
  }

  // Extract SEO metadata
  const { meta_title, meta_description, meta_image } = frontPageData;

  // Function to determine folder and load the component dynamically
  const loadDynamicComponent = (folder: string, sanitizedTemplateName: string) => {
    return React.lazy(() =>
      import(`../components/${folder}/${sanitizedTemplateName}.tsx`).catch((error) => {
        console.error(`Error loading component from ${folder}/${sanitizedTemplateName}:`, error);
        return { default: () => <div>Component not found: {sanitizedTemplateName}</div> };
      })
    );
  };

  // Render the page blocks
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        {meta_title && <title>{meta_title}</title>}
        {meta_description && <meta name="description" content={meta_description} />}
        {meta_image && <meta property="og:image" content={meta_image} />}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <div>
        {frontPageData.page_blocks.map((block: any) => {
          const { web_template, web_template_values, type, section, hide_block } = block;

          // Skip blocks where hide_block is checked
          if (hide_block) {
            return null;
          }

          // Determine the template name and folder
          const templateName = type === "Section" ? section : web_template;
          if (!templateName) {
            console.error("Missing template or Sections name in block", block);
            return <div key={block.name}>Error: Missing template or Sections name for this block</div>;
          }

          // Sanitize the template or section name
          const sanitizedTemplateName = sanitizeTemplateName(templateName);

          // Determine the folder to import from based on the block type
          const folder = type === "Section" ? "sections" : "blocks";

          // Dynamically load the component based on the folder and template name
          const DynamicComponent = loadDynamicComponent(folder, sanitizedTemplateName);

          // Parse the web_template_values JSON
          let parsedWebTemplateValues = {};
          try {
            parsedWebTemplateValues = JSON.parse(web_template_values || "{}");
          } catch (error) {
            console.error("Error parsing web_template_values:", error);
          }

          // Get block styles
          const { classes, inlineStyles } = getBlockStyles(block);

          // Render the component with the parsed values
          return (
            <Suspense fallback={<div>Loading...</div>} key={block.name}>
              <div className={classes} style={inlineStyles}>
                <DynamicComponent {...parsedWebTemplateValues} />
              </div>
            </Suspense>
          );
        })}
      </div>
    </>
  );
};

export default DynamicPage;
