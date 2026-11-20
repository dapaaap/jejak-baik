import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { halamanPlaceholder } from "@/data/halaman";
import { buildPlaceholderMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPlaceholderMetadata("dashboard", "/dashboard");

export default function DashboardPage() {
  return <PlaceholderPage halaman={halamanPlaceholder.dashboard} />;
}
