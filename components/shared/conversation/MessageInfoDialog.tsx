"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import {
  Clock,
  User,
  MessageSquare,
  Star,
  Pin,
  Eye,
  Reply as ReplyIcon,
} from "lucide-react";

interface MessageInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  messageData: {
    messageId: string;
    content: string[];
    senderName: string;
    senderImage: string;
    createdAt: number;
    type: string;
    isStarred?: boolean;
    isPinned?: boolean;
    replyToMessageId?: string;
    replyToSenderName?: string;
    replyToContent?: string;
    readBy?: string[];
    deliveredAt?: number;
    readAt?: number;
  } | null;
}

const MessageInfoDialog = ({
  isOpen,
  onClose,
  messageData,
}: MessageInfoDialogProps) => {
  if (!messageData) return null;

  const formatDateTime = (timestamp: number) => {
    return format(timestamp, "PPP 'at' p");
  };

  const formatTime = (timestamp: number) => {
    return format(timestamp, "HH:mm");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Message Information
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Sender Information */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Avatar className="h-10 w-10">
              <AvatarImage src={messageData.senderImage} />
              <AvatarFallback>
                {messageData.senderName.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{messageData.senderName}</p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <User className="h-3 w-3" />
                Sender
              </p>
            </div>
          </div>

          {/* Message Content */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-700">Message Content</h4>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm">{messageData.content.join(' ')}</p>
            </div>
          </div>

          {/* Reply Information */}
          {messageData.replyToMessageId && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-700 flex items-center gap-1">
                <ReplyIcon className="h-3 w-3" />
                Reply To
              </h4>
              <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                <p className="text-xs font-medium text-blue-800 mb-1">
                  {messageData.replyToSenderName}
                </p>
                <p className="text-sm text-gray-700">
                  {messageData.replyToContent}
                </p>
              </div>
            </div>
          )}

          {/* Read Status Information */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-700 flex items-center gap-1">
              <Eye className="h-3 w-3" />
              Read Status
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-3 w-3 text-gray-500" />
                <span>Sent: {formatDateTime(messageData.createdAt)}</span>
              </div>
              {messageData.deliveredAt && (
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="secondary" className="h-3 w-3 p-0 rounded-full bg-green-500"></Badge>
                  <span>Delivered: {formatDateTime(messageData.deliveredAt)}</span>
                </div>
              )}
              {messageData.readAt && (
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="secondary" className="h-3 w-3 p-0 rounded-full bg-blue-500"></Badge>
                  <span>Read: {formatDateTime(messageData.readAt)}</span>
                </div>
              )}
              {messageData.readBy && messageData.readBy.length > 0 ? (
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">Read by:</p>
                  <div className="flex flex-wrap gap-1">
                    {messageData.readBy.map((reader, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {reader}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Eye className="h-3 w-3" />
                  <span>Not yet read</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageInfoDialog;
