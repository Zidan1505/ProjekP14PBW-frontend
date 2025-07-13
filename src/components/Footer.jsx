import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#0369A1] text-white pt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="footer-col">
          <div className="flex items-center space-x-4 mb-4">
            <img src="src/assets/Logo_BPS.png" width="70" alt="Logo BPS" />
            <h3 className="text-lg font-semibold uppercase">Badan Pusat Statistik</h3>
          </div>
          <p className="text-sm leading-relaxed">
            Badan Pusat Statistik Provinsi Kalimantan Tengah<br />
            Jl. Kapt. Piere Tendean No 6 Palangka Raya 73112 Indonesia<br />
            WhatsApp: 0811 521 6200<br />
            Telp: (0536) 322 8105<br />
            Faks: (0536) 322 1380<br />
            E-mail: <a href="mailto:pst6200@bps.go.id" className="text-blue-100 underline">pst6200@bps.go.id</a> |{" "}
            <a href="https://linktr.ee/bpskalteng" target="_blank" rel="noopener noreferrer" className="text-blue-100 underline">
              bpskalteng
            </a>
            <br />
            e-PPID (Pejabat Pengelola Informasi dan Dokumentasi)
          </p>
          <div className="mt-4 space-x-2 text-sm">
            <a href="#" className="text-blue-100 hover:underline">Manual</a> |
            <a href="#" className="text-blue-100 hover:underline">S&amp;K</a> |
            <a href="#" className="text-blue-100 hover:underline">Daftar Tautan</a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="font-semibold text-md mb-2">Tentang Kami</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline text-blue-100">Profil BPS</a></li>
            <li><a href="#" className="hover:underline text-blue-100">PPID</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="font-semibold text-md mb-2">Tautan Lainnya</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline text-blue-100">ASEAN Stats</a></li>
            <li><a href="#" className="hover:underline text-blue-100">Forum Masyarakat Statistik</a></li>
            <li><a href="#" className="hover:underline text-blue-100">Reformasi Birokrasi</a></li>
            <li><a href="#" className="hover:underline text-blue-100">Layanan Pengadaan Secara Elektronik</a></li>
            <li><a href="#" className="hover:underline text-blue-100">Politeknik Statistika STIS</a></li>
            <li><a href="#" className="hover:underline text-blue-100">Pusdiklat BPS</a></li>
            <li><a href="#" className="hover:underline text-blue-100">JDIH BPS</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center py-6 mt-10 border-t border-blue-200">
        <p className="text-sm text-blue-100">
          Created by Naufal Dzaki Zaidan (222313290@stis.ac.id)
        </p>
      </div>
    </footer>
  );
}
