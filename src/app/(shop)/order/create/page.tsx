import { CreaeteOrderForm } from "@/components/order/create-order-form";
import { authService } from "@/service/auth";
import { statusService } from "@/service/status";
import { userService } from "@/service/user";

export default async function CreateOrderPage() {
  const statuses = await statusService.search();
  const clients = await userService.searchAdmins();
  const principal = await authService.getPrincipal();

  return (
    <section className="py-6 space-y-6">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Создание заявки</h1>
      </div>
      <CreaeteOrderForm
        clients={clients}
        client={principal}
        statuses={statuses}
      />
    </section>
  );
}
