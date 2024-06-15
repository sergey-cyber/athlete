import { PropsWithChildren } from "react";
import { OrderType } from "@/service/order/types";
import { fileStorageService } from "@/service/fileStorage";
import { DownloadFileButton } from "../files/download-file-button";

interface Props extends PropsWithChildren {
  order: OrderType;
}

export async function DownloadOrderFileButton({ order }: Props) {
  let file;

  try {
    file = await fileStorageService.getFileByOrderId(order.id);
  } catch (err: any) {
    console.log("Ошибка при загрузке файла для заявки: ", err?.message);
  }

  if (!file?.id) {
    return null;
  }

  return <DownloadFileButton size="mini" file={file} />;
}
