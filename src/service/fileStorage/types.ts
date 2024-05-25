import { number } from "zod";

export type UploadFilePayload = {
  file: File;
  id: string;
  orderId: number;
};

export type FileStorageType = {
  id: string;

  size: number;

  title: string;

  description: string;

  file: File;

  orderId: number;
};
