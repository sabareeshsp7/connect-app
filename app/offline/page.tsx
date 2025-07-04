"use client";

import { MessageCircle, Wifi, WifiOff } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function OfflinePage() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Connect
          </h1>
          <p className="text-sm text-muted-foreground">Real-Time Chat Platform</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center">
            <WifiOff className="h-12 w-12 text-muted-foreground" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              You&apos;re Offline
            </h2>
            <p className="text-muted-foreground">
              It looks like you&apos;re not connected to the internet. Please check your connection and try again.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={handleReload}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            <div className="flex items-center justify-center gap-2">
              <Wifi className="h-4 w-4" />
              Try Again
            </div>
          </button>
          
          <p className="text-xs text-muted-foreground">
            Connect will work automatically when your internet connection is restored.
          </p>
        </div>
      </Card>
    </div>
  );
}
