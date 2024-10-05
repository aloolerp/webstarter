import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useFrappeGetDoc,useFrappeGetDocList,useFrappeUpdateDoc,useFrappeCreateDoc,} from "frappe-react-sdk";
import { Calendar, Folder, Clock, MessageCircle, ThumbsUp } from "lucide-react";
import { Input } from "@/components/ui/input"; // Using Shadcn components for form elements
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"; // Avatar components
import { Skeleton } from "../ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { format, formatDistanceToNowStrict } from "date-fns";
import { Separator } from "../ui/separator";
import { Helmet } from "react-helmet";

interface Blog {
  name: string;
  title: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
  meta_image?: string;
  creation: string;
  blog_intro: string;
  blog_category?: string;
  published_on?: string;
  blogger?: string;
  tags?: string[];
  custom_like: number;
  read_time?: number; // Directly fetch the read_time field
  count: number;
}

interface Comment {
  comment_by: string;
  comment_email: string;
  content: string;
  creation: string;
  comment_type: string;
}

const BlogDetail = () => {
  const { name } = useParams<{ name: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [commentBy, setCommentBy] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false); // Toggle form visibility
  const [liked, setLiked] = useState(false);
  const blogName = name || "";

  const {
    data: relatedBlogsData,
    error: relatedBlogsError,
    isLoading: isRelatedBlogsLoading,
  } = useFrappeGetDocList<Blog>("Blog Post", {
    fields: ["name", "title", "meta_image", "blog_category", "published_on"],
    filters: [
      ["blog_category", "=", blog?.blog_category ?? ""],
      ["name", "!=", blog?.name ?? ""],
    ],
    limit: 3,
  });

  const {
    data: blogData,
    error: blogError,
    isLoading,
    mutate: refreshBlog,
  } = useFrappeGetDoc<Blog>("Blog Post", blogName, {
    fields: [
      "name",
      "title",
      "content",
      "meta_title",
      "meta_description",
      "read_time",
      "blogger",
      "meta_image",
      "creation",
      "published_on",
      "blog_category",
      "tags",
      "blog_intro",
      "custom_like",
    ],
  });

  const {
    data: commentsData,
    error: commentsError,
    mutate: refreshComments,
  } = useFrappeGetDocList<Comment>("Comment", {
    fields: ["comment_by", "comment_email", "content", "creation"],
    filters: [
      ["reference_doctype", "=", "Blog Post"],
      ["reference_name", "=", blogName],
      ["comment_type", "=", "Comment"],
    ],
    orderBy: {
      field: "creation",
      order: "desc",
    },
  });

  const { updateDoc } = useFrappeUpdateDoc();
  const { createDoc } = useFrappeCreateDoc();

  useEffect(() => {
    if (blogData) setBlog(blogData);

    if (commentsData) setComments(commentsData);
  }, [blogData, commentsData]);

  const handleSubmitComment = async () => {
    if (!newComment || !commentBy || !commentEmail) return;

    const newCommentData = {
      comment_type: "Comment",
      reference_doctype: "Blog Post",
      reference_name: name,
      comment_by: commentBy,
      comment_email: commentEmail,
      content: newComment,
    };

    try {
      await createDoc("Comment", newCommentData);
      setNewComment("");
      setCommentBy("");
      setCommentEmail("");
      refreshComments();
      setShowCommentForm(false); // Hide the form after submission
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleLike = async () => {
    if (liked || !blog) return;
    const updatedLikeCount = (blog.custom_like || 0) + 1;

    try {
      await updateDoc("Blog Post", blog.name, {
        custom_like: updatedLikeCount,
      });
      setLiked(true);
      refreshBlog();
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };

  // const calculateReadTime = (text: string): number => {
  //   const wordsPerMinute = 200;
  //   const textLength = text.split(/\s+/).length;
  //   return Math.ceil(textLength / wordsPerMinute);
  // };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Skeleton />
      </div>
    );
  }
  if (blogError || commentsError) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {blogError?.message ||
              commentsError?.message ||
              "Unknown error occurred"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!blog) {
    return (
      <div>
        <p className="text-center text-gray-500">Blog not found.</p>
      </div>
    );
  }

  // const readTime = calculateReadTime(blog.content);
  const totalComments = commentsData ? commentsData.length : 0;
  const totalLikes = blog.custom_like || 0;

  return (
    <section className="py-10">
     
        <Helmet>
          <title>{blog.meta_title || 'Blog - Alool Technologies'}</title>
          <meta
            name="description"
            content={blog.meta_description || 'Read the latest blogs and updates from Alool Technologies.'}
          />
          {blog.meta_image && <meta property="og:image" content={blog.meta_image} />}
        </Helmet>
      
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          {blog.meta_image && (
            <img
              src={blog.meta_image}
              alt={blog.meta_title || blog.title}
              className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
            />
          )}

          <h1 className="text-4xl font-bold dark:text-foreground mb-4 text-left">
            {blog.title}
          </h1>

          {blog.blog_intro && (
            <p className="dark:text-foreground mb-4 text-left">
              {blog.blog_intro}
            </p>
          )}

          <div className="flex items-start lg:items-center dark:text-foreground text-sm mb-6 justify-start">
            <Calendar className="w-4 h-4 mr-1" />
            <span>
              {blog.creation && format(new Date(blog.creation), "MMMM d, yyyy")}
            </span>
            <span className="mx-3">/</span>
            <Folder className="w-4 h-4 mr-1" />
            <span>{blog.blog_category || "General"}</span>
            <span className="mx-3">/</span>
            <Clock className="w-4 h-4 mr-1" />
            <span>
              {blog.read_time
                ? `${blog.read_time} min read`
                : "Unknown read time"}
            </span>{" "}
            {/* Use the `read_time` field */}
          </div>

          <hr className="my-4 bg-gray-100 border-b-2 border-gray-200" />

          <div className="prose dark:text-foreground max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }}/>

          <div className="flex justify-between mt-10 mb-6 text-gray-600">
            {/* Left Section: Likes and Comments */}
            <div className="flex space-x-4">
              <div
                className="flex items-center cursor-pointer"
                onClick={handleLike}
              >
                <ThumbsUp
                  className={`w-6 h-6 mr-1 ${
                    liked ? "text-primary" : "text-gray-600"
                  }`}
                />
                <span>{totalLikes} </span>
              </div>

              <div className="flex items-center">
                <MessageCircle className="w-6 h-6 mr-1 text-gray-600" />
                <span>{totalComments} </span>
              </div>
            </div>

            {/* Right Section: Published On */}
            <div className="flex items-center  ml-auto">
              <span>
                {blog.published_on &&
                  format(new Date(blog.published_on), "MMMM d, yyyy")}
              </span>
            </div>
          </div>

          <Separator />
          {/* Add Comment Section */}
          <div className="mt-10">
            {showCommentForm ? (
              <div className="mt-4">
                <div className="flex space-x-4 mb-4">
                  <Input
                    value={commentBy}
                    onChange={(e) => setCommentBy(e.target.value)}
                    placeholder="Your Name"
                    className="w-1/2"
                  />
                  <Input
                    value={commentEmail}
                    onChange={(e) => setCommentEmail(e.target.value)}
                    placeholder="Your Email"
                    className="w-1/2"
                  />
                </div>
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Your Comment"
                  className="mb-4 w-full"
                />
                {/* Submit Comment Button */}
                <Button
                  onClick={handleSubmitComment}
                  className="bg-primary text-white mt-4"
                >
                  Submit Comment
                </Button>
              </div>
            ) : (
              /* Add Comment Button */
              <Button
                onClick={() => setShowCommentForm(true)}
                className="bg-primary text-white"
              >
                Add Comment
              </Button>
            )}
          </div>

          <div className="mt-10 mb-10">
            <h3 className="text-2xl font-semibold mb-4">Comments</h3>
            <div className="space-y-6">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="relative pl-10 mb-6 border-l-2  border-gray-200 dark:border-gray-700"
                >
                  <Avatar className="absolute -left-6 top-0 bg-gray-100 dark:bg-gray-800">
                    <AvatarFallback>
                      {comment.comment_by?.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className=" border p-6 rounded-xl mb-">
                    <div className="flex items-center mb-2">
                      <strong className="mr-2">{comment.comment_by}</strong>
                      <span className="text-gray-500 text-sm">
                        {formatDistanceToNowStrict(new Date(comment.creation), {
                          addSuffix: true,
                        })}
                      </span>{" "}
                      {/* Use date-fns to format time */}
                    </div>
                    <p>{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Separator />
        {/* Related Blogs Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Related Blogs</h3>
          {isRelatedBlogsLoading && <Skeleton />} {/* Show loading state */}
          {relatedBlogsError && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {relatedBlogsError.message || "Unable to load related blogs"}
              </AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedBlogsData?.map((relatedBlog) => (
              <Link
                to={`/blogs/${relatedBlog.name}`}
                key={relatedBlog.name}
                className="group block hover:text-primary"
              >
                <div className="border rounded-lg overflow-hidden shadow-md">
                  {relatedBlog.meta_image && (
                    <img
                      src={relatedBlog.meta_image}
                      alt={relatedBlog.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                    />
                  )}
                  <div className="p-4">
                    <h4 className="text-lg font-bold">{relatedBlog.title}</h4>
                    <p className="text-gray-500 text-sm">
                      {format(
                        new Date(relatedBlog.published_on || Date.now()),
                        "MMMM d, yyyy"
                      )}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
