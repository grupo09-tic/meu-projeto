"use client";

import { ReactNode } from "react";

export default function AvisosLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-gray-50 p-8">{children}</div>;
}