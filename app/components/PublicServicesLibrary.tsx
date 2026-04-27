"use client";

type ServiceItem = {
  title: string;
  category: "Cadastro" | "Assistência" | "Habitação" | "Documentos";
  description: string;
  url: string;
};

const services: ServiceItem[] = [
  {
    title: "CadÚnico (Gov.br)",
    category: "Cadastro",
    description: "Informações oficiais sobre Cadastro Único e atualização de dados.",
    url: "https://www.gov.br/mds/pt-br/acesso-a-informacao/perguntas-frequentes/cadastro-unico",
  },
  {
    title: "CRAS - Prefeitura de São Paulo",
    category: "Assistência",
    description: "Rede de proteção social básica para orientação e atendimento.",
    url: "https://www.prefeitura.sp.gov.br/cidade/secretarias/assistencia_social/cras/",
  },
  {
    title: "COHAB-SP",
    category: "Habitação",
    description: "Companhia Metropolitana de Habitação de São Paulo.",
    url: "https://cohab.sp.gov.br/",
  },
  {
    title: "Poupatempo",
    category: "Documentos",
    description: "Agendamento e orientação para emissão de documentos.",
    url: "https://www.poupatempo.sp.gov.br/",
  },
  {
    title: "SP156",
    category: "Assistência",
    description: "Central de serviços da Prefeitura para pedidos e informações.",
    url: "https://sp156.prefeitura.sp.gov.br/",
  },
];

export function PublicServicesLibrary() {
  return (
    <div className="space-y-4 overflow-visible px-1 md:px-2">
      <div className="pb-2 pl-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/90">
          Serviços recomendados
        </p>
      </div>

      <div className="space-y-3">
        {services.map((item) => (
          <a
            key={item.title}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl border border-white/16 bg-white/[0.03] px-3 py-2.5 shadow-[0_12px_28px_-20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/26 hover:bg-white/[0.05]"
          >
            <div className="flex items-start gap-2.5">
              <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border border-white/42">
                <span className="h-1.5 w-1.5 rounded-full bg-white/72" />
              </span>

              <div className="grid min-w-0 flex-1 grid-cols-[1fr_auto] items-start gap-3">
                <div className="min-w-0">
                  <p className="text-[13px] font-medium tracking-[0.01em] text-white">{item.title}</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-white/78">
                    {item.description}
                  </p>
                </div>
                <div className="flex min-w-[118px] flex-col items-end gap-2">
                  <span className="rounded-full border border-white/24 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white/76">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/76 group-hover:text-white/90">
                    Acessar serviço
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
