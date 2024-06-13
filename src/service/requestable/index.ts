import { redirect } from "next/navigation";
import { toSignIn } from "@/lib/routes";
import { getAuthCockies } from "@/lib/auth";
import { RequestExeption } from "../exeption/request-exeption";
import { getHttpStatusMessage } from "@/lib/utils";

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

    const response = await fetch(this.path + path, {
      ...params,
      headers: { ...params?.headers, ...getAuthCockies() },
    });

    this.checkResponseForErrors(response);

    return response.json() as T;
  }

  public checkResponseForErrors(response: Response) {
    if (!response.ok) {
      if (response.status === 401) {
        redirect(toSignIn());
      } else {
        throw new RequestExeption(
          response.status,
          getHttpStatusMessage(response.status)
        );
      }
    }
  }
}
