import { Empty } from "@/components/empty";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/users/user-avatar";
import { userService } from "@/service/user";
import { UserType } from "@/service/user/types";
import { Mail, Phone } from "lucide-react";

export default async function UsersPage() {
  const users = await userService.search();

  const getFullName = (user: UserType) => {
    return `${user.secondName ?? ""} ${user.firstName} ${
      user.middleName ?? ""
    }`;
  };

  return (
    <section className="space-y-6">
      <div className="py-6 flex justify-between">
        <h1 className="text-2xl font-bold">Пользователи</h1>
      </div>
      {users.length ? (
        users.map((user) => (
          <>
            <div key={user.id} className="flex gap-x-4">
              <UserAvatar userName={user.firstName} />
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
            <Separator />
          </>
        ))
      ) : (
        <Empty />
      )}
    </section>
  );
}
