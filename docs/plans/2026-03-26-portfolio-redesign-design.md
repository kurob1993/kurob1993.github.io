# Portfolio Redesign - Design Document

**Date:** 2026-03-26  
**Status:** Approved

## Overview

Redesain website portfolio Okuru.id dengan tech stack modern: Next.js (App Router), React, TypeScript, Tailwind CSS, Tabler Icons, dan Zustand untuk state management.

## Tech Stack

| Category | Choice | Rationale |
|----------|--------|-----------|
| Framework | Next.js (App Router) | SSR/SSG support, better SEO, built-in routing |
| State Management | Zustand | Lightweight, minimal boilerplate, clean API |
| Styling | Tailwind CSS | Utility-first, consistent design system |
| Icons | Tabler Icons | Modern, consistent stroke width, React-ready |
| Language | TypeScript | Type safety, better DX |
| i18n | EN/ID bilingual | Content flexibility |

## Visual Design

### Color Palette
- **Primary Background:** `#0F0F0F` (near black)
- **Secondary Background:** `#1A1A1A` (dark gray)
- **Accent Color:** `#F59E0B` (amber-500)
- **Text Primary:** `#FAFAFA` (gray-50)
- **Text Secondary:** `#A1A1AA` (gray-400)
- **Border:** `#27272A` (gray-800)

### Typography
- **Font Family:** Inter (Google Fonts) or system sans-serif
- **Headings:** Bold, tracking tight
- **Body:** Regular weight, comfortable line-height

### Design Principles
- Minimal Dark aesthetic
- Generous whitespace
- Clean typography hierarchy
- Subtle hover interactions (scale, opacity)
- Smooth page transitions

## Page Structure

### 1. Home (/)
- Hero section dengan:
  - Profile image
  - Name dan tagline
  - Short bio dengan experience years
  - CTA buttons (Contact, Download CV)
  - Social links (GitHub, LinkedIn, Instagram, etc.)

### 2. Projects (/projects)
- Grid layout dengan filter by technology
- Project cards dengan:
  - Thumbnail/image
  - Title dan description
  - Tech stack badges
  - Links (live demo, GitHub)
- Pagination atau infinite scroll

### 3. Blog (/blog)
- Article list dengan category filter
- Post cards dengan:
  - Title, excerpt
  - Date, read time
  - Category badge
- Pagination

### 4. Services (/services)
- Grid of service cards
- Each card:
  - Icon
  - Title
  - Description
  - Price range (optional)

### 5. Experience (/experience)
- Timeline layout
- Work history
- Education
- Certifications

### 6. Contact (/contact)
- Contact form (name, email, message)
- Social links
- Location info (optional)

## Content Architecture

### Data Structure
```typescript
// Bilingual content
interface BilingualContent {
  en: string;
  id: string;
}

// Project
interface Project {
  id: string;
  title: BilingualContent;
  description: BilingualContent;
  thumbnail: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

// Blog Post
interface BlogPost {
  slug: string;
  title: BilingualContent;
  excerpt: BilingualContent;
  content: BilingualContent;
  date: string;
  readTime: BilingualContent;
  category: BilingualContent;
  categorySlug: string;
  coverImage?: string;
}

// Service
interface Service {
  id: string;
  icon: string; // Tabler icon name
  title: BilingualContent;
  description: BilingualContent;
  priceRange?: BilingualContent;
}

// Experience
interface Experience {
  id: string;
  type: 'work' | 'education' | 'certification';
  title: BilingualContent;
  company: BilingualContent;
  location?: BilingualContent;
  startDate: string;
  endDate?: string;
  description?: BilingualContent;
  verified?: boolean;
}
```

### Content Loading Strategy
- JSON files di `/content` directory
- Loaded via `lib/content.ts` utilities
- Cached with Next.js caching
- Language preference from URL (`/en/...` atau `/id/...`) atau cookie

## State Management (Zustand)

```typescript
interface AppStore {
  language: 'en' | 'id';
  setLanguage: (lang: 'en' | 'id') => void;
  
  // Project filters
  activeProjectFilter: string | null;
  setProjectFilter: (filter: string | null) => void;
  
  // Blog filters
  activeCategory: string | null;
  setCategory: (category: string | null) => void;
}
```

## Routing Structure

```
app/
├── [lang]/
│   ├── page.tsx              # Home
│   ├── projects/
│   │   └── page.tsx          # Projects list
│   ├── blog/
│   │   ├── page.tsx          # Blog list
│   │   └── [slug]/
│   │       └── page.tsx      # Blog detail
│   ├── services/
│   │   └── page.tsx          # Services
│   ├── experience/
│   │   └── page.tsx          # Experience timeline
│   └── contact/
│       └── page.tsx          # Contact
├── layout.tsx
└── globals.css
```

## Component Inventory

### Layout Components
- `Header` - Navigation, language switcher
- `Footer` - Copyright, social links
- `Container` - Max-width wrapper
- `PageTransition` - Animated page transitions

### UI Components
- `Button` - Primary, secondary, ghost variants
- `Card` - Glassmorphism atau solid card
- `Badge` - Category, tech badges
- `Input` - Text, email, textarea
- `Icon` - Tabler icon wrapper
- `Avatar` - Profile image
- `Skeleton` - Loading placeholder

### Feature Components
- `ProjectCard` - Project grid item
- `ProjectFilter` - Technology filter tabs
- `BlogCard` - Blog list item
- `CategoryFilter` - Blog category tabs
- `Timeline` - Experience timeline
- `TimelineItem` - Single timeline entry
- `ServiceCard` - Service offering card
- `ContactForm` - Contact form with validation
- `SocialLinks` - Social media links

## Open Questions

1. **Backend integration** - Backend akan ditambahkan nanti. Untuk sekarang, semua content dari JSON files. Perlu dipertimbangkan: API route pattern untuk future backend?

2. **Authentication** - Apakah perlu admin panel untuk manage content? Atau tetap JSON files?

3. **Image hosting** - Local images atau external CDN (Cloudinary, imgix)?

4. **Blog content** - Markdown files atau tetap JSON? Bagaimana dengan rich content (code blocks, images)?

## Next Steps

1. Setup Next.js project dengan TypeScript
2. Configure Tailwind CSS dengan custom theme
3. Install Tabler Icons dan Zustand
4. Create base layout components
5. Build halaman satu per satu
6. Add animations dan transitions
7. Test multilingual routing
8. Deploy dan monitor

## Approval

Desain ini disetujui pada 2026-03-26. Lanjut ke implementation planning.
