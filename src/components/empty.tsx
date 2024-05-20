import { Inbox } from "lucide-react";

export function Empty() {
  return (
    <div className="w-full flex flex-col justify-center items-center text-gray-500">
      <Inbox size={36} /> Пока ничего нет
    </div>
  );
}
