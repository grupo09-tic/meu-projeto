"use client";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function ChartCard({ title, children }: Props) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h3 className="text-gray-600 font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}