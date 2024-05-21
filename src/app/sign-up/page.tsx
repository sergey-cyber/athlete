import { SignUpForm } from "@/components/sign-up/sign-up-form";

export default function SignUpPage() {
  return (
    <section className="container h-screen">
      <div className="w-full h-full flex flex-col justify-center items-center gap-y-6">
        <h1 className="text-3xl font-bold">ATHLETE</h1>
        <SignUpForm />
      </div>
    </section>
  );
}
