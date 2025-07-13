"use client";

import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useReply } from './useReply';
import { Id } from '@/convex/_generated/dataModel';

interface MessageState {
  messageId: string;
  isStarred: boolean;
  isPinned: boolean;
  pinDuration?: number; // -1 for forever, positive number for days
  pinnedAt?: number; // timestamp when pinned
  isSelected: boolean;
  reactions: string[];
}

export const useMessageActions = () => {
  const [messageStates, setMessageStates] = useState<Record<string, MessageState>>({});
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const { setReplyMessage } = useReply();

  const getMessageState = useCallback((messageId: string | Id<"messages">): MessageState => {
    const id = String(messageId);
    return messageStates[id] || {
      messageId: id,
      isStarred: false,
      isPinned: false,
      isSelected: false,
      reactions: [],
    };
  }, [messageStates]);

  const toggleStar = useCallback((messageId: string) => {
    setMessageStates(prev => {
      const current = prev[messageId] || getMessageState(messageId);
      const newState = { ...current, isStarred: !current.isStarred };
      toast.success(newState.isStarred ? 'Message starred' : 'Message unstarred');
      return { ...prev, [messageId]: newState };
    });
  }, [getMessageState]);

  const togglePin = useCallback((messageId: string, duration?: number) => {
    setMessageStates(prev => {
      const current = prev[messageId] || getMessageState(messageId);
      const newState = { 
        ...current, 
        isPinned: !current.isPinned,
        pinDuration: !current.isPinned ? duration : undefined,
        pinnedAt: !current.isPinned ? Date.now() : undefined
      };
      toast.success(newState.isPinned ? 'Message pinned' : 'Message unpinned');
      return { ...prev, [messageId]: newState };
    });
  }, [getMessageState]);

  const addReaction = useCallback((messageId: string, emoji: string) => {
    setMessageStates(prev => {
      const current = prev[messageId] || getMessageState(messageId);
      const reactions = current.reactions || [];
      const newReactions = reactions.includes(emoji) 
        ? reactions.filter(r => r !== emoji)
        : [...reactions, emoji];
      
      const newState = { ...current, reactions: newReactions };
      toast.success(newReactions.includes(emoji) ? `Added ${emoji} reaction` : `Removed ${emoji} reaction`);
      return { ...prev, [messageId]: newState };
    });
  }, [getMessageState]);

  const toggleSelect = useCallback((messageId: string) => {
    setMessageStates(prev => {
      const current = prev[messageId] || getMessageState(messageId);
      const newState = { ...current, isSelected: !current.isSelected };
      
      setSelectedMessages(prevSelected => {
        if (newState.isSelected) {
          return [...prevSelected, messageId];
        } else {
          return prevSelected.filter(id => id !== messageId);
        }
      });
      
      toast.success(newState.isSelected ? 'Message selected' : 'Message deselected');
      return { ...prev, [messageId]: newState };
    });
  }, [getMessageState]);

  const handleReply = useCallback((messageId: string | Id<"messages">, content: string, senderName: string) => {
    setReplyMessage({
      messageId: String(messageId),
      content,
      senderName,
    });
    toast.success('Reply mode activated');
  }, [setReplyMessage]);

  const handleForward = useCallback((messageId: string, content: string) => {
    toast.success('Forward feature - opening contact selector');
    console.log('Forward message:', { messageId, content });
    // This would typically open a contact/conversation selector
  }, []);

  const handleDelete = useCallback((messageId: string) => {
    toast.success('Delete feature - message would be deleted');
    console.log('Delete message:', messageId);
    // This would typically call a delete mutation
  }, []);

  const handleInfo = useCallback((messageId: string) => {
    toast.success('Info feature - showing message details');
    console.log('Show info for message:', messageId);
    // This would typically show message details like delivery status, timestamp, etc.
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedMessages([]);
    setMessageStates(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(messageId => {
        if (updated[messageId].isSelected) {
          updated[messageId] = { ...updated[messageId], isSelected: false };
        }
      });
      return updated;
    });
    toast.success('Selection cleared');
  }, []);

  return {
    messageStates,
    setMessageStates,
    selectedMessages,
    getMessageState,
    toggleStar,
    togglePin,
    toggleSelect,
    handleReply,
    handleForward,
    handleDelete,
    handleInfo,
    clearSelection,
    addReaction,
  };
};
