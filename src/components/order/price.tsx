"use client";

import { RussianRuble } from "lucide-react";

export function Price(props: { price: number }) {
  return (
    <div className="flex items-center text-2xl font-semibold">
      {props.price}
      <RussianRuble className="pt-1" />
    </div>
  );
}
