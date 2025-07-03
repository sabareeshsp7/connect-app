"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { 
  MessageCircle, 
  Bot, 
  Search, 
  Users, 
  Video, 
  Smartphone, 
  Shield, 
  Zap, 
  Star, 
  ArrowRight,
  CheckCircle,
  Globe,
  Clock,
  Sparkles
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      redirect("/conversations");
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect
  }

  const features = [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Real-Time Messaging",
      description: "Instant messaging with friends and groups. See when messages are delivered and read in real-time.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "AI Assistant",
      description: "Chat with our intelligent AI powered by Google Gemini for help, answers, and engaging conversations.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Smart Search",
      description: "Find conversations, messages, and friends instantly with powerful search. Use Ctrl+K for quick access.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Friend Management",
      description: "Add friends by email, create groups, and manage your social connections with ease.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Video className="h-8 w-8" />,
      title: "Voice & Video Calls",
      description: "High-quality audio and video calls with screen sharing capabilities for seamless communication.",
      color: "from-red-500 to-rose-500"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Optimized",
      description: "Perfect experience on any device with responsive design and Progressive Web App support.",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const stats = [
    { value: "50K+", label: "Active Users", icon: <Users className="h-5 w-5" /> },
    { value: "1M+", label: "Messages Sent", icon: <MessageCircle className="h-5 w-5" /> },
    { value: "100+", label: "Countries", icon: <Globe className="h-5 w-5" /> },
    { value: "4.9/5", label: "User Rating", icon: <Star className="h-5 w-5" /> }
  ];

  const benefits = [
    "Free forever with premium features",
    "End-to-end encryption for all messages",
    "Cross-platform sync on all devices",
    "24/7 customer support",
    "No ads or tracking",
    "Open source and transparent"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl">
                <MessageCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Connect
              </h1>
              <p className="text-muted-foreground">Real-Time Chat Platform</p>
            </div>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            Experience the Future of
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Communication</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users worldwide in seamless conversations powered by AI, 
            real-time messaging, and cutting-edge technology. Start connecting today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link 
              href="/sign-up"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/sign-in"
              className="px-8 py-4 rounded-xl font-semibold border-2 border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 text-foreground hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              Sign In
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-4 justify-center items-center mb-16">
            <Badge className="px-4 py-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <CheckCircle className="h-4 w-4 mr-2" />
              Free Forever
            </Badge>
            <Badge className="px-4 py-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              <Shield className="h-4 w-4 mr-2" />
              End-to-End Encrypted
            </Badge>
            <Badge className="px-4 py-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              <Sparkles className="h-4 w-4 mr-2" />
              AI Powered
            </Badge>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white/50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Stay Connected
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover powerful features designed to enhance your communication experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 border-2 hover:shadow-xl transition-all duration-300 group hover:border-blue-200 dark:hover:border-blue-700 hover:scale-105">
                <div className="space-y-4">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-foreground mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Why Choose Connect?
              </h3>
              <p className="text-lg text-muted-foreground">
                Built with privacy, security, and user experience in mind
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Start Connecting?
            </h3>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of users worldwide and experience the future of communication
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/sign-up"
                className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Create Account
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/sign-in"
                className="px-8 py-4 rounded-xl font-semibold border-2 border-white/30 hover:border-white/50 transition-all duration-300 text-white hover:bg-white/10"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Connect</span>
            </div>
            <p className="text-slate-400 mb-6">
              Real-Time Chat Platform - Built for the future of communication
            </p>
            <div className="flex justify-center gap-6 text-sm text-slate-400">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Support</Link>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-800 text-slate-500">
              <p>&copy; 2024 Connect. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
