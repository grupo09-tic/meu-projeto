"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 to-blue-500">
      
      <div className="bg-white w-[360px] p-8 rounded-2xl shadow-xl">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image src="/img/logo.png" alt="Logo" width={240} height={80} />
        </div>

        {/* Título */}
        <h2 className="text-base text-gray-500 text-center mb-6">
          Tela Canal de Denuncia
        </h2>
      </div>

    </div>
  );
}
