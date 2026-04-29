# Performance Analysis

## Fokus Analisis

Karena project ini adalah React SPA statis, optimasi performance yang dikerjakan difokuskan pada aspek yang dapat dikendalikan dari source code tanpa konfigurasi server tambahan.

## Temuan Sebelum Implementasi

- Gambar non-kritis belum memakai `loading="lazy"` secara konsisten.
- Gambar belum memakai `decoding="async"` secara konsisten.
- Hero image belum ditandai dengan prioritas yang jelas sebagai kandidat LCP.
- Tidak ada dokumentasi batasan compression/caching untuk hosting statis saat ini.

## Perbaikan yang Dilakukan

## 1. LCP awareness

Hero image pada home page diberi `fetchPriority="high"` agar browser lebih cepat memprioritaskan aset visual utama.

## 2. Lazy loading untuk gambar non-kritis

Logo client pada marquee diberi:

- `loading="lazy"`
- `decoding="async"`

Ini membantu menurunkan beban awal halaman.

## 3. Pengurangan potensi CLS

Perubahan dilakukan dengan menjaga struktur visual tetap stabil dan menghindari lazy loading pada hero image yang berpotensi menjadi LCP.

## Hal yang Belum Diimplementasikan di Repo

## 1. Compression

Gzip/Brotli tidak dikonfigurasi di repo ini karena itu bergantung pada platform hosting atau CDN.

## 2. Cache headers

Cache-control headers juga tidak diatur dari source repo ini. Ini perlu konfigurasi di platform deploy.

## 3. Server response time

TTFB tidak bisa dioptimalkan secara signifikan dari code level untuk static hosting selain menjaga bundle dan aset tetap ringan.

## Rekomendasi Lanjutan

1. Migrasi ke path-based routing atau prerender untuk meningkatkan crawlability dan initial HTML completeness.
2. Tambahkan image dimension hints bila aset final dan layout sudah stabil.
3. Gunakan hosting/CDN dengan Brotli, long-term caching, dan immutable assets.
