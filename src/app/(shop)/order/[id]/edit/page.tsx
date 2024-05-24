import { EditOrderForm } from "@/components/order/edit-order-form";
import { orderService } from "@/service/order";
import { statusService } from "@/service/status";
import { userService } from "@/service/user";

interface Props {
  params: { id: number };
}

export default async function EditOrderPage({ params }: Props) {
  const statuses = await statusService.search();
  const clients = await userService.search();

  // TODO: вызываем все элементы, так как на бэке отсуттвует GET метод order/{id}
  const orders = await orderService.search();
  const orderToEdit = orders.find(({ id }) => id == params.id);

  if (!orderToEdit) {
    // TODO: отобразить not-found page
    return null;
  }

  return (
    <section className="py-6 space-y-6">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Редактирование заявки</h1>
      </div>
      <EditOrderForm
        initialValue={orderToEdit}
        clients={clients}
        statuses={statuses}
      />
    </section>
  );
}
