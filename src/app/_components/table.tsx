import React from "react";
import { api } from "~/trpc/server";

const CargoTable = async () => {
  const list = await api.cargo.getAll();

  void api.cargo.getLatest.prefetch();
  return (
    <div className="w-full overflow-x-auto rounded-lg bg-white/10 shadow-lg">
      <table className="min-w-full divide-y divide-purple-300">
        <thead>
          <tr>
            <th className="bg-white/20 px-6 py-3 text-left text-xs font-bold tracking-wider text-purple-200 uppercase">
              Tracking #
            </th>
            <th className="bg-white/20 px-6 py-3 text-left text-xs font-bold tracking-wider text-purple-200 uppercase">
              Status
            </th>
            <th className="bg-white/20 px-6 py-3 text-left text-xs font-bold tracking-wider text-purple-200 uppercase">
              Origin
            </th>
            <th className="bg-white/20 px-6 py-3 text-left text-xs font-bold tracking-wider text-purple-200 uppercase">
              Destination
            </th>
            <th className="bg-white/20 px-6 py-3 text-left text-xs font-bold tracking-wider text-purple-200 uppercase">
              Updated
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-purple-700">
          {list?.map((cargo, i) => (
            <tr
              key={cargo.id}
              className={`transition-colors duration-200 hover:opacity-65 ${
                i % 2 === 0 ? "bg-white/5" : "bg-white/0"
              }`}
            >
              <td className="px-6 py-4 font-mono whitespace-nowrap">
                {cargo.trackingNo}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-block rounded px-2 py-1 text-xs font-semibold ${
                    cargo.status === "Delivered"
                      ? "bg-green-600/80 text-white"
                      : "bg-yellow-600/80 text-white"
                  }`}
                >
                  {cargo.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{cargo.origin}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {cargo.destination}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(cargo.updatedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CargoTable;
