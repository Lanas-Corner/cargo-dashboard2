"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { v4 as uuidv4 } from "uuid";

enum Status {
  InTransit = "In Transit",
  Delivered = "Delivered",
  Delayed = "Delayed",
  AtPort = "At Port",
  CustomHold = "Custom Hold",
}

enum DestinationType {
  Charlotte = "Charlotte",
  Austin = "Austin",
  NewYork = "New York",
}

interface CargoType {
  status: Status;
  origin: DestinationType;
  destination: DestinationType;
}

const initialCargo: CargoType = {
  status: Status.InTransit,
  origin: DestinationType.Austin,
  destination: DestinationType.Charlotte,
};

export function CargoForm() {
  const [fields, setFields] = useState<CargoType>(initialCargo);
  const [success, setSuccess] = useState(false);
  const utils = api.useUtils();

  const createCargo = api.cargo.create.useMutation({
    onSuccess: async () => {
      setSuccess(true);
      setFields(initialCargo);
      await utils.cargo.invalidate();
    },
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSuccess(false);
  }

  function handleAdd() {
    createCargo.mutate({
      trackingNo: uuidv4(),
      status: fields.status,
      origin: fields.origin,
      destination: fields.destination,
    });
  }

  return (
    <div className="mx-auto w-full max-w-lg space-y-4 rounded-lg bg-white/10 p-6 shadow">
      <h2 className="mb-2 text-xl font-bold text-purple-200">Add New Cargo</h2>
      <div className="flex flex-col gap-2">
        <label className="text-purple-100">Status</label>
        <select
          name="status"
          value={fields.status}
          onChange={handleChange}
          required
          className="rounded bg-white/20 px-3 py-2 text-white focus:ring-2 focus:ring-purple-400 focus:outline-none"
        >
          {Object.entries(Status).map(([key, val]) => (
            <option key={key} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-purple-100">Origin</label>
        <select
          name="origin"
          value={fields.origin}
          onChange={handleChange}
          required
          className="rounded bg-white/20 px-3 py-2 text-white focus:ring-2 focus:ring-purple-400 focus:outline-none"
        >
          {Object.entries(DestinationType).map(([key, val]) => (
            <option key={key} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-purple-100">Destination</label>
        <select
          name="destination"
          value={fields.destination}
          onChange={handleChange}
          required
          className="rounded bg-white/20 px-3 py-2 text-white focus:ring-2 focus:ring-purple-400 focus:outline-none"
        >
          {Object.entries(DestinationType).map(([key, val]) => (
            <option key={key} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        disabled={createCargo.isPending}
        onClick={handleAdd}
        className="mt-4 w-full rounded bg-purple-600 px-4 py-2 font-bold text-white transition hover:bg-purple-700"
      >
        {createCargo.isPending ? "Adding..." : "Add Cargo"}
      </button>
      {success && (
        <div className="mt-2 text-center text-green-300">Cargo added!</div>
      )}
      {createCargo.error && (
        <div className="mt-2 text-center text-red-300">
          {createCargo.error.message}
        </div>
      )}
    </div>
  );
}
