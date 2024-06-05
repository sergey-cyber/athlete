import { EditUserForm } from "@/components/users/edit-user-form";
import { userService } from "@/service/user";

interface Props {
  params: { id: number };
}

export default async function EditUserPage({ params }: Props) {
  // TODO: получаем все элементы, так как на бэке отсуттвует GET метод users/{id}
  const users = await userService.search();
  const userToEdit = users.find(({ id }) => id == params.id);

  if (!userToEdit) {
    // TODO: отобразить not-found page
    return null;
  }

  return (
    <section className="py-6 w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Редактирование пользователя</h1>
      <EditUserForm user={userToEdit} />
    </section>
  );
}
