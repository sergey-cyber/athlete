"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  userName?: string;
}
export function UserAvatar({ userName }: Props) {
  const falback = userName?.[0];

  return (
    <Avatar className="w-12 h-12">
      <AvatarImage src="" alt="" />
      <AvatarFallback className="font-semibold text-xl">
        {falback}
      </AvatarFallback>
    </Avatar>
  );
}
