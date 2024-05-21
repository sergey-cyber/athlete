import { AmenitiesForm } from "@/components/amenities/amenities-form";

export default function CreateAmenitiesPage() {
  return (
    <section className="py-6 w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Создание услуги</h1>
      <AmenitiesForm />
    </section>
  );
}
