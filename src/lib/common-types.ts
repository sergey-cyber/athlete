import { RequestExeption } from "@/service/exeption/request-exeption";

export type ActionResult<T> = { error: RequestExeption } | T;
