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

export function StatusBarChart() {
  const { data, isLoading } = api.cargo.getStatusSummary.useQuery();

  if (isLoading) return <div>Loading status chart...</div>;
  if (!data) return <div>No data</div>;

  const chartData = data.map((item) => ({
    name: item.status,
    count: item._count.status,
  }));

  return (
    <div className="h-72 w-full rounded-lg bg-white/10 p-4 shadow">
      <h2 className="mb-2 text-lg font-bold text-purple-200">
        Cargos by Status
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#a78bfa" />
          <YAxis stroke="#a78bfa" />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#a78bfa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
