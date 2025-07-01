import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Globe2, 
  BookOpen, 
  Brain, 
  Quote, 
  Volume2,
  Search,
  Bookmark,
  History,
  Github
} from 'lucide-react';

const features = [
  {
    icon: <Globe2 className="h-6 w-6" />,
    title: "Cross-Cultural Expressions",
    description: "Explore how different cultures express similar ideas through their unique idioms and proverbs."
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Language Learning",
    description: "Learn expressions in multiple languages with translations and cultural context."
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "Interactive Quiz",
    description: "Test your knowledge of cultural expressions with our engaging quiz feature."
  },
  {
    icon: <Quote className="h-6 w-6" />,
    title: "Cultural Quotes",
    description: "Discover wisdom from around the world through our curated collection of quotes."
  },
  {
    icon: <Volume2 className="h-6 w-6" />,
    title: "Audio Pronunciation",
    description: "Listen to expressions in their original language with text-to-speech support."
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "Smart Search",
    description: "Find expressions and quotes across languages and categories with our powerful search."
  },
  {
    icon: <Bookmark className="h-6 w-6" />,
    title: "Bookmarks",
    description: "Save your favorite expressions and quotes for quick access later."
  },
  {
    icon: <History className="h-6 w-6" />,
    title: "Learning History",
    description: "Track your learning journey with a history of viewed expressions."
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <Globe2 className="h-16 w-16 mx-auto text-orange-500 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About CultureConnect
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Bridging cultures through language, one expression at a time
          </p>
        </div>

        <div className="mb-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              CultureConnect aims to foster cross-cultural understanding by making it easy 
              to explore and learn how different cultures express universal ideas. We believe 
              that understanding these expressions helps bridge cultural gaps and enriches 
              our global perspective.
            </p>
            <p className="text-gray-600">
              Whether you're a language learner, cultural enthusiast, or just curious about 
              how different cultures communicate similar ideas, our platform provides tools 
              and content to help you explore and understand the rich tapestry of global 
              expressions.
            </p>
          </Card>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Features</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-orange-500">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Card className="p-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Join Our Community
            </h2>
            <p className="mb-6">
              Help us grow our collection of cultural expressions and create bridges 
              between cultures.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="secondary" className="gap-2">
                <Github className="h-4 w-4" />
                Contribute on GitHub
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-orange-600">
                Contact Us
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
