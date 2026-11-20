import type { Metadata } from "next";
import type { SeoData } from "@/data/materi";

// TODO(SEO): ganti dengan domain produksi sebelum rilis.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jejak-baik.example";

export const siteIdentity = {
  nama: "Jejak Baik",
  locale: "id_ID",
  url: siteUrl,
};

const ogImage = {
  url: "/og/jejak-baik-og.png",
  width: 1200,
  height: 630,
  alt: "Jejak Baik · materi edukasi anti-cyberbullying untuk remaja dan Guru BK",
};

export function buildMetadata(seo: SeoData, path: string): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    authors: [{ name: seo.author }],
    alternates: { canonical: path },
    openGraph: {
      type: seo.ogType,
      locale: siteIdentity.locale,
      siteName: siteIdentity.nama,
      title: seo.ogTitle,
      description: seo.ogDescription,
      url: path,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle,
      description: seo.twitterDescription,
      images: [ogImage.url],
    },
  };
}
