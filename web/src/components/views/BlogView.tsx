/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useFrappeGetDoc, useFrappeGetDocList } from 'frappe-react-sdk';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../ui/spinner';
import { format } from 'date-fns'; // For date formatting
import { Separator } from '../ui/separator';

import { Button } from '../ui/button';

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
  content: string;
  read_time: string;
  tag: string[]; 
  custom_tag: { tag: string }[];
}

const BlogView: React.FC = () => {
  const { name } = useParams();  
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);
  const navigate = useNavigate();

  // Fetch the current blog post
  const { data: blogData, error, isLoading } = useFrappeGetDoc<BlogPost>('Blog Post', name || '');

  useEffect(() => {
    if (blogData) {
      setBlog(blogData);
    }
  }, [blogData]);

  // Fetch related blogs by the same category
  const { data: relatedBlogData } = useFrappeGetDocList<BlogPost>('Blog Post', {
    fields: ['name','title', 'blog_intro', 'route', 'meta_image', 'blogger', 'published_on'],
    filters: [
      ['blog_category', '=', blog?.blog_category],
      ['name', '!=', name], // Exclude the current blog post
      ['published', '=', 1] // Ensure we only fetch published blogs
    ],
    limit: 3, // Limit to 3 related blogs
  });

  useEffect(() => {
    if (relatedBlogData) {
      setRelatedBlogs(relatedBlogData);
    }
  }, [relatedBlogData, blog]);

  if (isLoading) return <Spinner size="large" />;
  if (error) return <div>Error loading blog: {JSON.stringify(error)}</div>;

  if (!blog) return <div>Blog not found</div>;

  return (
    <div className="container mx-auto ">
    <div className="container mx-auto py-12 px-4 lg:px-8 max-w-screen-md">
      {/* Helmet for SEO */}
      <Helmet>
        <title>{blog.meta_title}</title>
        <meta name="description" content={blog.meta_description} />
        <meta property="og:image" content={blog.meta_image} />
        <link href="https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&display=swap" rel="stylesheet" />
      </Helmet>

      {/* Blog Metadata */}
      <div className="mb-2 flex items-center justify-between text-gray-500">
      {/* Category and read time */}
      <div className="flex space-x-2">
        <span className="capitalize">{blog.blog_category}</span> {/* Capitalizes the first letter */}
        <span>|</span>
        <span>{blog.read_time} min read</span>
      </div>
      
      {/* Published date on the far right */}
      <span className="text-right">Published on {format(new Date(blog.published_on), 'MMM dd, yyyy')}</span>
      
    </div>
    <Separator className="mb-5" />


      {/* Blog Title */}
      <h1 className="text-4xl font-bold mb-4 font-serif" style={{ fontFamily: 'PT Serif, serif' }}>
        {blog.title}
      </h1>

      {/* Blog Intro */}
      <p className="text-xl text-gray-600 mb-6" style={{ fontFamily: 'PT Serif, serif' }}>
        {blog.blog_intro}
      </p>

      {/* Featured Image */}
      {blog.meta_image && (
        <div className="mb-8">
          <img src={blog.meta_image} alt={blog.title} className="w-full object-cover rounded-lg" />
        </div>
      )}

      {/* Blog Content */}
      <div className="prose lg:prose-lg prose-headings:font-serif prose-blockquote:font-serif mb-8 mx-auto text-justify" style={{ fontFamily: 'Lora, serif' }}
      dangerouslySetInnerHTML={{ __html: blog.content }}/>

      {/* <div className="prose lg:prose-lg prose-headings:font-serif prose-blockquote:font-serif mb-8 mx-auto text-justify" style={{ fontFamily: 'Lora, serif' }}>
      <ReactMarkdown
          remarkPlugins={[remarkGfm]}  
          rehypePlugins={[rehypeRaw]}  
          components={{
            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-4" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mb-4" {...props} />,
            blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
            a: ({ node, ...props }) => <a className="text-primary hover:underline" {...props} />
          }}
        >
          {blog.content}
        </ReactMarkdown>
     </div> */}

      {/* Blog Tags */}
      {blog.custom_tag && blog.custom_tag.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {blog.custom_tag.map((tagItem, index) => (
            <span key={index} className="bg-gray-200 text-sm px-2 py-1 rounded-full">
              {tagItem.tag}
            </span>
          ))}
        </div>
      )}
  </div>
  <Separator className="mt-3" />
      {/* Related Articles Section */}
      <section className="mt-8 mb-16 p-8">
        <h2 className="text-4xl font-bold mb-6">Related Articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8">
          {relatedBlogs.map((relatedBlog, index) => (
            <div key={index} className="relative">
              <img
                src={relatedBlog.meta_image}
                alt={relatedBlog.title}
                className="w-full h-50 object-cover rounded-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{relatedBlog.title}</h3>
                <p className="text-sm text-gray-600">{relatedBlog.blog_intro}</p>
                <div className="mt-4 flex items-center">
                  <span className="text-sm text-gray-500">{relatedBlog.blogger}</span>
                  <span className="ml-2 text-sm text-gray-500">
                    {format(new Date(relatedBlog.published_on), 'MMM dd, yyyy')}
                  </span>
                
                </div>
                <Button
                  variant="link"
                  onClick={() => navigate(`/blog/${relatedBlog.name}`)}
                  className="mt-4 text-primary flex items-center"
                >
                  Read more &rarr;
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogView;
