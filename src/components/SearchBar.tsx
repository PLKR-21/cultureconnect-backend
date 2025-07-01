import { useState, useEffect, useRef } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Mic, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/card';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  suggestions?: string[];
  onVoiceSearch?: () => void;
}

export const SearchBar = ({
  onSearch,
  placeholder = 'Search expressions, idioms, or cultural phrases...',
  suggestions = [],
  onVoiceSearch
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleVoiceSearch = () => {
    if (!isListening && onVoiceSearch) {
      setIsListening(true);
      onVoiceSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            placeholder={placeholder}
            className="pl-10 pr-20 h-12 bg-background border-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          />
          <div className="absolute right-2 flex items-center space-x-2">
            {query && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            {onVoiceSearch && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleVoiceSearch}
              >
                <Mic className={`h-4 w-4 ${isListening ? 'text-primary animate-pulse' : ''}`} />
              </Button>
            )}
          </div>
        </div>
      </form>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && query && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <Card className="overflow-hidden shadow-lg">
              <ul className="py-2 max-h-64 overflow-auto">
                {suggestions
                  .filter((suggestion) =>
                    suggestion.toLowerCase().includes(query.toLowerCase())
                  )
                  .map((suggestion, index) => (
                    <li key={index}>
                      <button
                        className="w-full px-4 py-2 text-left hover:bg-accent transition-colors duration-200"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <span className="text-foreground">{suggestion}</span>
                      </button>
                    </li>
                  ))}
              </ul>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar; 