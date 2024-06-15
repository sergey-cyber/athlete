"use client";

import { PropsWithChildren, useState } from "react";
import { Button } from "../ui/button";
import { FileStorageType } from "@/service/fileStorage/types";
import { Download } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { redirect } from "next/navigation";
import { toSignIn } from "@/lib/routes";
import { getHttpStatusMessage } from "@/lib/utils";

interface Props extends PropsWithChildren {
  file: FileStorageType;
  size?: "mini" | "micro";
}

export function DownloadFileButton({ file, size = "micro" }: Props) {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const onSubmit = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("/api/fileStorage?id=" + file.id);
      if (!response.ok) {
        if (response.status === 401) {
          redirect(toSignIn());
        } else {
          toast({
            title: "Ошибка при скачивании файла.",
            description: getHttpStatusMessage(response.status),
            variant: "destructive",
          });
          return;
        }
      }
      const blob = await response.blob();
      // Создаем ссылку для скачивания файла
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = file.title; // Задаем имя файла
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsDownloading(false);
    }
  };

  const iconSize = size === "micro" ? 12 : 16;

  return (
    <Button
      onClick={() => onSubmit()}
      variant="outline"
      size={size}
      disabled={isDownloading}
    >
      <Download size={iconSize} />
    </Button>
  );
}
