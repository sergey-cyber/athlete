import { Roles } from "@/lib/auth";
import { authService } from "../auth";
import { orderService } from ".";

export async function searchOrders() {
  try {
    const principal = await authService.getPrincipal();
    if (principal.role === Roles.ADMIN) {
      return await orderService.getAll();
    }
    return await orderService.getForPrincipal();
  } catch (e) {
    return [];
  }
}
