import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFrappeGetDocList, useFrappeGetDoc } from "frappe-react-sdk";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { format } from "date-fns";
import { Badge } from "../ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "../ui/pagination";
import { Helmet } from "react-helmet";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";

interface BlogPost {
  name: string;
  title: string;
  blog_intro: string;
  published_on: string;
  blog_category: string;
  route: string;
  meta_image: string;
  meta_title: string;
  meta_description: string;
  blogger: string;
  featured: string;
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [currentDate, setCurrentDate] = useState("desc");
  const itemsPerPage = 2;
  const navigate = useNavigate();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);

  const { data: blogData, error, isLoading } = useFrappeGetDocList<BlogPost>("Blog Post", {
    fields: ["*"],
    filters: [["published", "=", 1]],
    orderBy: { field: "published_on", order: "desc" },
  });

  const { data: blogSettings, isLoading: isBlogSettingsLoading } = useFrappeGetDoc(
    "Blog Settings",
    "Blog Settings",
    { fields: ["*"] }
  );

  useEffect(() => {
    if (blogData) {
      const sortedBlogs = [...blogData].sort((a, b) => {
        const dateA = new Date(a.published_on).getTime();
        const dateB = new Date(b.published_on).getTime();
        return currentDate === "asc" ? dateA - dateB : dateB - dateA;
      });

      const filteredBlogs = currentCategory === "all"
        ? sortedBlogs
        : sortedBlogs.filter(blog => blog.blog_category === currentCategory);

      setBlogs(filteredBlogs);
      setTotalPages(Math.ceil(filteredBlogs.length / itemsPerPage));
    }
  }, [blogData, currentCategory, currentDate]);

  const handleCategoryChange = (value: string) => {
    setCurrentCategory(value);
    setIsCategoryOpen(false);
  };

  const handleDateChange = (value: string) => {
    setCurrentDate(value);
    setIsDateOpen(false);
  };

  const BlogCardSkeleton = ({ isFeatured = false }: { isFeatured?: boolean }) => (
    <div className={`relative ${isFeatured ? 'lg:col-span-2' : ''}`}>
      <Skeleton className={`w-full ${isFeatured ? 'h-96' : 'h-48'}`} />
      <div className="p-4">
        <div className="flex items-center space-x-2 text-sm mt-2">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-4 h-4" />
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-16 h-6" />
        </div>
        <Skeleton className={`w-3/4 h-6 mt-2 ${isFeatured ? 'text-2xl' : 'text-lg'}`} />
        {isFeatured && <Skeleton className="w-full h-4 mt-2" />}
        <Skeleton className="w-24 h-8 mt-4" />
      </div>
    </div>
  );

  if (isLoading || isBlogSettingsLoading) {
    return (
      <section className="container mx-auto px-4">
        <Skeleton className="w-full h-50 mb-8" />
        <div className="flex flex-col sm:flex-row justify-end gap-4 mb-8">
          <Skeleton className="w-[180px] h-10" />
          <Skeleton className="w-[130px] h-10" />
        </div>
        <Skeleton className="w-1/2 h-8 mb-2" />
        <Skeleton className="w-full h-1 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <BlogCardSkeleton isFeatured={true} />
          <div className="lg:col-span-1 flex flex-col space-y-8">
            <BlogCardSkeleton />
            <BlogCardSkeleton />
          </div>
        </div>
        <Skeleton className="w-1/2 h-8 mt-12 mb-4" />
        <Skeleton className="w-full h-1 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Skeleton className="w-[300px] h-10" />
        </div>
      </section>
    );
  }

  if (error) return <div>Error loading blogs: {JSON.stringify(error)}</div>;

  const recentPosts = blogs.slice(0, 4);
  const featuredPost = recentPosts.find(post => post.featured === "1");
  const otherRecentPosts = recentPosts.filter(post => post.featured !== "1");
  const paginatedBlogs = blogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const uniqueCategories = [...new Set(blogs.map(blog => blog.blog_category))];

  const BlogCard = ({ blog, isFeatured = false }: { blog: BlogPost; isFeatured?: boolean }) => (
    <div className={`relative ${isFeatured ? 'lg:col-span-2' : ''}`}>
      <img
        src={blog.meta_image}
        alt={blog.title}
        className={`w-full object-cover ${isFeatured ? 'h-96' : 'h-48'}`}
      />
      <div className="p-4">
        <div className="flex items-center space-x-2 text-sm mt-2">
          <span>{blog.blogger}</span>
          <span>•</span>
          <span>{format(new Date(blog.published_on), "MMM dd, yyyy")}</span>
          <Badge variant="secondary" className="text-primary capitalize">
            {blog.blog_category}
          </Badge>
        </div>
        <h3 className={`font-bold mt-2 hover:text-primary ${isFeatured ? 'text-2xl' : 'text-lg'}`}>
          {blog.title}
        </h3>
        {isFeatured && <p className="mt-2">{blog.blog_intro}</p>}
        <Button
          variant="link"
          onClick={() => navigate(`/blog/${blog.blog_category}/${blog.name}`)}
          className="flex items-center mt-4"
        >
          Read more &rarr;
        </Button>
      </div>
    </div>
  );

  return (
    <section className="container mx-auto px-4">
      <Helmet>
        <title>Blog - Alool Technologies</title>
        <meta name="description" content="Read the latest blogs and updates from Alool Technologies." />
      </Helmet>

      {/* Background Image Section */}
      <div className="relative h-50 mb-8">
        {blogSettings?.preview_image ? (
          <img
            src={blogSettings.preview_image}
            alt="Blog Header Image"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <Skeleton className="w-full h-full" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-70" />
        <div className="relative z-10 text-center py-16 text-white">
          <h1 className="text-4xl font-bold">{blogSettings?.blog_title || "Blogs"}</h1>
          <p className="mt-2">{blogSettings?.blog_introduction || ""}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 mb-8">
        <Select 
          open={isCategoryOpen} 
          onOpenChange={setIsCategoryOpen} 
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Blog Categories</SelectLabel>
              <SelectSeparator />
              <SelectItem value="all">All</SelectItem>
              {uniqueCategories.map((category, index) => (
                <SelectItem key={index} value={category}>{category}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select 
          open={isDateOpen} 
          onOpenChange={setIsDateOpen} 
          onValueChange={handleDateChange}
        >
          <SelectTrigger className="w-full sm:w-[130px]">
            <SelectValue placeholder="Sort By Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by Date</SelectLabel>
              <SelectSeparator />
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Recent Blog Posts Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-2">Recent blog posts</h2>
        <Separator className="mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPost ? (
            <>
              <BlogCard blog={featuredPost} isFeatured={true} />
              <div className="lg:col-span-1 flex flex-col space-y-8">
                {otherRecentPosts.slice(0, 2).map((blog, index) => (
                  <BlogCard key={index} blog={blog} />
                ))}
              </div>
            </>
          ) : (
            recentPosts.map((blog, index) => <BlogCard key={index} blog={blog} />)
          )}
        </div>
      </section>

      {/* All Blog Posts Section */}
      <section className="py-4">
        <h2 className="text-3xl font-bold mb-4">All blog posts</h2>
        <Separator className="mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedBlogs.map((blog, index) => <BlogCard key={index} blog={blog} />)}
        </div>

        {/* Pagination */}
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </section>
  );
};

export default BlogList;