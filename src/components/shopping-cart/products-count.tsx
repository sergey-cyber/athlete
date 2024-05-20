"use client";

import { declineWord } from "@/lib/utils";
import { useCartStorage } from "../providers/cart-provider";

interface Props {
  className?: string;
}

export function CartProductsCount({ className }: Props) {
  const { getTotalCount } = useCartStorage();

  const totalCount = getTotalCount();

  const str = `${totalCount} ${declineWord(
    totalCount,
    "Позиция",
    "Позиции",
    "Позиций"
  )}`;

  return <span className={className}>{str}</span>;
}
