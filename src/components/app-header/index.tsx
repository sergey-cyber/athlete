import { LogIn, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";

export function AppHeader() {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex gap-x-4">
        <h2 className="text-2xl font-bold">ATHLETE</h2>
        <Button variant={"outline"}>
          <Menu className="mr-2 h-4 w-4" />
          Меню
        </Button>
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
