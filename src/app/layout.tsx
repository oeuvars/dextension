
import { Space_Grotesk } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "dextension | VS Code Extension Downloader",
  description: "dextension | Generate download links for VS Code extensions to install in your favorite editor",
  keywords: ["VS Code", "extensions", "cursor", "windsurf", "Trae", "download", "VSIX"],
  authors: [{ name: "Anurag Das" }],
  creator: "Anurag | Oeuvars",
  openGraph: {
    title: "VS Code Extension Downloader for Trae",
    description: "dextension | Generate download links for VS Code extensions to install in your favorite editor",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "VS Code Extension Downloader for Trae",
    description: "dextension | Generate download links for VS Code extensions to install in your favorite editor",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${space.className}`}
      >
        {children}
      </body>
    </html>
  );
}
