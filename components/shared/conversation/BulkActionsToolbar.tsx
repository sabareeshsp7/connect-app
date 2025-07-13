"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Trash2,
  Forward,
  Copy,
  X,
  Download,
  MessageSquare
} from "lucide-react";
import { toast } from "sonner";

interface BulkActionsToolbarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkStar: () => void;
  onBulkDelete: () => void;
  onBulkForward: () => void;
  onBulkCopy: () => void;
  onBulkDownload: () => void;
}

const BulkActionsToolbar = ({
  selectedCount,
  onClearSelection,
  onBulkStar,
  onBulkDelete,
  onBulkForward,
  onBulkCopy,
  onBulkDownload,
}: BulkActionsToolbarProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
      <div className="mx-auto max-w-lg">
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg backdrop-blur-sm bg-white/95 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-blue-600" />
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 font-medium">
                  {selectedCount} {selectedCount === 1 ? 'message' : 'messages'}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearSelection}
                className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
                title="Clear selection"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBulkStar}
                  className="h-9 px-3 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                  title="Star selected messages"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Star
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBulkCopy}
                  className="h-9 px-3 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  title="Copy selected messages"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBulkForward}
                  className="h-9 px-3 hover:bg-green-50 hover:text-green-600 transition-colors"
                  title="Forward selected messages"
                >
                  <Forward className="h-4 w-4 mr-2" />
                  Forward
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBulkDownload}
                  className="h-9 px-3 hover:bg-purple-50 hover:text-purple-600 transition-colors hidden sm:flex"
                  title="Download selected messages"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>

              <div className="w-px h-8 bg-gray-200" />

              <Button
                variant="destructive"
                size="sm"
                onClick={onBulkDelete}
                className="h-9 px-3 bg-red-500 hover:bg-red-600 transition-colors"
                title="Delete selected messages"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsToolbar;
