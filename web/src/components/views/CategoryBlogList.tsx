import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFrappeGetDocList } from "frappe-react-sdk";
import { Button } from "../ui/button";
// import { Spinner } from "../ui/spinner";
import { Separator } from "../ui/separator";
import { format } from "date-fns";
import { Badge } from "../ui/badge";
import { Helmet } from "react-helmet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbList,
} from "../ui/breadcrumb";
import { Toast } from "../ui/toast";
import { Skeleton } from "../ui/skeleton";
interface BlogPost {
  name: string;
  title: string;
  blog_intro: string;
  published_on: string;
  blog_category: string;
  meta_image: string;
  blogger: string;
}

const CategoryBlogList: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  const {
    data: blogData,
    error,
    isLoading,
  } = useFrappeGetDocList<BlogPost>("Blog Post", {
    fields: [
      "name",
      "title",
      "blog_intro",
      "published_on",
      "blog_category",
      "meta_image",
      "blogger",
    ],
    filters: [
      ["blog_category", "=", category ?? ""],
      ["published", "=", 1],
    ],
    orderBy: { field: "published_on", order: "desc" },
  });

  useEffect(() => {
    if (blogData) {
      setBlogs(blogData);
    }
  }, [blogData]);

  if (isLoading)
    return (
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="relative">
              <Skeleton className="w-full h-48" /> {/* Image skeleton */}
              <div className="p-6">
                <div className="flex items-center space-x-2 text-sm">
                  <Skeleton className="w-24 h-4" /> {/* Author skeleton */}
                  <Skeleton className="w-24 h-4" /> {/* Date skeleton */}
                  <Skeleton className="w-16 h-6" /> {/* Category badge skeleton */}
                </div>
                <Skeleton className="w-full h-6 mt-2" /> {/* Title skeleton */}
                <Skeleton className="w-full h-4 mt-1" /> {/* Intro skeleton */}
                <Skeleton className="w-24 h-8 mt-4" /> {/* Button skeleton */}
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  if (error) return <Toast>Error loading blogs: {JSON.stringify(error)}</Toast>;

  return (
    <section className="container mx-auto py-8">
      {/* Helmet for SEO */}
      <Helmet>
        <title>{`${category} Blogs - Alool Technologies`}</title>
        <meta
          name="description"
          content={`Read the latest ${category} blogs from Alool Technologies.`}
        />
      </Helmet>
      {/* Breadcrumb */}
      <div className="mt-4 flex items-center justify-start8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="mx-2" />
            <BreadcrumbItem>
              <BreadcrumbLink href="/blog">Blogs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="mx-2" />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/blog/category/${category}`}>
                {category} Blogs
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center justify-start space-y-4 mt-4">
        <h1 className="text-4xl font-bold mb-3">{category} Blogs</h1>
      </div>
      <Separator className="mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <div key={index} className="relative">
            <img
              src={blog.meta_image}
              alt={blog.title}
              className="w-full h-50 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center space-x-2 text-sm">
                <span>{blog.blogger}</span>
                <span>•</span>
                <span>
                  {format(new Date(blog.published_on), "MMM dd, yyyy")}
                </span>
                <Badge
                  variant="secondary"
                  className="text-primary capitalize mt-2"
                >
                  {blog.blog_category}
                </Badge>
              </div>
              <h3 className="text-lg font-bold mt-2 hover:text-primary">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{blog.blog_intro}</p>
              <Button
                variant="link"
                onClick={() =>
                  navigate(`/blog/${blog.blog_category}/${blog.name}`)
                }
                className="mt-4 text-primary flex items-center"
              >
                Read more &rarr;
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryBlogList;
