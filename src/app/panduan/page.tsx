import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { halamanPlaceholder } from "@/data/halaman";
import { buildPlaceholderMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPlaceholderMetadata("panduan", "/panduan");

export default function PanduanPage() {
  return <PlaceholderPage halaman={halamanPlaceholder.panduan} />;
}
