"use client";

import { SignUp } from "@clerk/nextjs";
import React from "react";
import { Bot, MessageCircle, Shield, Zap, Users, Star, CheckCircle, Clock, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getRedirectUrl } from "@/lib/url-utils";

const SignUpPage = () => {
  return (
    <div className="light auth-page-container auth-full-height auth-container-safe bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      <div className="auth-content-wrapper auth-content-safe auth-container-mobile">
        <div className="auth-grid-safe auth-grid-responsive grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto auth-container-large">
          
          {/* Left Side - Features Showcase */}
          <div className="space-y-6 auth-order-mobile-second lg:order-1">
            {/* Header */}
            <div className="text-center lg:text-left space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-75 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl">
                    <MessageCircle className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="auth-title-responsive font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Connect
                  </h1>
                  <p className="auth-subtitle-responsive text-muted-foreground">Real-Time Chat Platform</p>
                </div>
              </div>
              
              <h2 className="auth-title-responsive font-bold text-foreground mobile-text-2xl">
                Join the future of communication
              </h2>
              <p className="auth-text-responsive text-muted-foreground mobile-text-lg">
                Create your free account and start connecting with friends, family, and colleagues through our AI-powered chat platform.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-4 mobile-stats">
                <Badge className="auth-badge-responsive mobile-badge-small px-4 py-2 bg-secondary text-secondary-foreground">
                  <Users className="h-4 w-4 mr-2" />
                  10+ Users
                </Badge>
                <Badge className="auth-badge-responsive mobile-badge-small px-4 py-2 bg-secondary text-secondary-foreground">
                  <Globe className="h-4 w-4 mr-2" />
                  Global Network
                </Badge>
                <Badge className="auth-badge-responsive mobile-badge-small px-4 py-2 bg-secondary text-secondary-foreground">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Free Forever
                </Badge>
              </div>
            </div>

            {/* Key Features */}
            <div className="auth-features-mobile grid grid-cols-1 md:grid-cols-2 gap-4 mobile-feature-grid">
              <Card className="auth-feature-card-responsive auth-card-safe p-4 border hover:shadow-lg transition-all duration-300 group hover:border-purple-200 dark:hover:border-purple-700 mobile-card-spacing">
                <div className="flex items-center gap-3">
                  <div className="inline-flex p-2 rounded-lg bg-purple-500/10 text-purple-600 border border-purple-200">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      Real-Time Messaging
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Instant messaging with friends and groups
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border hover:shadow-lg transition-all duration-300 group hover:border-blue-200 dark:hover:border-blue-700">
                <div className="flex items-center gap-3">
                  <div className="inline-flex p-2 rounded-lg bg-blue-500/10 text-blue-600 border border-blue-200">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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

            {/* Benefits */}
            <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 border-2 border-purple-200 dark:border-purple-800">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">
                  Why Choose Connect?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-foreground">100% Free to use</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-foreground">No ads or tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-foreground">Cross-platform sync</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-foreground">24/7 AI assistance</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Start */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full">
                <Clock className="h-4 w-4 text-purple-600" />
                <p className="text-sm text-foreground">
                  <strong>Quick Setup:</strong> Get started in under 30 seconds
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Sign Up Form */}
          <div className="order-1 lg:order-2 flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl -z-10 transform -rotate-3"></div>
              
              {/* Sign Up Container */}
              <Card className="p-8 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 p-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-purple-700 font-medium">Join Connect today!</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
                    Create Your Account
                  </h2>
                  <p className="text-muted-foreground">
                    Start your journey with secure, AI-powered communication
                  </p>
                </div>

                {/* Quick Benefits */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <MessageCircle className="h-5 w-5 text-purple-600" />
                    </div>
                    <p className="text-xs text-muted-foreground">Instant chat</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Bot className="h-5 w-5 text-purple-600" />
                    </div>
                    <p className="text-xs text-muted-foreground">AI helper</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Shield className="h-5 w-5 text-purple-600" />
                    </div>
                    <p className="text-xs text-muted-foreground">Secure</p>
                  </div>
                </div>

                {/* Clerk Sign Up Component */}
                <div className="flex justify-center">
                  <SignUp 
                    appearance={{
                      baseTheme: undefined,
                      elements: {
                        rootBox: "w-full",
                        card: "shadow-none border-0 bg-transparent",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        socialButtonsBlockButton: "border-2 hover:border-primary/50 transition-all duration-300 h-12 bg-white text-gray-700",
                        formButtonPrimary: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 h-12",
                        footerActionLink: "text-primary hover:text-primary/80",
                        formFieldInput: "h-12 bg-white border-gray-200"
                      }
                    }}
                    forceRedirectUrl={getRedirectUrl("/conversations")}
                    signInUrl={getRedirectUrl("/sign-in")}
                  />
                </div>

                {/* Security & Trust */}
                <div className="space-y-4 mt-6">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      <span>Secured by Clerk • Your data is protected</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Free forever</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Private</span>
                    </div>
                  </div>
                </div>

                {/* Existing User CTA */}
                <div className="text-center mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <a href="/sign-in" className="text-purple-600 hover:text-purple-700 font-medium underline">
                      Sign in here
                    </a>
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

export default SignUpPage;
