"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  userName?: string;
  className?: string;
}
export function UserAvatar({ userName, className }: Props) {
  const falback = userName?.[0];

  return (
    <Avatar className={cn("w-12 h-12 border", className)}>
      <AvatarImage src="" alt="" />
      <AvatarFallback className="font-semibold text-xl">
        {falback}
      </AvatarFallback>
    </Avatar>
  );
}
