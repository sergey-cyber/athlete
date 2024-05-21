import { SignInForm } from "@/components/sign-in/sign-in-form";
import { Button } from "@/components/ui/button";
import { toSignUp } from "@/lib/routes";
import Link from "next/link";

export default function SignInPage() {
  return (
    <section className="container h-screen">
      <div className="w-full h-full flex flex-col justify-center items-center gap-y-6">
        <h1 className="text-3xl font-bold">ATHLETE</h1>
        <SignInForm />
        <div className="flex items-center">
          <span className="text-gray-600">Еще нет аккаунта?</span>
          <Button asChild variant={"link"}>
            <Link href={toSignUp()}>Перейти к регистрации.</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
