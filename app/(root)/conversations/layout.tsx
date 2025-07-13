"use client";

import ItemList from "@/components/shared/item-list/ItemList";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import DMConversationItem from "./_components/DMConversationItem";
import { Loader2 } from "lucide-react";
import CreateGroupDialog from "./_components/CreateGroupDialog";
import GroupConversationItem from "./_components/GroupConversationItem";
import SearchBar from "./_components/SearchBar";
import { useConversationSearch } from "@/hooks/useConversationSearch";

type Props = React.PropsWithChildren<{}>;

const ConversationsLayout = ({ children }: Props) => {
  const conversations = useQuery(api.conversations.get);
  const { searchTerm, setSearchTerm, filteredConversations, hasResults, isSearching } = useConversationSearch(conversations);

  return (
    <>
      <ItemList 
        title="Conversations" 
        action={
          <div className="flex items-center gap-2">
            <CreateGroupDialog />
          </div>
        }
      >
        {/* Search Bar */}
        <div className="w-full mb-3">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search members and groups..."
            className="w-full"
          />
        </div>

        {/* Conversations List with smooth scrolling */}
        <div className="w-full flex-1 overflow-y-auto min-h-0 no-scrollbar">
          {conversations ? (
            <>
              {/* Show search results info */}
              {isSearching && (
                <div className="w-full text-center mb-2 px-2">
                  <p className="text-sm text-muted-foreground">
                    {hasResults 
                      ? `Found ${filteredConversations?.length} member${filteredConversations?.length !== 1 ? 's' : ''}`
                      : `No members found for "${searchTerm}"`
                    }
                  </p>
                </div>
              )}

              {/* Conversations container with proper spacing */}
              <div className="space-y-2 pb-4">
                {(filteredConversations || conversations).length === 0 ? (
                  <div className="w-full text-center py-8 text-muted-foreground">
                    <p>{isSearching ? "No members match your search" : "No conversations found"}</p>
                  </div>
                ) : (
                  (filteredConversations || conversations).map((conversation) => {
                    return conversation.conversation.isGroup ? (
                      <GroupConversationItem
                        key={conversation.conversation._id}
                        id={conversation.conversation._id}
                        name={conversation.conversation.name || ""}
                        lastMessageSender={conversation.lastMessage?.sender}
                        lastMessageContent={conversation.lastMessage?.content}
                        unseenCount={conversation.unseenCount}
                      />
                    ) : (
                      <DMConversationItem
                        key={conversation.conversation._id}
                        id={conversation.conversation._id}
                        username={conversation.otherMember?.username || ""}
                        imageUrl={conversation.otherMember?.imageUrl || ""}
                        lastMessageSender={conversation.lastMessage?.sender}
                        lastMessageContent={conversation.lastMessage?.content}
                        unseenCount={conversation.unseenCount}
                      />
                    );
                  })
                )}
              </div>
            </>
          ) : (
            <div className="w-full flex-1 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}
        </div>
      </ItemList>
      {children}
    </>
  );
};

export default ConversationsLayout;
