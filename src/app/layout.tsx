import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { berandaSeo } from "@/data/beranda";
import { siteIdentity } from "@/lib/metadata";
import "@fontsource-variable/fraunces/wght.css";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource-variable/plus-jakarta-sans/wght.css";
import "@/styles/tokens.css";
import "@/styles/global.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteIdentity.url),
  title: berandaSeo.title,
  description: berandaSeo.description,
  applicationName: siteIdentity.nama,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <a href="#konten-utama" className="skip-link">
          Lompat ke konten utama
        </a>
        <Navbar />
        <main id="konten-utama" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
