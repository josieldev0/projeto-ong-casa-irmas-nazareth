import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://casa-irmas-nazareth.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Associação Beneficente Casa Irmãs de Nazareth",
  description:
    "Projeto de conjunto habitacional e ações solidárias para famílias de baixa renda.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "Associação Beneficente Casa Irmãs de Nazareth",
    description:
      "Conheça os projetos habitacionais e ações sociais da Casa Irmãs de Nazareth.",
    siteName: "Casa Irmãs de Nazareth",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 1200,
        alt: "Logo da Associação Beneficente Casa Irmãs de Nazareth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Associação Beneficente Casa Irmãs de Nazareth",
    description:
      "Projeto de conjunto habitacional e ações solidárias para famílias de baixa renda.",
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




