import React from "react";

import { UploadDropzone } from "@/lib/uploadthings";
import { UploadThingError } from "uploadthing/server";
import { Json } from "@uploadthing/shared";
import { toast } from "sonner";

type Props = {
  onChange: (urls: string[]) => void;
  type: "image" | "file";
};

const Uploader = ({ type, onChange }: Props) => {
  return (
    <UploadDropzone
      endpoint={type}
      onClientUploadComplete={(res) => onChange(res.map((item) => item.url))}
      onUploadError={(error: UploadThingError<Json>) => {
        toast.error(error.message);
      }}
    />
    // <UploadDropzone
    //   endpoint={type}
    //   //added a parameter to the res (maybe deleted if it doesn't work)
    //   onClientUploadComplete={(res: any[]) => onChange(res.map((item) => item.url))}
    //   onUploadError={(error: UploadThingError<Json>) => {
    //     toast.error(error.message);
    //   }}
    // />
  );
};

export default Uploader;
