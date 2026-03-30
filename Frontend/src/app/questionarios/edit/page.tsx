"use client";
import { useEffect, useState } from "react";
import QuestionarioForm, { Questionario } from "@/components/QuestionarioForm";

export default function EditQuestionarioPage() {
  const [data, setData] = useState<Questionario | null>(null);

  useEffect(()=>{
    const questionarios: Questionario[] = JSON.parse(localStorage.getItem("questionarios")||"[]");
    if(questionarios.length) setData(questionarios[0]);
  },[]);

  if(!data) return <p>Carregando...</p>;
  return <QuestionarioForm initialData={data} />;
}