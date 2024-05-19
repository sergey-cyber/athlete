import { AppHeader } from "@/components/app-header";
import { Separator } from "@/components/ui/separator";

export default function ShopLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <AppHeader />
      <Separator />
      <section className="container">{children}</section>
    </main>
  );
}
