import { Inbox } from "lucide-react";

export function Empty(props: { className?: string }) {
  return (
    <div
      className={
        "w-full flex flex-col justify-center items-center text-gray-500 " +
          props.className || ""
      }
    >
      <Inbox size={36} /> Пока ничего нет
    </div>
  );
}
