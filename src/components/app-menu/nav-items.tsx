"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from "../ui/navigation-menu";
import { toAbout, toHome, toProduct, toService, toUsers } from "@/lib/routes";

const items = [
  { href: toHome(), label: "Главная" },
  { href: toUsers(), label: "Пользователи" },
  { href: toProduct(), label: "Товары" },
  { href: toService(), label: "Услуги" },
  { href: toAbout(), label: "О компании" }
];

export function NavItems() {
  return (
    <NavigationMenu className="w-full flex-col">
      {items.map(({ href, label }) => (
        <NavigationMenuItem key={href} className="w-full">
          <Link href={href} legacyBehavior passHref className="w-full">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {label}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      ))}
    </NavigationMenu>
  );
}
