import { AppHeader } from "@/components/app-header";
import { OrderContextProvider } from "@/components/providers/order-storage-provider";
import { Separator } from "@/components/ui/separator";

export default function ShopLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <OrderContextProvider>
        <AppHeader />
        <Separator />
        <section className="container">{children}</section>
      </OrderContextProvider>
    </main>
  );
}
