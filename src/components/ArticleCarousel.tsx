import { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
}

interface ArticleCarouselProps {
  articles: Article[];
}

export const ArticleCarousel = ({ articles }: ArticleCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex >= articles.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = articles.length - 1;
      return nextIndex;
    });
  };

  useEffect(() => {
    const startTimer = () => {
      timeoutRef.current = window.setTimeout(() => {
        paginate(1);
      }, 5000);
    };

    startTimer();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex]);

  return (
    <div className="relative overflow-hidden w-full h-[500px] bg-gradient-to-b from-background to-accent/5">
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            <Card className="w-full max-w-4xl mx-4 overflow-hidden">
              <div className="flex flex-col md:flex-row h-full">
                <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                  <img
                    src={articles[currentIndex].image}
                    alt={articles[currentIndex].title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center rounded-full bg-primary/90 px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                      {articles[currentIndex].category}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:w-1/2 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-gradient">
                      {articles[currentIndex].title}
                    </h2>
                    <p className="text-muted-foreground">
                      {articles[currentIndex].excerpt}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {articles[currentIndex].readTime} min read
                    </span>
                    <Button variant="outline" className="hover-gradient">
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
        onClick={() => paginate(-1)}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
        onClick={() => paginate(1)}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {articles.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === currentIndex ? 'bg-primary' : 'bg-primary/20'
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticleCarousel; 