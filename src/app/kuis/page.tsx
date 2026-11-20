import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { halamanPlaceholder } from "@/data/halaman";
import { buildPlaceholderMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPlaceholderMetadata("kuis", "/kuis");

export default function KuisPage() {
  return <PlaceholderPage halaman={halamanPlaceholder.kuis} />;
}
