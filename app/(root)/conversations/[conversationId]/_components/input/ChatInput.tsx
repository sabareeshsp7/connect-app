"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutationState } from "@/hooks/useMutationState";
import { SendHorizonal } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConvexError } from "convex/values";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useConversation } from "@/hooks/useConversation";
import MessageActionsPopover from "./MessageActionsPopover";
import { useTheme } from "next-themes";

import MessageConfirmationDialog from "@/components/shared/conversation/MessageConfirmationDialog";
import ReplyPreview from "@/components/shared/conversation/ReplyPreview";
import { useReply } from "@/hooks/useReply";

type ChatInputProps = {
  // AI reply suggestion
  aiSuggestion?: string;
  onAISuggestionUsed?: () => void;
};

const chatMessageSchema = z.object({
  content: z.string().min(1, { message: "This field can't be empty" }),
});

const ChatInput: FC<ChatInputProps> = ({
  aiSuggestion,
  onAISuggestionUsed
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  
  // Confirmation dialog state
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [pendingSuggestion, setPendingSuggestion] = useState<{
    message: string;
    type: string;
  } | null>(null);

  const { conversationId } = useConversation();
  const { replyMessage, clearReply } = useReply();

  const { theme } = useTheme();

  const { mutate: createMessage, pending } = useMutationState(
    api.message.create
  );

  const form = useForm<z.infer<typeof chatMessageSchema>>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      content: "",
    },
  });

  const content = form.watch("content", "");

  // Handle AI suggestion
  useEffect(() => {
    if (aiSuggestion) {
      form.setValue("content", aiSuggestion);
      textareaRef.current?.focus();
      toast.success('AI suggestion added to message field');
      onAISuggestionUsed?.(); // Clear the suggestion
    }
  }, [aiSuggestion, form, onAISuggestionUsed]);



  // Handle confirmation dialog actions
  const handleConfirmSuggestion = async (message: string) => {
    console.log('Confirming suggestion:', message);
    
    try {
      await createMessage({
        content: [message],
        type: "text",
        conversationId,
        // Temporarily removing reply fields due to schema validation error
        // Will be re-enabled once schema is properly deployed
      });
      
      form.reset();
      clearReply(); // Clear reply context after sending
      toast.success('Message sent successfully!');
      textareaRef.current?.focus();
    } catch (error) {
      toast.error(
        error instanceof ConvexError
          ? error.data
          : "Failed to send message"
      );
    }
    
    setShowConfirmationDialog(false);
    setPendingSuggestion(null);
  };

  const handleEditSuggestion = (editedMessage: string) => {
    console.log('Editing suggestion:', editedMessage);
    form.setValue("content", editedMessage);
    setShowConfirmationDialog(false);
    setPendingSuggestion(null);
    textareaRef.current?.focus();
  };

  const handleCancelSuggestion = () => {
    setShowConfirmationDialog(false);
    setPendingSuggestion(null);
    // Keep the message in the input for manual editing
  };

  const handleSubmit = async (values: z.infer<typeof chatMessageSchema>) => {
    try {
      console.log('Attempting to send message:', {
        content: values.content,
        conversationId,
        replyMessage,
        hasReply: !!replyMessage
      });

      const messageData = {
        content: [values.content],
        type: "text",
        conversationId,
        // Temporarily removing reply fields due to schema validation error
        // Will be re-enabled once schema is properly deployed
      };

      console.log('Message data being sent:', messageData);

      await createMessage(messageData);
      
      form.reset();
      clearReply(); // Clear reply context after sending
      textareaRef.current?.focus();
      toast.success('Message sent successfully!');
    } catch (error) {
      console.error('Message send error details:', error);
      console.error('Error type:', typeof error);
      console.error('Error instanceof ConvexError:', error instanceof ConvexError);
      
      if (error instanceof ConvexError) {
        console.error('ConvexError data:', error.data);
        toast.error(`Error: ${error.data}`);
      } else if (error instanceof Error) {
        console.error('Regular Error message:', error.message);
        toast.error(`Error: ${error.message}`);
      } else {
        console.error('Unknown error:', error);
        toast.error("Failed to send message. Please try again.");
      }
    }
  };

  return (
    <>
      {/* Reply Preview */}
      <ReplyPreview />
      
      <Card className="w-full p-3 lg:p-3 rounded-none lg:rounded-xl relative border-0 lg:border shadow-sm">
      {/* Message Confirmation Dialog */}
      <MessageConfirmationDialog
        isOpen={showConfirmationDialog}
        onClose={handleCancelSuggestion}
        suggestedMessage={pendingSuggestion?.message || ''}
        suggestionType={pendingSuggestion?.type || 'suggestion'}
        onConfirm={handleConfirmSuggestion}
        onEdit={handleEditSuggestion}
      />
      
      <div className="flex gap-2 lg:gap-2 items-end w-full">
        <MessageActionsPopover />
        
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex gap-1 lg:gap-2 items-end w-full"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="h-full w-full">
                  <FormControl>
                    <TextareaAutosize
                      onKeyDown={async (e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          await form.handleSubmit(handleSubmit)();
                        }
                      }}
                      rows={1}
                      maxRows={3}
                      {...field}
                      ref={(el) => {
                        field.ref(el);
                        textareaRef.current = el;
                      }}
                      placeholder="Type a message..."
                      className="min-h-full w-full resize-none border-0 outline-0 bg-card text-card-foreground placeholder:text-muted-foreground p-2 lg:p-2.5 text-sm lg:text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={pending} size="icon" type="submit">
              <SendHorizonal />
            </Button>
          </form>
        </Form>
      </div>
    </Card>
    </>
  );
};

export default ChatInput;
