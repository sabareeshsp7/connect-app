"use client";

import { SignIn } from "@clerk/nextjs";
import React from "react";
import { Bot, MessageCircle, Shield, Zap, Users, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SignInPage = () => {
  return (
    <div className="light auth-page-container auth-full-height auth-container-safe bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="auth-content-wrapper auth-content-safe auth-container-mobile">
        <div className="auth-grid-safe auth-grid-responsive grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto auth-container-large">
          
          {/* Left Side - Features Showcase */}
          <div className="space-y-6 auth-order-mobile-second lg:order-1">
            {/* Header */}
            <div className="text-center lg:text-left space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                    <MessageCircle className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="auth-title-responsive font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Connect
                  </h1>
                  <p className="auth-subtitle-responsive text-muted-foreground">Real-Time Chat Platform</p>
                </div>
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                Welcome back to Connect
              </h2>
              <p className="text-lg text-muted-foreground">
                Experience the future of communication with AI-powered conversations, real-time messaging, and seamless collaboration.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-4">
                <Badge className="px-4 py-2 bg-secondary text-secondary-foreground">
                  <Zap className="h-4 w-4 mr-2" />
                  Real-time Sync
                </Badge>
                <Badge className="px-4 py-2 bg-secondary text-secondary-foreground">
                  <Shield className="h-4 w-4 mr-2" />
                  Secure & Private
                </Badge>
                <Badge className="px-4 py-2 bg-secondary text-secondary-foreground">
                  <Bot className="h-4 w-4 mr-2" />
                  AI Powered
                </Badge>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 border hover:shadow-lg transition-all duration-300 group hover:border-blue-200 dark:hover:border-blue-700">
                <div className="flex items-center gap-3">
                  <div className="inline-flex p-2 rounded-lg bg-blue-500/10 text-blue-600 border border-blue-200">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Real-Time Messaging
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Instant messaging with friends and groups
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border hover:shadow-lg transition-all duration-300 group hover:border-purple-200 dark:hover:border-purple-700">
                <div className="flex items-center gap-3">
                  <div className="inline-flex p-2 rounded-lg bg-purple-500/10 text-purple-600 border border-purple-200">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      AI Assistant
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Chat with Google Gemini AI
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border hover:shadow-lg transition-all duration-300 group hover:border-green-200 dark:hover:border-green-700">
                <div className="flex items-center gap-3">
                  <div className="inline-flex p-2 rounded-lg bg-green-500/10 text-green-600 border border-green-200">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      Friend Management
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Add friends and create groups
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border hover:shadow-lg transition-all duration-300 group hover:border-orange-200 dark:hover:border-orange-700">
                <div className="flex items-center gap-3">
                  <div className="inline-flex p-2 rounded-lg bg-orange-500/10 text-orange-600 border border-orange-200">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      Secure & Private
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      End-to-end encryption
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Testimonial */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 border-2 border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    SJ
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-foreground mb-2 italic">
                    &ldquo;Connect has revolutionized how our team communicates. The AI assistant is incredibly helpful!&rdquo;
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-semibold">Sarah Johnson</span>
                    <span className="mx-2">•</span>
                    <span>Product Manager</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Side - Sign In Form */}
          <div className="order-1 lg:order-2 flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl -z-10 transform rotate-3"></div>
              
              {/* Sign In Container */}
              <Card className="p-8 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-blue-700 font-medium">Welcome back!</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
                    Sign In to Connect
                  </h2>
                  <p className="text-muted-foreground">
                    Continue your conversations and stay connected
                  </p>
                </div>

                {/* Quick Access Benefits */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <MessageCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-xs text-muted-foreground">Your chats</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Bot className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-xs text-muted-foreground">AI assistant</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-xs text-muted-foreground">Your friends</p>
                  </div>
                </div>

                {/* Clerk Sign In Component */}
                <div className="flex justify-center">
                  <SignIn 
                    appearance={{
                      baseTheme: undefined,
                      elements: {
                        rootBox: "w-full",
                        card: "shadow-none border-0 bg-transparent",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        socialButtonsBlockButton: "border-2 hover:border-primary/50 transition-all duration-300 h-12 bg-white text-gray-700",
                        formButtonPrimary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 h-12",
                        footerActionLink: "text-primary hover:text-primary/80",
                        formFieldInput: "h-12 bg-white border-gray-200"
                      }
                    }}
                    forceRedirectUrl="/conversations"
                    signUpUrl="/sign-up"
                  />
                </div>

                {/* Security & Quick Access */}
                <div className="space-y-4 mt-6">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      <span>Secured by Clerk • Your data is safe</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Zap className="h-4 w-4 text-blue-500" />
                      <span>Instant sync</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Encrypted</span>
                    </div>
                  </div>
                </div>

                {/* New User CTA */}
                <div className="text-center mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <p className="text-sm text-muted-foreground">
                    New to Connect?{' '}
                    <a href="/sign-up" className="text-blue-600 hover:text-blue-700 font-medium underline">
                      Create an account
                    </a>{' '}
                    and get started in seconds!
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
