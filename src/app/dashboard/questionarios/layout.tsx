"use client";
import { ReactNode } from "react";

export default function QuestionariosLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-gray-50 p-8">{children}</div>;
}