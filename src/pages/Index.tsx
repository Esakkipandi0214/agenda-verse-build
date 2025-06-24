
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Target, TrendingUp, Users, ArrowRight, Star } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Target,
      title: 'Smart Organization',
      description: 'Organize tasks with priorities, tags, and due dates for maximum productivity.',
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Visual analytics and completion rates to track your productivity journey.',
    },
    {
      icon: CheckCircle,
      title: 'Intuitive Interface',
      description: 'Clean, modern design that makes task management a breeze.',
    },
    {
      icon: Users,
      title: 'Personal Dashboard',
      description: 'Customizable workspace tailored to your unique workflow needs.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-400/20"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 mb-8 animate-float">
              <Star className="w-4 h-4 text-yellow-500 mr-2" />
              <span className="text-sm font-medium">Your Ultimate Productivity Companion</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 animate-slide-up">
              TodoVerse
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Transform your productivity with an intelligent task management system that adapts to your workflow.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/auth">
                <Button className="gradient-primary hover:opacity-90 transition-all transform hover:scale-105 px-8 py-3 text-lg">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" className="px-8 py-3 text-lg backdrop-blur-sm bg-white/50 hover:bg-white/70 transition-all transform hover:scale-105">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to stay organized
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you manage tasks effortlessly and boost your productivity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={feature.title} className="gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to supercharge your productivity?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of users who have transformed their task management with TodoVerse.
            </p>
            <Link to="/auth">
              <Button className="gradient-primary hover:opacity-90 transition-all transform hover:scale-105 px-8 py-4 text-lg">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/70 backdrop-blur-sm border-t border-white/20 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-lg font-bold text-white">T</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TodoVerse
            </span>
          </div>
          <p className="text-gray-600">
            © 2024 TodoVerse. Built with ❤️ for productivity enthusiasts.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
