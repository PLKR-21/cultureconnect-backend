import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Volume2, Bookmark, Share2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VoiceReader } from './VoiceReader';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface DailyIdiomProps {
  idiom?: {
    text: string;
    meaning: string;
    example: string;
    language: string;
    origin?: string;
  };
}

const defaultIdiom = {
  text: "Loading...",
  meaning: "Please wait while we fetch today's idiom.",
  example: "",
  language: "English",
};

export const DailyIdiom = ({ idiom = defaultIdiom }: DailyIdiomProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Daily Idiom',
        text: `${idiom.text} - ${idiom.meaning}`,
        url: window.location.href,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary" />
        
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h2 className="text-sm font-medium text-muted-foreground">
                Daily Idiom
              </h2>
              <p className="text-2xl font-bold text-gradient">{idiom.text}</p>
            </div>
            <div className="flex space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsPlaying(!isPlaying)}
                      disabled={idiom === defaultIdiom}
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Listen to pronunciation</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      disabled={idiom === defaultIdiom}
                    >
                      <Bookmark
                        className={`h-4 w-4 ${
                          isBookmarked ? 'fill-primary' : ''
                        }`}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Save for later</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={handleShare}
                      disabled={idiom === defaultIdiom}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share idiom</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowInfo(!showInfo)}
                      disabled={idiom === defaultIdiom || !idiom.origin}
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Show origin</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Meaning
              </h3>
              <p className="mt-1 text-foreground">{idiom.meaning}</p>
            </div>

            {idiom.example && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Example
                </h3>
                <p className="mt-1 text-foreground italic">{idiom.example}</p>
              </div>
            )}

            <AnimatePresence>
              {showInfo && idiom.origin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Origin
                  </h3>
                  <p className="mt-1 text-foreground">{idiom.origin}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {idiom !== defaultIdiom && (
          <VoiceReader
            text={idiom.text}
            lang={idiom.language}
            isPlaying={isPlaying}
            onEnd={() => setIsPlaying(false)}
          />
        )}
      </Card>
    </motion.div>
  );
};

export default DailyIdiom;
