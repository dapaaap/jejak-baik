import type { Profil } from "@/lib/progres";

const ukuranKelas = {
  28: "h-7 w-7 text-caption",
  48: "h-12 w-12 text-h3",
} as const;

export function AvatarProfil({
  profil,
  ukuran = 48,
}: {
  profil: Pick<Profil, "nama" | "avatar">;
  ukuran?: keyof typeof ukuranKelas;
}) {
  if (profil.avatar) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={profil.avatar}
        alt=""
        width={ukuran}
        height={ukuran}
        referrerPolicy="no-referrer"
        className={`${ukuranKelas[ukuran]} shrink-0 rounded-full border border-line object-cover`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`${ukuranKelas[ukuran]} flex shrink-0 items-center justify-center rounded-full border border-line bg-paper-deep font-display font-medium text-forest`}
    >
      {profil.nama.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}
