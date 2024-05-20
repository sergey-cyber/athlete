"use client";

import { Button } from "@/components/ui/button";
import { toHome } from "@/lib/routes";
import { Home } from "lucide-react";
import Link from "next/link";

export default function RootError() {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center py-6 gap-y-6">
      <h2 className="text-xl font-bold">Произошла ошибка!</h2>
      <Button asChild>
        <Link href={toHome()}>
          <Home className="mr-2" /> На главную
        </Link>
      </Button>
    </section>
  );
}
