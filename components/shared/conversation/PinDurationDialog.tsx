"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pin, Clock, Check } from "lucide-react";
import { toast } from "sonner";

interface PinDurationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onPin: (duration: number) => void;
  messageContent: string;
  senderName: string;
}

const PIN_DURATIONS = [
  { label: "7 days", value: 7, description: "Pin for one week" },
  { label: "14 days", value: 14, description: "Pin for two weeks" },
  { label: "30 days", value: 30, description: "Pin for one month" },
  { label: "90 days", value: 90, description: "Pin for three months" },
  { label: "1 year", value: 365, description: "Pin for one year" },
  { label: "Forever", value: -1, description: "Pin indefinitely" },
];

const PinDurationDialog = ({
  isOpen,
  onClose,
  onPin,
  messageContent,
  senderName,
}: PinDurationDialogProps) => {
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

  const handlePin = () => {
    if (selectedDuration !== null) {
      onPin(selectedDuration);
      onClose();
      setSelectedDuration(null);
      
      const durationText = selectedDuration === -1 
        ? "forever" 
        : `for ${PIN_DURATIONS.find(d => d.value === selectedDuration)?.label}`;
      
      toast.success(`Message pinned ${durationText}`);
    }
  };

  const truncateContent = (content: string, maxLength = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pin className="h-5 w-5 text-blue-600" />
            Pin Message
          </DialogTitle>
        </DialogHeader>

        {/* Message Preview */}
        <div className="p-4 bg-gray-50 rounded-lg mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-900">{senderName}</span>
            <Badge variant="outline" className="text-xs">Message</Badge>
          </div>
          <p className="text-sm text-gray-700">
            {truncateContent(messageContent)}
          </p>
        </div>

        {/* Duration Selection */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">
              Choose how long to pin this message:
            </span>
          </div>

          <div className="grid gap-2">
            {PIN_DURATIONS.map((duration) => (
              <button
                key={duration.value}
                onClick={() => setSelectedDuration(duration.value)}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all hover:bg-gray-50 ${
                  selectedDuration === duration.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedDuration === duration.value
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedDuration === duration.value && (
                      <Check className="h-2.5 w-2.5 text-white" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm">{duration.label}</p>
                    <p className="text-xs text-gray-500">{duration.description}</p>
                  </div>
                </div>
                {duration.value === -1 && (
                  <Badge variant="secondary" className="text-xs">
                    Permanent
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handlePin}
            disabled={selectedDuration === null}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Pin className="h-4 w-4 mr-2" />
            Pin Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PinDurationDialog;
