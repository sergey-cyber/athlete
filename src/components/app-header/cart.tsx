"use client";

import { useCartStorage } from "../providers/cart-provider";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

export function Cart() {
  const { getTotalCount } = useCartStorage();

  const totalCount = getTotalCount();

  return (
    <Button variant={"outline"} className="flex gap-x-2">
      <ShoppingCart size={24} />
      {totalCount ? (
        <span className="inline-flex items-center rounded-md bg-red-50 px-2 text-red-700 ring-1 ring-inset ring-red-600/10">
          {totalCount}
        </span>
      ) : null}
    </Button>
  );
}
