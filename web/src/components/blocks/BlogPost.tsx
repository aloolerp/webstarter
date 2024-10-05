import React, { useState, useEffect } from "react";
import { useFrappeGetDocList, useFrappeGetDoc } from "frappe-react-sdk";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Spinner } from '../ui/spinner';
import { Helmet } from "react-helmet";


export const BlogPost = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6); // Number of posts per page

  // Fetch Blog Settings
  const { data: blogSettings = {}, error: settingsError } = useFrappeGetDoc(
    "Blog Settings",
    "Blog Settings" // Assuming there is only one document with this name
  );

  // Fetch Blog Posts
  const { data: blogData = [], error: blogError, isLoading } = useFrappeGetDocList(
    "Blog Post",
    {
      fields: [
        "name",
        "title",
        "meta_title",
        "meta_description",
        "blog_category",
        "meta_image",
        "published_on",
        "read_time",

      ],
      filters: [["published", "=", 1]],
      limit_start: (currentPage - 1) * postsPerPage,
      limit: postsPerPage,
    }
  );

  // Fetch Categories
  const { data: categoryData = [], error: categoryError } = useFrappeGetDocList(
    "Blog Category",
    {
      fields: ["name", "title"],
    }
  );


    // Fetch the latest 5 blog posts for "Recent Blogs" section
    const { data: recentBlogs } = useFrappeGetDocList('Blog Post', {
        fields: ['title', 'route'],
        filters: [['published', '=', 1]],
        limit: 5,
        order_by: 'published_on desc',
    });

  useEffect(() => {
    if (blogData && filteredPosts !== blogData) {
      setFilteredPosts(blogData);
    }
  }, [blogData, filteredPosts]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const results = blogData?.filter((post) =>
      post.title.toLowerCase().includes(value)
    );
    setFilteredPosts(results || []);
    setShowSuggestions(!!results?.length);
  };

  if (settingsError) {
    return <div><p className="text-center text-red-500">Error loading blog settings: {settingsError.message}</p></div>;
  }

  if (blogError) {
    return <div><p className="text-center text-red-500">Error loading blog posts: {blogError.message}</p></div>;
  }

  if (isLoading) {
    return <div  className="items-center py-40"> <Spinner size="large"/></div>;
  }

  if (!blogData || !blogSettings) {
    return <div><p className="text-center text-gray-500">Blog data or settings not found.</p></div>;
  }
  if (categoryError) {
    return <div>
      <p className="text-center text-red-500">Error loading blog settings: {categoryError.message}</p></div>;
  }

  return (
    <section>
     {/* Helmet for SEO */}
     <Helmet>
        <title>Blog - Alool Technologies</title>
        <meta name="description" content="Read the latest blogs and updates from Alool Technologies." />
      </Helmet>
      {/* Background Image Section */}
      <div className="relative h-64">
        {blogSettings.preview_image && (
          <img
            src={blogSettings.preview_image}
            alt="Blog Header Image"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-70" />
        <div className="relative z-10 text-center py-16 text-white">
          <h1 className="text-4xl font-bold">{blogSettings.blog_title || "Blog"}</h1>
          <p className="mt-2">{blogSettings.blog_introduction || ""}</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          {/* Blog Search */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold">Search</h2>
            <Input
              type="search"
              placeholder="Search blog"
              value={searchTerm}
              onChange={handleSearch}
              className="mt-2"
            />
            {showSuggestions && filteredPosts.length > 0 && (
              <ul className="bg-white shadow-lg mt-2 p-4">
                {filteredPosts.map((post) => (
                  <li
                    key={post.name}
                    className="cursor-pointer hover:bg-gray-100 p-2"
                  >
                    <Link to={`/blog/${post.name}`}>{post.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Categories List */}
          <div className="mb-8 border rounded-lg ">
            <h2 className="text-lg font-semibold ml-2">Categories</h2>
            <ul className="my-2 ml-2 space-y-2">
              <li>All ({blogData?.length})</li>
              {categoryData?.map((category) => (
                <li  key={category.name}>{category.title} ({blogData?.length})</li>
              ))}
            </ul>
          </div>

            {/* Tags */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold">Tags</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {/* Example static tags */}
              <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                Design
              </span>
              <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                Technology
              </span>
            </div>
          </div>

         
          {/* Popular Posts */}
          <div>
          <h3 className="text-lg font-semibold mb-2">Recent Blogs</h3>
            <ul className="space-y-2">
                                {recentBlogs?.map((recentBlog, index) => (
                                    <li key={index}>
                                        <a href={recentBlog.route} className="text-primary hover:underline">
                                            {recentBlog.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
          </div>
          
         

        </aside>

        {/* Blog Post Cards */}
        <main className="lg:col-span-3 mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredPosts.slice(0, postsPerPage).map((post) => (
              <article
                key={post.name}
                className="overflow-hidden rounded-lg shadow transition hover:shadow-lg"
              >
                {post.meta_image && (
                  <img
                    alt={post.title}
                    src={post.meta_image}
                    className="h-56 w-full object-cover"
                  />
                )}
                <div className="bg-white p-4 sm:p-6">
                  <time
                    dateTime={post.published_on}
                    className="block text-xs text-gray-500"
                  >
                    {new Date(post.published_on).toLocaleDateString()}
                  </time>
                  <h3 className="mt-0.5 text-lg font-semibold text-gray-900">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                    {post.meta_description}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Read time: {post.read_time ? `${post.read_time} minutes` : "Unknown"}
                  </p>
                  <Link
                    to={`/web/blog/${post.name}`}
                    className="mt-auto text-primary font-medium hover:underline flex items-center justify-start"
                  >
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="mx-4">
              Page {currentPage}
            </span>
            <Button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={filteredPosts.length < postsPerPage}
            >
              Next
            </Button>
          </div>
        </main>
      </div>
    </section>
  );
};

export default BlogPost;