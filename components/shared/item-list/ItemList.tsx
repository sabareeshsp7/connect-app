"use client";

import { cn } from "@/lib/utils";

import { useConversation } from "@/hooks/useConversation";
import { Card } from "@/components/ui/card";

type Props = React.PropsWithChildren<{
  title: string;
  action?: React.ReactNode;
}>;

const ItemList = ({ children, title, action: Action }: Props) => {
  const { isActive } = useConversation();

  return (
    <Card
      className={cn("h-full w-full lg:flex-none lg:w-80 p-2 flex flex-col", {
        "hidden lg:flex": isActive,   // Hide on mobile when active, show on desktop
        "flex": !isActive,            // Always show when not active
      })}
    >
      <div className="mb-4 flex items-center justify-between flex-shrink-0">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {Action ? Action : null}
      </div>
      <div className="w-full flex-1 flex flex-col items-center justify-start gap-2 min-h-0">
        {children}
      </div>
    </Card>
  );
};

export default ItemList;
