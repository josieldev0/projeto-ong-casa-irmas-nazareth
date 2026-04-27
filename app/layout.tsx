import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://casa-irmas-nazareth.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AssociaÃ§Ã£o Beneficente Casa IrmÃ£s de Nazareth",
  description:
    "Projeto de conjunto habitacional e aÃ§Ãµes solidÃ¡rias para famÃ­lias de baixa renda.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "AssociaÃ§Ã£o Beneficente Casa IrmÃ£s de Nazareth",
    description:
      "ConheÃ§a os projetos habitacionais e aÃ§Ãµes sociais da Casa IrmÃ£s de Nazareth.",
    siteName: "Casa IrmÃ£s de Nazareth",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 1200,
        alt: "Logo da AssociaÃ§Ã£o Beneficente Casa IrmÃ£s de Nazareth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AssociaÃ§Ã£o Beneficente Casa IrmÃ£s de Nazareth",
    description:
      "Projeto de conjunto habitacional e aÃ§Ãµes solidÃ¡rias para famÃ­lias de baixa renda.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        {children}
      </body>
    </html>
  );
}


