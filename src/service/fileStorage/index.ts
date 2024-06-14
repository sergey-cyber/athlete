import { getAuthCockies } from "@/lib/auth";
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

  private getDownloadFileLink(fileId: string) {
    return this.path + "/files/" + fileId;
  }

  public async downloadFile(fileId: string) {
    const response = await fetch(this.getDownloadFileLink(fileId), {
      headers: getAuthCockies(),
    });
    this.checkResponseForErrors(response);
    return response;
  }

  public async upload(payload: FormData) {
    const response = await fetch(this.path + "/upload", {
      method: "POST",
      body: payload,
      headers: getAuthCockies(),
    });
    this.checkResponseForErrors(response);
  }

  public async findAllWithoutOrder() {
    return this.makeRequest<FileStorageType[]>(`/findAllWithoutOrderId`, {
      cache: "no-store",
    });
  }

  public async remove(id: string) {
    const response = await fetch(`${this.path}/delete?id=${id}`, {
      method: "DELETE",
      headers: getAuthCockies(),
    });
    this.checkResponseForErrors(response);
  }
}

export const fileStorageService = new FileStorage("/fileStorage");
