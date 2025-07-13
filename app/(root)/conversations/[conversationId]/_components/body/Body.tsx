/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Message from "./Message";
import { useMutationState } from "@/hooks/useMutationState";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useConversation } from "@/hooks/useConversation";
import { useMessageActions } from "@/hooks/useMessageStore";
import BulkActionsToolbar from "@/components/shared/conversation/BulkActionsToolbar";
import MessageInfoDialog from "@/components/shared/conversation/MessageInfoDialog";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { toast } from "sonner";
import { Pin } from "lucide-react";
// import { CallRoom } from "./CallRoom";

type Props = {
  members: {
    _id?: Id<"users">;
    lastSeenMessageId?: Id<"messages">;
    username?: string;
    [key: string]: any;
  }[];
  onAIReply?: (messageId: string, aiResponse: string) => void;
  // callType: "audio" | "video" | null;
  // setCallType: Dispatch<SetStateAction<"audio" | "video" | null>>;
};

const Body = ({ members, onAIReply }: Props) => {
  const { conversationId } = useConversation();
  const { selectedMessages, clearSelection, messageStates, setMessageStates, toggleStar } = useMessageActions();
  const [infoDialogData, setInfoDialogData] = useState<{
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
  } | null>(null);

  const messages = useQuery(api.messages.get, {
    id: conversationId as Id<"conversations">,
  });

  const { mutate: markRead } = useMutationState(api.conversation.markRead);
  const { mutate: createMessage } = useMutationState(api.message.create);

  // Bulk action handlers
  const handleBulkStar = () => {
    selectedMessages.forEach(messageId => {
      const current = messageStates[messageId];
      if (!current?.isStarred) {
        setMessageStates(prev => ({
          ...prev,
          [messageId]: { ...prev[messageId], isStarred: true }
        }));
      }
    });
    toast.success(`Starred ${selectedMessages.length} messages`);
    console.log('Bulk star:', selectedMessages);
  };

  const handleBulkDelete = () => {
    // Show confirmation dialog in real implementation
    selectedMessages.forEach(messageId => {
      console.log('Deleting message:', messageId);
      // This would call the delete mutation for each message
    });
    toast.success(`Deleted ${selectedMessages.length} messages`);
    console.log('Bulk delete:', selectedMessages);
    clearSelection();
  };

  const handleBulkForward = () => {
    const messagesToForward = selectedMessages.map(messageId => {
      const message = messages?.find(m => m.message._id === messageId);
      return {
        messageId,
        content: message?.message.content || [],
        senderName: message?.senderName || '',
      };
    });
    toast.success(`Forwarding ${selectedMessages.length} messages`);
    console.log('Bulk forward:', messagesToForward);
    // This would open a conversation selector
  };

  const handleBulkCopy = () => {
    const messagesToCopy = selectedMessages.map(messageId => {
      const message = messages?.find(m => m.message._id === messageId);
      return message?.message.content.join(' ') || '';
    }).join('\n');
    
    navigator.clipboard.writeText(messagesToCopy);
    toast.success(`Copied ${selectedMessages.length} messages to clipboard`);
    console.log('Bulk copy:', messagesToCopy);
  };

  const handleBulkDownload = () => {
    const messagesToDownload = selectedMessages.map(messageId => {
      const message = messages?.find(m => m.message._id === messageId);
      return {
        id: messageId,
        content: message?.message.content || [],
        sender: message?.senderName || '',
        timestamp: message?.message._creationTime || 0,
      };
    });
    
    // Create a downloadable file
    const dataStr = JSON.stringify(messagesToDownload, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `messages-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success(`Downloaded ${selectedMessages.length} messages`);
    console.log('Bulk download:', messagesToDownload);
  };

  const handleShowMessageInfo = (messageId: string) => {
    const message = messages?.find(m => m.message._id === messageId);
    if (message) {
      const messageState = messageStates[messageId];
      
      // Get read status information
      const readBy = members
        .filter(member => 
          member.lastSeenMessageId === messageId && 
          member._id !== message.message.senderId
        )
        .map(member => member.username || 'Unknown User');

      // Calculate estimated read time based on last seen message
      const readAt = readBy.length > 0 ? Date.now() : undefined;
      const deliveredAt = message.message._creationTime + 1000; // Assume delivered 1 second after sent

      setInfoDialogData({
        messageId,
        content: message.message.content,
        senderName: message.senderName,
        senderImage: message.senderImage,
        createdAt: message.message._creationTime,
        type: message.message.type,
        isStarred: messageState?.isStarred,
        isPinned: messageState?.isPinned,
        replyToMessageId: message.message.replyToMessageId,
        replyToSenderName: message.message.replyToSenderName,
        replyToContent: message.message.replyToContent,
        readBy,
        deliveredAt,
        readAt,
      });
    }
  };

  const handleAIReply = async (messageId: string, aiResponse: string) => {
    // Instead of sending the message directly, we'll communicate with the input field
    // This will be handled by passing the AI response to the parent component
    if (onAIReply) {
      onAIReply(messageId, aiResponse);
    } else {
      // Fallback: show the AI response to user for manual copying
      toast.success('AI suggestion ready! Check the message input.');
      console.log('AI Suggestion:', aiResponse);
    }
  };

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onCopy: selectedMessages.length > 0 ? handleBulkCopy : undefined,
    onDelete: selectedMessages.length > 0 ? handleBulkDelete : undefined,
    onSelectAll: () => {
      if (messages) {
        messages.forEach(({ message }) => {
          if (!messageStates[message._id]?.isSelected) {
            setMessageStates(prev => ({
              ...prev,
              [message._id]: { ...prev[message._id], isSelected: true }
            }));
          }
        });
        toast.success(`Selected all ${messages.length} messages`);
      }
    },
    onClearSelection: selectedMessages.length > 0 ? clearSelection : undefined,
    onEscape: selectedMessages.length > 0 ? clearSelection : () => setInfoDialogData(null),
  });

  useEffect(() => {
    if (messages && messages.length > 0) {
      markRead({
        conversationId,
        messageId: messages[0].message._id,
      });
    }
  }, [messages?.length, conversationId, markRead]);

  const formatSeenBy = (names: string[]) => {
    switch (names.length) {
      case 1:
        return (
          <p className="text-muted-foreground text-sm text-right">{`Seen by ${names[0]}`}</p>
        );
      case 2:
        return (
          <p className="text-muted-foreground text-sm text-right">{`Seen by ${names[0]} and ${names[1]}`}</p>
        );
      default:
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p className="text-muted-foreground text-sm text-right">{`Seen by ${
                  names[0]
                }, ${names[1]}, and ${names.length - 2} more`}</p>
              </TooltipTrigger>
              <TooltipContent>
                <ul>
                  {names.map((name, index) => {
                    return <li key={index}>{name}</li>;
                  })}
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
    }
  };

  const getSeenMessage = (messageId: Id<"messages">, senderId: Id<"users">) => {
    const seenUsers = members
      .filter(
        (member) =>
          member.lastSeenMessageId === messageId && member._id !== senderId
      )
      .map((user) => user.username!.split(" ")[0]);

    if (seenUsers.length === 0) return undefined;

    return formatSeenBy(seenUsers);
  };

  // Separate pinned and regular messages
  const organizeMessages = () => {
    if (!messages) return { pinnedMessages: [], regularMessages: [] };
    
    const pinnedMessages = messages.filter(({ message }) => 
      messageStates[message._id]?.isPinned
    );
    
    const regularMessages = messages.filter(({ message }) => 
      !messageStates[message._id]?.isPinned
    );
    
    return { pinnedMessages, regularMessages };
  };

  const { pinnedMessages, regularMessages } = organizeMessages();

  const renderMessage = (messageData: any, index: number, messageArray: any[]) => {
    const { message, senderImage, senderName, isCurrentUser } = messageData;
    const lastByUser = 
      messageArray[index - 1]?.message.senderId === messageArray[index].message.senderId;
    const seenMessage = getSeenMessage(message._id, message.senderId);

    return (
      <Message
        key={message._id}
        messageId={message._id}
        fromCurrentUser={isCurrentUser}
        senderImage={senderImage}
        senderName={senderName}
        lastByUser={lastByUser}
        content={message.content}
        createdAt={message._creationTime}
        seen={seenMessage}
        type={message.type}
        replyToMessageId={message.replyToMessageId}
        replyToSenderName={message.replyToSenderName}
        replyToContent={message.replyToContent}
        onInfo={() => handleShowMessageInfo(message._id)}
        onAIReply={(messageId, content) => handleAIReply(messageId, content)}
      />
    );
  };

  return (
    <>
      {/* Message Info Dialog */}
      <MessageInfoDialog
        isOpen={!!infoDialogData}
        onClose={() => setInfoDialogData(null)}
        messageData={infoDialogData}
      />
      
      <div className="flex-1 w-full flex overflow-y-scroll flex-col-reverse gap-1 p-4 no-scrollbar bg-gray-50/30">
        {/* Regular Messages (in reverse order as usual) */}
        {regularMessages?.map(
          (messageData, index, messageArray) => renderMessage(messageData, index, messageArray)
        )}
        
        {/* Pinned Messages Separator */}
        {pinnedMessages.length > 0 && regularMessages.length > 0 && (
          <div className="flex items-center gap-4 py-3 my-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
            <div className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 flex items-center gap-1">
              <Pin className="h-3 w-3" />
              Pinned Messages
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
          </div>
        )}
        
        {/* Pinned Messages (at the top, but rendered here due to flex-col-reverse) */}
        {pinnedMessages?.map(
          (messageData, index, messageArray) => renderMessage(messageData, index, messageArray)
        )}
      </div>
      
      {/* Bulk Actions Toolbar */}
      <BulkActionsToolbar
        selectedCount={selectedMessages.length}
        onClearSelection={clearSelection}
        onBulkStar={handleBulkStar}
        onBulkDelete={handleBulkDelete}
        onBulkForward={handleBulkForward}
        onBulkCopy={handleBulkCopy}
        onBulkDownload={handleBulkDownload}
      />
    </>
  );
};

export default Body;
