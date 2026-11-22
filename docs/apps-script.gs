/**
 * Backend Jejak Baik di Google Sheets.
 *
 * Tempel seluruh isi file ini ke Apps Script yang terikat pada spreadsheet,
 * lalu Deploy > New deployment > Web app.
 *
 * Pengaturan deploy:
 *   Execute as        : Me
 *   Who has access    : Anyone
 *
 * Setelah deploy, salin URL yang berakhiran /exec ke NEXT_PUBLIC_SHEET_API_URL.
 * Buka URL itu di peramban: harus muncul {"ok":true,"data":{"siap":true}}.
 */

// Samakan dengan NEXT_PUBLIC_GOOGLE_CLIENT_ID di .env.local.
var CLIENT_ID = "952508349133-9c2rh227hiovent3e1scpo34hjqf8hsa.apps.googleusercontent.com";

// Email admin, pisahkan dengan koma. Hanya email di sini yang bisa menyetujui Guru BK.
var ADMIN = "ganti-dengan-email-admin@gmail.com";

// ID folder Google Drive untuk menyimpan lampiran bukti.
// Kosongkan ("") kalau lampiran tidak ingin disimpan.
var FOLDER_BUKTI = "";

var TAB_PENGGUNA = "pengguna";
var TAB_PENGADUAN = "pengaduan";
var TAB_ADMIN = "permintaanAdmin";

var HEADER_PENGGUNA = [
  "email",
  "nama",
  "sekolah",
  "jabatan",
  "status",
  "tanggal",
  "putusanOleh",
  "tanggalPutusan",
];

var HEADER_PENGADUAN = [
  "tiket",
  "dibuat",
  "email",
  "nama",
  "anonim",
  "kategori",
  "platform",
  "kejadian",
  "kronologi",
  "buktiUrl",
  "status",
  "dibuka",
  "balasan",
  "rahasia",
];

var HEADER_ADMIN = [
  "email",
  "nama",
  "status",
  "tanggal",
  "putusanOleh",
  "tanggalPutusan",
];

function doGet() {
  return jawab({ ok: true, data: { siap: true } });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Permintaan kosong.");
    }

    var isi = JSON.parse(e.postData.contents);
    var akun = akunDariToken(isi.token);
    var jalur = JALUR[isi.aksi];

    if (!jalur) throw new Error("Aksi tidak dikenal: " + isi.aksi);

    return jawab({ ok: true, data: jalur(isi, akun) });
  } catch (galat) {
    return jawab({ ok: false, galat: String((galat && galat.message) || galat) });
  }
}

function jawab(isi) {
  return ContentService.createTextOutput(JSON.stringify(isi)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

/* ---------------------------------------------------------------- identitas */

function akunDariToken(token) {
  if (!token) return null;

  var cache = CacheService.getScriptCache();
  var kunciCache = "token:" + token.slice(-40);
  var tersimpan = cache.get(kunciCache);
  if (tersimpan) return JSON.parse(tersimpan);

  var respons;
  try {
    respons = UrlFetchApp.fetch(
      "https://oauth2.googleapis.com/tokeninfo?id_token=" + encodeURIComponent(token),
      { muteHttpExceptions: true },
    );
  } catch (galat) {
    throw new Error("Tidak bisa memeriksa token Google.");
  }

  if (respons.getResponseCode() !== 200) {
    throw new Error("Token Google tidak berlaku. Coba masuk ulang.");
  }

  var data = JSON.parse(respons.getContentText());

  if (data.aud !== CLIENT_ID) throw new Error("Token ini bukan untuk situs Jejak Baik.");
  if (String(data.email_verified) !== "true") throw new Error("Email Google belum terverifikasi.");
  if (!data.email) throw new Error("Token tidak memuat email.");

  var akun = {
    email: String(data.email).toLowerCase(),
    nama: data.name || String(data.email).split("@")[0],
  };

  cache.put(kunciCache, JSON.stringify(akun), 600);
  return akun;
}

function daftarAdmin() {
  return ADMIN.split(",")
    .map(function (email) {
      return email.trim().toLowerCase();
    })
    .filter(Boolean);
}

function isAdmin(email) {
  return daftarAdmin().indexOf(String(email).toLowerCase()) !== -1;
}

function wajibMasuk(akun) {
  if (!akun) throw new Error("Masuk dengan Google dulu.");
  return akun;
}

function wajibAdmin(akun) {
  wajibMasuk(akun);
  if (!isAdmin(akun.email)) throw new Error("Halaman ini hanya untuk admin.");
  return akun;
}

/** Hanya email di ADMIN yang boleh menyetujui admin lain. */
function wajibPemilik(akun) {
  wajibMasuk(akun);
  if (!isAdmin(akun.email)) throw new Error("Hanya pemilik situs yang bisa menyetujui admin.");
  return akun;
}

function bolehKelola(akun) {
  wajibMasuk(akun);
  if (isAdmin(akun.email)) return akun;

  var baris = cariPengguna(akun.email);
  if (!baris || baris.status !== "disetujui") {
    throw new Error("Akun Guru BK belum disetujui admin.");
  }

  return akun;
}

/* -------------------------------------------------------------------- sheet */

function pastikanTab(nama, header) {
  var buku = SpreadsheetApp.getActiveSpreadsheet();
  var tab = buku.getSheetByName(nama);

  if (!tab) {
    tab = buku.insertSheet(nama);
    tab.appendRow(header);
    tab.setFrozenRows(1);
    return tab;
  }

  if (tab.getLastRow() === 0) {
    tab.appendRow(header);
    tab.setFrozenRows(1);
  }

  return tab;
}

function tabPengguna() {
  return pastikanTab(TAB_PENGGUNA, HEADER_PENGGUNA);
}

function tabPengaduan() {
  return pastikanTab(TAB_PENGADUAN, HEADER_PENGADUAN);
}

function tabAdmin() {
  return pastikanTab(TAB_ADMIN, HEADER_ADMIN);
}

/** Mengembalikan objek baris (berdasarkan header) atau null. */
function cariBaris(tab, kolomKunci, nilai) {
  var terakhir = tab.getLastRow();
  if (terakhir < 2) return null;

  var header = tab.getRange(1, 1, 1, tab.getLastColumn()).getValues()[0];
  var isi = tab.getRange(2, 1, terakhir - 1, header.length).getValues();
  var target = String(nilai).toLowerCase();

  for (var i = 0; i < isi.length; i += 1) {
    if (String(isi[i][kolomKunci]).toLowerCase() === target) {
      return { nomorBaris: i + 2, nilai: barisKeObjek(header, isi[i]) };
    }
  }

  return null;
}

function barisKeObjek(header, baris) {
  var hasil = {};
  for (var i = 0; i < header.length; i += 1) hasil[header[i]] = baris[i];
  return hasil;
}

/** Sheets mengubah string ISO menjadi objek Date. Kembalikan ke ISO untuk klien. */
function teks(nilai) {
  if (nilai instanceof Date) return nilai.toISOString();
  return String(nilai === null || nilai === undefined ? "" : nilai);
}

function semuaBaris(tab) {
  var terakhir = tab.getLastRow();
  if (terakhir < 2) return [];

  var header = tab.getRange(1, 1, 1, tab.getLastColumn()).getValues()[0];
  var isi = tab.getRange(2, 1, terakhir - 1, header.length).getValues();

  return isi
    .filter(function (baris) {
      return String(baris[0]).length > 0;
    })
    .map(function (baris) {
      return barisKeObjek(header, baris);
    });
}

function tulisBaris(tab, objek, header) {
  tab.appendRow(
    header.map(function (kolom) {
      return objek[kolom] === undefined || objek[kolom] === null ? "" : objek[kolom];
    }),
  );
}

function cariPengguna(email) {
  var hasil = cariBaris(tabPengguna(), 0, email);
  return hasil ? hasil.nilai : null;
}

function cariPengaduan(tiket) {
  var hasil = cariBaris(tabPengaduan(), 0, tiket);
  return hasil ? hasil.nilai : null;
}

function cariAdmin(email) {
  var hasil = cariBaris(tabAdmin(), 0, email);
  return hasil ? hasil.nilai : null;
}

/* ------------------------------------------------------------------ laporan */

function buatTiket(tab) {
  var tahun = new Date().getFullYear();
  var dipakai = {};
  var daftar = semuaBaris(tab);

  daftar.forEach(function (baris) {
    dipakai[String(baris.tiket)] = true;
  });

  var urut = daftar.length + 1;
  var tiket = "";

  do {
    tiket = "JB-" + tahun + "-" + ("0000" + urut).slice(-4);
    urut += 1;
  } while (dipakai[tiket]);

  return tiket;
}

function simpanBukti(dataUrl, tiket) {
  if (!FOLDER_BUKTI || !dataUrl) return "";

  var cocok = /^data:(image\/[a-z+]+);base64,(.+)$/.exec(dataUrl);
  if (!cocok) return "";

  var folder = DriveApp.getFolderById(FOLDER_BUKTI);
  var ext = cocok[1] === "image/png" ? ".png" : cocok[1] === "image/webp" ? ".webp" : ".jpg";
  var berkas = folder.createFile(
    Utilities.newBlob(Utilities.base64Decode(cocok[2]), cocok[1], tiket + ext),
  );

  berkas.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  // Thumbnail bisa langsung dipakai di <img>. getUrl() hanya membuka halaman Drive.
  return "https://drive.google.com/thumbnail?id=" + berkas.getId() + "&sz=w1200";
}

function laporanUntukKlien(baris) {
  var anonim = String(baris.anonim).toUpperCase() === "TRUE";
  var balasan = [];

  try {
    balasan = JSON.parse(String(baris.balasan || "[]"));
  } catch (galat) {
    balasan = [];
  }

  return {
    tiket: String(baris.tiket),
    dibuat: teks(baris.dibuat),
    email: anonim ? "" : String(baris.email || ""),
    nama: anonim ? "" : String(baris.nama),
    anonim: anonim,
    kategori: String(baris.kategori),
    platform: String(baris.platform),
    kejadian: String(baris.kejadian),
    kronologi: String(baris.kronologi),
    buktiUrl: String(baris.buktiUrl || ""),
    status: String(baris.status || "terkirim"),
    dibuka: teks(baris.dibuka),
    balasan: balasan,
  };
}

/* ------------------------------------------------------------------- jalur */

var JALUR = {
  /** Peran dan status akun yang sedang masuk. */
  aku: function (isi, akun) {
    if (!akun) {
      return { peran: "tamu", status: "belum-terdaftar", pemilik: false, ajuanAdmin: "" };
    }

    if (isAdmin(akun.email)) {
      return { peran: "admin", status: "disetujui", pemilik: true, ajuanAdmin: "" };
    }

    var ajuan = cariAdmin(akun.email);
    var statusAjuan = ajuan ? String(ajuan.status || "menunggu") : "";

    if (statusAjuan === "disetujui") {
      return {
        peran: "admin",
        status: "disetujui",
        pemilik: false,
        ajuanAdmin: "disetujui",
      };
    }

    var pengguna = cariPengguna(akun.email);
    if (!pengguna) {
      return {
        peran: "didik",
        status: "belum-terdaftar",
        pemilik: false,
        ajuanAdmin: statusAjuan,
      };
    }

    return {
      peran: "guru",
      status: String(pengguna.status || "menunggu"),
      pemilik: false,
      ajuanAdmin: statusAjuan,
    };
  },

  /** Pendaftaran Guru BK. Admin tidak ikut didaftarkan. */
  daftarGuru: function (isi, akun) {
    wajibMasuk(akun);
    if (isAdmin(akun.email)) throw new Error("Admin tidak perlu mendaftar sebagai Guru BK.");

    var sekolah = String(isi.sekolah || "").trim();
    var jabatan = String(isi.jabatan || "").trim();

    if (sekolah.length < 3) throw new Error("Tulis nama sekolah minimal 3 huruf.");
    if (jabatan.length < 3) throw new Error("Tulis jabatan minimal 3 huruf.");

    var kunci = LockService.getScriptLock();
    kunci.waitLock(10000);

    try {
      var tab = tabPengguna();
      var ada = cariBaris(tab, 0, akun.email);

      if (ada) {
        if (ada.nilai.status === "disetujui") {
          return { status: "disetujui" };
        }

        tab.getRange(ada.nomorBaris, 3, 1, 3).setValues([
          [sekolah, jabatan, "menunggu"],
        ]);

        return { status: "menunggu" };
      }

      tulisBaris(
        tab,
        {
          email: akun.email,
          nama: akun.nama,
          sekolah: sekolah,
          jabatan: jabatan,
          status: "menunggu",
          tanggal: new Date().toISOString(),
        },
        HEADER_PENGGUNA,
      );

      return { status: "menunggu" };
    } finally {
      kunci.releaseLock();
    }
  },

  /** Pengguna meminta akses admin. Hanya pemilik situs yang memutuskan. */
  ajukanAdmin: function (isi, akun) {
    wajibMasuk(akun);

    if (isAdmin(akun.email)) throw new Error("Kamu sudah menjadi admin.");

    var kunci = LockService.getScriptLock();
    kunci.waitLock(10000);

    try {
      var tab = tabAdmin();
      var ada = cariBaris(tab, 0, akun.email);

      if (ada) {
        var status = String(ada.nilai.status || "menunggu");
        if (status !== "ditolak") return { status: status };

        var header = tab.getRange(1, 1, 1, tab.getLastColumn()).getValues()[0];
        tab.getRange(ada.nomorBaris, header.indexOf("status") + 1).setValue("menunggu");
        tab.getRange(ada.nomorBaris, header.indexOf("putusanOleh") + 1).setValue("");
        tab.getRange(ada.nomorBaris, header.indexOf("tanggalPutusan") + 1).setValue("");
        return { status: "menunggu" };
      }

      tulisBaris(
        tab,
        {
          email: akun.email,
          nama: akun.nama,
          status: "menunggu",
          tanggal: new Date().toISOString(),
        },
        HEADER_ADMIN,
      );

      return { status: "menunggu" };
    } finally {
      kunci.releaseLock();
    }
  },

  /** Siswa mengirim laporan pengaduan. */
  kirimLaporan: function (isi, akun) {
    wajibMasuk(akun);

    var laporan = isi.laporan || {};
    var kronologi = String(laporan.kronologi || "").trim();
    var kategori = String(laporan.kategori || "").trim();
    var platform = String(laporan.platform || "").trim();
    var kejadian = String(laporan.kejadian || "").trim();
    var anonim = laporan.anonim === true;
    var rahasia = String(isi.rahasia || "").trim();

    if (!kategori) throw new Error("Jenis kejadian belum dipilih.");
    if (!platform) throw new Error("Platform belum dipilih.");
    if (!kejadian) throw new Error("Tanggal kejadian belum diisi.");
    if (kronologi.length < 20) throw new Error("Kronologi minimal 20 karakter.");
    if (kronologi.length > 4000) throw new Error("Kronologi maksimal 4000 karakter.");
    if (rahasia.length < 16) throw new Error("Kunci laporan tidak valid.");

    var kunci = LockService.getScriptLock();
    kunci.waitLock(20000);

    try {
      var tab = tabPengaduan();
      var tiket = buatTiket(tab);
      var buktiUrl = simpanBukti(String(laporan.bukti || ""), tiket);

      tulisBaris(
        tab,
        {
          tiket: tiket,
          dibuat: new Date().toISOString(),
          email: anonim ? "" : akun.email,
          nama: anonim ? "" : String(laporan.nama || akun.nama),
          anonim: anonim ? "TRUE" : "FALSE",
          kategori: kategori,
          platform: platform,
          kejadian: kejadian,
          kronologi: kronologi,
          buktiUrl: buktiUrl,
          status: "terkirim",
          dibuka: "",
          balasan: "[]",
          rahasia: rahasia,
        },
        HEADER_PENGADUAN,
      );

      return { tiket: tiket, buktiUrl: buktiUrl };
    } finally {
      kunci.releaseLock();
    }
  },

  /** Pelapor memeriksa laporannya sendiri memakai pasangan tiket dan rahasia. */
  laporanSaya: function (isi, akun) {
    wajibMasuk(akun);

    var daftar = isi.tikets || [];
    if (!daftar.length) return [];

    var tab = tabPengaduan();
    var hasil = [];

    daftar.forEach(function (item) {
      var ada = cariBaris(tab, 0, item.tiket);
      if (!ada) return;
      if (String(ada.nilai.rahasia) !== String(item.rahasia)) return;

      hasil.push(laporanUntukKlien(ada.nilai));
    });

    return hasil;
  },

  /** Admin dan Guru BK yang sudah disetujui melihat seluruh laporan. */
  laporanMasuk: function (isi, akun) {
    bolehKelola(akun);
    return semuaBaris(tabPengaduan()).map(laporanUntukKlien);
  },

  /** Ubah status, tandai dibuka, atau tambah balasan. */
  ubahLaporan: function (isi, akun) {
    bolehKelola(akun);

    var tiket = String(isi.tiket || "");
    var tab = tabPengaduan();
    var ada = cariBaris(tab, 0, tiket);

    if (!ada) throw new Error("Laporan " + tiket + " tidak ditemukan.");

    var header = tab.getRange(1, 1, 1, tab.getLastColumn()).getValues()[0];
    var kolomStatus = header.indexOf("status") + 1;
    var kolomDibuka = header.indexOf("dibuka") + 1;
    var kolomBalasan = header.indexOf("balasan") + 1;

    if (isi.status) {
      var sah = ["terkirim", "ditinjau", "ditindaklanjuti", "selesai"];
      if (sah.indexOf(String(isi.status)) === -1) throw new Error("Status tidak dikenal.");
      tab.getRange(ada.nomorBaris, kolomStatus).setValue(String(isi.status));
    }

    if (isi.dibuka && !ada.nilai.dibuka) {
      tab.getRange(ada.nomorBaris, kolomDibuka).setValue(new Date().toISOString());
    }

    var teksBalasan = String(isi.balasan || "").trim();
    if (teksBalasan) {
      if (teksBalasan.length > 2000) throw new Error("Balasan maksimal 2000 karakter.");

      var lama = [];
      try {
        lama = JSON.parse(String(ada.nilai.balasan || "[]"));
      } catch (galat) {
        lama = [];
      }

      lama.push({
        dari: "guru",
        isi: teksBalasan,
        tanggal: new Date().toISOString(),
        oleh: akun.email,
      });

      tab.getRange(ada.nomorBaris, kolomBalasan).setValue(JSON.stringify(lama));
    }

    return { tiket: tiket };
  },

  /** Daftar pendaftar Guru BK. Khusus admin. */
  adminPendaftaran: function (isi, akun) {
    wajibAdmin(akun);

    return semuaBaris(tabPengguna()).map(function (baris) {
      return {
        email: String(baris.email),
        nama: String(baris.nama),
        sekolah: String(baris.sekolah),
        jabatan: String(baris.jabatan),
        status: String(baris.status || "menunggu"),
        tanggal: teks(baris.tanggal),
        putusanOleh: String(baris.putusanOleh || ""),
        tanggalPutusan: teks(baris.tanggalPutusan),
      };
    });
  },

  /** Setujui atau tolak pendaftar. Khusus admin. */
  adminPutusan: function (isi, akun) {
    wajibAdmin(akun);

    var email = String(isi.email || "").toLowerCase();
    var putusan = String(isi.putusan || "");

    if (putusan !== "disetujui" && putusan !== "ditolak") {
      throw new Error("Putusan harus disetujui atau ditolak.");
    }

    var tab = tabPengguna();
    var ada = cariBaris(tab, 0, email);
    if (!ada) throw new Error("Pendaftar " + email + " tidak ditemukan.");

    var header = tab.getRange(1, 1, 1, tab.getLastColumn()).getValues()[0];
    var kolomStatus = header.indexOf("status") + 1;
    var kolomOleh = header.indexOf("putusanOleh") + 1;
    var kolomTanggal = header.indexOf("tanggalPutusan") + 1;

    tab.getRange(ada.nomorBaris, kolomStatus).setValue(putusan);
    tab.getRange(ada.nomorBaris, kolomOleh).setValue(akun.email);
    tab.getRange(ada.nomorBaris, kolomTanggal).setValue(new Date().toISOString());

    return { email: email, status: putusan };
  },

  /** Daftar permintaan akses admin. Khusus pemilik situs. */
  adminPendaftaranAdmin: function (isi, akun) {
    wajibPemilik(akun);

    return semuaBaris(tabAdmin()).map(function (baris) {
      return {
        email: String(baris.email),
        nama: String(baris.nama),
        status: String(baris.status || "menunggu"),
        tanggal: teks(baris.tanggal),
        putusanOleh: String(baris.putusanOleh || ""),
        tanggalPutusan: teks(baris.tanggalPutusan),
      };
    });
  },

  /** Setujui atau tolak permintaan admin. Khusus pemilik situs. */
  adminPutusanAdmin: function (isi, akun) {
    wajibPemilik(akun);

    var email = String(isi.email || "").toLowerCase();
    var putusan = String(isi.putusan || "");

    if (putusan !== "disetujui" && putusan !== "ditolak") {
      throw new Error("Putusan harus disetujui atau ditolak.");
    }

    var tab = tabAdmin();
    var ada = cariBaris(tab, 0, email);
    if (!ada) throw new Error("Permintaan admin " + email + " tidak ditemukan.");

    var header = tab.getRange(1, 1, 1, tab.getLastColumn()).getValues()[0];

    tab.getRange(ada.nomorBaris, header.indexOf("status") + 1).setValue(putusan);
    tab.getRange(ada.nomorBaris, header.indexOf("putusanOleh") + 1).setValue(akun.email);
    tab
      .getRange(ada.nomorBaris, header.indexOf("tanggalPutusan") + 1)
      .setValue(new Date().toISOString());

    return { email: email, status: putusan };
  },
};
