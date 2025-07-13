"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ReplyMessage {
  messageId: string;
  content: string;
  senderName: string;
}

interface ReplyContextType {
  replyMessage: ReplyMessage | null;
  setReplyMessage: (message: ReplyMessage | null) => void;
  clearReply: () => void;
}

const ReplyContext = createContext<ReplyContextType | undefined>(undefined);

export const ReplyProvider = ({ children }: { children: ReactNode }) => {
  const [replyMessage, setReplyMessage] = useState<ReplyMessage | null>(null);

  const clearReply = () => setReplyMessage(null);

  return (
    <ReplyContext.Provider value={{ replyMessage, setReplyMessage, clearReply }}>
      {children}
    </ReplyContext.Provider>
  );
};

export const useReply = () => {
  const context = useContext(ReplyContext);
  if (context === undefined) {
    // Return a default implementation when no provider is available
    return {
      replyMessage: null,
      setReplyMessage: () => {},
      clearReply: () => {},
    };
  }
  return context;
};
