import { RequestExeption } from "@/service/exeption/request-exeption";
import { UserType } from "@/service/user/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**Склоняет слово в зависимости от цифры, стоящей перед ним */
export function declineWord(
  number: number,
  one: string,
  two: string,
  five: string
) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}

export const getFullName = (user?: UserType) => {
  return `${user?.secondName ?? ""} ${user?.firstName ?? ""} ${
    user?.middleName ?? ""
  }`;
};

export function getHttpStatusMessage(statusCode?: number) {
  switch (statusCode) {
    case 400:
      return "Клиентская ошибка.";
    case 403:
      return "Недостаточно прав.";
    case 404:
      return "404, не найдено.";
    case 500:
      return "Серверная ошибка.";
    case 503:
      return "Сервис недоступен.";
    default:
      return "Что-то пошло не так.";
  }
}

export function handleActionError(err: unknown) {
  if (err instanceof RequestExeption) {
    return {
      error: { status: err.status, message: getHttpStatusMessage(err.status) },
    };
  }
  return { error: { status: undefined, message: "Что-то пошло не так" } };
}

export function defineColorForRole(role: string) {
  switch (role) {
    case "admin":
      return "bg-green-600";
    case "user":
      return "bg-blue-600";
  }
}
