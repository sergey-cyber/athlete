import { EditOrderForm } from "@/components/order/edit-order-form";
import { getHttpStatusMessage } from "@/lib/utils";
import { authService } from "@/service/auth";
import { fileStorageService } from "@/service/fileStorage";
import { searchOrders } from "@/service/order/dal";
import { statusService } from "@/service/status";
import { userService } from "@/service/user";

interface Props {
  params: { id: number };
}

export default async function EditOrderPage({ params }: Props) {
  const statuses = await statusService.search();
  const clients = await userService.search();

  // TODO: вызываем все элементы, так как на бэке отсуттвует GET метод order/{id}
  const orders = await searchOrders();
  const orderToEdit = await orders.find(({ id }) => id == params.id);
  const principal = await authService.getPrincipal();

  if (!orderToEdit) {
    // TODO: отобразить not-found page
    return null;
  }

  let file;

  try {
    file = await fileStorageService.getFileByOrderId(orderToEdit.id);
  } catch (err: any) {
    return (
      <div className="w-full text-center mt-4">
        <p className="text-lg font-semibold">Ошибка!</p>
        <p>{getHttpStatusMessage(err?.status)}</p>
      </div>
    );
  }

  return (
    <section className="py-6 space-y-6">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Редактирование заявки</h1>
      </div>
      <EditOrderForm
        currentFile={file.id ? file : undefined}
        initialValue={orderToEdit}
        clients={clients}
        statuses={statuses}
        access={principal.role}
      />
    </section>
  );
}
