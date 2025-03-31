import { Space_Grotesk } from "next/font/google";
import { Metadata } from "next";
import { IconBrandGithub, IconCode } from "@tabler/icons-react";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dextension | VS Code Extension Downloader",
  description: "Dextension | Generate download links for VS Code extensions to install in your favorite editor",
  keywords: ["VS Code", "extensions", "cursor", "windsurf", "Trae", "download", "VSIX"],
  authors: [{ name: "Anurag Das" }],
  creator: "Anurag | Oeuvars",
  openGraph: {
    title: "Dextension",
    description: "Dextension | Generate download links for VS Code extensions to install in your favorite editor",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dextension | VS Code Extension Downloader",
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
        className={`${space.className} flex flex-col min-h-screen`}
      >
        <Analytics/>
        <main className="flex-grow">
          {children}
        </main>

        <footer className="py-6 border-t bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-neutral-500">
                © {new Date().getFullYear()} Dextension by Oeuvars
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/oeuvars"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-neutral-900 transition-colors flex gap-2"
                  title="GitHub Profile"
                >
                  <IconBrandGithub className="size-5 my-auto" />
                  <span>Github</span>
                </a>
                <a
                  href="https://github.com/oeuvars/dextension"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-neutral-900 transition-colors flex gap-2"
                  title="Project Repository"
                >
                  <IconCode className="size-5 my-auto" />
                  <span>Code</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
