"use client";

import { useEffect, useRef, useState } from "react";
import { akunGoogle } from "@/data/akun";
import { bacaCredential, clientIdGoogle, muatGoogle, type AkunGoogle } from "@/lib/google";

type Status = "memuat" | "siap" | "gagal" | "belumAktif";

export function TombolGoogle({ onSukses }: { onSukses: (akun: AkunGoogle) => void }) {
  const wadah = useRef<HTMLDivElement>(null);
  const suksesRef = useRef(onSukses);
  suksesRef.current = onSukses;

  const [status, setStatus] = useState<Status>(() =>
    clientIdGoogle() ? "memuat" : "belumAktif",
  );

  useEffect(() => {
    if (!clientIdGoogle()) return;

    let aktif = true;

    muatGoogle().then((siap) => {
      if (!aktif) return;

      if (!siap || !window.google || !wadah.current) {
        setStatus("gagal");
        return;
      }

      window.google.accounts.id.initialize({
        client_id: clientIdGoogle(),
        auto_select: false,
        cancel_on_tap_outside: true,
        callback: (respons) => {
          const akun = bacaCredential(respons.credential);
          if (akun) suksesRef.current(akun);
          else setStatus("gagal");
        },
      });

      window.google.accounts.id.renderButton(wadah.current, {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "rectangular",
        locale: "id",
        logo_alignment: "left",
      });

      setStatus("siap");
    });

    return () => {
      aktif = false;
    };
  }, []);

  if (status === "belumAktif") {
    return (
      <p className="rounded-md border border-line bg-paper-deep p-4 text-small text-ink-muted">
        {akunGoogle.belumAktif}
      </p>
    );
  }

  if (status === "gagal") {
    return (
      <p role="alert" className="text-small font-medium text-danger">
        {akunGoogle.gagal}
      </p>
    );
  }

  return (
    <div>
      {/* Tinggi dikunci supaya iframe Google tidak menggeser tata letak saat muncul. */}
      <div ref={wadah} className="min-h-11 w-full max-w-[320px]" />
      {status === "memuat" ? (
        <p role="status" className="mt-2 text-caption text-ink-soft">
          {akunGoogle.memuat}
        </p>
      ) : null}
    </div>
  );
}
