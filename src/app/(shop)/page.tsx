import { toMerchandises } from "@/lib/routes";
import { redirect } from "next/navigation";

export default function HomePage() {
  return redirect(toMerchandises());
}
