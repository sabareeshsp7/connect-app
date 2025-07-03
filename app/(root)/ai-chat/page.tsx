"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI assistant powered by Gemini. I can help you with questions, provide information, assist with tasks, and have conversations. What would you like to talk about today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      console.log("Sending message to AI:", inputMessage);
      
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Response:", errorData);
        throw new Error(errorData.error || "Failed to get AI response");
      }

      const data = await response.json();
      console.log("AI Response data:", data);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      
      if (errorMessage.includes("API key")) {
        toast.error("AI service is not configured. Please contact the administrator.");
      } else {
        toast.error(errorMessage);
      }
      
      console.error("AI Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Mobile and Desktop responsive card with proper mobile nav spacing */}
      <Card className="flex-1 flex flex-col h-[calc(100vh-240px)] lg:h-full max-h-[calc(100vh-240px)] lg:max-h-full m-2 lg:m-0">
        {/* Header */}
        <div className="flex items-center gap-3 p-3 lg:p-4 border-b flex-shrink-0">
          <Avatar className="h-8 w-8 lg:h-10 lg:w-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <Bot className="h-4 w-4 lg:h-5 lg:w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-sm lg:text-base">AI Assistant</h2>
            <p className="text-xs lg:text-sm text-muted-foreground">
              Powered by Gemini AI
            </p>
          </div>
        </div>

        {/* Messages - Scrollable area */}
        <ScrollArea className="flex-1 p-3 lg:p-4 min-h-0">
          <div className="space-y-3 lg:space-y-4 pb-6 lg:pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 lg:gap-3 ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!message.isUser && (
                  <Avatar className="h-6 w-6 lg:h-8 lg:w-8 flex-shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-3 w-3 lg:h-4 lg:w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] lg:max-w-[70%] rounded-lg px-3 py-2 lg:px-4 lg:py-2 ${
                    message.isUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm lg:text-sm leading-relaxed break-words whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
                {message.isUser && (
                  <Avatar className="h-6 w-6 lg:h-8 lg:w-8 flex-shrink-0">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      <User className="h-3 w-3 lg:h-4 lg:w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 lg:gap-3 justify-start">
                <Avatar className="h-6 w-6 lg:h-8 lg:w-8 flex-shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-3 w-3 lg:h-4 lg:w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-3 py-2 lg:px-4 lg:py-2">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-3 w-3 lg:h-4 lg:w-4 animate-spin" />
                    <span className="text-sm">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>

        {/* Input - Fixed at bottom with proper spacing for mobile nav */}
        <div className="p-3 lg:p-4 border-t flex-shrink-0 bg-background/95 backdrop-blur-sm">
          <form onSubmit={sendMessage} className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 text-sm lg:text-base h-9 lg:h-10"
            />
            <Button 
              type="submit" 
              disabled={isLoading || !inputMessage.trim()}
              className="h-9 w-9 lg:h-10 lg:w-10 p-0 flex-shrink-0"
            >
              <Send className="h-3 w-3 lg:h-4 lg:w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AIChatPage;
