import { MerchandiseForm } from "@/components/merchandises/merchandise-form";

export default function CreateMerchandisePage() {
  return (
    <section className="py-6 w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Создание товара</h1>
      <MerchandiseForm />
    </section>
  );
}
