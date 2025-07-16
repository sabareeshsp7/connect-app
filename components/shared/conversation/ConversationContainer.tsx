import { Card } from "@/components/ui/card";
import React from "react";

type Props = React.PropsWithChildren<{}>;

const ConversationContainer = ({ children }: Props) => {
  return (
    <Card className="w-full h-[100dvh] lg:h-full p-0 lg:p-2 flex flex-col gap-0 lg:gap-2">
      {children}
    </Card>
  );
};

export default ConversationContainer;
