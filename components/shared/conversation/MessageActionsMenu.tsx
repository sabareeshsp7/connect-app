"use client";

import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Reply,
  Copy,
  Share,
  Info,
  MoreHorizontal,
  Trash2
} from "lucide-react";

// Gemini-style AI Icon Component
const GeminiAIIcon = ({ className }: { className?: string }) => (
  <svg
    className={`${className}`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="geminiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4285f4" />
        <stop offset="33%" stopColor="#9c27b0" />
        <stop offset="66%" stopColor="#ff9800" />
        <stop offset="100%" stopColor="#f44336" />
      </linearGradient>
    </defs>
    {/* Main Gemini sparkle shape */}
    <path
      d="M12 2.5L14.5 8.5L20.5 11L14.5 13.5L12 19.5L9.5 13.5L3.5 11L9.5 8.5L12 2.5Z"
      fill="url(#geminiGradient)"
      className="animate-[pulse_2s_ease-in-out_infinite] opacity-90"
    />
    {/* Inner sparkle */}
    <circle 
      cx="12" 
      cy="11" 
      r="1.5" 
      fill="white" 
      className="animate-[pulse_1.5s_ease-in-out_infinite] [animation-delay:0.5s]"
    />
    {/* Small accent sparkles */}
    <circle cx="8" cy="7" r="0.8" fill="#4285f4" opacity="0.7" />
    <circle cx="16" cy="15" r="0.8" fill="#ff9800" opacity="0.7" />
  </svg>
);
import { toast } from "sonner";

import { cn } from "@/lib/utils";

interface MessageActionsMenuProps {
  messageId: string;
  content: string[];
  fromCurrentUser: boolean;
  senderName: string;
  createdAt: number;
  onReply?: (messageId: string, content: string) => void;
  onDelete?: (messageId: string) => void;
  onInfo?: (messageId: string) => void;
  onAIReply?: (messageId: string, content: string) => void;
}

const MessageActionsMenu = ({
  messageId,
  content,
  fromCurrentUser,
  senderName,
  createdAt,
  onReply,
  onDelete,
  onInfo,
  onAIReply
}: MessageActionsMenuProps) => {
  const handleCopy = () => {
    const textContent = Array.isArray(content) ? content.join(' ') : String(content);
    navigator.clipboard.writeText(textContent);
    toast.success('Message copied to clipboard');
  };

  const handleShare = async () => {
    const textContent = Array.isArray(content) ? content.join(' ') : String(content);
    
    if (navigator.share) {
      try {
        await navigator.share({
          text: textContent,
          title: `Message from ${senderName}`,
        });
      } catch (error) {
        // Fallback to clipboard
        handleCopy();
      }
    } else {
      // Fallback to clipboard
      handleCopy();
      toast.success('Message copied (sharing not supported)');
    }
  };

  const handleAIMessage = async () => {
    const messageContent = Array.isArray(content) ? content.join(' ') : String(content);
    
    try {
      toast.info('Generating AI suggestion...');
      
      // Call AI API to generate response
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: `Please provide a helpful reply to this message: "${messageContent}"` 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate AI suggestion');
      }

      const data = await response.json();
      
      // Call the AI reply handler to populate input field
      onAIReply?.(messageId, data.response);
      
      toast.success('AI suggestion generated!');
    } catch (error) {
      console.error('AI Suggestion Error:', error);
      toast.error('Failed to generate AI suggestion. Please try again.');
    }
  };

  return (
    <div className="flex items-center gap-1">
      {/* AI Reply Button - Positioned near 3-dot button */}
      <Button
        variant="ghost"
        size="sm"
        className="h-7 w-7 md:h-8 md:w-8 p-0 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
        onClick={handleAIMessage}
        title="AI Suggestion"
      >
        <GeminiAIIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
      </Button>

      {/* Main Actions Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 md:h-8 md:w-8 p-0 hover:bg-gray-100 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200"
          >
            <MoreHorizontal className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={() => onReply?.(messageId, Array.isArray(content) ? content.join(' ') : String(content))}
          >
            <Reply className="mr-2 h-4 w-4" />
            Reply
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={handleShare}>
            <Share className="mr-2 h-4 w-4" />
            Share
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={() => onInfo?.(messageId)}
          >
            <Info className="mr-2 h-4 w-4" />
            Info
          </DropdownMenuItem>
          
          {fromCurrentUser && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete?.(messageId)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MessageActionsMenu;
