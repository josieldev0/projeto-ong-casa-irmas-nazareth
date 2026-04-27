"use client";

import { useMemo, useState } from "react";

type DocItem = {
  id: string;
  label: string;
};

const docs: DocItem[] = [
  { id: "nis", label: "Comprovante de NIS atualizado" },
  { id: "rgcpf", label: "RG e CPF do responsável familiar" },
  { id: "residencia", label: "Comprovante de residência" },
  { id: "renda", label: "Comprovante de renda familiar" },
  { id: "dependentes", label: "Se dependentes menores de 18 anos: CPF ou RG dos filhos" },
  { id: "certidao", label: "Certidão de nascimento/casamento" },
];

type DocumentAssistantProps = {
  inverted?: boolean;
};

export function DocumentAssistant({ inverted = false }: DocumentAssistantProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const progress = useMemo(() => {
    const total = docs.length;
    const done = docs.filter((doc) => checked[doc.id]).length;
    const percent = Math.round((done / total) * 100);
    return { total, done, percent };
  }, [checked]);

  const shell = inverted ? "space-y-5 text-white" : "space-y-5";
  const metaText = inverted ? "text-white/78" : "text-zinc-600";
  const strongText = inverted ? "text-white" : "text-zinc-900";
  const badgeBg = inverted ? "bg-white/12" : "bg-[#1D283A]/10";
  const badgeText = inverted ? "text-white" : "text-[#1D283A]";
  const barBg = inverted ? "bg-white/14" : "bg-zinc-200/70";
  const barFill = inverted
    ? "bg-gradient-to-r from-white to-white/70"
    : "bg-gradient-to-r from-[#1D283A] to-[#2B3B56]";
  const listBorder = inverted ? "border-white/18" : "border-zinc-200";
  const itemBorder = inverted ? "border-white/15" : "border-zinc-200";
  const labelText = inverted ? "text-white/95" : "text-zinc-800";
  const requiredText = "text-[#1D283A]";
  const requiredDot = inverted ? "bg-white/65" : "bg-zinc-400";
  const inputAccent = inverted ? "accent-white" : "accent-[#1D283A]";

  return (
    <div className={shell}>
      <div className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <p className={`text-[11px] uppercase tracking-[0.18em] ${metaText}`}>Checklist de documentos</p>
          <div className={`rounded-full px-3 py-1 text-sm font-semibold ${badgeBg} ${badgeText}`}>{progress.percent}%</div>
        </div>
        <p className={`text-sm ${metaText}`}>
          Progresso <span className={`font-semibold ${strongText}`}>{progress.done}/{progress.total}</span>
        </p>
        <div className={`h-1.5 overflow-hidden rounded-full ${barBg}`}>
          <div
            className={`h-full rounded-full ${barFill}`}
            style={{ width: `${progress.percent}%` }}
          />
        </div>
      </div>

      <ul className={`divide-y ${listBorder}`}>
        {docs.map((doc) => (
          <li key={doc.id} className={`flex items-start gap-3 border-b-0 py-3 ${itemBorder}`}>
            <input
              id={doc.id}
              type="checkbox"
              checked={Boolean(checked[doc.id])}
              onChange={(event) =>
                setChecked((prev) => ({
                  ...prev,
                  [doc.id]: event.target.checked,
                }))
              }
              className={`mt-1 h-4 w-4 ${inputAccent}`}
            />
            <label htmlFor={doc.id} className={`flex-1 text-sm leading-relaxed ${labelText}`}>
              {doc.label}
            </label>
            <span className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${requiredText}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${requiredDot}`} />
              Obrigatório
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

