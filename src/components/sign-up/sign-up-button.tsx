"use client";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "@/service/auth/actions";

export function SignOutButton() {
  return (
    <Button variant={"outline"} onClick={() => signOut()}>
      <LogOut className="mr-2 h-4 w-4" />
      Выйти
    </Button>
  );
}
