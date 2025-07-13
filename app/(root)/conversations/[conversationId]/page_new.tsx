"use client";

import ConversationContainer from "@/components/shared/conversation/ConversationContainer";
import React, { useState } from "react";
import Header from "./_components/Header";
import Body from "./_components/body/Body";
import ChatInput from "./_components/input/ChatInput";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Loader2 } from "lucide-react";
import RemoveFriendDialog from "./_components/dialogs/RemoveFriendDialog";
import DeleteGroupDialog from "./_components/dialogs/DeleteGroupDialog";
import LeaveGroupDialog from "./_components/dialogs/LeaveGroupDialog";
import { ReplyProvider } from "@/hooks/useReply";

type Props = {
  params: {
    conversationId: Id<"conversations">;
  };
};

const ConversationPage = ({ params: { conversationId } }: Props) => {
  const conversation = useQuery(api.conversation.get, { id: conversationId });
  const messages = useQuery(api.messages.get, { id: conversationId });

  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);
  
  // AI suggestion state
  const [aiSuggestion, setAiSuggestion] = useState<string>('');

  // Handle AI suggestion from message actions
  const handleAIReply = (messageId: string, aiResponse: string) => {
    setAiSuggestion(aiResponse);
  };

  const handleAISuggestionUsed = () => {
    setAiSuggestion('');
  };

  return conversation === undefined ? (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="h-8 w-8" />
    </div>
  ) : conversation === null ? (
    <p className="w-full h-full flex items-center justify-center">
      Conversation not found
    </p>
  ) : (
    <ReplyProvider>
      <ConversationContainer>
        <RemoveFriendDialog
          conversationId={conversationId}
          open={removeFriendDialogOpen}
          setOpen={setRemoveFriendDialogOpen}
        />
        <DeleteGroupDialog
          conversationId={conversationId}
          open={deleteGroupDialogOpen}
          setOpen={setDeleteGroupDialogOpen}
        />
        <LeaveGroupDialog
          conversationId={conversationId}
          open={leaveGroupDialogOpen}
          setOpen={setLeaveGroupDialogOpen}
        />
        <Header
          name={
            (conversation.isGroup
              ? conversation.name
              : conversation.otherMember?.username) || ""
          }
          imageUrl={
            conversation.isGroup ? undefined : conversation.otherMember?.imageUrl
          }
          options={
            conversation.isGroup
              ? [
                  {
                    label: "Leave group",
                    destructive: false,
                    onClick: () => setLeaveGroupDialogOpen(true),
                  },
                  {
                    label: "Delete group",
                    destructive: true,
                    onClick: () => setDeleteGroupDialogOpen(true),
                  },
                ]
              : [
                  {
                    label: "Remove friend",
                    destructive: true,
                    onClick: () => setRemoveFriendDialogOpen(true),
                  },
                ]
          }
        />

        <Body
          members={
            conversation.isGroup
              ? conversation.otherMembers
                ? conversation.otherMembers
                : []
              : conversation.otherMember
              ? [conversation.otherMember]
              : []
          }
          onAIReply={handleAIReply}
        />
        <ChatInput 
          aiSuggestion={aiSuggestion}
          onAISuggestionUsed={handleAISuggestionUsed}
        />
      </ConversationContainer>
    </ReplyProvider>
  );
};

export default ConversationPage;
