# Accessibility Review

## Tujuan

Meningkatkan accessibility yang berdampak langsung atau tidak langsung pada SEO, terutama semantic clarity, keyboard usability, dan accessible naming.

## Temuan Sebelum Implementasi

- Link icon-only sosial belum memiliki accessible name.
- Navigasi belum punya `aria-label` yang eksplisit.
- Home page berisiko memiliki heading hierarchy yang kurang rapi setelah optimasi responsif bila tidak diawasi.
- Ada penggunaan anchor yang membungkus button pada CTA WhatsApp, yang kurang ideal secara semantic.

## Perbaikan yang Dilakukan

## 1. Navigasi diberi label

Setiap kelompok navigasi utama diberi `aria-label` yang jelas untuk desktop dan mobile.

## 2. Social links diberi accessible name

Link ke LinkedIn, Threads, dan Instagram sekarang memiliki `aria-label` deskriptif.

## 3. Heading hierarchy dirapikan

Home page dipastikan hanya memiliki satu `h1` efektif dalam markup akhir, sehingga struktur heading lebih aman untuk screen reader dan crawler.

## 4. CTA WhatsApp diperbaiki

Struktur anchor + button diganti menjadi anchor yang langsung berperilaku sebagai CTA, sehingga semantic HTML lebih baik.

## 5. Alt text diperjelas

Hero image sekarang memakai alt text yang lebih deskriptif: `Kurob, fullstack programmer Cilegon`.

## Dampak terhadap SEO

- Semantic clarity lebih baik untuk crawler.
- Accessible name membantu interpretasi elemen interaktif.
- Struktur heading yang lebih bersih mendukung pemahaman topik halaman.

## Catatan

Audit WCAG 2.1 AA penuh belum mencakup pengujian manual contrast, focus visibility, dan screen reader traversal menyeluruh. Task ini berfokus pada perbaikan source-level yang paling relevan dengan SEO.
