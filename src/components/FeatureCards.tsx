
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Flag, Search, User } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureCards = () => {
  const features = [
    {
      icon: Book,
      title: "Daily Wisdom",
      description: "Discover a new idiom or proverb every day from cultures around the world",
      href: "/",
      color: "bg-blue-500"
    },
    {
      icon: Search,
      title: "Explore Languages",
      description: "Compare how different cultures express the same ideas and concepts",
      href: "/explore",
      color: "bg-green-500"
    },
    {
      icon: Flag,
      title: "Interactive Quizzes",
      description: "Test your knowledge with engaging quizzes about idioms and their meanings",
      href: "/quiz",
      color: "bg-purple-500"
    },
    {
      icon: User,
      title: "Cultural Quotes",
      description: "Match idioms with wisdom from famous personalities and thinkers",
      href: "/quotes",
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
            <CardHeader className="text-center pb-2">
              <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                {feature.description}
              </CardDescription>
              <Button asChild variant="outline" className="w-full">
                <Link to={feature.href}>
                  Explore
                </Link>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default FeatureCards;
