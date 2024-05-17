import { AppHeader } from "@/components/app-header";

export default function ShopLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container">
      <AppHeader />
      {children}
    </main>
  );
}
