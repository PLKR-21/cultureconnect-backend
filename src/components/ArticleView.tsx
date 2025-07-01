import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Badge } from './ui/badge';
import VoiceReader from './VoiceReader';

interface Section {
  title: string;
  content: string;
  level: number;
}

interface WikiArticle {
  title: string;
  summary: string;
  content: string;
  url: string;
  sections: Section[];
  image_url?: string;
  last_modified?: string;
  categories: string[];
  language_links: string[];
}

interface ArticleViewProps {
  article: WikiArticle;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

const ArticleView = ({ article, isBookmarked, onToggleBookmark }: ArticleViewProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-2 flex-1">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-2xl font-bold">{article.title}</h2>
            <div className="flex items-center gap-2">
              <VoiceReader
                text={`${article.summary}. ${article.sections.map(s => `${s.title}. ${s.content}`).join(' ')}`}
                title={article.title}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleBookmark}
                className="hover:bg-orange-100"
              >
                {isBookmarked ? (
                  <BookmarkCheck className="h-5 w-5 text-orange-500" />
                ) : (
                  <Bookmark className="h-5 w-5 text-orange-500" />
                )}
              </Button>
            </div>
          </div>
          {article.last_modified && (
            <p className="text-sm text-gray-500">
              Last updated: {formatDate(article.last_modified)}
            </p>
          )}
        </div>
      </div>

      {article.image_url && (
        <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
          <img
            src={article.image_url}
            alt={article.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <div className="prose prose-orange max-w-none">
        <ReactMarkdown components={{
          h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-5 mb-3" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2" {...props} />,
          p: ({ node, ...props }) => <p className="my-3" {...props} />,
          a: ({ node, ...props }) => (
            <a
              className="text-orange-600 hover:text-orange-800 underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          img: ({ node, ...props }) => (
            <img className="my-4 rounded-lg max-w-full" {...props} />
          ),
        }}>
          {article.summary}
        </ReactMarkdown>

        {article.sections.map((section, index) => (
          <div key={index} className="mt-6">
            <ReactMarkdown components={{
              h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-5 mb-3" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2" {...props} />,
              p: ({ node, ...props }) => <p className="my-3" {...props} />,
              a: ({ node, ...props }) => (
                <a
                  className="text-orange-600 hover:text-orange-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
              img: ({ node, ...props }) => (
                <img className="my-4 rounded-lg max-w-full" {...props} />
              ),
            }}>
              {`${'#'.repeat(section.level)} ${section.title}\n\n${section.content}`}
            </ReactMarkdown>
          </div>
        ))}
      </div>

      {/* Categories */}
      {article.categories.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {article.categories.map((category, index) => (
              <Badge key={index} variant="secondary" className="bg-orange-50 text-orange-700">
                {category}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Language Links */}
      {article.language_links.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">Available Languages</h3>
          <div className="flex flex-wrap gap-2">
            {article.language_links.map((lang, index) => (
              <Badge key={index} variant="outline">
                {lang.toUpperCase()}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-orange-600 hover:text-orange-800"
        >
          View on Wikipedia →
        </a>
      </div>
    </Card>
  );
};

export default ArticleView; 