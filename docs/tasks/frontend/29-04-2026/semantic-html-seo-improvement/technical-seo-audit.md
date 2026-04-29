# Technical SEO Audit

## Kondisi Sebelum Implementasi

- `index.html` hanya memiliki title dan description dasar.
- Tidak ada metadata per route di source React.
- Tidak ada canonical URL yang konsisten.
- Tidak ada Open Graph dan Twitter Card yang lengkap.
- Tidak ada JSON-LD schema markup yang aktif di aplikasi React.
- `robots.txt` hanya berisi allow dasar tanpa referensi sitemap.
- `sitemap.xml` belum tersedia.

## Implementasi Teknis

## 1. Per-route metadata management

Ditambahkan helper `useSeo` pada `src/seo.ts` untuk mengatur:

- `document.title`
- `meta description`
- `meta keywords`
- `meta robots`
- `meta author`
- Open Graph tags
- Twitter Card tags
- canonical URL
- JSON-LD structured data

Pendekatan ini dipilih karena aplikasi adalah SPA React dengan Vite dan metadata harus mengikuti route aktif.

## 2. Home page metadata

Home page sekarang menargetkan keyword utama:

- Title: `Kurob - Fullstack Programmer Cilegon | Web Developer Freelance`
- Description: berfokus pada fullstack programming, Laravel, React, automation, dan DevOps.
- Canonical: `https://kurob1993.github.io/`

## 3. Blog route metadata

Blog route memiliki metadata turunan yang fokus pada insight web development, Laravel, React, JavaScript, dan DevOps.

Canonical yang dipakai:

- `https://kurob1993.github.io/#/blog`

## 4. Open source route metadata

Open source route memiliki metadata showcase portfolio dan canonical:

- `https://kurob1993.github.io/#/open-source`

## 5. Structured data

Structured data yang ditambahkan:

- Home: `Person` dan `WebSite`
- Blog: `Blog`
- Open source: `CollectionPage`

Schema hanya memuat informasi yang benar-benar relevan dengan brand dan isi halaman.

## 6. Robots dan sitemap

`robots.txt` diperbarui dengan referensi:

- `Sitemap: https://kurob1993.github.io/sitemap.xml`

`sitemap.xml` dibuat untuk route utama yang tersedia saat ini.

## 7. Deployment consistency

`scripts/deploy.mjs` diperbarui agar `robots.txt` dan `sitemap.xml` ikut tersalin ke output deploy.

## Keterbatasan Teknis

- Karena masih `HashRouter`, canonical dan sitemap hanya dapat mengikuti strategi URL berbasis hash.
- Metadata tetap dirender di client-side, sehingga hasil SEO tidak sekuat SSR atau prerender.
- Sitemap untuk hash route bersifat baseline, bukan solusi ideal untuk deep indexing.
