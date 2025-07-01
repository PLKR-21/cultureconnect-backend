import React from 'react';
import { Loader2 } from "lucide-react";
import ArticleView from './ArticleView';

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

interface SearchResultsProps {
  results: WikiArticle[];
  loading: boolean;
  error: string | null;
  bookmarkedArticles?: Set<string>;
  onToggleBookmark: (article: WikiArticle) => void;
}

const SearchResults = ({ 
  results, 
  loading, 
  error,
  bookmarkedArticles = new Set<string>(),
  onToggleBookmark 
}: SearchResultsProps) => {
  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-orange-500" />
          <p className="text-gray-500">Searching Wikipedia...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-medium">{error}</p>
          <p className="text-gray-500 mt-2">Please try again with a different search term.</p>
        </div>
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 font-medium">No results found</p>
          <p className="text-gray-400 mt-2">Try searching with different keywords.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {results.map((article, index) => (
        <ArticleView
          key={article.title + index}
          article={article}
          isBookmarked={bookmarkedArticles.has(article.title)}
          onToggleBookmark={() => onToggleBookmark(article)}
        />
      ))}
    </div>
  );
};

export default SearchResults; 