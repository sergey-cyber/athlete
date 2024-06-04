import { Empty } from "@/components/empty";
import { Separator } from "@/components/ui/separator";
import { DeleteUserButton } from "@/components/users/delete-user-button";
import { UserInfo } from "@/components/users/user-info";
import { userService } from "@/service/user";

export default async function UsersPage() {
  const users = await userService.search();

  return (
    <section className="space-y-6">
      <div className="py-6 flex justify-between">
        <h1 className="text-2xl font-bold">Пользователи</h1>
      </div>
      {users.length ? (
        users.map((user) => (
          <>
            <div key={user.id} className="flex justify-between items-center">
              <UserInfo user={user} />
              <div className="flex">
                <DeleteUserButton user={user} />
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
