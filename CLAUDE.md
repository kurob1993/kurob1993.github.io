# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Deskripsi Proyek

Website portfolio Next.js untuk Kurob, Full-Stack Developer dari Indonesia. Website ini menggunakan pendekatan content-driven dengan konten terpisah dalam file JSON, mendukung bilingual (EN/ID), dan saat ini dalam tahap redesign dari static HTML ke Next.js App Router.

## Perintah Development

```bash
npm run dev      # Start Next.js development server
npm run build    # Build untuk production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Arsitektur

### Next.js App Router (src/app/)
- `page.tsx` - Homepage
- `blog/page.tsx` - Halaman blog
- `projects/page.tsx` - Halaman projects
- `services/page.tsx` - Halaman services
- `experience/page.tsx` - Halaman experience/kimeline
- `contact/page.tsx` - Halaman kontak
- `layout.tsx` - Root layout dengan Header/Footer

### Content System (src/content/)
Konten disimpan dalam file JSON yang di-import secara dinamis:
- `projects.json` - Data proyek
- `blog.json` - Artikel blog
- `services.json` - Layanan yang ditawarkan
- `experience.json` - Pengalaman kerja/pendidikan

### State Management (src/store/)
Menggunakan Zustand dengan persist middleware untuk:
- `language` - Bahasa aktif (en/id), persist ke localStorage
- `activeProjectFilter` - Filter kategori proyek
- `activeBlogCategory` - Filter kategori blog

### Shared Utilities (src/lib/)
- `types.ts` - TypeScript interfaces: `Project`, `BlogPost`, `Service`, `Experience`, `BilingualContent`
- `content.ts` - Helper functions: `getText()` untuk bilingual content retrieval

### Components (src/components/)
- `Header.tsx`, `Footer.tsx` - Layout components
- `HeroSection.tsx` - Hero section homepage
- `ProjectCard.tsx`, `BlogCard.tsx` - Card components
- `TimelineItem.tsx` - Experience timeline
- `ContactForm.tsx` - Form kontak
- `LanguageSwitcher.tsx` - Bilingual toggle
- `PageTransition.tsx` - Framer Motion page transitions
- `ui/` - Reusable UI components: Button, Card, Badge, Input, Textarea

### Bilingual Content Pattern
Semua konten menggunakan interface `BilingualContent`:
```typescript
interface BilingualContent {
  en: string
  id: string
}
```

Gunakan helper `getText(obj, lang)` untuk mengambil teks sesuai bahasa.

### UI Library
- Tailwind CSS untuk styling
- Framer Motion untuk animations
- Zustand untuk state management
- React Hook Form untuk contact form
- Tabler Icons via @tabler/icons-react

## Catatan Penting

- **Bahasa**: Selalu jawab dalam Bahasa Indonesia. Technical terms dalam English boleh dipertahankan.
- **Git**: Jangan commit atau push ke git kecuali diminta secara eksplisit oleh user.
- **Old Site**: Root directory berisi static HTML version yang lama - fokus development di `src/` (Next.js version).
