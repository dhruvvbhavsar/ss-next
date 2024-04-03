"use client";
import { useEffect, useState } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { TrashIcon, UploadIcon } from "lucide-react";
import placeholder from "@/public/placeholder.jpg";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { extractKey } from "@/lib/utils";

type PreviewWithFile = {
  preview: string;
  file?: File;
};

export default function PictureComponent({
  urls,
  userId,
}: {
  urls: string[];
  userId: string;
}) {
  const [selectedFiles, setSelectedFiles] = useState<PreviewWithFile[]>(() => {
    if (urls.length > 0) {
      return urls.map((url) => ({ preview: url }));
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const filesWithPreview = files.map((file) => ({
      preview: URL.createObjectURL(file),
      file,
    }));
    setSelectedFiles((prevFiles) =>
      [...prevFiles, ...filesWithPreview].slice(0, 4)
    );
  };

  const handleDeleteFile = (index: number) => {
    if (selectedFiles[index].file) {
      URL.revokeObjectURL(selectedFiles[index].preview);
    }
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSaveClick = async () => {
    // Filter out files that already have URLs
    setIsLoading(true);
    const newFiles = selectedFiles.filter(
      (file) =>
        !file.preview.startsWith(
          "https://shubhsambandh-pics.s3.ap-south-1.amazonaws.com"
        )
    );

    if (newFiles.length === 0) {
      toast.message("please upload a file")
      setIsLoading(false)
      return;
    }

    const requests = newFiles.map(async (file) => {
      if (!file.file) return;

      const formData = new FormData();
      formData.append("file", file.file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const { url } = await response.json();
      return url;
    });

    const urls = await Promise.all(requests);
    setUploadedUrls((prevUrls) => [...prevUrls, ...urls.filter(Boolean)]);
    const res = await fetch("/api/upload/push", {
      method: "POST",
      body: JSON.stringify({
        urls,
        userId,
      }),
    });

    if (res.ok) {
      toast.success("Upload Successful");
    } else {
      toast.error("Error Occured");
    }

    setIsLoading(false);
  };

  return (
    <Card key="1">
      <CardHeader>
        <CardTitle className="text-lg">Profile Pictures</CardTitle>
        <CardDescription>
          Add multiple pictures to your profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          accept="image/*"
          className="hidden"
          id="profile-pictures"
          multiple
          type="file"
          onChange={handleFileInputChange}
        />
        <label
          className="flex items-center space-x-2 cursor-pointer"
          htmlFor="profile-pictures"
        >
          <UploadIcon className="w-5 h-5" />
          <span className="underline">Upload pictures</span>
        </label>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Max 4 pictures allowed
        </p>
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => {
            const file = selectedFiles[i];
            return (
              <div
                key={i}
                className="relative group overflow-hidden rounded-lg aspect-square w-full cursor-pointer dark:ring-gray-950"
              >
                <img
                  alt="Uploaded Picture"
                  className="object-cover w-full h-full transition-transform scale-105 group-hover:scale-110"
                  height={600}
                  src={file?.preview || placeholder.src}
                  style={{
                    aspectRatio: "600/600",
                    objectFit: "cover",
                  }}
                  width={600}
                />
                {file && (
                  <AlertDialogDemo
                    handleDelete={handleDeleteFile}
                    index={i}
                    url={file.preview}
                    userId={userId}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-center">
          <Button disabled={isLoading} onClick={handleSaveClick}>
            {isLoading ? "..." : "Save"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

type DialogProps = {
  handleDelete(i: number): void;
  index: number;
  url: string;
  userId: string;
};

export function AlertDialogDemo({ ...props }: DialogProps) {
  const key = extractKey(props.url);

  let body = {
    key,
    userId: props.userId,
    url: props.url,
  };

  const handle_delete = async () => {
    try {
      await fetch("/api/upload/delete", {
        method: "POST",
        body: JSON.stringify(body),
      });
      props.handleDelete(props.index)
      toast.success("Deleted Successfully");
    } catch (error) {
      toast.error("Error Occured");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <TrashIcon className="absolute top-1 right-1 w-4 h-4 bg-white p-1 rounded dark:bg-gray-950" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            picture and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handle_delete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
