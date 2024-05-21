import { Empty } from "@/components/empty";
import { orderService } from "@/service/order";

export default async function OrdersPage() {
  const orders = await orderService.search();

  console.log(orders);

  return (
    <section className="space-y-6">
      <div className="py-6 flex justify-between">
        <h1 className="text-2xl font-bold">Заявки</h1>
      </div>
      {orders.length ? <div></div> : <Empty />}
    </section>
  );
}
