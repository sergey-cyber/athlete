import { ProductDetails } from "@/components/product/product-details";
import { merchandiseService } from "@/service/merchandise";

interface Props {
  params: { id: number };
}

export default async function MerchandiseDetailsPage({ params }: Props) {
  // TODO: вызываем все элементы, так как на бэке отсуттвует GET метод merchandise/{id}
  const merchandises = await merchandiseService.search();
  const merchandise = merchandises.find(({ id }) => id == params.id);

  if (!merchandise) {
    // TODO: отобразить not-found page
    return <h1>Товар не найден.</h1>;
  }

  return (
    <section className="space-y-6 py-6">
      <div>
        <h1 className="test-start text-2xl font-bold">Детали товара</h1>
      </div>
      <ProductDetails productType="merchandises" product={merchandise} />
    </section>
  );
}
