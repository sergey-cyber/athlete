import { ProductDetails } from "@/components/product/product-details";
import { amenitiesService } from "@/service/amenities";

interface Props {
  params: { id: number };
}

export default async function AmenitiesDetailsPage({ params }: Props) {
  const amenitiesList = await amenitiesService.search();
  const amenities = amenitiesList.find(({ id }) => id == params.id);

  if (!amenities) {
    return <h1>Услуга не найдена.</h1>;
  }

  return (
    <section className="space-y-6 py-6">
      <div>
        <h1 className="test-start text-2xl font-bold">Детали услуги</h1>
      </div>
      <ProductDetails productType="amenities" product={amenities} />
    </section>
  );
}
