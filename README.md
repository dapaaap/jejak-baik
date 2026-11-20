# Jejak Baik: website edukasi anti-cyberbullying

Situs statis untuk remaja dan Guru BK. Semua sepuluh rute sudah berisi, tidak ada lagi
halaman "segera hadir": materi, simulasi kasus, panduan tindakan, bukti & pelaporan, bantuan,
kuis + refleksi, profil, dan dasbor progres. Login opsional lewat Google Identity Services,
plus formulir pengaduan dengan nomor tiket dan panel tindak lanjut untuk Guru BK. Semua data
tetap di peramban pengunjung. Konsep visual "jurnal lapangan digital": kertas
hangat, tinta hijau hutan, aksen terakota. Arah desain lengkap ada di [`DESIGN.md`](./DESIGN.md).

## Cara menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

Perintah lain:

```bash
npm run build      # build statis ke folder out/
npm run typecheck  # TypeScript strict, tanpa emit
npm run lint       # ESLint
npm run format     # Prettier
```

Hasil `npm run build` adalah HTML statis di `out/`. Untuk pratinjau lokal, sajikan folder itu
dengan static server apa pun. Contoh: `npx serve out`. Sebagian static server perlu aturan
clean URL karena `trailingSlash` aktif. Vercel, Netlify, dan Cloudflare Pages menanganinya
otomatis.

Domain produksi diatur lewat `NEXT_PUBLIC_SITE_URL` dan kunci Google lewat
`NEXT_PUBLIC_GOOGLE_CLIENT_ID` (lihat `.env.example`). Tanpa `NEXT_PUBLIC_SITE_URL`,
canonical, Open Graph, dan `og:image` memakai `https://jejak-baik.example` sebagai
placeholder. Tanpa client ID, tombol Google menampilkan catatan dan profil manual tetap
jalan.

## Syarat hosting (penting untuk skor Lighthouse)

Build ini statis, jadi performa sangat bergantung pada server. Wajib:

- **Kompresi gzip atau brotli** untuk `.html`, `.css`, `.js`, `.json`, `.svg`. Tanpa kompresi,
  Lighthouse mobile berhenti di ~82 (LCP 4,3 dtk) karena aset dikirim mentah. Dengan
  kompresi, skor performance 92-98 (LCP 2,0-2,6 dtk).
- **Cache panjang** untuk `/_next/static/*` (`public, max-age=31536000, immutable`). Nama
  berkas sudah ber-hash.
- `Cache-Control: no-cache` untuk dokumen HTML supaya deploy baru langsung terpakai.

Vercel, Netlify, dan Cloudflare Pages melakukan ketiganya otomatis. Kalau memakai server
sendiri, atur di reverse proxy.

## Deploy ke VPS (Nginx)

Situs berjalan di VPS Ubuntu 24.04 sebagai file statis. Tidak ada proses Node di server.

```bash
# 1. build di mesin lokal, dengan URL produksi
NEXT_PUBLIC_SITE_URL="http://ALAMAT-VPS" npm run build

# 2. kirim hasil build
tar -czf out.tar.gz -C out .
scp out.tar.gz azureuser@ALAMAT-VPS:/tmp/

# 3. pasang di server
ssh azureuser@ALAMAT-VPS
sudo rm -rf /var/www/jejak-baik/*
sudo tar -xzf /tmp/out.tar.gz -C /var/www/jejak-baik
sudo chown -R www-data:www-data /var/www/jejak-baik
```

Konfigurasi Nginx ada di `/etc/nginx/sites-available/jejak-baik`. Isinya sudah mencakup
`try_files` untuk `trailingSlash`, `404.html`, gzip, cache `immutable` untuk `/_next/static/`,
dan `no-cache` untuk HTML, empat syarat di bagian sebelumnya. Setelah mengubah konfigurasi:
`sudo nginx -t && sudo systemctl reload nginx`.

### Kalau port 80 masih tertutup

Azure NSG harus mengizinkan inbound TCP 80 dari internet. Itu hanya bisa diubah dari portal
Azure (VM → Networking → Add inbound port rule), tidak dari dalam VM. Selama belum dibuka,
situs diakses lewat Cloudflare Tunnel yang berjalan sebagai service `jejak-tunnel`:

```bash
jejak-url   # cetak URL publik yang sedang aktif
```

URL `trycloudflare.com` itu sementara: berubah setiap service restart atau VM reboot. Untuk
URL permanen, buka port 80 di NSG lalu pakai alamat IP VPS. HTTPS permanen butuh domain
(Certbot tidak menerbitkan sertifikat untuk alamat IP).

## Pilihan stack

Next.js 15 App Router dengan `output: "export"`.

Alasannya: setiap halaman perlu `<title>`, meta description, Open Graph, dan canonical yang
sudah ada di HTML awal agar terbaca mesin pencari dan pratinjau tautan. Vite SPA hanya
menyisipkan meta setelah JavaScript jalan. Static export membuat hasilnya tetap bisa
di-hosting sebagai file statis, tanpa server dan tanpa layanan pihak ketiga.

Catatan versi: Next.js 16.4.6 diuji lebih dulu, tetapi static export-nya menghasilkan
prefetch RSC 404 (nama berkas segmen tidak cocok). Next.js 15.5.29 bersih, jadi versi itu
yang dipakai. Uji ulang prefetch saat menaikkan versi Next.

## Struktur folder

```text
src/
  app/                     rute App Router, metadata per halaman, root layout
    page.tsx               beranda
    materi/page.tsx        Pusat Materi
    simulasi/page.tsx      latihan menilai situasi (5 kasus)
    kuis/page.tsx          kuis 8 soal + refleksi
    dashboard/page.tsx     dasbor progres + tab pengaduan (peran Guru BK)
    auth/page.tsx          masuk/daftar: Google Identity Services + profil manual
    bukti-pelaporan/page.tsx  panduan bukti + formulir pengaduan + "Laporan saya"
    panduan/ bantuan/ privasi/  halaman konten statis
    icon.svg               monogram favicon (hijau hutan, huruf J-B)
  components/
    layout/                Navbar, Footer, Container, Section
    materi/                JenisCyberbullying, JenisSelector, ChapterNav,
                           CiriGrid, DampakGrid, NilaiQuote
    simulasi/              SimulasiKasus (alur kasus + penyimpanan hasil)
    kuis/                  KuisRefleksi (soal, skor, tiga kolom refleksi)
    akun/                  FormProfil, TombolGoogle, PilihPeran, AvatarProfil
    dasbor/                DasborKlien (baca localStorage, hapus data)
    bukti/                 TombolSalin, FormLaporan, PanelGuru
    ui/                    Button, Card, Badge, SectionHeading, Icon,
                           TraceArt, Wordmark
  data/                    SEMUA teks halaman
    materi.ts              teks dan tipe halaman /materi
    beranda.ts             teks beranda
    simulasi.ts kuis.ts panduan.ts buktiPelaporan.ts bantuan.ts
    privasi.ts akun.ts dasbor.ts pelaporan.ts
    navigasi.ts            menu dan tautan footer
    kontak.ts              kontak darurat, disclaimer, hak cipta
  lib/                     cn, metadata helper, progres/sesi/laporan (localStorage),
                           google (pemuatan Google Identity Services)
  styles/
    tokens.css             SEMUA design token (satu-satunya tempat nilai mentah)
    global.css             base layer, focus ring, skip link, reduced motion
public/
  og/jejak-baik-og.svg     sumber og:image 1200x630 (font ter-embed)
  og/jejak-baik-og.png     hasil render, dipakai sebagai og:image
```

## Cara mengedit konten

Semua teks ada di `src/data/*.ts`. Komponen hanya merender data, jadi mengubah kata tidak
perlu menyentuh komponen. Teks ini verbatim dari pemilik konten: jangan diubah tanpa
persetujuan.

- Tambah atau ubah jenis cyberbullying di array `bab2.jenis` (`src/data/materi.ts`).
  Tipe `JenisCyberbullying` mewajibkan `id`, `nama`, `labelSingkat`, `penjelasan`, `contoh`,
  dan `ikon`. Field `ikon` hanya nama dari set di `components/ui/Icon.tsx`
  (`flame`, `chat-repeated`, `smear`, `mask`, `secret`, `trap`, `door`, `eye`).
- Urutan bab dan teks hero ada di `materiHero`, `bab1`, `bab3`, `bab4`, `materiCta`.
- Menu utama ada di `navItems` (`src/data/navigasi.ts`). Setiap item harus punya rute nyata.
- Soal simulasi ada di `src/data/simulasi.ts` (lima kasus, tiap pilihan punya umpan balik
  sendiri). Soal kuis dan pembahasan ada di `src/data/kuis.ts`.
- Metadata SEO per halaman memakai objek `SeoData` di `src/data/materi.ts` dan
  `src/data/beranda.ts`. `og:image` diisi sekali untuk semua halaman di
  `src/lib/metadata.ts`.

Setelah mengubah data, jalankan `npm run typecheck` dan `npm run build`.

## Penyimpanan data (tanpa backend)

Tidak ada server dan tidak ada basis data. Profil, hasil kuis, refleksi, hasil simulasi, dan
laporan pengaduan disimpan di `localStorage` perangkat pengunjung lewat `src/lib/progres.ts`.
Isinya:

| Kunci | Isi |
|---|---|
| `jejak-baik:profil` | sesi aktif: nama, peran, email/avatar/sub Google, status verifikasi |
| `jejak-baik:akun` | daftar profil yang pernah masuk di perangkat ini, dicari lewat email |
| `jejak-baik:kuis` | skor, jumlah benar, tanggal, tiga kolom refleksi |
| `jejak-baik:simulasi` | skor, jumlah kasus, tanggal |
| `jejak-baik:laporan` | laporan pengaduan: tiket, kategori, kronologi, bukti, status, balasan |

Konsekuensinya: data hilang saat pengunjung membersihkan data peramban, dan tidak bisa
dilihat dari perangkat lain. Panel "Pengaduan masuk" hanya membaca laporan yang ada di
peramban yang sama. Halaman `/privasi` menyatakan hal ini apa adanya. Tombol hapus di
`/dashboard` mengosongkan kelima kunci itu. Kalau nanti perlu data yang benar-benar
tersimpan di server, itu pekerjaan backend baru, bukan perubahan pada halaman ini.

## Login Google (opsional)

Tombol "Lanjutkan dengan Google" memakai Google Identity Services dan hanya butuh satu
variabel build:

```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
```

Cara mengisi ada di komentar `.env.example`. Buat OAuth client bertipe **Web application**
di console.cloud.google.com, lalu isi *Authorized JavaScript origins* dengan alamat situs
tanpa garis miring di akhir. Nilai ini publik (dikirim ke peramban), jadi jangan taruh
client secret di proyek ini.

Token Google dibaca di peramban saja: `src/lib/google.ts` mendekode JWT untuk mengambil
nama, email, dan avatar. Tanda tangan token tidak diverifikasi karena tidak ada server.
Tanpa client ID, tombol Google menampilkan catatan jujur dan profil manual tetap jalan.

## Design token

Semua warna, font, ukuran teks, spacing, radius, shadow, dan durasi ada di
`src/styles/tokens.css`. Tailwind memetakannya di `tailwind.config.ts`. Komponen memakai nama
token, bukan nilai mentah, jadi mengganti tampilan berarti mengubah `tokens.css` saja.

| Kelompok | Token | Utility Tailwind |
|---|---|---|
| Warna | `--color-paper`, `--color-paper-deep`, `--color-surface` | `bg-paper`, `bg-paper-deep`, `bg-surface` |
| Warna | `--color-ink`, `--color-ink-muted`, `--color-ink-soft`, `--color-paper-muted` | `text-ink`, `text-ink-muted`, `text-ink-soft`, `text-paper-muted` |
| Warna | `--color-forest`, `--color-forest-deep` | `bg-forest`, `text-forest`, `bg-forest-deep` |
| Warna | `--color-accent`, `--color-accent-strong`, `--color-accent-tint` | `text-accent`, `bg-accent`, `bg-accent-tint` |
| Warna | `--color-line`, `--color-line-strong` | `border-line`, `border-line-strong` |
| Warna | `--color-gold` | `text-gold`, `bg-gold` |
| Warna | `--color-focus`, `--color-focus-inverse` | outline fokus global (`focus-inverse` di atas latar gelap) |
| Warna | `--color-success`, `--color-warning`, `--color-danger` | disiapkan, belum dipakai |
| Font | `--font-display`, `--font-sans` | `font-display`, `font-sans` |
| Teks | `--text-display` … `--text-caption` + `--leading-*`, `--tracking-*` | `text-display`, `text-h1` … `text-caption` |
| Spacing | `--space-gutter`, `--space-section`, `--space-stack`, `--space-tight` | `px-gutter`, `py-section`, `gap-stack`, `gap-tight` |
| Layout | `--container-max`, `--measure` | `max-w-container`, `max-w-measure` |
| Radius | `--radius-sm` … `--radius-xl` | `rounded-sm` … `rounded-xl` |
| Shadow | `--shadow-soft`, `--shadow-lift` | `shadow-soft`, `shadow-lift` |
| Motion | `--duration-fast`, `--duration-base`, `--duration-slow`, `--ease-out` | `duration-fast`, `ease-out` |

Perbandingan kontras setiap pasangan warna ada di `DESIGN.md` bagian 2. Semua teks lulus
WCAG 2.1 AA (≥4,5:1).

### Tema

Situs ini sengaja satu tema terang (`color-scheme: light`) supaya suasana kertas hangat
konsisten. Belum ada mode gelap. Kalau nanti dibutuhkan, tambahkan blok
`@media (prefers-color-scheme: dark)` berisi nilai token yang sama di `tokens.css`; komponen
tidak perlu diubah.

## Aset dan lisensi

Semua aset lokal, tanpa hotlink dan tanpa aset dari situs versi lama.

| Aset | Lokasi | Lisensi |
|---|---|---|
| Fraunces (display) | `@fontsource-variable/fraunces`, di-self-host lewat bundler | SIL Open Font License 1.1 |
| Plus Jakarta Sans (teks) | `@fontsource-variable/plus-jakarta-sans` | SIL Open Font License 1.1 |
| Set ikon 24px (stroke 1.5) | `src/components/ui/Icon.tsx` (SVG inline) | dibuat untuk proyek ini |
| Wordmark "Jejak Baik" | `src/components/ui/Wordmark.tsx` | dibuat untuk proyek ini |
| Ilustrasi kontur hero/footer | `src/components/ui/TraceArt.tsx` | dibuat untuk proyek ini |
| Favicon monogram | `src/app/icon.svg` | dibuat untuk proyek ini |
| `og:image` 1200x630 | `public/og/jejak-baik-og.png` (+ sumber `.svg`) | dibuat untuk proyek ini |

Tidak ada emoji sebagai ikon, tidak ada ikon pihak ketiga, tidak ada foto stok. Font
dibundel saat build, jadi tidak ada permintaan ke Google Fonts atau CDN lain.

`og:image` dibuat dari SVG di `public/og/` dengan font yang sudah di-embed sebagai base64,
lalu dirender ke PNG. Kalau teksnya berubah, sunting SVG-nya dan render ulang (misalnya
dengan Puppeteer atau `resvg`).

## Status halaman

Semua rute berisi dan sudah diuji klik-per-klik di browser:

| Rute | Isi |
|---|---|
| `/` | beranda |
| `/materi` | pusat materi, rel bab sticky, pemilih 8 jenis interaktif |
| `/simulasi` | lima kasus fiktif, tiap pilihan diberi penjelasan, hasil bisa diulang |
| `/panduan` | tiga jalur tindakan: yang mengalami, yang melihat, yang melakukan |
| `/bukti-pelaporan` | empat langkah menyimpan bukti, formulir pengaduan, "Laporan saya", kanal pelaporan |
| `/bantuan` | nomor darurat 112, SAPA 129, WhatsApp, empat pertanyaan umum |
| `/kuis` | delapan soal + tiga kolom refleksi, pembahasan per soal |
| `/privasi` | pernyataan privasi, termasuk apa yang belum aktif |
| `/auth` | masuk/daftar: Google Identity Services, pemilihan peran, profil manual |
| `/dashboard` | skor kuis dan simulasi terakhir, tab "Pengaduan masuk" untuk Guru BK, hapus data |
| `/404` | halaman tidak ditemukan dengan gaya yang sama |

## Sumber konten

Teks halaman `/materi` dan beranda disalin dari `materi-jejak-baik.md` dan situs acuan
`https://jejak-baik-bersama.lovable.app/`. Tidak ada parafrase.

Penjelasan dan contoh untuk tujuh jenis yang tidak ada di berkas sumber (Harassment,
Denigration, Impersonation, Outing, Trickery, Exclusion, Cyberstalking) diambil dari data
aplikasi situs acuan, sehingga tidak ada `TODO_KONTEN` yang tersisa.

Ayat, hadis, nomor kontak (112, SAPA 129, WA 08111-129-129), dan rujukan
Permendikbudristek 46/2023 disalin persis. Jangan mengubahnya tanpa persetujuan pemilik
konten. Tanda pisah panjang sudah diganti koma atau titik sesuai panduan anti-slop.

## Yang masih TODO

- Domain produksi belum diisi. Set `NEXT_PUBLIC_SITE_URL` sebelum rilis, lalu build ulang
  supaya canonical dan `og:image` memakai URL asli. Build saat ini memakai alamat IP VPS.
- Port 80 Azure NSG belum dibuka, jadi URL publik sementara memakai Cloudflare Tunnel.
- Belum ada HTTPS (butuh domain).
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` belum diisi, jadi tombol Google menampilkan catatan bahwa
  login Google belum aktif. Profil manual tetap bisa dipakai.
- Belum ada backend. Profil, hasil kuis, refleksi, dan laporan pengaduan hanya tersimpan di
  peramban pengunjung (lihat bagian "Penyimpanan data"). Verifikasi Guru BK oleh sekolah,
  enkripsi, dan pengiriman laporan ke server sekolah belum ada. Halaman `/privasi`
  menyebutkan ini sebagai "belum aktif".
- Mode gelap belum dibuat (opsional).

## Aksesibilitas dan SEO

- `lang="id"`, satu `h1` per halaman, heading berurutan, landmark header, nav, main, footer.
- Skip link ke konten utama, target sentuh ≥44px di lebar 360px.
- Fokus keyboard terlihat di semua latar, termasuk latar hijau gelap. Tidak ada
  `outline: none` tanpa pengganti.
- Pemilih jenis memakai pola tab WAI-ARIA: `role="tablist"`, `role="tab"`,
  `aria-selected`, `aria-controls`, panel `role="tabpanel"`. Navigasi dengan tombol panah,
  Home, dan End, dengan roving tabindex.
- Menu mobile memakai tombol dengan `aria-expanded`, `aria-controls`, dan bisa ditutup
  dengan Escape; fokus kembali ke tombol pemicu.
- Rel bab memakai `IntersectionObserver` dan menandai bab aktif dengan teks + garis, bukan
  warna saja.
- Gerak dimatikan otomatis saat `prefers-reduced-motion: reduce`.
- Meta unik per halaman: title, description, Open Graph, Twitter Card
  (`summary_large_image` dengan gambar), canonical.
- Tidak ada tracker, font eksternal, atau aset dari situs lama.

## Hasil audit (build statis, server dengan gzip + cache)

Lighthouse mobile, emulasi bawaan (Moto G Power, jaringan lambat), diukur di mesin kerja yang
juga menjalankan Chrome pengguna:

| Halaman | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/` | 92 | 100 | 100 | 100 |
| `/materi/` | 95 | 100 | 100 | 100 |
| `/kuis/` | 92 | 100 | 100 | 100 |
| `/simulasi/` | 92 | 100 | 100 | 100 |

Catatan: TBT adalah satu-satunya metrik yang bergerak (220-240ms di mesin sibuk, 30-40ms saat
mesin idle, dengan skor performance 96-98). Penyebabnya beban CPU host, bukan JavaScript
halaman: bundle awal 106 kB dan tidak ada long task dari kode aplikasi. Angka di atas adalah
pengukuran paling konservatif. LCP 2,0-2,6 dtk, CLS ≤0,001.

Diperiksa juga pada 360/768/1280/1536px di 10 rute: tanpa scroll horizontal, tanpa error
konsol, tidak ada target sentuh di bawah 44px, kontras teks lulus di `/` dan `/materi/`,
tidak ada pelanggaran label-in-name (WCAG 2.5.3).

Uji klik-per-klik (Puppeteer) dijalankan terhadap build yang sedang live, mencakup: menu
mobile buka/tutup dengan Escape, simulasi lima kasus sampai hasil lalu diulang, kuis delapan
soal plus tiga kolom refleksi, validasi nama kosong, simpan profil, skor di dasbor, hapus
data, umpan balik tombol salin, tautan `tel:112`/`tel:129`/WhatsApp, dan empat item bantuan.
Semua lulus. Satu-satunya error konsol berasal dari rute `/tidak-ada/` yang memang sengaja
tidak ada.
