import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Flag, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import DailyIdiom from "@/components/DailyIdiom";
import FeatureCards from "@/components/FeatureCards";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Culture<span className="text-orange-600">Connect</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Learn Languages Through Proverbs, Idioms & Wisdom
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Explore how people express thoughts, wisdom, and values across different languages and societies
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Link to="/explore">Start Exploring</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/quiz">Take a Quiz</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Daily Idiom Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <DailyIdiom />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Discover Cultural Wisdom
          </h2>
          <FeatureCards />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-600">50+</div>
              <div className="text-gray-600">Languages</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">1000+</div>
              <div className="text-gray-600">Idioms & Proverbs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">500+</div>
              <div className="text-gray-600">Cultural Quotes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">100+</div>
              <div className="text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CultureConnect</h3>
              <p className="text-gray-300">
                Bridging cultures through the wisdom of proverbs and idioms
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/explore" className="block text-gray-300 hover:text-white transition-colors">
                  Explore Languages
                </Link>
                <Link to="/quiz" className="block text-gray-300 hover:text-white transition-colors">
                  Take Quiz
                </Link>
                <Link to="/quotes" className="block text-gray-300 hover:text-white transition-colors">
                  Cultural Quotes
                </Link>
                <Link to="/about" className="block text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <p className="text-gray-300">
                Join our community of language learners and cultural explorers
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 CultureConnect. Bridging cultures through wisdom.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
