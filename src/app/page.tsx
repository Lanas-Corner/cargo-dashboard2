import { CargoForm } from "~/app/_components/Cargo";
import { HydrateClient, api } from "~/trpc/server";
import CargoTable from "./_components/Table";
import { DestinationBarChart } from "./_components/DestinationBarChart";
import { StatusBarChart } from "./_components/StatusBarChart";

export default async function Home() {
  void api.cargo.getAll.prefetch();
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#8e568d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            All Cargo Details
          </h1>
          <div className="flex flex-row flex-wrap gap-5">
            <CargoForm />
            <CargoTable />
          </div>
          <DestinationBarChart />
          <StatusBarChart />
        </div>
      </main>
    </HydrateClient>
  );
}
