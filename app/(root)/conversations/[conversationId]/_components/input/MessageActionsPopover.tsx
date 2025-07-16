"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import UploadFileDialog from "../dialogs/UploadFileDialog";

const MessageActionsPopover = () => {
  const [uploadFileDialogOpen, setUploadFileDialogOpen] = useState(false);
  const [uploadImageDialogOpen, setUploadImageDialogOpen] = useState(false);

  return (
    <Popover>
      <PopoverContent className="w-full mb-1 flex flex-col gap-2">
        <UploadFileDialog
          open={uploadFileDialogOpen}
          toggle={(newState) => setUploadFileDialogOpen(newState)}
          type="file"
        />
        <UploadFileDialog
          open={uploadImageDialogOpen}
          toggle={(newState) => setUploadImageDialogOpen(newState)}
          type="image"
        />
      </PopoverContent>
      <PopoverTrigger asChild>
        <Button size="icon" variant="secondary">
          <PlusCircle />
        </Button>
      </PopoverTrigger>
    </Popover>
  );
};

export default MessageActionsPopover;
