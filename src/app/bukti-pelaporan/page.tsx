import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { halamanPlaceholder } from "@/data/halaman";
import { buildPlaceholderMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPlaceholderMetadata(
  "bukti-pelaporan",
  "/bukti-pelaporan",
);

export default function BuktiPelaporanPage() {
  return <PlaceholderPage halaman={halamanPlaceholder["bukti-pelaporan"]} />;
}
