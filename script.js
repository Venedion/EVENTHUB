'use strict';

const HARGA_WORKSHOP = {
  'Front-End Web': 150000,
  'UI/UX Design': 150000,
  'Cybersecurity Dasar': 175000
};

const DISKON_TIPE_PESERTA = {
  pelajar: 0.2,
  mahasiswa: 0.1,
  umum: 0
};

const DISKON_PAKET_2_WORKSHOP = 0.05;
const DISKON_PAKET_3_WORKSHOP = 0.1;
const BIAYA_ADMIN = 5000;

const LABEL_TIPE = {
  pelajar: 'Pelajar',
  mahasiswa: 'Mahasiswa',
  umum: 'Umum'
};

const LABEL_SESI = {
  pagi: 'Pagi (09.00 - 12.00 WIB)',
  siang: 'Siang (13.00 - 16.00 WIB)'
};

const NAMA_HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const NAMA_BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const form = document.getElementById('form-pendaftaran');
const inputNama = document.getElementById('nama');
const inputEmail = document.getElementById('email');
const inputHp = document.getElementById('hp');
const inputInstitusi = document.getElementById('institusi');
const inputTanggal = document.getElementById('tanggal');
const selectSesi = document.getElementById('sesi');
const inputJumlah = document.getElementById('jumlah');
const inputCatatan = document.getElementById('catatan');
const checkSetuju = document.getElementById('setuju');
const ringkasan = document.getElementById('ringkasan');
const ringkasanKosong = document.getElementById('ringkasan-kosong');
const ringkasanIsi = document.getElementById('ringkasan-isi');

const formatRupiah = (angka) => 'Rp' + angka.toLocaleString('id-ID');

const setTeks = (id, teks) => {
  document.getElementById(id).textContent = teks;
};

const errorSedangTampil = (id) => document.getElementById('err-' + id).textContent !== '';

const tambahItem = (daftar, teks) => {
  const item = document.createElement('li');
  item.textContent = teks;
  daftar.appendChild(item);
};

const formatTanggal = (nilai) => {
  const bagian = nilai.split('-');
  const tanggal = new Date(Number(bagian[0]), Number(bagian[1]) - 1, Number(bagian[2]));
  return NAMA_HARI[tanggal.getDay()] + ', ' + tanggal.getDate() + ' ' + NAMA_BULAN[tanggal.getMonth()] + ' ' + tanggal.getFullYear();
};

const ambilWorkshopTerpilih = () => {
  const kotak = form.querySelectorAll('input[name="workshop"]');
  const terpilih = [];
  for (let i = 0; i < kotak.length; i++) {
    if (!kotak[i].checked) {
      continue;
    }
    terpilih.push(kotak[i].value);
  }
  return terpilih;
};

function tampilkanError(id, pesan) {
  const elemenError = document.getElementById('err-' + id);
  const elemenInput = document.getElementById(id);
  elemenError.textContent = pesan;
  if (elemenInput !== null) {
    elemenInput.setAttribute('aria-invalid', pesan === '' ? 'false' : 'true');
  }
  return pesan === '';
}

function validasiNama() {
  const nilai = inputNama.value.trim();
  const polaNama = /^[A-Za-z .'\-]+$/;
  let pesan = '';
  if (nilai === '') {
    pesan = 'Nama wajib diisi.';
  } else if (nilai.length < 3) {
    pesan = 'Nama minimal 3 karakter.';
  } else if (nilai.length > 60) {
    pesan = 'Nama maksimal 60 karakter.';
  } else if (!polaNama.test(nilai)) {
    pesan = 'Nama hanya boleh berisi huruf, spasi, titik, apostrof, dan tanda hubung.';
  }
  return tampilkanError('nama', pesan);
}

function validasiEmail() {
  const nilai = inputEmail.value.trim();
  const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  let pesan = '';
  if (nilai === '') {
    pesan = 'Email wajib diisi.';
  } else if (nilai.length > 100) {
    pesan = 'Email maksimal 100 karakter.';
  } else if (!polaEmail.test(nilai)) {
    pesan = 'Format email tidak valid. Contoh: nama@email.com';
  }
  return tampilkanError('email', pesan);
}

function validasiHp() {
  const nilai = inputHp.value;
  let pesan = '';
  if (nilai === '') {
    pesan = 'Nomor HP wajib diisi.';
  } else if (!/^\d+$/.test(nilai)) {
    pesan = 'Nomor HP hanya boleh berisi angka.';
  } else if (nilai.indexOf('08') !== 0) {
    pesan = 'Nomor HP harus diawali 08.';
  } else if (nilai.length < 10 || nilai.length > 13) {
    pesan = 'Nomor HP harus 10 sampai 13 digit.';
  }
  return tampilkanError('hp', pesan);
}

function validasiInstitusi() {
  const nilai = inputInstitusi.value.trim();
  let pesan = '';
  if (nilai !== '' && nilai.length < 3) {
    pesan = 'Nama institusi minimal 3 karakter.';
  } else if (nilai.length > 60) {
    pesan = 'Nama institusi maksimal 60 karakter.';
  }
  return tampilkanError('institusi', pesan);
}

function validasiTipe() {
  const terpilih = form.querySelector('input[name="tipe"]:checked');
  const pesan = terpilih === null ? 'Pilih salah satu tipe peserta.' : '';
  return tampilkanError('tipe', pesan);
}

function validasiTanggal() {
  const nilai = inputTanggal.value;
  let pesan = '';
  if (nilai === '') {
    pesan = 'Tanggal hadir wajib diisi.';
  } else if (nilai < inputTanggal.min || nilai > inputTanggal.max) {
    pesan = 'Tanggal harus antara 20 dan 22 Oktober 2026.';
  }
  return tampilkanError('tanggal', pesan);
}

function validasiSesi() {
  const pesan = selectSesi.value === '' ? 'Pilih sesi terlebih dahulu.' : '';
  return tampilkanError('sesi', pesan);
}

function validasiJumlah() {
  const teks = inputJumlah.value;
  const angka = Number(teks);
  const batasMin = Number(inputJumlah.min);
  const batasMaks = Number(inputJumlah.max);
  let pesan = '';
  if (teks === '') {
    pesan = 'Jumlah tiket wajib diisi.';
  } else if (!Number.isInteger(angka)) {
    pesan = 'Jumlah tiket harus berupa bilangan bulat.';
  } else if (angka < batasMin || angka > batasMaks) {
    pesan = 'Jumlah tiket harus antara ' + batasMin + ' dan ' + batasMaks + '.';
  }
  return tampilkanError('jumlah', pesan);
}

function validasiWorkshop() {
  const pesan = ambilWorkshopTerpilih().length === 0 ? 'Pilih minimal satu workshop.' : '';
  return tampilkanError('workshop', pesan);
}

function validasiCatatan() {
  const batas = inputCatatan.maxLength;
  const pesan = inputCatatan.value.length > batas ? 'Catatan maksimal ' + batas + ' karakter.' : '';
  return tampilkanError('catatan', pesan);
}

function validasiSetuju() {
  const pesan = checkSetuju.checked ? '' : 'Anda harus menyetujui pernyataan ini.';
  return tampilkanError('setuju', pesan);
}

const daftarValidasi = [
  { id: 'nama', selector: '#nama', fokus: 'nama', event: 'blur', cek: validasiNama },
  { id: 'email', selector: '#email', fokus: 'email', event: 'blur', cek: validasiEmail },
  { id: 'hp', selector: '#hp', fokus: 'hp', event: 'blur', cek: validasiHp },
  { id: 'institusi', selector: '#institusi', fokus: 'institusi', event: 'blur', cek: validasiInstitusi },
  { id: 'tipe', selector: 'input[name="tipe"]', fokus: 'tipe-pelajar', event: 'change', cek: validasiTipe },
  { id: 'tanggal', selector: '#tanggal', fokus: 'tanggal', event: 'change', cek: validasiTanggal },
  { id: 'sesi', selector: '#sesi', fokus: 'sesi', event: 'change', cek: validasiSesi },
  { id: 'jumlah', selector: '#jumlah', fokus: 'jumlah', event: 'blur', cek: validasiJumlah },
  { id: 'workshop', selector: 'input[name="workshop"]', fokus: 'ws-frontend', event: 'change', cek: validasiWorkshop },
  { id: 'catatan', selector: '#catatan', fokus: 'catatan', event: 'blur', cek: validasiCatatan },
  { id: 'setuju', selector: '#setuju', fokus: 'setuju', event: 'change', cek: validasiSetuju }
];

function validasiSemua() {
  let idFokusPertama = '';
  for (let i = 0; i < daftarValidasi.length; i++) {
    const lolos = daftarValidasi[i].cek();
    if (!lolos && idFokusPertama === '') {
      idFokusPertama = daftarValidasi[i].fokus;
    }
  }
  return idFokusPertama;
}

function pasangValidasiLangsung() {
  for (let i = 0; i < daftarValidasi.length; i++) {
    const item = daftarValidasi[i];
    const target = document.querySelectorAll(item.selector);
    for (let j = 0; j < target.length; j++) {
      target[j].addEventListener(item.event, item.cek);
      target[j].addEventListener('input', () => {
        if (errorSedangTampil(item.id)) {
          item.cek();
        }
      });
    }
  }
}

function bersihkanSemuaError() {
  for (let i = 0; i < daftarValidasi.length; i++) {
    tampilkanError(daftarValidasi[i].id, '');
  }
}

function ambilDataForm() {
  return {
    nama: inputNama.value.trim(),
    email: inputEmail.value.trim(),
    hp: inputHp.value,
    institusi: inputInstitusi.value.trim(),
    tipe: form.querySelector('input[name="tipe"]:checked').value,
    tanggal: inputTanggal.value,
    sesi: selectSesi.value,
    jumlahTiket: Number(inputJumlah.value),
    workshop: ambilWorkshopTerpilih()
  };
}

function hitungBiaya(daftarWorkshop, tipe, jumlahTiket) {
  const rincian = [];
  let hargaPerTiket = 0;

  for (let i = 0; i < daftarWorkshop.length; i++) {
    const harga = HARGA_WORKSHOP[daftarWorkshop[i]];
    hargaPerTiket += harga;
    rincian.push({ nama: daftarWorkshop[i], harga: harga });
  }

  const subtotal = hargaPerTiket * jumlahTiket;

  const persenTipe = DISKON_TIPE_PESERTA[tipe];
  let persenPaket = 0;
  switch (daftarWorkshop.length) {
    case 2:
      persenPaket = DISKON_PAKET_2_WORKSHOP;
      break;
    case 3:
      persenPaket = DISKON_PAKET_3_WORKSHOP;
      break;
    default:
      persenPaket = 0;
  }

  const diskonTipe = Math.round(subtotal * persenTipe);
  const diskonPaket = Math.round(subtotal * persenPaket);
  const total = subtotal - diskonTipe - diskonPaket + BIAYA_ADMIN;

  return {
    rincian: rincian,
    hargaPerTiket: hargaPerTiket,
    subtotal: subtotal,
    persenTipe: persenTipe,
    persenPaket: persenPaket,
    diskonTipe: diskonTipe,
    diskonPaket: diskonPaket,
    biayaAdmin: BIAYA_ADMIN,
    total: total
  };
}

function teksDiskon(nominal, persen) {
  if (nominal === 0) {
    return '-';
  }
  return '-' + formatRupiah(nominal) + ' (' + Math.round(persen * 100) + '%)';
}

function isiDaftarWorkshop(rincian) {
  const wadah = document.getElementById('out-workshop');
  const daftar = document.createElement('ul');
  daftar.className = 'list-unstyled mb-0';
  wadah.textContent = '';
  for (let i = 0; i < rincian.length; i++) {
    tambahItem(daftar, rincian[i].nama + ' - ' + formatRupiah(rincian[i].harga));
  }
  wadah.appendChild(daftar);
}

function tampilkanRingkasan(data, biaya) {
  setTeks('out-nama', data.nama);
  setTeks('out-email', data.email);
  setTeks('out-hp', data.hp);
  setTeks('out-institusi', data.institusi === '' ? '-' : data.institusi);
  setTeks('out-tipe', LABEL_TIPE[data.tipe]);
  setTeks('out-tanggal', formatTanggal(data.tanggal));
  setTeks('out-sesi', LABEL_SESI[data.sesi]);
  setTeks('out-jumlah', data.jumlahTiket + ' tiket');
  isiDaftarWorkshop(biaya.rincian);
  setTeks('out-subtotal', formatRupiah(biaya.subtotal) + ' (' + data.jumlahTiket + ' x ' + formatRupiah(biaya.hargaPerTiket) + ')');
  setTeks('out-diskon-tipe', teksDiskon(biaya.diskonTipe, biaya.persenTipe));
  setTeks('out-diskon-paket', teksDiskon(biaya.diskonPaket, biaya.persenPaket));
  setTeks('out-admin', '+' + formatRupiah(biaya.biayaAdmin));
  setTeks('out-total', formatRupiah(biaya.total));

  ringkasanKosong.hidden = true;
  ringkasanIsi.hidden = false;
  ringkasan.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function sembunyikanRingkasan() {
  ringkasanKosong.hidden = false;
  ringkasanIsi.hidden = true;
}

function tampilkanKetentuanBiaya() {
  const wadah = document.getElementById('ketentuan-biaya');
  const daftar = document.createElement('ul');
  const namaWorkshop = Object.keys(HARGA_WORKSHOP);
  const kunciTipe = Object.keys(DISKON_TIPE_PESERTA);
  let teksTipe = '';

  daftar.className = 'mb-0 ps-3';

  for (let i = 0; i < namaWorkshop.length; i++) {
    tambahItem(daftar, namaWorkshop[i] + ': ' + formatRupiah(HARGA_WORKSHOP[namaWorkshop[i]]) + ' per tiket');
  }

  for (let i = 0; i < kunciTipe.length; i++) {
    teksTipe += LABEL_TIPE[kunciTipe[i]] + ' ' + Math.round(DISKON_TIPE_PESERTA[kunciTipe[i]] * 100) + '%';
    if (i < kunciTipe.length - 1) {
      teksTipe += ', ';
    }
  }

  tambahItem(daftar, 'Diskon tipe peserta: ' + teksTipe);
  tambahItem(daftar, 'Diskon paket: 2 workshop ' + Math.round(DISKON_PAKET_2_WORKSHOP * 100) + '%, 3 workshop ' + Math.round(DISKON_PAKET_3_WORKSHOP * 100) + '%');
  tambahItem(daftar, 'Biaya admin: ' + formatRupiah(BIAYA_ADMIN) + ' per pendaftaran');
  tambahItem(daftar, 'Total = subtotal - diskon tipe - diskon paket + biaya admin');
  wadah.appendChild(daftar);
}

function prosesPendaftaran(event) {
  event.preventDefault();

  const idFokusPertama = validasiSemua();
  if (idFokusPertama !== '') {
    document.getElementById(idFokusPertama).focus();
    return;
  }

  const data = ambilDataForm();
  const biaya = hitungBiaya(data.workshop, data.tipe, data.jumlahTiket);
  tampilkanRingkasan(data, biaya);
}

inputHp.addEventListener('beforeinput', (event) => {
  if (event.data && /\D/.test(event.data)) {
    event.preventDefault();
  }
});

inputHp.addEventListener('input', () => {
  const bersih = inputHp.value.replace(/\D/g, '').slice(0, 13);
  if (inputHp.value !== bersih) {
    inputHp.value = bersih;
  }
});

inputJumlah.addEventListener('keydown', (event) => {
  const dilarang = ['e', 'E', '+', '-', '.', ','];
  if (dilarang.indexOf(event.key) !== -1) {
    event.preventDefault();
  }
});

pasangValidasiLangsung();
tampilkanKetentuanBiaya();

form.addEventListener('submit', prosesPendaftaran);
form.addEventListener('reset', () => {
  bersihkanSemuaError();
  sembunyikanRingkasan();
});
