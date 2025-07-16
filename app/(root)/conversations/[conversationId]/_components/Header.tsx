import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CircleArrowLeft, Phone, Settings, Video } from "lucide-react";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  imageUrl?: string;
  name: string;
  options?: {
    label: string;
    destructive: boolean;
    onClick: () => void;
  }[];
  // setCallType: Dispatch<SetStateAction<"audio" | "video" | null>>;
};

const Header = ({ 
  imageUrl, 
  name, 
  options
}: Props) => {
  return (
    <Card className="w-full flex rounded-none lg:rounded-xl items-center p-3 lg:p-3 justify-between border-0 lg:border shadow-sm">
      <div className="flex items-center gap-3 lg:gap-3">
        <Link className="block lg:hidden" href="/conversations">
          <CircleArrowLeft className="h-5 w-5" />
        </Link>
        <Avatar className="w-9 h-9 lg:w-10 lg:h-10">
          <AvatarImage src={imageUrl} />
          <AvatarFallback className="text-sm lg:text-base">{name?.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <h2 className="font-semibold text-base lg:text-base truncate">{name}</h2>
      </div>
      <div className="flex gap-2">
        {/* <Button
          variant="secondary"
          size="icon"
          onClick={() => setCallType("audio")}
        >
          <Phone />
        </Button> */}
        {/* <Button
          variant="secondary"
          size="icon"
          onClick={() => setCallType("video")}
        >
          <Video />
        </Button> */}
        {options ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button size="icon" variant="secondary" className="h-8 w-8 lg:h-10 lg:w-10">
                <Settings className="h-4 w-4 lg:h-5 lg:w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {options.map((option, id) => {
                return (
                  <DropdownMenuItem
                    key={id}
                    onClick={option.onClick}
                    className={cn("font-semibold", {
                      "text-destructive": option.destructive,
                    })}
                  >
                    {option.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </Card>
  );
};

export default Header;
