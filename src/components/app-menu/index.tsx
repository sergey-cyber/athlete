import { PropsWithChildren } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../ui/sheet";
import { NavItems } from "./nav-items";

interface Props extends PropsWithChildren {}

export function AppMenu({ children }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Навигация</SheetTitle>
        </SheetHeader>
        <SheetDescription className="py-2">
          <NavItems />
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
