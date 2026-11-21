# Menyiapkan Google Sheets sebagai penyimpanan

Situs tetap statis. Yang menyimpan data adalah Google Sheets, diakses lewat
Apps Script. Tidak ada proses Node yang perlu dirawat di VPS.

## 1. Buat spreadsheet

1. Buka <https://sheets.new> dengan akun Google yang akan menjadi admin.
2. Beri nama, misalnya `Jejak Baik - Data`.
3. Jangan buat tab apa pun. Tab `pengguna` dan `pengaduan` dibuat otomatis
   saat permintaan pertama masuk.

## 2. Tempel Apps Script

1. Di spreadsheet, buka **Extensions > Apps Script**.
2. Hapus isi `Code.gs`, lalu tempel seluruh isi `docs/apps-script.gs`.
3. Ubah tiga baris di bagian atas:

   ```js
   var CLIENT_ID = "952508349133-9c2rh227hiovent3e1scpo34hjqf8hsa.apps.googleusercontent.com";
   var ADMIN = "email-admin@gmail.com";
   var FOLDER_BUKTI = "";
   ```

   - `ADMIN`: email Google kamu. Bisa lebih dari satu, pisahkan dengan koma.
     Hanya email ini yang bisa menyetujui Guru BK dan melihat semua pengaduan.
   - `FOLDER_BUKTI`: ID folder Google Drive untuk lampiran bukti. Buka folder
     di Drive, salin ID dari URL: `drive.google.com/drive/folders/ID_FOLDER_DI_SINI`.
     Kosongkan kalau lampiran tidak ingin disimpan.

4. Simpan (`Ctrl+S`). Setiap kali `ADMIN` atau `FOLDER_BUKTI` diubah, buat
   versi deploy baru (langkah 3 nomor 6 di bawah) supaya perubahannya dipakai.

## 3. Deploy sebagai Web App

1. **Deploy > New deployment**.
2. Pilih jenis **Web app**.
3. Isi:
   - Description: `jejak-baik-api`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Klik **Deploy**, lalu **Authorize access** dan setujui izinnya.
   Izin yang diminta: Sheets, Drive (kalau `FOLDER_BUKTI` diisi), dan
   koneksi keluar untuk memeriksa token Google.
5. Salin **Web app URL** yang berakhiran `/exec`.

Penting: **Anyone** di sini berarti Apps Script boleh dipanggil tanpa login
Google. Isi data tetap dilindungi oleh pemeriksaan token di dalam skrip.
Jangan pilih "Anyone with Google account", karena permintaan dari situs akan
ditolak sebelum sampai ke skrip.

## 4. Uji di peramban

Buka URL `/exec` itu langsung di peramban. Harus muncul:

```json
{"ok":true,"data":{"siap":true}}
```

Kalau muncul halaman login Google atau pesan error, pengaturan akses belum
**Anyone**. Ulangi langkah 3.

## 5. Hubungkan ke situs

Tambahkan ke `.env.local`:

```
NEXT_PUBLIC_SHEET_API_URL=https://script.google.com/macros/s/AKfy.../exec
```

Lalu build ulang dan deploy. Nilai ini publik dan memang ikut terkirim ke
peramban, jadi tidak perlu dirahasiakan.

## 6. Daftarkan domain di Google Cloud Console

Buka <https://console.cloud.google.com/apis/credentials>, pilih OAuth client
ID yang sama dengan `CLIENT_ID`, lalu tambahkan ke **Authorized JavaScript
origins**:

```
https://jejakbaik.my.id
https://www.jejakbaik.my.id
```

Tanpa ini, tombol Google menolak menampilkan akun dan panel admin tidak bisa
dipakai.

## 7. Masuk sebagai admin

Buka `https://jejakbaik.my.id/auth?mode=masuk` dan pilih akun Google yang
emailnya ada di `ADMIN`. Setelah profil tersimpan, tombol **Buka panel admin**
muncul di halaman profil dan di Dasbor. Admin tidak perlu dan tidak bisa
mendaftar sebagai Guru BK.

Untuk menguji alur lengkap: daftar sekali sebagai Guru BK dengan akun Google
lain, setujui dari panel admin, lalu buka Dasbor akun Guru BK itu dan pilih tab
**Pengaduan masuk**.

## Kalau muncul "Failed to fetch"

Tiga penyebab yang paling sering:

1. Deployment bukan **Anyone**.
2. URL yang dipakai bukan `/exec`, melainkan `/dev`.
3. Deployment sudah diubah tetapi belum dibuat versi baru. Buka
   **Deploy > Manage deployments > Edit > Version: New version > Deploy**.

## Batas yang perlu diketahui

- Kuota akun Gmail gratis: sekitar 90 menit total eksekusi per hari dan
  20.000 panggilan keluar per hari. Cukup untuk satu sekolah.
- Setiap permintaan butuh 1 sampai 3 detik karena Apps Script memulai ulang
  skrip. Panel admin akan terasa lambat, bukan rusak.
- Lampiran bukti dibagikan sebagai tautan "siapa pun yang punya tautan".
  ID berkas Drive tidak bisa ditebak, tetapi tautannya jangan disebar.
- Data pengaduan siswa berada di Google Drive akun pemilik spreadsheet.
  Untuk serah terima, pindahkan kepemilikan spreadsheet ke akun sekolah.
