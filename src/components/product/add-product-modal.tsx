"use client";

import { PropsWithChildren, ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Empty } from "../empty";
import { ProductListItem } from "../product/product-list-item";
import { Product } from "./types";

interface Props extends PropsWithChildren {
  products: Product[];
  trigger: ReactNode;
  loading: boolean;
  title: ReactNode;
  disabledItem: (item: Product) => boolean;
  onItemAdd: (item: Product) => void;
}

export function AddProductModal(props: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>{props.trigger}</SheetTrigger>
      <SheetContent className="overflow-y-auto">
        {props.loading ? (
          <div className="h-full w-full flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <SheetHeader>
              <SheetTitle>{props.title}</SheetTitle>
            </SheetHeader>
            <SheetDescription className="p-6 space-y-6">
              {props.products.length ? (
                props.products.map((item) => (
                  <ProductListItem {...item}>
                    <Button
                      onClick={() => props.onItemAdd(item)}
                      disabled={props.disabledItem(item)}
                    >
                      Добавить
                    </Button>
                  </ProductListItem>
                ))
              ) : (
                <Empty />
              )}
            </SheetDescription>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
