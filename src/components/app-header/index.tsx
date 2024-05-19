import { LogIn, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";
import { AppMenu } from "../app-menu";

export function AppHeader() {
  return (
    <div className="container flex items-center justify-between py-4">
      <div className="flex gap-x-4">
        <h2 className="text-2xl font-bold">ATHLETE</h2>
        <AppMenu />
      </div>
      <div className="flex gap-x-4">
        <ModeToggle />
        <Button>
          <LogIn className="mr-2 h-4 w-4" />
          Войти
        </Button>
      </div>
    </div>
  );
}
