import Link from "next/link";

import { LatestCargo } from "~/app/_components/cargo";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const list = await api.cargo.getAll();

  void api.cargo.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Your Cargo Details
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8"></div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {list ? JSON.stringify(list) : "Loading tRPC query..."}
            </p>
          </div>
          <LatestCargo />
        </div>
      </main>
    </HydrateClient>
  );
}
