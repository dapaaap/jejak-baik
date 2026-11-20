import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { halamanPlaceholder } from "@/data/halaman";
import { buildPlaceholderMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPlaceholderMetadata("privasi", "/privasi");

export default function PrivasiPage() {
  return <PlaceholderPage halaman={halamanPlaceholder.privasi} />;
}
