"use client";

export default function RootError() {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center py-6 gap-y-6">
      <h2 className="text-xl font-bold">Что-то пошло не так!</h2>
      {/* <Button asChild>
        <Link href={toHome()}>
          <Home className="mr-2" /> На главную
        </Link>
      </Button> */}
    </section>
  );
}
