# Implementation Notes

## Keputusan Teknis Utama

## 1. Tidak memakai library SEO tambahan

Dipilih helper internal `src/seo.ts` daripada menambah dependency seperti React Helmet karena:

- perubahan lebih kecil,
- tidak menambah bundle/dependency,
- kebutuhan metadata saat ini masih sederhana.

## 2. Tetap memakai HashRouter

Keputusan ini sesuai approval user untuk menjaga risiko deploy tetap rendah. Dampaknya:

- canonical mengikuti hash route,
- sitemap mengikuti hash route,
- kualitas SEO tetap terbatas dibanding path-based routing.

## 3. Metadata default tetap ada di `index.html`

Walau metadata utama dikelola di React, baseline default di `index.html` tetap penting untuk first HTML response dan fallback non-interaktif.

## 4. Structured data dibuat minimal dan valid

Schema dipilih berdasarkan konteks halaman, tanpa menambahkan entity yang tidak jelas referensinya.

## Trade-off

## 1. Client-side SEO vs SSR

Solusi sekarang cukup baik untuk baseline SEO, tetapi tidak akan menyamai kualitas prerender atau SSR untuk crawler yang kurang optimal mengeksekusi JavaScript.

## 2. Sitemap hash route

Secara praktis masih lebih baik daripada tidak ada sitemap sama sekali, tetapi tetap bukan bentuk ideal dari perspektif indexing modern.

## 3. Konten bilingual

Saat ini `lang` mengikuti state route/page yang aktif, tetapi belum ada `hreflang` terpisah per URL karena site belum memakai path locale yang berbeda.

## Next Technical Step

Langkah teknis dengan dampak SEO terbesar setelah task ini adalah migrasi dari `HashRouter` ke `BrowserRouter` atau ke arsitektur prerender/SSR.
