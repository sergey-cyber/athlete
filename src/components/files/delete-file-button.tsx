"use client";

import { FileStorageType } from "@/service/fileStorage/types";
import { PropsWithChildren, useState } from "react";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { Confirm } from "../confirm";
import { deleteFile } from "@/service/fileStorage/actions";

interface Props extends PropsWithChildren {
  file: FileStorageType;
}

export function DeleteFileButton({ file }: Props) {
  const { toast } = useToast();
  const [pending, setPending] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const onSubmit = async () => {
    setPending(true);
    try {
      const res = await deleteFile(file.id);
      if (res?.error) {
        toast({
          title: "Ошибка при удалении файла.",
          description: res.error.message,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Файл удален успешно.",
      });
    } finally {
      setPending(false);
      setOpenConfirm(false);
    }
  };

  return (
    <>
      <Confirm
        loading={pending}
        open={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        title={`Файл '${file.title}' будет удален, продолжить?`}
        onConfirm={onSubmit}
      />
      <Button
        onClick={() => setOpenConfirm(true)}
        variant="outline"
        size="micro"
        disabled={pending}
      >
        <Trash size={12} />
      </Button>
    </>
  );
}
