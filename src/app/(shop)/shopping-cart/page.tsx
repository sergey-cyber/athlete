import { CartProductsList } from "@/components/shopping-cart/products-list";

export default function ShoppingCartPage() {
  return (
    <section className="py-6 space-y-6">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Корзина</h1>
      </div>
      <CartProductsList />
    </section>
  );
}
