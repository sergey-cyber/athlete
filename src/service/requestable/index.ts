import { redirect } from "next/navigation";
import { RequestError } from "../exeption/request-error";
import { toSignIn } from "@/lib/routes";

interface RequestParams {
  body?: any;
  method?: "POST" | "GET" | "PUT" | "DELETE";
  headers?: any;
  cache?: "no-store";
}

export class Requestable {
  protected path: string;
  constructor(path: string) {
    this.path = process.env.API_URL + path;
  }

  protected async makeRequest<T>(path: string, params?: RequestParams) {
    console.info("Start request to " + this.path + path);
    const response = await fetch(this.path + path, params);
    if (!response.ok) {
      if (response.status === 401) {
        redirect(toSignIn());
      } else {
        throw new RequestError({
          message: "Request error ",
          status: response.status,
        });
      }
    }
    return response.json() as T;
  }
}
