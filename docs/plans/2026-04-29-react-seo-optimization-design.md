# React SEO Optimization - Design Document

**Date:** 2026-04-29  
**Status:** Approved

## Overview

Optimasi SEO untuk website portfolio React/Vite milik Kurob dengan fokus utama pada keyword `kurob fullstack programmer cilegon`, sambil merapikan baseline SEO teknis di seluruh route utama yang ada saat ini: home, blog, dan open source.

Implementasi dilakukan di source React, bukan pada file HTML statis lama, agar metadata dan struktur halaman mengikuti route aktual aplikasi. Karena site saat ini menggunakan `HashRouter`, pendekatan SEO yang dipilih adalah peningkatan metadata, structured data, semantic HTML, accessibility, dan performance dasar tanpa migrasi router.

## Current State Summary

- Aplikasi adalah SPA React dengan Vite.
- Routing memakai `HashRouter`, sehingga URL public berbentuk hash route dan kurang ideal untuk SEO dibanding path-based routing.
- `index.html` hanya memiliki title dan description dasar.
- Belum ada pengelolaan metadata per halaman di source React.
- Belum terlihat JSON-LD schema markup yang konsisten.
- `robots.txt` ada, tetapi `sitemap.xml` belum terlihat pada root saat audit.
- Beberapa gambar belum punya atribut performa seperti `loading`, `decoding`, dan dimensi eksplisit untuk membantu Core Web Vitals.
- Ada beberapa peluang perbaikan accessibility: label tombol, semantics untuk navigasi, dan nama aksesibel untuk link icon-only.

## Constraints

- Tidak mengubah arsitektur routing dari `HashRouter` ke `BrowserRouter` pada task ini.
- Tidak membuat test file baru.
- Tidak mengklaim implementasi server-side compression/caching bila tidak bisa dikonfigurasi dari repo ini.
- Perubahan harus minimal dan aman terhadap worktree yang sudah memiliki perubahan lain.

## Chosen Approach

### 1. Per-route SEO Head Management di React

Tambahkan helper kecil berbasis `useEffect` untuk mengelola:

- `document.title`
- `meta[name="description"]`
- `link[rel="canonical"]`
- Open Graph tags
- Twitter Card tags
- JSON-LD script

Pendekatan ini dipilih karena:

- sesuai dengan arsitektur SPA saat ini,
- tidak membutuhkan library tambahan,
- perubahan kecil dan mudah dipelihara.

### 2. Keyword-Focused Optimization pada Home Route

Home page akan dijadikan landing utama untuk keyword target `kurob fullstack programmer cilegon` dengan cara:

- menyesuaikan title dan meta description,
- memperjelas hero copy dan section intro agar mengandung intent pencarian lokal secara natural,
- menjaga tone tetap profesional tanpa keyword stuffing.

### 3. Baseline SEO untuk Route Lain

`/blog` dan `/open-source` akan diberi metadata khusus yang tetap konsisten dengan brand `Okuru.id` dan personal brand Kurob. Structured data yang dipakai akan menyesuaikan konteks halaman.

### 4. Technical SEO Files di Root

Perbarui atau tambahkan:

- `robots.txt`
- `sitemap.xml`

Karena site memakai hash routes, sitemap akan diarahkan ke URL utama yang valid untuk crawling, sambil mendokumentasikan keterbatasan hash routing terhadap indexing mendalam.

### 5. Accessibility and Performance Cleanup

Fokus pada perbaikan yang benar-benar bisa dieksekusi dari source:

- alt text yang lebih deskriptif
- `loading` dan `decoding` pada gambar non-kritis
- atribut ukuran gambar bila realistis
- heading hierarchy yang lebih jelas
- accessible name untuk social icon links
- semantic landmarks dan label navigasi
- mengurangi CLS pada elemen visual utama bila memungkinkan

## Planned Structured Data

### Home Page

- `Person`
- `WebSite`
- opsional `ProfessionalService` bila copy dan struktur mendukung secara jelas

### Blog Page

- `CollectionPage` atau `Blog`

### Open Source Page

- `CollectionPage`

Structured data akan dibuat ringkas, valid, dan hanya memuat informasi yang benar-benar ada di halaman atau brand profile.

## URL Strategy

Karena tetap memakai `HashRouter`, canonical URL akan menggunakan URL public utama yang konsisten dengan route hash saat ini. Dokumentasi akan menandai bahwa migrasi ke `BrowserRouter` adalah langkah lanjutan paling penting bila target SEO organik ingin dimaksimalkan di masa depan.

## File Impact

Kemungkinan file yang disentuh:

- `index.html`
- `src/main.tsx`
- `src/App.tsx`
- `src/BlogPage.tsx`
- `src/OpenSourcePage.tsx`
- `src/index.css` jika ada perbaikan kecil untuk accessibility/performance
- `robots.txt`
- `sitemap.xml`
- `docs/tasks/frontend/29-04-2026/semantic-html-seo-improvement/*`

Kemungkinan file baru yang ditambahkan:

- helper SEO di `src/` bila diperlukan

## Success Criteria

- Tiap route utama memiliki title, description, canonical, OG, Twitter, dan JSON-LD yang sesuai.
- Home route lebih relevan untuk keyword `kurob fullstack programmer cilegon`.
- Root memiliki `robots.txt` dan `sitemap.xml` yang valid untuk setup saat ini.
- Gambar dan elemen penting lebih ramah terhadap Core Web Vitals.
- Accessibility dasar membaik tanpa mengubah visual language secara signifikan.
- Dokumentasi lengkap tersedia di folder task yang diminta user.

## Risks and Trade-offs

- `HashRouter` tetap menjadi keterbatasan utama untuk SEO indexability dibanding SSR atau `BrowserRouter`.
- Metadata client-side pada SPA tetap lebih lemah dibanding prerender/SSR untuk crawler tertentu.
- Sitemap untuk hash routes hanya bisa menjadi baseline, bukan solusi ideal untuk seluruh route semantics.

## Recommendation Beyond This Task

Setelah task ini selesai, peningkatan SEO terbesar berikutnya adalah salah satu dari dua opsi:

1. Migrasi ke `BrowserRouter` dengan fallback static hosting yang benar.
2. Migrasi ke framework dengan prerender/SSR seperti Next.js atau React static generation pipeline.
