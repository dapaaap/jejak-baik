import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { halamanPlaceholder } from "@/data/halaman";
import { buildPlaceholderMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPlaceholderMetadata("auth", "/auth");

export default function AuthPage() {
  return <PlaceholderPage halaman={halamanPlaceholder.auth} />;
}
