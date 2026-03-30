"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Questionario, Pergunta } from "@/components/QuestionarioForm";

export default function QuestionarioResponderPage() {
  const { id } = useParams();
  const [questionario, setQuestionario] = useState<Questionario | null>(null);
  const [respostas, setRespostas] = useState<{[key:string]:any}>({});
  const [enviado,setEnviado] = useState(false);

  useEffect(()=>{
    const dados: Questionario[] = JSON.parse(localStorage.getItem("questionarios")||"[]");
    const encontrado = dados.find(q=>q.id===id);
    setQuestionario(encontrado||null);
  },[id]);

  if(!questionario) return <p>Carregando...</p>;

  function atualizarResposta(pid:string, valor:any){
    setRespostas(prev=>({...prev,[pid]:valor}));
  }

  function enviar(){
    const obrigatoriasNaoRespondidas = questionario.perguntas.filter(p=>p.obrigatoria).filter(p=>!respostas[p.id] || respostas[p.id].length===0);
    if(obrigatoriasNaoRespondidas.length>0){alert("Responda todas as obrigatórias!"); return;}
    setEnviado(true);
    alert("Enviado!");
    console.log(respostas);
  }

  if(enviado) return <div className="max-w-3xl mx-auto p-6 text-center"><h1 className="text-2xl font-bold mb-4">Obrigado!</h1><p>Respostas enviadas.</p></div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">{questionario.titulo}</h1>
      <p>{questionario.descricao}</p>
      {(questionario.inicio || questionario.fim) && <p className="text-sm text-gray-500">Disponível: {questionario.inicio||"—"} até {questionario.fim||"—"}</p>}
      <div className="space-y-6 mt-6">
        {questionario.perguntas.map((p:Pergunta)=>(
          <div key={p.id} className="bg-white p-5 rounded-xl shadow space-y-2">
            <p>{p.titulo} {p.obrigatoria && <span className="text-red-500">*</span>}</p>
            {p.tipo==="texto" && <input className="border p-2 rounded w-full" value={respostas[p.id]||""} onChange={e=>atualizarResposta(p.id,e.target.value)}/>}
            {p.tipo==="paragrafo" && <textarea className="border p-2 rounded w-full" value={respostas[p.id]||""} onChange={e=>atualizarResposta(p.id,e.target.value)}/>}
            {p.tipo==="multipla_escolha" && p.opcoes?.map((op,i)=>(
              <label key={i} className="flex items-center gap-2"><input type="radio" name={p.id} checked={respostas[p.id]===op} onChange={()=>atualizarResposta(p.id,op)}/> {op}</label>
            ))}
            {p.tipo==="checkbox" && p.opcoes?.map((op,i)=>{
              const val = respostas[p.id]||[];
              return <label key={i} className="flex items-center gap-2"><input type="checkbox" checked={val.includes(op)} onChange={e=>{if(e.target.checked) atualizarResposta(p.id,[...val,op]); else atualizarResposta(p.id,val.filter(x=>x!==op))}}/> {op}</label>
            })}
            {p.tipo==="sim_nao" && <div className="flex gap-4"><button onClick={()=>atualizarResposta(p.id,"Sim")} className={`px-4 py-2 border rounded ${respostas[p.id]==="Sim"?"bg-green-200":""}`}>Sim</button><button onClick={()=>atualizarResposta(p.id,"Não")} className={`px-4 py-2 border rounded ${respostas[p.id]==="Não"?"bg-red-200":""}`}>Não</button></div>}
            {p.tipo==="nps" && <div className="flex gap-2 flex-wrap">{Array.from({length:11}).map((_,i)=><button key={i} onClick={()=>atualizarResposta(p.id,i)} className={`w-8 h-8 border rounded flex items-center justify-center ${respostas[p.id]===i?"bg-blue-200":""}`}>{i}</button>)}</div>}
          </div>
        ))}
      </div>
      <button onClick={enviar} className="mt-4 w-full bg-green-600 text-white py-3 rounded-xl">Enviar</button>
    </div>
  );
}