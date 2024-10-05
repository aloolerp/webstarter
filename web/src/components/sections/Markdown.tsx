import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Optional: GitHub-flavored markdown
import rehypeRaw from 'rehype-raw'; // Allows rendering raw HTML in markdown

interface MarkdownProps {
    content?: string;
    align?: 'left' | 'center' | 'right'; // Alignment options
}

const Markdown = ({ content, align = 'left' }: MarkdownProps) => {
    // Determine alignment class
    const alignmentClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';

    return (
        <div className={`container mx-auto px-4 py-8 ${alignmentClass}`}>
            {content && (
                <ReactMarkdown
                    className="prose dark:prose-dark" // Tailwind prose for markdown styling
                    remarkPlugins={[remarkGfm]} // Support GitHub-flavored markdown
                    rehypePlugins={[rehypeRaw]} // Allow raw HTML inside markdown
                >
                    {content}
                </ReactMarkdown>
            )}
        </div>
    );
};

export default Markdown;
