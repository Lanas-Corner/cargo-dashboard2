import { CargoForm } from "~/app/_components/cargo";
import { HydrateClient, api } from "~/trpc/server";
import CargoTable from "./_components/table";

export default async function Home() {
  void api.cargo.getAll.prefetch();
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#8e568d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            All Cargo Details
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8"></div>
          <CargoTable />
          <CargoForm />
        </div>
      </main>
    </HydrateClient>
  );
}
