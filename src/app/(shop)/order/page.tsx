import { Empty } from "@/components/empty";
import { DeleteOrderButton } from "@/components/order/delete-order-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toEditOrder } from "@/lib/routes";
import { orderService } from "@/service/order";
import { Pencil } from "lucide-react";
import Link from "next/link";

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
                <div className="flex items-center gap-x-2">
                  <Button size={"mini"} variant={"outline"} asChild>
                    <Link href={toEditOrder(order.id)}>
                      <Pencil size={16} />
                    </Link>
                  </Button>
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
