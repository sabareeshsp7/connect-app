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
import MessageInfoDialog from "@/components/shared/conversation/MessageInfoDialog";
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
  const { messageStates, setMessageStates } = useMessageActions();
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
      
      <div className="flex-1 w-full flex overflow-y-scroll flex-col-reverse gap-0.5 md:gap-1 p-1 md:p-3 no-scrollbar bg-gray-50/30">
        {/* Messages */}
        {messages?.map(
          (messageData, index, messageArray) => renderMessage(messageData, index, messageArray)
        )}
      </div>
    </>
  );
};

export default Body;
