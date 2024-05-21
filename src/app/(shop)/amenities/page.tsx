import { AmenitiesListItem } from "@/components/amenities/amenities-list-item";
import { Empty } from "@/components/empty";
import { Button } from "@/components/ui/button";
import { toCreateAmenities } from "@/lib/routes";
import { amenitiesService } from "@/service/amenities";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function AmenitiesListPage() {
  const amenities = await amenitiesService.search();

  return (
    <section className="space-y-6">
      <div className="py-6 flex justify-between">
        <h1 className="text-2xl font-bold">Каталог услуг</h1>
        <Button asChild>
          <Link href={toCreateAmenities()}>
            <Plus className="mr-2" />
            Создать товар
          </Link>
        </Button>
      </div>
      {amenities.length ? (
        <div className="grid grid-cols-4 gap-4 lg:grid-cols-5 xl:grid-cols-6">
          {amenities.map((item) => (
            <AmenitiesListItem key={item.id} amenities={item} />
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </section>
  );
}
