"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function LatestCargo() {
  const [latestCargo] = api.cargo.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [destination, setDestination] = useState("");
  const [trackingNumber, setTrackingNumber] = useState(0);
  const createCargo = api.cargo.create.useMutation({
    onSuccess: async () => {
      await utils.cargo.invalidate();
      setDestination("");
      setTrackingNumber((prev) => prev + 1);
    },
  });

  return (
    <div className="w-full max-w-xs">
      {latestCargo ? (
        <p>Your most recent cargo destination: {latestCargo.destination}</p>
      ) : (
        <p>You have no cargo.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createCargo.mutate({
            status: "Pending",
            trackingNo: "Ab25" + trackingNumber,
            origin: "Austin",
            destination: "Charlotte",
          });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Destination of the next"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createCargo.isPending}
        >
          {createCargo.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
