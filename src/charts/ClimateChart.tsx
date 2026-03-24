"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { month: "Jan", score: 70 },
  { month: "Feb", score: 85 },
  { month: "Mar", score: 60 },
  { month: "Apr", score: 90 },
  { month: "May", score: 75 },
  { month: "Jun", score: 80 },
];

export default function ClimateChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="score" fill="#4ade80" radius={[5, 5, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}