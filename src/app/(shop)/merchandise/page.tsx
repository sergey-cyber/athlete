import { Button } from "@/components/ui/button";
import { toCreateMerchandise } from "@/lib/routes";
import { merchandiseService } from "@/service/merchandiseService";
import { Inbox, Plus } from "lucide-react";
import Link from "next/link";

export default async function MerchandisesPage() {
  const merchandises = await merchandiseService.search();

  return (
    <section className="space-y-6">
      <div className="py-6 flex justify-between">
        <h1 className="text-xl font-bold">Каталог товаров</h1>
        <Button asChild>
          <Link href={toCreateMerchandise()}>
            <Plus className="mr-2" />
            Создать товар
          </Link>
        </Button>
      </div>
      {merchandises.length ? (
        <div></div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center text-gray-500">
          <Inbox size={36} /> Пока ничего нет
        </div>
      )}
    </section>
  );
}
