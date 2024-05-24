import { Empty } from "@/components/empty";
import { DeleteOrderButton } from "@/components/order/delete-order-button";
import { Separator } from "@/components/ui/separator";
import { orderService } from "@/service/order";

export default async function OrdersPage() {
  const orders = await orderService.search();

  return (
    <section className="space-y-6">
      <div className="py-6 flex justify-between">
        <h1 className="text-2xl font-bold">Заявки</h1>
      </div>
      {orders.length ? (
        orders.map((order) => (
          <>
            <div key={order.id} className="flex gap-x-4">
              <div className="flex w-full justify-between">
                <div>
                  <p className="font-semibold">{order.orderName}</p>
                  <p className="text-gray-500">{order.description}</p>
                  <div className="flex gap-x-2 text-gray-500">
                    {order.status ? (
                      <span className="flex items-center gap-x-1 ">
                        <span>Статус: </span>
                        <span>{order.status.status}</span>
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="flex items-center">
                  <DeleteOrderButton order={order} />
                </div>
              </div>
            </div>
            <Separator />
          </>
        ))
      ) : (
        <Empty />
      )}
    </section>
  );
}
