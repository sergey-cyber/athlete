import { Requestable } from "../requestable";
import { FileStorageType } from "./types";

class FileStorage extends Requestable {
  constructor(path: string) {
    super(path);
  }

  public async search() {
    return this.makeRequest<FileStorageType[]>("/getAllFiles", {
      cache: "no-store",
    });
  }

  public async getFileByOrderId(orderId: number) {
    return this.makeRequest<FileStorageType>(
      `/fileByOrderId?orderId=${orderId}`,
      { cache: "no-store" }
    );
  }

  public getDownloadFileLink(fileId: string) {
    return this.path + "/files/" + fileId;
  }

  public async upload(payload: FormData) {
    return this.makeRequest<string>("/upload", {
      method: "POST",
      body: payload,
    });
  }
}

export const fileStorageService = new FileStorage("/fileStorage");
