"use client";

type Props = {
  title: string;
  date: string;
  status: "Lido" | "Não Lido";
  onClick?: () => void;
};

export default function AvisoCard({ title, date, status, onClick }: Props) {
  const statusColor = status === "Lido" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700";

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-xl shadow hover:shadow-lg transition flex justify-between items-center ${statusColor}`}
    >
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{date}</p>
      </div>
      <span className="px-2 py-1 text-xs rounded-full">{status}</span>
    </div>
  );
}