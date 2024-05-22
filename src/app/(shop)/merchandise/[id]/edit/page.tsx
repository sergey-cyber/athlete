import { MerchandiseEditForm } from "@/components/merchandises/merchandise-edit-form";
import { merchandiseService } from "@/service/merchandise";

interface Props {
  params: { id: number };
}

export default async function EditMerchandisePage({ params }: Props) {
  // TODO: вызываем все элементы, так как на бэке отсуттвует GET метод merchandise/{id}
  const merchandises = await merchandiseService.search();
  const merchandiseToEdit = merchandises.find(({ id }) => id == params.id);

  if (!merchandiseToEdit) {
    // TODO: отобразить not-found page
    return null;
  }

  return (
    <section className="py-6 w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Создание товара</h1>
      <MerchandiseEditForm merchandise={merchandiseToEdit} />
    </section>
  );
}
