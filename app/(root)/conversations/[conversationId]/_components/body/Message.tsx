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
    toggleStar,
    togglePin,
    toggleSelect,
    handleReply,
    handleForward,
    handleDelete,
    handleInfo,
    addReaction,
  } = useMessageActions();

  const messageState = getMessageState(messageId);

  const formatTime = (timestamp: number) => {
    return format(timestamp, "HH:mm");
  };

  return (
    <div
      className={cn("flex w-full py-1 px-3 group hover:bg-gray-50/50 transition-colors", {
        "justify-end pl-16": fromCurrentUser, // Sent messages: align right with left padding
        "justify-start pr-16": !fromCurrentUser, // Received messages: align left with right padding
        "bg-blue-50/30": messageState.isSelected,
      })}
    >
      <div className={cn("flex items-end gap-3 max-w-[75%]", {
        "flex-row-reverse": fromCurrentUser, // Sent: avatar on right, message on left
        "flex-row": !fromCurrentUser, // Received: avatar on left, message on right
      })}>
        {/* Avatar */}
        <Avatar
          className={cn("w-8 h-8 flex-shrink-0", {
            invisible: lastByUser,
          })}
        >
          <AvatarImage src={senderImage} />
          <AvatarFallback className="text-xs font-medium">
            {senderName.substring(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Message Content Container */}
        <div className={cn("flex flex-col min-w-0 flex-1", {
          "items-end": fromCurrentUser, // Sent messages align content to right
          "items-start": !fromCurrentUser, // Received messages align content to left
        })}>
          {/* Message Status Indicators */}
          {(messageState.isStarred || messageState.isPinned) && (
            <div className={cn("flex gap-1 mb-1", {
              "justify-end": fromCurrentUser,
              "justify-start": !fromCurrentUser,
            })}>
              {messageState.isStarred && (
                <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                  ⭐ Starred
                </Badge>
              )}
              {messageState.isPinned && (
                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                  📌 Pinned
                </Badge>
              )}
            </div>
          )}

          {/* Message Bubble with Actions */}
          <div className={cn("flex items-end gap-2 w-full", {
            "flex-row-reverse": fromCurrentUser, // Sent: actions on left, message on right
            "flex-row": !fromCurrentUser, // Received: message on left, actions on right
          })}>
            {/* Main Message Bubble */}
            <div
              className={cn("px-4 py-3 rounded-2xl relative shadow-sm min-w-0", {
                // Sent messages styling
                "bg-blue-500 text-white": fromCurrentUser,
                "rounded-br-md": !lastByUser && fromCurrentUser,
                // Received messages styling
                "bg-white text-gray-900 border border-gray-200": !fromCurrentUser,
                "rounded-bl-md": !lastByUser && !fromCurrentUser,
                // Selection and state borders
                "ring-2 ring-yellow-400 ring-opacity-50": messageState.isStarred,
                "ring-2 ring-blue-400 ring-opacity-50": messageState.isPinned && !messageState.isStarred,
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
              <p className={cn("text-xs mt-2 opacity-70", {
                "text-white text-right": fromCurrentUser,
                "text-gray-500 text-left": !fromCurrentUser,
              })}>
                {formatTime(createdAt)}
              </p>
            </div>

            {/* Message Actions Menu */}
            <div className="flex-shrink-0">
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
            <div className={cn("flex flex-wrap gap-1 mt-2", {
              "justify-end": fromCurrentUser,
              "justify-start": !fromCurrentUser,
            })}>
              {messageState.reactions.map((reaction, index) => (
                <span
                  key={index}
                  className="bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full text-sm cursor-pointer transition-colors"
                  onClick={() => toggleSelect(messageId)}
                >
                  {reaction}
                </span>
              ))}
            </div>
          )}

          {/* Seen indicator */}
          {seen && (
            <div className={cn("mt-1 text-xs", {
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
