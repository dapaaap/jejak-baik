import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { halamanPlaceholder } from "@/data/halaman";
import { buildPlaceholderMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPlaceholderMetadata("bantuan", "/bantuan");

export default function BantuanPage() {
  return <PlaceholderPage halaman={halamanPlaceholder.bantuan} />;
}
