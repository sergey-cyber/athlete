"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from "../ui/navigation-menu";
import { toAbout, toHome, toProduct, toService, toUsers } from "@/lib/routes";
import { HandPlatter, Home, Info, ShoppingBag, Users } from "lucide-react";
import { usePathname } from "next/navigation";

interface Props {
  onItemClick: (path: string) => void;
}

const items = [
  { href: toHome(), label: "Главная", icon: <Home /> },
  { href: toUsers(), label: "Пользователи", icon: <Users /> },
  { href: toProduct(), label: "Товары", icon: <ShoppingBag /> },
  { href: toService(), label: "Услуги", icon: <HandPlatter /> },
  { href: toAbout(), label: "О компании", icon: <Info /> }
];

export function NavItems({ onItemClick }: Props) {
  const pathname = usePathname();
  return (
    <NavigationMenu className="w-full flex-col">
      {items.map(({ href, label, icon }) => (
        <NavigationMenuItem
          onClick={() => onItemClick(href)}
          key={href}
          className="w-full"
        >
          <Link href={href} legacyBehavior passHref className="w-full">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {icon}
              <span className="ml-2">{label}</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      ))}
    </NavigationMenu>
  );
}
