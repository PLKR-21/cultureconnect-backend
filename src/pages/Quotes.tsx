import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Quote, Search, Globe2, BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CulturalQuote {
  text: string;
  translation?: string;
  origin: string;
  category: string;
  language: string;
}

const SAMPLE_QUOTES: CulturalQuote[] = [
  {
    text: "A journey of a thousand miles begins with a single step",
    translation: "千里之行，始於足下",
    origin: "Chinese",
    category: "Perseverance",
    language: "English/Chinese"
  },
  {
    text: "La vie est belle",
    translation: "Life is beautiful",
    origin: "French",
    category: "Optimism",
    language: "French"
  },
  {
    text: "Wer nicht wagt, der nicht gewinnt",
    translation: "Who doesn't dare, doesn't win",
    origin: "German",
    category: "Courage",
    language: "German"
  },
  {
    text: "El tiempo es oro",
    translation: "Time is gold",
    origin: "Spanish",
    category: "Time",
    language: "Spanish"
  },
  {
    text: "जो गरजते हैं, वो बरसते नहीं",
    translation: "Those who thunder don't rain",
    origin: "Hindi",
    category: "Wisdom",
    language: "Hindi"
  }
];

const CATEGORIES = Array.from(new Set(SAMPLE_QUOTES.map(q => q.category)));

const QuotesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [bookmarkedQuotes, setBookmarkedQuotes] = useState<Set<string>>(new Set());

  const toggleBookmark = (quote: CulturalQuote) => {
    setBookmarkedQuotes(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(quote.text)) {
        newBookmarks.delete(quote.text);
      } else {
        newBookmarks.add(quote.text);
      }
      return newBookmarks;
    });
  };

  const filteredQuotes = SAMPLE_QUOTES.filter(quote => {
    const matchesSearch = searchQuery === '' || 
      quote.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (quote.translation?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      quote.origin.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || quote.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <Quote className="h-16 w-16 mx-auto text-orange-500 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cultural Quotes & Proverbs
          </h1>
          <p className="text-lg text-gray-600">
            Discover wisdom from cultures around the world
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search quotes, translations, or origins..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="gap-2"
            >
              <Globe2 className="h-4 w-4" />
              All Categories
            </Button>
            {CATEGORIES.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Quotes Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredQuotes.map((quote, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start gap-4 mb-4">
                <Badge variant="outline">{quote.origin}</Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleBookmark(quote)}
                  className="text-orange-500"
                >
                  {bookmarkedQuotes.has(quote.text) ? (
                    <BookmarkCheck className="h-5 w-5" />
                  ) : (
                    <BookmarkPlus className="h-5 w-5" />
                  )}
                </Button>
              </div>
              
              <blockquote className="text-xl font-serif mb-4">
                "{quote.text}"
              </blockquote>
              
              {quote.translation && (
                <p className="text-gray-600 italic mb-4">
                  Translation: "{quote.translation}"
                </p>
              )}

              <div className="flex items-center justify-between mt-4">
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  {quote.category}
                </Badge>
                <span className="text-sm text-gray-500">{quote.language}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuotesPage;
