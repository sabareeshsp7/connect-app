"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Sparkles, Send, Edit3 } from "lucide-react";

interface MessageConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  suggestedMessage: string;
  suggestionType: string;
  onConfirm: (message: string) => void;
  onEdit: (message: string) => void;
}

const MessageConfirmationDialog = ({
  isOpen,
  onClose,
  suggestedMessage,
  suggestionType,
  onConfirm,
  onEdit
}: MessageConfirmationDialogProps) => {
  const [editedMessage, setEditedMessage] = useState(suggestedMessage);
  const [isEditing, setIsEditing] = useState(false);

  const handleConfirm = () => {
    onConfirm(isEditing ? editedMessage : suggestedMessage);
    onClose();
    setIsEditing(false);
  };

  const handleEdit = () => {
    if (isEditing) {
      onEdit(editedMessage);
      onClose();
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const getSuggestionTypeColor = (type: string) => {
    switch (type) {
      case 'reminder':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'poll':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'task':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'summary':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'highlight':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            AI Suggestion Ready
          </AlertDialogTitle>
          <AlertDialogDescription>
            Would you like to use this AI-generated message?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge className={getSuggestionTypeColor(suggestionType)}>
              {suggestionType}
            </Badge>
            <span className="text-xs text-gray-500">AI-generated suggestion</span>
          </div>

          {isEditing ? (
            <Textarea
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              className="min-h-[80px] resize-none"
              placeholder="Edit your message..."
            />
          ) : (
            <div className="p-3 bg-gray-50 rounded-lg border">
              <p className="text-sm text-gray-800 leading-relaxed">
                &ldquo;{suggestedMessage}&rdquo;
              </p>
            </div>
          )}
        </div>

        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel onClick={onClose}>
            Cancel
          </AlertDialogCancel>
          
          <Button
            variant="outline"
            onClick={handleEdit}
            className="flex items-center gap-2"
          >
            <Edit3 className="h-4 w-4" />
            {isEditing ? 'Use Edited' : 'Edit First'}
          </Button>
          
          <AlertDialogAction
            onClick={handleConfirm}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
          >
            <Send className="h-4 w-4" />
            Send Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MessageConfirmationDialog;
