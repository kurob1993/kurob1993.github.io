# Before After Comparison

## Technical SEO

### Sebelum

- Title dan description hanya ada di `index.html`.
- Tidak ada canonical per route.
- Tidak ada OG/Twitter metadata lengkap.
- Tidak ada JSON-LD.
- Tidak ada sitemap.
- `robots.txt` belum menunjuk ke sitemap.

### Sesudah

- Metadata dikelola per route melalui `useSeo`.
- Canonical tersedia untuk home, blog, dan open source.
- OG/Twitter lengkap tersedia.
- JSON-LD tersedia untuk route utama.
- `sitemap.xml` tersedia.
- `robots.txt` menunjuk ke sitemap.

## Content SEO

### Sebelum

- Home page belum secara eksplisit menargetkan keyword `kurob fullstack programmer cilegon`.
- Copy utama masih generik.

### Sesudah

- Home page menargetkan keyword utama secara natural.
- Supporting copy memperjelas positioning jasa, lokasi, dan skill inti.

## Accessibility

### Sebelum

- Beberapa icon link belum memiliki accessible name.
- Navigasi belum dilabeli eksplisit.
- CTA WhatsApp memakai anchor yang membungkus button.

### Sesudah

- Social links memiliki `aria-label`.
- Navigasi memiliki `aria-label`.
- CTA WhatsApp memakai struktur anchor yang lebih semantic.

## Performance Baseline

### Sebelum

- Lazy loading dan decoding gambar belum konsisten.
- Hero image belum ditandai secara eksplisit sebagai prioritas visual utama.

### Sesudah

- Gambar non-kritis memakai `loading="lazy"` dan `decoding="async"`.
- Hero image memakai `fetchPriority="high"`.

## Skor Praktis

Tidak ada angka Lighthouse formal yang dijalankan dalam task ini, jadi perbandingan dibuat secara implementasi aktual, bukan angka sintetis. Untuk angka yang lebih objektif, langkah berikutnya adalah menjalankan audit Lighthouse setelah deploy preview.
