import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import React from "react";
import { format } from "date-fns";
import ImagePreview from "./ImagePreview";
import FilePreview from "./FilePreview";
import { Badge } from "@/components/ui/badge";
import MessageActionsMenu from "@/components/shared/conversation/MessageActionsMenu";
import { useMessageActions } from "@/hooks/useMessageStore";
import { Id } from "@/convex/_generated/dataModel";

type Props = {
  messageId: Id<"messages">;
  fromCurrentUser: boolean;
  senderImage: string;
  senderName: string;
  lastByUser: boolean;
  content: string[];
  createdAt: number;
  seen?: React.ReactNode;
  type: string;
  replyToMessageId?: string;
  replyToSenderName?: string;
  replyToContent?: string;
  onInfo?: () => void;
  onAIReply?: (messageId: string, content: string) => void;
};

const Message = ({
  messageId,
  fromCurrentUser,
  senderImage,
  senderName,
  lastByUser,
  content,
  createdAt,
  seen,
  type,
  replyToMessageId,
  replyToSenderName,
  replyToContent,
  onInfo,
  onAIReply,
}: Props) => {
  const {
    getMessageState,
    toggleSelect,
    handleReply,
    handleDelete,
    handleInfo,
    addReaction,
  } = useMessageActions();

  const messageState = getMessageState(messageId);

  const formatTime = (timestamp: number) => {
    return format(timestamp, "HH:mm");
  };

  return (
    <div className={cn("flex w-full group px-2 py-1", {
      "justify-end": fromCurrentUser,
      "justify-start": !fromCurrentUser,
    })}>
      <div className={cn("flex items-end gap-1 max-w-[85%] md:max-w-[75%]", {
        "flex-row-reverse": fromCurrentUser,
        "flex-row": !fromCurrentUser,
      })}>
        {/* Avatar */}
        <Avatar
          className={cn("w-6 h-6 md:w-8 md:h-8 flex-shrink-0", {
            invisible: lastByUser,
          })}
        >
          <AvatarImage src={senderImage} />
          <AvatarFallback className="text-xs font-medium">
            {senderName.substring(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Message Content */}
        <div className="flex flex-col min-w-0 flex-1">
          {/* Message Bubble with Actions */}
          <div className={cn("flex items-end gap-1", {
            "flex-row-reverse": fromCurrentUser,
            "flex-row": !fromCurrentUser,
          })}>
            {/* Main Message Bubble */}
            <div
              className={cn("px-3 py-2 md:px-4 md:py-3 rounded-2xl relative shadow-sm min-w-0 max-w-full", {
                // Sent messages styling
                "bg-blue-500 text-white": fromCurrentUser,
                "rounded-br-md": !lastByUser && fromCurrentUser,
                // Received messages styling
                "bg-white text-gray-900 border border-gray-200": !fromCurrentUser,
                "rounded-bl-md": !lastByUser && !fromCurrentUser,
              })}
            >
              {/* Reply Preview */}
              {replyToMessageId && replyToSenderName && replyToContent && (
                <div className={cn("border-l-3 pl-3 py-2 mb-3 text-xs rounded bg-opacity-20", {
                  "border-white/40 bg-white/15": fromCurrentUser,
                  "border-blue-400/60 bg-blue-50": !fromCurrentUser,
                })}>
                  <p className={cn("font-semibold mb-1 text-sm", {
                    "text-white/95": fromCurrentUser,
                    "text-blue-600": !fromCurrentUser,
                  })}>
                    {replyToSenderName}
                  </p>
                  <p className={cn("text-sm opacity-80 truncate", {
                    "text-white/85": fromCurrentUser,
                    "text-gray-600": !fromCurrentUser,
                  })}>
                    {replyToContent.length > 50 
                      ? replyToContent.substring(0, 50) + '...' 
                      : replyToContent
                    }
                  </p>
                </div>
              )}

              {/* Message Content */}
              {type === "text" ? (
                <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                  {content}
                </p>
              ) : null}
              {type === "file" ? <FilePreview url={content[0]} /> : null}
              {type === "image" ? <ImagePreview urls={content} /> : null}
              
              {/* Timestamp */}
              <p className={cn("text-xs mt-1 opacity-70", {
                "text-white text-right": fromCurrentUser,
                "text-gray-500 text-left": !fromCurrentUser,
              })}>
                {formatTime(createdAt)}
              </p>
            </div>

            {/* Message Actions Menu */}
            <div className="flex-shrink-0 ml-1">
              <MessageActionsMenu
                messageId={messageId}
                content={content}
                fromCurrentUser={fromCurrentUser}
                senderName={senderName}
                createdAt={createdAt}
                onReply={(messageId, content) => handleReply(messageId, content, senderName)}
                onDelete={handleDelete}
                onInfo={onInfo || handleInfo}
                onAIReply={onAIReply}
              />
            </div>
          </div>

          {/* Reactions Display */}
          {messageState.reactions && messageState.reactions.length > 0 && (
            <div className={cn("flex flex-wrap gap-1 mt-1 px-1", {
              "justify-end": fromCurrentUser,
              "justify-start": !fromCurrentUser,
            })}>
              {messageState.reactions.map((reaction, index) => (
                <span
                  key={index}
                  className="bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full text-xs cursor-pointer transition-colors"
                  onClick={() => toggleSelect(messageId)}
                >
                  {reaction}
                </span>
              ))}
            </div>
          )}

          {/* Seen indicator */}
          {seen && (
            <div className={cn("mt-1 text-xs px-1", {
              "self-end": fromCurrentUser,
              "self-start": !fromCurrentUser,
            })}>
              {seen}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
