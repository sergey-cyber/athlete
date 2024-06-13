import { LogIn } from "lucide-react";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";
import { AppMenu } from "../app-menu";
import { Cart } from "./cart";
import Link from "next/link";
import { toSignIn } from "@/lib/routes";
import { isAuthorized } from "@/lib/auth";
import { SignOutButton } from "../sign-up/sign-up-button";

export function AppHeader() {
  return (
    <div className="container flex items-center justify-between py-4">
      <div className="flex gap-x-4">
        <h2 className="text-2xl font-bold">ATHLETE</h2>
        <AppMenu />
      </div>
      <div className="flex gap-x-4">
        <ModeToggle />
        <Cart />
        {!isAuthorized() ? (
          <Button asChild>
            <Link href={toSignIn()}>
              <LogIn className="mr-2 h-4 w-4" />
              Войти
            </Link>
          </Button>
        ) : (
          <SignOutButton />
        )}
      </div>
    </div>
  );
}
