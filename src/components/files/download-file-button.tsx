"use client";

import { PropsWithChildren, useState } from "react";
import { Button } from "../ui/button";
import { FileStorageType } from "@/service/fileStorage/types";
import { Download } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { redirect } from "next/navigation";
import { toSignIn } from "@/lib/routes";

interface Props extends PropsWithChildren {
  file: FileStorageType;
}

export function DownloadFileButton({ file }: Props) {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const onSubmit = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("/api/fileStorage?id=" + file.id);
      if (!response.ok) {
        if (response.status === 401) {
          redirect(toSignIn());
        } else if (response.status === 403) {
          throw new Error("Недостаточно прав.");
        } else {
          throw new Error("Request error " + response.status);
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
      toast({
        title: "Ошибка при скачивании файла.",
        description: err?.message ?? "",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      onClick={() => onSubmit()}
      variant="outline"
      size="mini"
      disabled={isDownloading}
    >
      <Download size={16} />
    </Button>
  );
}
