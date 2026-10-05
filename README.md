# EVENTHUB

Halaman web front-end untuk menampilkan informasi workshop dan menerima pendaftaran peserta. Seluruh proses (melihat informasi, memilih workshop, mengisi data diri, dan melihat ringkasan pendaftaran) berjalan di satu halaman tanpa berpindah halaman.

## Fitur

- Navbar responsif dengan menu Beranda, Workshop, Jadwal, dan Pendaftaran. Menu aktif ikut berubah saat halaman di-scroll.
- Hero berisi judul, deskripsi, tombol ajakan mendaftar, dan gambar ilustrasi.
- Informasi kegiatan, daftar fasilitas, dan tautan informasi.
- Tiga kartu workshop: Front-End Web, UI/UX Design, dan Cybersecurity Dasar.
- Tabel jadwal workshop tanggal 20-22 Oktober 2026.
- Formulir pendaftaran dengan validasi di sisi klien.
- Ringkasan pendaftaran dan total biaya yang tampil secara dinamis setelah formulir valid dikirim.
- Tampilan nyaman di desktop dan mobile.

## Teknologi

- HTML5 dengan elemen semantik: `header`, `nav`, `main`, `section`, `article`, `footer`
- CSS3 (`style.css`): CSS variable, Flexbox, Grid, media query, pseudo-class, dan animasi transisi
- Bootstrap 5.3.7 lewat CDN: navbar, grid, card, button, form, table, dan utility class
- JavaScript dasar (`script.js`) tanpa framework tambahan
- Google Fonts: Space Grotesk dan Inter

## Struktur Berkas

```
eventhub/
├── index.html
├── style.css
├── script.js
└── README.md
```

| Berkas | Isi |
|---|---|
| `index.html` | Struktur halaman, formulir, dan kerangka ringkasan |
| `style.css` | Desain visual, layout, dan media query |
| `script.js` | Validasi form, perhitungan biaya, dan pembuatan ringkasan |

## Cara Menjalankan

1. Simpan `index.html`, `style.css`, dan `script.js` dalam satu folder.
2. Buka `index.html` di browser (Chrome, Firefox, Edge, atau Safari).
3. Sambungkan ke internet karena Bootstrap dan font dimuat dari CDN.

Tidak perlu instalasi atau server khusus.

## Formulir Pendaftaran

| Kolom | Aturan |
|---|---|
| Nama lengkap | Wajib, 3-60 karakter, hanya huruf, spasi, titik, apostrof, dan tanda hubung |
| Email | Wajib, format email valid, maksimal 100 karakter |
| Nomor HP | Wajib, hanya angka, diawali 08, 10-13 digit |
| Asal institusi | Opsional, jika diisi 3-60 karakter (memakai datalist) |
| Tipe peserta | Wajib pilih satu: Pelajar, Mahasiswa, atau Umum |
| Tanggal hadir | Wajib, hanya 20-22 Oktober 2026 |
| Pilihan sesi | Wajib pilih: Pagi atau Siang |
| Jumlah tiket | Wajib, bilangan bulat 1-5 |
| Pilihan workshop | Minimal satu workshop dicentang |
| Catatan | Opsional, maksimal 200 karakter |
| Persetujuan | Wajib dicentang |

Perilaku validasi:

- Huruf dan simbol langsung diblokir saat mengetik di kolom Nomor HP, termasuk saat paste.
- Pesan kesalahan tampil di bawah tiap kolom, dan kolom yang salah diberi border merah.
- Event `submit` selalu memanggil `preventDefault()`, jadi halaman tidak reload. Jika ada kolom yang salah, fokus pindah ke kolom pertama yang bermasalah.
- Tombol Reset menghapus semua pesan kesalahan dan menyembunyikan ringkasan.
- Form belum terhubung ke server. Atribut `action="/daftar"` dan `method="post"` hanya sebagai kerangka untuk pengembangan lanjutan.

## Struktur Biaya

Seluruh nilai biaya didefinisikan sebagai konstanta di bagian atas `script.js`.

| Komponen | Nilai | Konstanta |
|---|---|---|
| Harga Front-End Web | Rp150.000 per tiket | `HARGA_WORKSHOP` |
| Harga UI/UX Design | Rp150.000 per tiket | `HARGA_WORKSHOP` |
| Harga Cybersecurity Dasar | Rp175.000 per tiket | `HARGA_WORKSHOP` |
| Diskon Pelajar | 20% | `DISKON_TIPE_PESERTA` |
| Diskon Mahasiswa | 10% | `DISKON_TIPE_PESERTA` |
| Diskon Umum | 0% | `DISKON_TIPE_PESERTA` |
| Diskon paket 2 workshop | 5% | `DISKON_PAKET_2_WORKSHOP` |
| Diskon paket 3 workshop | 10% | `DISKON_PAKET_3_WORKSHOP` |
| Biaya admin | Rp5.000 per pendaftaran | `BIAYA_ADMIN` |

Rumus:

```
harga per tiket = jumlah harga semua workshop yang dipilih
subtotal        = harga per tiket x jumlah tiket
diskon tipe     = subtotal x persen diskon tipe peserta
diskon paket    = subtotal x persen diskon paket
total           = subtotal - diskon tipe - diskon paket + biaya admin
```

Contoh:

| Skenario | Perhitungan | Total |
|---|---|---|
| Mahasiswa, Front-End Web + UI/UX Design, 2 tiket | 600.000 - 60.000 - 30.000 + 5.000 | Rp515.000 |
| Umum, ketiga workshop, 1 tiket | 475.000 - 0 - 47.500 + 5.000 | Rp432.500 |
| Pelajar, Front-End Web saja, 1 tiket | 150.000 - 30.000 + 5.000 | Rp125.000 |

Harga yang tampil di kartu workshop dan label checkbox pada `index.html` berupa teks statis. Jika nilai di `HARGA_WORKSHOP` diubah, teks tersebut perlu disesuaikan secara manual.

## Konsep JavaScript yang Digunakan

| Konsep | Contoh penerapan di `script.js` |
|---|---|
| Variabel dan tipe data | `const` dan `let`; string, number, boolean, array, dan object |
| Operator | Aritmatika pada perhitungan biaya, perbandingan dan logika pada validasi |
| Percabangan | `if / else if / else` pada validasi dan `switch` pada diskon paket |
| Perulangan | `for` dan `continue` untuk mengumpulkan workshop, menghitung biaya, dan memvalidasi semua kolom |
| Function dan arrow function | `hitungBiaya()`, `validasiNama()`, `formatRupiah`, `ambilWorkshopTerpilih`, dan lainnya |
| Event | `submit`, `reset`, `blur`, `change`, `input`, `beforeinput`, dan `keydown` |
| Manipulasi DOM | `getElementById`, `querySelector`, `createElement`, `appendChild`, dan `textContent` |

Ringkasan ditulis memakai `textContent`, bukan `innerHTML`, sehingga input pengguna tidak dapat menyisipkan HTML ke halaman.

## Pengujian

Logika form dan perhitungan biaya diuji dengan simulasi browser (jsdom), mencakup:

- submit form kosong dicegah dan semua pesan kesalahan wajib tampil
- pemfilteran Nomor HP hanya angka
- tiga skenario perhitungan biaya di atas
- penolakan nama yang berisi tag HTML, tanggal di luar rentang, dan jumlah tiket di luar batas
- tombol Reset menyembunyikan ringkasan dan menghapus pesan kesalahan
- tidak ada error JavaScript pada console

Sebelum dikumpulkan, disarankan membuka `index.html` di browser dan memeriksa tab Console (F12) sekali lagi.
