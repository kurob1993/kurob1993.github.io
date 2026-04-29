# SEO Audit Overview

## Tujuan

Task ini mengoptimalkan SEO teknis, konten, performance dasar, dan accessibility untuk website React/Vite milik Kurob dengan fokus utama pada keyword `kurob fullstack programmer cilegon`.

## Scope

- Route utama home (`/`)
- Route blog (`/#/blog`)
- Route open source (`/#/open-source`)
- Baseline file SEO root: `index.html`, `robots.txt`, `sitemap.xml`
- Dokumentasi implementasi dan trade-off teknis

## Ringkasan Hasil

- Menambahkan SEO helper reusable di React untuk metadata per route.
- Menambahkan title, meta description, canonical, Open Graph, Twitter Card, dan JSON-LD.
- Mengoptimalkan home page untuk keyword target secara natural.
- Menambahkan `robots.txt` dan `sitemap.xml` yang konsisten dengan setup saat ini.
- Memperbaiki accessibility dasar seperti ARIA labels dan heading hierarchy.
- Menambahkan optimasi ringan untuk gambar agar lebih ramah Core Web Vitals.

## Catatan Penting

Project masih menggunakan `HashRouter`. Ini berarti perbaikan SEO saat ini bersifat baseline dan pragmatis, tetapi belum sekuat arsitektur dengan path-based routing atau prerender/SSR.

## File Utama yang Diubah

- `src/seo.ts`
- `src/App.tsx`
- `src/BlogPage.tsx`
- `src/OpenSourcePage.tsx`
- `index.html`
- `robots.txt`
- `sitemap.xml`
- `scripts/deploy.mjs`
