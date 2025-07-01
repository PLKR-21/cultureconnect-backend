import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Flag } from "lucide-react";

interface Expression {
  text: string;
  language: string;
  meaning: string;
  literal?: string;
}

interface ExpressionGroup {
  concept: string;
  expressions: Expression[];
}

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  const expressionGroups: ExpressionGroup[] = [
    {
      concept: "Starting Something New",
      expressions: [
        { text: "Break the ice", language: "English", meaning: "Initiate conversation or interaction" },
        { text: "Briser la glace", language: "French", meaning: "To break the ice, start interaction" },
        { text: "Das Eis brechen", language: "German", meaning: "To break the ice, overcome initial awkwardness" },
        { text: "बर्फ तोड़ना", language: "Hindi", meaning: "To break the ice, start a conversation" },
        { text: "Romper el hielo", language: "Spanish", meaning: "To break the ice, begin interaction" }
      ]
    },
    {
      concept: "Being Careful",
      expressions: [
        { text: "Look before you leap", language: "English", meaning: "Think carefully before acting" },
        { text: "Réfléchis avant d'agir", language: "French", meaning: "Think before you act" },
        { text: "Erst denken, dann handeln", language: "German", meaning: "First think, then act" },
        { text: "सोच समझकर काम करो", language: "Hindi", meaning: "Work thoughtfully" },
        { text: "Antes de hablar, pensar", language: "Spanish", meaning: "Before speaking, think" }
      ]
    },
    {
      concept: "Perseverance",
      expressions: [
        { text: "Rome wasn't built in a day", language: "English", meaning: "Great things take time" },
        { text: "Rome ne s'est pas faite en un jour", language: "French", meaning: "Rome wasn't built in a day" },
        { text: "Rom wurde nicht an einem Tag erbaut", language: "German", meaning: "Rome wasn't built in a day" },
        { text: "धैर्य का फल मिठा होता है", language: "Hindi", meaning: "The fruit of patience is sweet" },
        { text: "Poco a poco se va lejos", language: "Spanish", meaning: "Little by little, one goes far" }
      ]
    }
  ];

  const filteredGroups = expressionGroups.filter(group =>
    group.concept.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.expressions.some(expr => 
      expr.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expr.language.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              🌍 Explore Cross-Cultural Expressions
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover how different cultures express the same ideas through their unique idioms and proverbs
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search concepts or expressions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-2 border-blue-200 focus:border-blue-400"
              />
            </div>
          </div>

          {/* Expression Groups */}
          <div className="space-y-8">
            {filteredGroups.map((group, groupIndex) => (
              <Card key={groupIndex} className="border-2 border-blue-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <Flag className="h-6 w-6 mr-3" />
                    {group.concept}
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    See how different cultures express this concept
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.expressions.map((expr, exprIndex) => (
                      <div 
                        key={exprIndex}
                        className="bg-white p-4 rounded-lg border-l-4 border-blue-400 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {expr.language}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              if ('speechSynthesis' in window) {
                                const utterance = new SpeechSynthesisUtterance(expr.text);
                                utterance.lang = expr.language === 'English' ? 'en-US' : 
                                               expr.language === 'French' ? 'fr-FR' : 
                                               expr.language === 'German' ? 'de-DE' : 
                                               expr.language === 'Spanish' ? 'es-ES' : 'en-US';
                                speechSynthesis.speak(utterance);
                              }
                            }}
                            className="h-8 w-8 p-0"
                          >
                            🔊
                          </Button>
                        </div>
                        
                        <h4 className="font-bold text-gray-800 mb-2 text-lg">
                          "{expr.text}"
                        </h4>
                        
                        <p className="text-gray-600 text-sm">
                          {expr.meaning}
                        </p>
                        
                        {expr.literal && (
                          <p className="text-gray-500 text-xs italic mt-2">
                            Literal: {expr.literal}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                      Learn More About These Cultures
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredGroups.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">
                No expressions found matching "{searchTerm}"
              </p>
              <Button 
                variant="ghost" 
                onClick={() => setSearchTerm("")}
                className="mt-4"
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
