import { Empty } from "@/components/empty";
import { DeleteOrderButton } from "@/components/order/delete-order-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserInfo } from "@/components/users/user-info";
import { toEditOrder } from "@/lib/routes";
import { orderService } from "@/service/order";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

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
                  <p className="font-bold text-lg">{order.orderName}</p>
                  <p className="text-gray-500">{order.description}</p>
                  <OrderProp label="Статус" value={order.status.status} />
                  <OrderProp
                    label="Клиент"
                    value={<UserInfo hiddenAvatar user={order.client} />}
                  />
                  <OrderProp
                    label="Количество товаров"
                    value={order.totalNumberOfMerchandise}
                  />
                  <OrderProp
                    label="Количество услуг"
                    value={order.totalNumberOfAmenities}
                  />
                  <OrderProp
                    label="Стоимость"
                    value={
                      order.totalCostOfOrder
                        ? `${order.totalCostOfOrder} р`
                        : null
                    }
                  />
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

function OrderProp(props: { label: string; value: ReactNode }) {
  return props.value ? (
    <div className="flex gap-x-2 text-gray-500">
      <span className="flex gap-x-2 ">
        <span>{props.label}: </span>
        {typeof props.value === "string" || typeof props.value === "number" ? (
          <span className="font-semibold">{props.value}</span>
        ) : (
          props.value
        )}
      </span>
    </div>
  ) : null;
}
