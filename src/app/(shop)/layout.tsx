import { AppHeader } from "@/components/app-header";
import { CartContextProvider } from "@/components/providers/cart-provider";
import { Separator } from "@/components/ui/separator";

export default function ShopLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <CartContextProvider>
        <AppHeader />
        <Separator />
        <section className="container">{children}</section>
      </CartContextProvider>
    </main>
  );
}
