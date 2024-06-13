import { UserType } from "@/service/user/types";
import { UserAvatar } from "./user-avatar";
import { getFullName } from "@/lib/utils";
import { Mail, Phone } from "lucide-react";

interface Props {
  user?: UserType;
  hiddenAvatar?: boolean;
}

export function UserInfo({ user, hiddenAvatar }: Props) {
  if (!user) {
    return null;
  }
  return (
    <div key={user.id} className="flex gap-x-4 items-center">
      {!hiddenAvatar ? <UserAvatar userName={user.firstName} /> : null}
      <div className="flex w-full justify-between">
        <div>
          <p className="font-semibold">{getFullName(user)}</p>
          <p className="text-gray-500">{user.address}</p>
          <div className="flex gap-x-2 text-gray-500">
            {user.email ? (
              <span className="flex items-center gap-x-1 ">
                <Mail size={16} />
                <span>{user.email}</span>
              </span>
            ) : null}
            {user.phone ? (
              <span className="flex items-center gap-x-1">
                <Phone size={16} />
                <span>{user.phone}</span>
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
