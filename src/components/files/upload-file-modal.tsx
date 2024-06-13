"use client";

import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import { uploadFile } from "@/service/fileStorage/actions";
import { useToast } from "../ui/use-toast";

export function UploadFileModal() {
  const { toast } = useToast();
  const [pending, setPending] = useState(false);
  const [file, setFile] = useState<File | undefined>();

  const onSubmit = async () => {
    setPending(true);
    try {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      }
      const res = await uploadFile(formData);
      if (res?.error) {
        toast({
          title: "Ошибка при загрузке файла.",
          description: res.error.message,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Файл загружен успешно.",
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={pending}>
          <Upload className="mr-2" />
          Загрузить
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Загрузить новый файл</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            onChange={(e) => setFile(e.target.files?.[0])}
            id="file"
            type="file"
          />
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button onClick={onSubmit} disabled={!file || pending}>
              Загрузить
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
