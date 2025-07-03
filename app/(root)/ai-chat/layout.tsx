import ConversationContainer from "@/components/shared/conversation/ConversationContainer";

type Props = React.PropsWithChildren<{}>;

export default function AIChatLayout({ children }: Props) {
  return <ConversationContainer>{children}</ConversationContainer>;
}
