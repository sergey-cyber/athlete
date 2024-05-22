import { userService } from "@/service/user";

export default async function UsersPage() {
  const users = await userService.search();

  return <section>{JSON.stringify(users)}</section>;
}
