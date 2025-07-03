"use client";

import { useState, useMemo } from "react";
import { Id } from "@/convex/_generated/dataModel";

type ConversationData = {
  conversation: {
    _id: Id<"conversations">;
    _creationTime: number;
    name?: string;
    lastMessageId?: Id<"messages">;
    isGroup: boolean;
  };
  otherMember?: {
    _id: Id<"users">;
    _creationTime: number;
    username: string;
    imageUrl: string;
    clerkId: string;
    email: string;
  } | null;
  lastMessage: {
    sender: string;
    content: string;
  } | null;
  unseenCount: number;
};

export const useConversationSearch = (conversations: ConversationData[] | undefined) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = useMemo(() => {
    if (!conversations || !searchTerm || typeof searchTerm !== 'string' || !searchTerm.trim()) {
      return conversations;
    }

    const lowercaseSearch = searchTerm.toLowerCase().trim();

    return conversations.filter((conversation) => {
      try {
        // Search by conversation name (for groups)
        if (conversation.conversation.isGroup && conversation.conversation.name && typeof conversation.conversation.name === 'string') {
          if (conversation.conversation.name.toLowerCase().includes(lowercaseSearch)) {
            return true;
          }
        }

        // Search by member username (for DMs)
        if (!conversation.conversation.isGroup && conversation.otherMember?.username && typeof conversation.otherMember.username === 'string') {
          if (conversation.otherMember.username.toLowerCase().includes(lowercaseSearch)) {
            return true;
          }
        }

        return false;
      } catch (error) {
        console.error('Error in search filter:', error, conversation);
        return false;
      }
    });
  }, [conversations, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredConversations,
    hasResults: filteredConversations ? filteredConversations.length > 0 : false,
    isSearching: typeof searchTerm === 'string' && searchTerm.trim().length > 0,
  };
};
