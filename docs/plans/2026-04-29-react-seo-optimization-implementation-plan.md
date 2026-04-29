# React SEO Optimization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Mengimplementasikan optimasi SEO teknis, konten, accessibility, dan dokumentasi untuk website React/Vite dengan fokus keyword `kurob fullstack programmer cilegon` tanpa mengubah `HashRouter`.

**Architecture:** Metadata akan dikelola per route di React menggunakan helper internal kecil yang mengubah head tags saat halaman aktif dirender. Root files seperti `robots.txt` dan `sitemap.xml` akan dirapikan di level project, sementara komponen route akan diperbaiki untuk semantic HTML, accessibility, dan performance dasar.

**Tech Stack:** React 18, TypeScript, Vite, React Router, Tailwind CSS

---

### Task 1: Audit route dan strategi metadata

**Files:**
- Modify: `src/main.tsx`
- Review: `src/App.tsx`
- Review: `src/BlogPage.tsx`
- Review: `src/OpenSourcePage.tsx`
- Review: `index.html`

**Step 1: Petakan route aktual dan kebutuhan metadata**

Catat route utama, keyword target, title pattern, description pattern, canonical pattern, OG image default, dan schema type untuk tiap halaman.

**Step 2: Tentukan model data helper SEO**

Definisikan struktur minimal seperti:

```ts
type SeoConfig = {
  title: string
  description: string
  canonicalPath: string
  ogType?: string
  schema?: Record<string, unknown> | Array<Record<string, unknown>>
}
```

**Step 3: Verifikasi constraint HashRouter**

Pastikan canonical dan sitemap memakai strategi yang konsisten dengan URL public berbasis hash.

### Task 2: Tambahkan helper SEO reusable

**Files:**
- Create: `src/seo.ts`
- Modify: `src/main.tsx`

**Step 1: Buat util untuk set/update meta tags**

Implementasikan helper kecil untuk membuat atau memperbarui:

```ts
function setMetaByName(name: string, content: string) {}
function setMetaByProperty(property: string, content: string) {}
function setCanonicalUrl(url: string) {}
function setStructuredData(data: Record<string, unknown> | Array<Record<string, unknown>>) {}
```

**Step 2: Buat hook `useSeo`**

Hook akan memanggil helper dalam `useEffect` dan mengatur `document.title`, description, canonical, OG, Twitter, dan JSON-LD.

**Step 3: Pastikan helper tidak duplikatif**

Gunakan selector yang stabil dan satu `script[type="application/ld+json"]` khusus yang bisa diupdate ulang.

### Task 3: Optimasi SEO home route untuk keyword target

**Files:**
- Modify: `src/App.tsx`

**Step 1: Terapkan `useSeo` pada home page**

Tambahkan metadata yang menargetkan keyword utama secara natural.

Contoh target:

```ts
title: 'Kurob - Fullstack Programmer Cilegon | Web Developer Freelance'
```

**Step 2: Tambahkan structured data `Person` dan `WebSite`**

Masukkan identitas Kurob, profesi, lokasi, URL utama, dan social profiles yang memang tersedia.

**Step 3: Rapikan hero copy dan heading hierarchy**

Pastikan hanya ada satu `h1`, lalu text pendukung dipindah ke paragraph/subheading yang lebih SEO-friendly.

**Step 4: Perbaiki image performance dasar**

Tambahkan `loading`, `decoding`, dan atribut lain yang relevan ke gambar non-kritis. Untuk hero image, hindari `lazy` bila itu LCP candidate.

**Step 5: Perbaiki semantics dan accessibility**

Tambahkan `aria-label` pada button/icon link yang perlu, serta pastikan struktur section jelas.

### Task 4: Optimasi metadata untuk blog dan open source routes

**Files:**
- Modify: `src/BlogPage.tsx`
- Modify: `src/OpenSourcePage.tsx`

**Step 1: Terapkan `useSeo` di blog route**

Tambahkan title, description, canonical, OG, Twitter, dan schema `Blog` atau `CollectionPage`.

**Step 2: Terapkan `useSeo` di open source route**

Tambahkan metadata yang relevan untuk showcase proyek open source.

**Step 3: Audit heading dan empty states**

Pastikan hierarchy heading tidak melompat dan copy empty state tetap deskriptif.

**Step 4: Tambahkan accessible names pada icon links**

Semua link sosial harus punya `aria-label` yang jelas.

### Task 5: Rapikan baseline head document

**Files:**
- Modify: `index.html`

**Step 1: Perbaiki metadata default**

Tambahkan fallback metadata di `index.html` untuk first paint dan non-JS baseline sebatas yang aman.

**Step 2: Tambahkan social defaults**

Set default OG/Twitter image dan site name bila tersedia.

**Step 3: Tambahkan canonical placeholder yang konsisten**

Jaga agar helper React dapat mengoverride nilai default per route.

### Task 6: Update robots dan sitemap

**Files:**
- Modify: `robots.txt`
- Create or Modify: `sitemap.xml`

**Step 1: Audit isi `robots.txt` saat ini**

Pastikan tidak ada directive yang bertentangan dengan indexing.

**Step 2: Tambahkan referensi sitemap**

Sertakan path sitemap public yang benar.

**Step 3: Buat `sitemap.xml` baseline**

Masukkan URL home dan URL hash-route yang dipilih sebagai canonical baseline sesuai constraint project.

### Task 7: Dokumentasi SEO task

**Files:**
- Create: `docs/tasks/frontend/29-04-2026/semantic-html-seo-improvement/README.md`
- Create: `docs/tasks/frontend/29-04-2026/semantic-html-seo-improvement/technical-seo-audit.md`
- Create: `docs/tasks/frontend/29-04-2026/semantic-html-seo-improvement/performance-analysis.md`
- Create: `docs/tasks/frontend/29-04-2026/semantic-html-seo-improvement/content-optimization.md`
- Create: `docs/tasks/frontend/29-04-2026/semantic-html-seo-improvement/accessibility-review.md`
- Create: `docs/tasks/frontend/29-04-2026/semantic-html-seo-improvement/implementation-notes.md`
- Create: `docs/tasks/frontend/29-04-2026/semantic-html-seo-improvement/before-after-comparison.md`

**Step 1: Tulis ringkasan audit awal**

Dokumentasikan kondisi sebelum perubahan dan target optimasi.

**Step 2: Tulis rincian technical SEO**

Bahas meta tags, canonical, social metadata, schema markup, robots, sitemap, dan constraint `HashRouter`.

**Step 3: Tulis analisis performance**

Fokus pada Core Web Vitals yang bisa dipengaruhi dari source code dan mana yang menjadi batasan hosting.

**Step 4: Tulis content dan accessibility review**

Dokumentasikan keyword intent, heading hierarchy, alt text, semantic HTML, dan keyboard/accessibility impact.

**Step 5: Tulis before/after comparison**

Bandingkan kondisi sebelum dan sesudah secara konkret berdasarkan implementasi yang benar-benar dilakukan.

### Task 8: Verifikasi implementasi

**Files:**
- Review seluruh file yang diubah

**Step 1: Jalankan build project**

Run: `npm run build`

Expected: build sukses tanpa error.

**Step 2: Audit hasil build secara cepat**

Pastikan output dist terbuat dan file root pendukung ikut tersalin bila workflow project memang menyalinnya.

**Step 3: Review perubahan akhir**

Periksa bahwa metadata, semantics, dan dokumentasi konsisten dengan scope task.
