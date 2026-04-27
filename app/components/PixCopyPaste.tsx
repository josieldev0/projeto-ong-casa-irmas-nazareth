"use client";

import { useState } from "react";

type PixCopyPasteProps = {
  value: string;
};

export function PixCopyPaste({ value }: PixCopyPasteProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <p className="text-xs uppercase tracking-[0.16em] text-zinc-700">Pix copia e cola</p>
      <button
        type="button"
        onClick={onCopy}
        className="inline-flex items-center rounded-full border border-[#25354f]/25 px-3 py-1.5 text-xs font-semibold text-[#25354f] transition-all hover:border-[#25354f]/40 hover:bg-[#25354f]/8"
      >
        {copied ? "Código copiado" : "Copiar código"}
      </button>
      <span className="sr-only">{value}</span>
    </div>
  );
}
