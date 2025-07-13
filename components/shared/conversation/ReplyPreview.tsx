"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Reply, CornerDownRight } from "lucide-react";
import { useReply } from "@/hooks/useReply";

const ReplyPreview = () => {
  const { replyMessage, clearReply } = useReply();

  if (!replyMessage) return null;

  const truncateContent = (content: string, maxLength = 60) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <Card className="mb-2 p-3 bg-blue-50/80 border-l-4 border-l-blue-500 shadow-sm animate-in slide-in-from-top-2 duration-200">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <CornerDownRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Reply className="h-3 w-3 text-blue-600" />
              <p className="text-xs font-medium text-blue-800">
                Replying to {replyMessage.senderName}
              </p>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {truncateContent(replyMessage.content)}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearReply}
          className="h-7 w-7 p-0 hover:bg-blue-100 rounded-full flex-shrink-0 group"
        >
          <X className="h-3.5 w-3.5 text-blue-600 group-hover:text-blue-800" />
        </Button>
      </div>
    </Card>
  );
};

export default ReplyPreview;
