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
  Trash2,
  Edit
} from "lucide-react";
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
  const [showPinDialog, setShowPinDialog] = useState(false);

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
        className="h-8 w-8 p-0 hover:bg-blue-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleAIMessage}
        title="AI Suggestion"
      >
        <Edit className="h-4 w-4 text-blue-600" />
      </Button>

      {/* Main Actions Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal className="h-4 w-4" />
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
