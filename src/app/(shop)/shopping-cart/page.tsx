import { CreaeteOrderFromCart } from "@/components/order/create-order-from-cart";
import { authService } from "@/service/auth";
import { statusService } from "@/service/status";
import { userService } from "@/service/user";

export default async function ShoppingCartPage() {
  const statuses = await statusService.search();
  const clients = await userService.search();
  const principal = await authService.getPrincipal();

  return (
    <section className="py-6 space-y-6">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Оформление заявки</h1>
      </div>
      <CreaeteOrderFromCart
        client={principal}
        clients={clients}
        statuses={statuses}
      />
    </section>
  );
}
