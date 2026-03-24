"use client";

type Props = {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

export default function ShortcutCard({ title, icon, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition"
    >
      <div className="text-blue-500 text-2xl">{icon}</div>
      <span className="font-medium">{title}</span>
    </div>
  );
}