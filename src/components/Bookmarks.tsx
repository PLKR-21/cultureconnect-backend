import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, ExternalLink, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WikiArticle {
  title: string;
  summary: string;
  url: string;
}

interface BookmarksProps {
  bookmarks: WikiArticle[];
  onRemoveBookmark: (article: WikiArticle) => void;
  onSelectArticle: (article: WikiArticle) => void;
}

export function Bookmarks({ bookmarks, onRemoveBookmark, onSelectArticle }: BookmarksProps) {
  if (!bookmarks.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Bookmark className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>No bookmarks yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {bookmarks.map((article, index) => (
          <motion.div
            key={article.title}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">
                      {article.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {article.summary}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveBookmark(article)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(article.url, '_blank')}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
} 