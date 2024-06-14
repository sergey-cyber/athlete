import { LogIn } from "lucide-react";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";
import { AppMenu } from "../app-menu";
import { Cart } from "./cart";
import Link from "next/link";
import { toProfile, toSignIn } from "@/lib/routes";
import { SignOutButton } from "../sign-up/sign-up-button";
import { UserAvatar } from "../users/user-avatar";
import { authService } from "@/service/auth";

export async function AppHeader() {
  const principal = await authService.getPrincipal();

  return (
    <div className="container flex items-center justify-between py-4">
      <div className="flex gap-x-4">
        <h2 className="text-2xl font-bold">ATHLETE</h2>
        <AppMenu />
      </div>
      <div className="flex gap-x-4 items-center">
        <ModeToggle />
        <Cart />
        {!principal ? (
          <Button asChild>
            <Link href={toSignIn()}>
              <LogIn className="mr-2 h-4 w-4" />
              Войти
            </Link>
          </Button>
        ) : (
          <div className="flex gap-x-4 items-center">
            <SignOutButton />
            <Link href={toProfile()}>
              <UserAvatar userName={principal.firstName} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
