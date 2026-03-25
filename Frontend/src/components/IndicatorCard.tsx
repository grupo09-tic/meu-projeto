"use client";

type Props = {
  title: string;
  value: number | string;
  onClick?: () => void;
  bgColor?: string;
};

export default function IndicatorCard({ title, value, onClick, bgColor = "bg-white" }: Props) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-6 rounded-2xl shadow-md hover:shadow-xl transition ${bgColor}`}
    >
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}