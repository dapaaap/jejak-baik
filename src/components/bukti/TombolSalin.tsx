"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function TombolSalin({ teks }: { teks: string }) {
  const [status, setStatus] = useState<"idle" | "ok" | "gagal">("idle");

  async function salin() {
    try {
      await navigator.clipboard.writeText(teks);
      setStatus("ok");
    } catch {
      setStatus("gagal");
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button onClick={salin}>Salin template</Button>
      <p
        role="status"
        className={status === "gagal" ? "text-small text-danger" : "text-small text-ink-soft"}
      >
        {status === "ok"
          ? "Template tersalin. Tempel di pesan atau surel laporanmu."
          : status === "gagal"
            ? "Peramban memblokir papan klip. Pilih teks di bawah lalu salin manual."
            : ""}
      </p>
    </div>
  );
}
