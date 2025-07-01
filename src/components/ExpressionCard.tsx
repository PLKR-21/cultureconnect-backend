import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Play, Pause, Volume2 } from 'lucide-react';
import { VoiceReader } from './VoiceReader';
import { motion } from 'framer-motion';

interface ExpressionCardProps {
  expression: string;
  meaning: string;
  language: string;
  translation?: string;
  category?: string;
  usage?: string;
}

export const ExpressionCard = ({
  expression,
  meaning,
  language,
  translation,
  category,
  usage
}: ExpressionCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="perspective"
    >
      <div
        className={`relative transform-gpu transition-transform duration-500 preserve-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <Card className="p-6 h-full bg-card hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gradient">{expression}</h3>
              {translation && (
                <p className="text-sm text-muted-foreground">{translation}</p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(!isPlaying);
              }}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="mt-4">
            <p className="text-sm text-foreground/80">{meaning}</p>
          </div>

          {category && (
            <div className="mt-4">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {category}
              </span>
            </div>
          )}

          <VoiceReader
            text={expression}
            lang={language}
            isPlaying={isPlaying}
            onEnd={() => setIsPlaying(false)}
          />
        </Card>

        {/* Back of card */}
        <Card className="absolute inset-0 p-6 bg-card rotate-y-180 backface-hidden">
          <div className="space-y-4">
            <h4 className="font-semibold text-gradient">Usage Examples</h4>
            <p className="text-sm text-foreground/80">{usage || "No usage examples available."}</p>
            
            <div className="mt-auto pt-4">
              <p className="text-xs text-muted-foreground">
                Click to flip back
              </p>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default ExpressionCard; 