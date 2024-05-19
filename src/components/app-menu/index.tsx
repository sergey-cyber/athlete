"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../ui/sheet";
import { NavItems } from "./nav-items";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

export function AppMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open}>
      <SheetTrigger asChild>
        <Button onClick={() => setOpen(!open)} variant={"outline"}>
          <Menu className="mr-2 h-4 w-4" />
          Меню
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} onClose={() => setOpen(false)}>
        <SheetHeader>
          <SheetTitle>Навигация</SheetTitle>
        </SheetHeader>
        <SheetDescription className="py-2">
          <NavItems onItemClick={() => setOpen(false)} />
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
