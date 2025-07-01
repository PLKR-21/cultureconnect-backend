import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { Expression } from '@/types/expressions';
import { Progress } from '@/components/ui/progress';

interface QuizQuestion {
  expression: Expression;
  options: string[];
  correctAnswer: string;
}

const QuizPage = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  // Sample quiz data
  const generateQuestions = () => {
    const quizQuestions: QuizQuestion[] = [
      {
        expression: {
          text: "Break the ice",
          language: "English",
          meaning: "Initiate conversation or interaction"
        },
        options: [
          "End a conversation",
          "Initiate conversation or interaction",
          "Cool down a drink",
          "Solve a problem"
        ],
        correctAnswer: "Initiate conversation or interaction"
      },
      {
        expression: {
          text: "Briser la glace",
          language: "French",
          meaning: "To break the ice, start interaction",
          literal: "Break the ice"
        },
        options: [
          "To make ice cubes",
          "To break the ice, start interaction",
          "To end a meeting",
          "To cool down"
        ],
        correctAnswer: "To break the ice, start interaction"
      },
      {
        expression: {
          text: "Strike while the iron is hot",
          language: "English",
          meaning: "Take advantage of an opportunity when it presents itself"
        },
        options: [
          "Work in a blacksmith shop",
          "Take advantage of an opportunity when it presents itself",
          "Make quick decisions",
          "Work with metal"
        ],
        correctAnswer: "Take advantage of an opportunity when it presents itself"
      }
    ];
    setQuestions(quizQuestions);
  };

  useEffect(() => {
    generateQuestions();
  }, []);

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
    generateQuestions();
  };

  if (questions.length === 0) return null;

  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="p-8 text-center">
            <div className="mb-6">
              <CheckCircle2 className="h-16 w-16 mx-auto text-green-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
              <p className="text-gray-600">
                You scored {score} out of {questions.length}
              </p>
            </div>
            <Progress value={(score / questions.length) * 100} className="mb-6" />
            <Button onClick={restartQuiz} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <Brain className="h-16 w-16 mx-auto text-orange-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cultural Expressions Quiz
          </h1>
          <p className="text-gray-600">
            Test your knowledge of expressions from around the world
          </p>
        </div>

        <div className="mb-6">
          <Progress 
            value={((currentQuestionIndex) / questions.length) * 100} 
            className="mb-2"
          />
          <p className="text-sm text-gray-500 text-right">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        <Card className="p-6 mb-8">
          <div className="mb-6">
            <div className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
              {currentQuestion.expression.language}
            </div>
            <h2 className="text-2xl font-bold mb-2">
              "{currentQuestion.expression.text}"
            </h2>
            {currentQuestion.expression.literal && (
              <p className="text-sm text-gray-500 italic">
                Literal: {currentQuestion.expression.literal}
              </p>
            )}
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant={
                  isAnswered
                    ? option === currentQuestion.correctAnswer
                      ? "default"
                      : option === selectedAnswer
                      ? "destructive"
                      : "outline"
                    : "outline"
                }
                className={`w-full justify-start text-left p-4 h-auto ${
                  isAnswered ? "cursor-not-allowed" : ""
                }`}
                onClick={() => handleAnswer(option)}
                disabled={isAnswered}
              >
                {isAnswered && option === currentQuestion.correctAnswer && (
                  <CheckCircle2 className="h-4 w-4 mr-2 text-white" />
                )}
                {isAnswered && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                  <XCircle className="h-4 w-4 mr-2" />
                )}
                {option}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default QuizPage;
