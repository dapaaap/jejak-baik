# DESIGN.md: Jejak Baik

Brief desain untuk Prompt 2. Konten di `src/data/*` tidak diubah. Semua perubahan visual
lewat token di `src/styles/tokens.css` dan pemetaannya di `tailwind.config.ts`.

## 1. Konsep dan mood

Jejak Baik dirancang seperti **jurnal lapangan digital**: kertas hangat, tinta hijau tua,
dan jejak terakota yang tenang. Pembahasan perundungan tidak dibuat menakutkan. Halaman
terasa seperti buku catatan pendamping yang rapi, bukan dashboard atau landing page SaaS.
Angka bab besar, garis tipis, dan ruang kosong menjadi struktur. Motif utamanya adalah
**jejak kontur**: garis-garis konsentris yang tidak sempurna, seperti riak di air atau
sidik jari, untuk mengingatkan bahwa setiap ketikan meninggalkan bekas.

Tiga kata kunci: **Hangat, Tenang, Terarah.**

Dial: ENERGY 2 / RHYTHM 3 / MOTION 2. Situs memakai satu tema terang karena identitasnya
adalah kertas jurnal fisik; mode gelap akan menghapus bahan itu, jadi tidak ada tombol tema.

## 2. Palet

| Token | Hex | Peran | Kontras |
|---|---|---|---|
| `paper` | `#F7F1E6` | latar utama | dasar |
| `paper-deep` | `#EFE4D2` | pita bagian, latar kartu kedua | teks ink 11.91:1 |
| `surface` | `#FFFDF8` | panel detail, kartu kutipan | teks ink 13.7:1 |
| `ink` | `#1B2A23` | teks utama | 13.20:1 di paper |
| `ink-muted` | `#4C5A52` | teks sekunder | 6.40:1 di paper |
| `ink-soft` | `#5D6A61` | caption dan label | 5.05:1 di paper, 4.51:1 di paper-deep |
| `forest` | `#1E4A39` | aksi utama, panel gelap | 8.84:1 dengan paper |
| `forest-deep` | `#143528` | pita gelap, footer | 11.79:1 dengan paper |
| `accent` | `#A8472A` | aksen terakota, penanda aktif | 5.19:1 di paper |
| `accent-strong` | `#8C3820` | hover aksen | 6.62:1 di paper |
| `accent-tint` | `#F3DDD1` | latar catatan contoh | teks ink 11.46:1 |
| `line` | `#D9CBB6` | garis rambut | dekoratif |
| `line-strong` | `#B9A98F` | batas kontrol | dekoratif |
| `focus` | `#1E4A39` | cincin fokus di latar terang | 8.84:1 |
| `focus-inverse` | `#F6E3C2` | cincin fokus di latar gelap | 7.97:1 di forest |
| `gold` | `#E7C27E` | aksen di latar gelap | 7.91:1 di forest-deep |

Semantik: `success` `#2F6B4F`, `warning` `#8A5A14`, `danger` `#963526`. Belum dipakai
karena belum ada form atau status sistem, tetapi tersedia untuk tahap backend.

Tidak memakai gradien, glow, atau orb. Aksen terakota hanya muncul pada penanda bab,
teks italik tertentu, garis aktif, dan satu pita ajakan. Hijau hutan adalah warna aksi
utama. Permukaan netral adalah kertas, bukan putih murni.

## 3. Tipografi

Dua family, keduanya OFL dan di-host sendiri lewat `@fontsource-variable`:

- **Fraunces Variable** untuk display, H1, H2, kutipan, dan angka bab. Serif dengan
  kontras tinggi dan karakter hangat, cocok untuk nada editorial yang manusiawi.
- **Plus Jakarta Sans Variable** untuk body, label, tombol, dan navigasi. Buatan Indonesia,
  mendukung Bahasa Indonesia, dan tetap jernih di ukuran kecil.

| Peran | Ukuran | Line height | Catatan |
|---|---|---|---|
| display | `clamp(2.75rem, 5.2vw, 5rem)` | 0.95 | hero, Fraunces 550 |
| H1 | `clamp(2.3rem, 4.6vw, 3.75rem)` | 1.02 | judul halaman |
| H2 | `clamp(1.9rem, 3.2vw, 2.6rem)` | 1.08 | judul bab |
| H3 | `clamp(1.25rem, 1.6vw, 1.5rem)` | 1.25 | subbagian |
| lead | `clamp(1.125rem, 1.5vw, 1.3rem)` | 1.65 | paragraf pembuka |
| body | `1.0625rem` | 1.7 | teks isi |
| small | `0.9375rem` | 1.6 | metadata, daftar |
| caption | `0.8125rem` | 1.4 | label huruf besar, tracking 0.08em |

Lebar baca maksimal 65ch. Heading memakai `text-wrap: balance`, paragraf `pretty`.
Tidak memakai font default sistem, Inter, atau Geist.

## 4. Spacing, radius, shadow, elevasi

- Gutter: `clamp(1.25rem, 5vw, 3.5rem)`.
- Jarak antarbagian: `clamp(4rem, 8vw, 7rem)`.
- Jarak dalam komponen: `--space-stack` 1.5rem, `--space-tight` 0.75rem.
- Lebar konten: 78rem. Kolom baca: 65ch.
- Radius: 4px, 8px, 16px, 28px. Tombol 8px, kartu 16px, panel besar 28px. Tidak ada
  pill kecuali penanda bulat kecil yang memang status.
- Shadow nyaris tidak dipakai. Hierarki dibangun dari garis, bidang warna, dan jarak.
  `shadow-soft` hanya untuk panel detail yang melayang di atas pita, `shadow-lift` untuk
  hover baris indeks.

## 5. Ikon, ilustrasi, dan wordmark

- Satu set ikon SVG orisinal, stroke 1.5px, ujung bulat, kotak 24px. Delapan ikon jenis
  cyberbullying memetakan field `ikon` di data: `flame`, `chat-repeated`, `smear`, `mask`,
  `secret`, `trap`, `door`, `eye`. Ikon UI: menu, tutup, panah kanan, panah naik, centang,
  silang. Tidak memakai emoji dan tidak mengambil set pihak ketiga.
- Ilustrasi hero adalah `TraceArt`: kontur konsentris organik, garis putus-putus, dan enam
  titik yang membentuk alur. Warna hutan dengan satu busur terakota. Maknanya: jejak digital
  yang mengendap dan menyebar. Dekoratif, sehingga `aria-hidden`.
- Wordmark: teks "Jejak Baik" dengan Fraunces, kata "Baik" italik, didahului tanda tiga
  titik yang mengecil seperti jejak langkah. Bukan logo lama.
- og:image 1200x630 dibuat dari komposisi yang sama: kertas, wordmark, satu kalimat materi,
  dan TraceArt. File PNG lokal di `public/og/`.

## 6. Ciri layout per halaman

**Beranda**
- Hero tipografis asimetris: judul besar di kiri, TraceArt dalam bingkai tipis di kanan.
  Tanpa foto remaja dan tanpa kartu statistik.
- Pita "Ingat" dengan garis atas tebal dan empat langkah sebagai deretan bernomor.
- Layanan utama sebagai **indeks bernomor** enam baris, bukan grid kartu seragam. Baris
  memiliki nomor, judul, deskripsi, dan panah yang hanya muncul sebagai penanda arah.
- Perbandingan candaan dan perundungan sebagai dua panel berkontras: kertas hangat vs
  hijau gelap. Simbol centang dan silang, bukan warna saja.
- Dua peran akun sebagai dua kolom dengan garis pemisah vertikal.
- Privasi sebagai pita hijau gelap penuh dengan pernyataan besar dan empat jaminan.
- Footer seperti kolofon: wordmark, deskripsi, dua kelompok tautan, dan disclaimer.

**Pusat Materi**
- Hero dua kolom: teks besar di kiri, panel indeks empat bab di kanan. Panel indeks juga
  menjadi daftar isi di mobile.
- Rel bab sticky di desktop (220px) dengan nomor dan judul, status aktif dari
  IntersectionObserver. Di mobile daftar isi sudah ada di hero.
- Bab 1: definisi sebagai lead serif, lalu empat prinsip sebagai daftar bernomor dengan
  garis rambut, bukan kartu.
- Bab 2: split view. Daftar delapan jenis di kiri, panel detail besar di kanan. Di mobile
  daftar menjadi grid dua kolom di atas panel. Tetap memakai pola tab WAI-ARIA.
- Bab 3: empat kelompok dampak dalam grid asimetris dua kolom, dengan label serif besar
  dan daftar bergaris.
- Bab 4: pita hijau gelap dengan empat kartu kutipan kertas. Referensi aksen terakota,
  kutipan serif, praktik sans.
- CTA: pita terakota dengan tipografi besar dan dua tombol.

**Halaman placeholder**
- Komposisi editorial sederhana: label status, judul besar, satu paragraf jujur, tautan
  kembali, dan TraceArt kecil. Konsisten dengan sistem, tanpa mengarang isi.

## 7. Prinsip animasi

MOTION 2: halus, sedikit, dan hanya untuk umpan balik.

- Transisi hover dan fokus 150ms sampai 260ms.
- Satu animasi masuk untuk hero (naik 12px, memudar) saat halaman dimuat. Animasi dipasang
  pada panel ilustrasi, bukan pada blok teks hero: kalau teks judul/paragraf yang memudar,
  LCP tertunda 4 detik karena Lighthouse mengukur saat elemen itu benar-benar terlihat.
- Panel Bab 2 berganti dengan fade 8px, bukan slide besar.
- Tidak ada loop, parallax, marquee, atau animasi yang berjalan terus.
- Semua dimatikan di `prefers-reduced-motion: reduce`.
- Tidak ada gerak yang menyampaikan informasi tanpa alternatif teks.

## 8. Perbedaan eksplisit dari versi lama

1. **Warna:** kertas hangat, hijau hutan, dan terakota. Bukan skema warna lama, bukan
   gradien, bukan latar gelap teknologi.
2. **Tipografi:** Fraunces dan Plus Jakarta Sans. Bukan font sistem atau pasangan generik.
3. **Hero:** komposisi tipografis dan ilustrasi kontur orisinal. Tanpa foto remaja di bukit.
4. **Layout beranda:** indeks layanan bernomor dan pita editorial, bukan grid kartu seragam.
5. **Materi:** rel bab sticky, nomor bab besar, dan split view. Bukan susunan kartu template.
6. **Ikon:** set SVG orisinal. Tanpa emoji dan tanpa ikon gaya Lucide.
7. **Interaksi Bab 2:** daftar vertikal dan panel detail, dengan dukungan keyboard penuh.
8. **Wordmark dan og:image:** dibuat baru, tidak memakai aset versi lama.
9. **Suasana:** tenang dan hangat untuk topik sensitif, bukan ramai dan dekoratif.

## 9. Lisensi aset

- Fraunces: SIL Open Font License 1.1, lewat `@fontsource-variable/fraunces`.
- Plus Jakarta Sans: SIL Open Font License 1.1, lewat
  `@fontsource-variable/plus-jakarta-sans`.
- Ikon, TraceArt, wordmark, dan og:image: dibuat untuk proyek ini, tanpa aset pihak ketiga.
