import { AmenitiesEditForm } from "@/components/amenities/amenities-edit-form";
import { amenitiesService } from "@/service/amenities";

interface Props {
  params: { id: number };
}

export default async function EditAmenitiesPage({ params }: Props) {
  // TODO: получаем все элементы, так как на бэке отсуттвует GET метод amenities/{id}
  const amenities = await amenitiesService.search();
  const amenitiesToEdit = amenities.find(({ id }) => id == params.id);

  if (!amenitiesToEdit) {
    // TODO: отобразить not-found page
    return null;
  }

  return (
    <section className="py-6 w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Редактирование услуги</h1>
      <AmenitiesEditForm amenities={amenitiesToEdit} />
    </section>
  );
}
