"use client";
import { api } from "~/trpc/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

export function DestinationBarChart() {
  const { data, isLoading } = api.cargo.getDestinationSummary.useQuery();

  if (isLoading) return <div>Loading destination chart...</div>;
  if (!data) return <div>No data</div>;

  const chartData = data.map((item) => ({
    name: item.destination,
    count: item._count.destination,
  }));

  return (
    <div className="h-72 w-full rounded-lg bg-white/10 p-4 shadow">
      <h2 className="mb-2 text-lg font-bold text-purple-200">
        Cargos by Destination
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#f472b6" />
          <YAxis stroke="#f472b6" />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#f472b6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
