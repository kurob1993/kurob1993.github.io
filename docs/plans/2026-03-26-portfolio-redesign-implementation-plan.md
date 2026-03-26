# Portfolio Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redeploy portfolio website dengan Next.js App Router, Zustand, Tailwind CSS, dan Tabler Icons dengan desain Minimal Dark dan aesthetic modern.

**Architecture:** Next.js 14+ App Router dengan server components untuk content, client components untuk interactivity. Zustand untuk global state (language preference, filters). Tailwind CSS dengan custom theme untuk styling. Content dari JSON files dengan bilingual support EN/ID.

**Tech Stack:** Next.js 14 (App Router), React 18, TypeScript, Zustand, Tailwind CSS, Tabler Icons, React Hook Form

---

## Project Setup

### Task 1: Initialize Next.js Project

**Files:**
- Create: `.env.example`
- Create: `next.config.js`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`

**Step 1: Buat project structure**

```bash
mkdir -p src/app src/components src/lib src/store src/content
```

**Step 2: Buat next.config.js**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig
```

**Step 3: Buat tsconfig.json**

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Step 4: Buat tailwind.config.ts**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F0F0F',
        'background-secondary': '#1A1A1A',
        accent: '#F59E0B',
        'accent-hover': '#D97706',
        border: '#27272A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
```

**Step 5: Buat src/app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply bg-background text-gray-50 antialiased;
  }
}

@layer components {
  .btn-primary {
    @apply px-6 py-3 bg-accent text-background font-semibold rounded-lg 
           hover:bg-accent-hover transition-colors duration-200;
  }
  
  .btn-secondary {
    @apply px-6 py-3 border border-gray-700 text-gray-200 font-semibold 
           rounded-lg hover:border-gray-500 hover:bg-gray-800/50 transition-colors duration-200;
  }
  
  .card {
    @apply bg-background-secondary border border-border rounded-xl p-6 
           hover:border-gray-600 transition-colors duration-200;
  }
}
```

**Step 6: Buat src/app/layout.tsx**

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Okuru.id - Full-Stack Developer',
  description: 'Portfolio Kurob - Full-Stack Developer dari Indonesia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

---

## Zustand Store Setup

### Task 2: Create Zustand Store

**Files:**
- Create: `src/store/index.ts`

**Step 1: Buat Zustand store**

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Language = 'en' | 'id'

interface AppState {
  language: Language
  setLanguage: (lang: Language) => void
  
  activeProjectFilter: string | null
  setProjectFilter: (filter: string | null) => void
  
  activeBlogCategory: string | null
  setBlogCategory: (category: string | null) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
      
      activeProjectFilter: null,
      setProjectFilter: (filter) => set({ activeProjectFilter: filter }),
      
      activeBlogCategory: null,
      setBlogCategory: (category) => set({ activeBlogCategory: category }),
    }),
    {
      name: 'okuru-storage',
    }
  )
)
```

---

## Content & Types

### Task 3: Define TypeScript Types

**Files:**
- Create: `src/lib/types.ts`

**Step 1: Buat types**

```typescript
export interface BilingualContent {
  en: string
  id: string
}

export interface Project {
  id: string
  title: BilingualContent
  description: BilingualContent
  thumbnail: string
  technologies: string[]
  demoUrl?: string
  githubUrl?: string
  featured: boolean
}

export interface BlogPost {
  slug: string
  title: BilingualContent
  excerpt: BilingualContent
  date: string
  readTime: BilingualContent
  category: BilingualContent
  categorySlug: string
  coverImage?: string
}

export interface Service {
  id: string
  icon: string
  title: BilingualContent
  description: BilingualContent
  priceRange?: BilingualContent
}

export interface Experience {
  id: string
  type: 'work' | 'education' | 'certification'
  title: BilingualContent
  company: BilingualContent
  location?: BilingualContent
  startDate: string
  endDate?: string
  description?: BilingualContent
  verified?: boolean
}
```

### Task 4: Create Content Loader

**Files:**
- Create: `src/lib/content.ts`

**Step 1: Buat content loader**

```typescript
import { Project, BlogPost, Service, Experience, BilingualContent } from './types'

export function getText(obj: BilingualContent | string | undefined, lang: 'en' | 'id'): string {
  if (!obj) return ''
  if (typeof obj === 'string') return obj
  return obj[lang] || obj.en || ''
}

export async function getProjects(): Promise<Project[]> {
  const data = await import('@/content/projects.json')
  return data.default || data
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const data = await import('@/content/blog.json')
  return data.default || data
}

export async function getServices(): Promise<Service[]> {
  const data = await import('@/content/services.json')
  return data.default || data
}

export async function getExperiences(): Promise<Experience[]> {
  const data = await import('@/content/experience.json')
  return data.default || data
}
```

---

## UI Components

### Task 5: Create Button Component

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/index.ts`

**Step 1: Buat Button component**

```tsx
import { forwardRef, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = 'font-semibold rounded-lg transition-colors duration-200 inline-flex items-center justify-center'
    
    const variants = {
      primary: 'bg-accent text-background hover:bg-accent-hover',
      secondary: 'border border-gray-700 text-gray-200 hover:border-gray-500 hover:bg-gray-800/50',
      ghost: 'text-gray-400 hover:text-white hover:bg-gray-800/50',
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
    }
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }
```

### Task 6: Create Card Component

**Files:**
- Create: `src/components/ui/Card.tsx`

**Step 1: Buat Card component**

```tsx
import { HTMLAttributes, forwardRef } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', hover = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          bg-background-secondary border border-border rounded-xl p-6
          ${hover ? 'hover:border-gray-600 transition-colors duration-200' : ''}
          ${className}
        `}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

export { Card }
```

### Task 7: Create Badge Component

**Files:**
- Create: `src/components/ui/Badge.tsx`

**Step 1: Buat Badge component**

```tsx
import { HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'outline'
}

export function Badge({ 
  className = '', 
  variant = 'default',
  ...props 
}: BadgeProps) {
  const variants = {
    default: 'bg-gray-800 text-gray-200',
    accent: 'bg-accent/20 text-accent',
    outline: 'border border-gray-700 text-gray-400',
  }
  
  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
        ${variants[variant]} ${className}
      `}
      {...props}
    />
  )
}
```

### Task 8: Create Language Switcher Component

**Files:**
- Create: `src/components/LanguageSwitcher.tsx`

**Step 1: Buat LanguageSwitcher component**

```tsx
'use client'

import { useAppStore } from '@/store'
import { usePathname, useRouter } from 'next/navigation'

export function LanguageSwitcher() {
  const { language, setLanguage } = useAppStore()
  const pathname = usePathname()
  const router = useRouter()
  
  const toggleLanguage = (lang: 'en' | 'id') => {
    setLanguage(lang)
    const newPathname = pathname.replace(`/${language}`, `/${lang}`)
    router.push(newPathname)
  }
  
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => toggleLanguage('en')}
        className={`px-2 py-1 text-sm rounded ${
          language === 'en' ? 'bg-accent text-background' : 'text-gray-400 hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => toggleLanguage('id')}
        className={`px-2 py-1 text-sm rounded ${
          language === 'id' ? 'bg-accent text-background' : 'text-gray-400 hover:text-white'
        }`}
      >
        ID
      </button>
    </div>
  )
}
```

---

## Layout Components

### Task 9: Create Header Component

**Files:**
- Create: `src/components/Header.tsx`

**Step 1: Buat Header component**

```tsx
'use client'

import Link from 'next/link'
import { useAppStore } from '@/store'
import { LanguageSwitcher } from './LanguageSwitcher'
import { IconMenu2, IconX } from '@tabler/icons-react'
import { useState } from 'react'

const navItems = [
  { href: '/projects', label: { en: 'Projects', id: 'Proyek' } },
  { href: '/blog', label: { en: 'Blog', id: 'Blog' } },
  { href: '/services', label: { en: 'Services', id: 'Layanan' } },
  { href: '/experience', label: { en: 'Experience', id: 'Pengalaman' } },
  { href: '/contact', label: { en: 'Contact', id: 'Kontak' } },
]

export function Header() {
  const { language } = useAppStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-white">
            Okuru.id
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {item.label[language]}
              </Link>
            ))}
            <LanguageSwitcher />
          </nav>
          
          <button
            className="md:hidden text-gray-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-gray-400 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label[language]}
              </Link>
            ))}
            <div className="pt-4">
              <LanguageSwitcher />
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
```

### Task 10: Create Footer Component

**Files:**
- Create: `src/components/Footer.tsx`

**Step 1: Buat Footer component**

```tsx
'use client'

import { useAppStore } from '@/store'
import { IconBrandGithub, IconBrandLinkedin, IconBrandInstagram } from '@tabler/icons-react'
import Link from 'next/link'

const socialLinks = [
  { icon: IconBrandGithub, href: 'https://github.com/kurob1993', label: 'GitHub' },
  { icon: IconBrandLinkedin, href: 'https://linkedin.com/in/kurob1993', label: 'LinkedIn' },
  { icon: IconBrandInstagram, href: 'https://instagram.com/kurob1993', label: 'Instagram' },
]

export function Footer() {
  const { language } = useAppStore()
  const currentYear = new Date().getFullYear()
  
  const copyrightText = language === 'en' 
    ? `© ${currentYear} Okuru.id. All Rights Reserved.`
    : `© ${currentYear} Okuru.id. Hak Cipta Dilindungi.`
  
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">{copyrightText}</p>
          
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
```

---

## Page Layout

### Task 11: Create App Layout

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Update layout.tsx**

```tsx
import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Okuru.id - Full-Stack Developer',
  description: 'Portfolio Kurob - Full-Stack Developer dari Indonesia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

---

## Home Page

### Task 12: Create Hero Section

**Files:**
- Create: `src/components/HeroSection.tsx`

**Step 1: Buat HeroSection component**

```tsx
'use client'

import { useAppStore } from '@/store'
import { getText } from '@/lib/content'
import { Button } from '@/components/ui/Button'
import { IconDownload, IconMail } from '@tabler/icons-react'
import Link from 'next/link'

interface HeroContent {
  name: string
  tagline: { en: string; id: string }
  bio: { en: string; id: string }
  cta: { contact: { en: string; id: string }; cv: { en: string; id: string } }
  socialLinks: { platform: string; url: string; icon: string }[]
}

const heroContent: HeroContent = {
  name: 'Kurob',
  tagline: {
    en: 'Full-Stack Developer',
    id: 'Full-Stack Developer',
  },
  bio: {
    en: 'I build exceptional digital experiences with 8+ years of experience in web development. Specializing in Laravel, React, and modern JavaScript ecosystem.',
    id: 'Saya membangun pengalaman digital dengan 8+ tahun pengalaman dalam pengembangan web. Berspesialisasi dalam Laravel, React, dan ekosistem JavaScript modern.',
  },
  cta: {
    contact: { en: 'Contact Me', id: 'Hubungi Saya' },
    cv: { en: 'Download CV', id: 'Unduh CV' },
  },
  socialLinks: [
    { platform: 'github', url: 'https://github.com/kurob1993', icon: 'IconBrandGithub' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/kurob1993', icon: 'IconBrandLinkedin' },
    { platform: 'instagram', url: 'https://instagram.com/kurob1993', icon: 'IconBrandInstagram' },
  ],
}

export function HeroSection() {
  const { language } = useAppStore()
  
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-24">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-accent to-orange-600 p-1">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
              <span className="text-4xl font-bold text-accent">K</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {heroContent.name}
        </h1>
        
        <p className="text-xl md:text-2xl text-accent font-medium mb-6">
          {heroContent.tagline[language]}
        </p>
        
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          {heroContent.bio[language]}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact">
            <Button size="lg">
              <IconMail size={20} className="mr-2" />
              {heroContent.cta.contact[language]}
            </Button>
          </Link>
          <a href="/cv.pdf" target="_blank">
            <Button variant="secondary" size="lg">
              <IconDownload size={20} className="mr-2" />
              {heroContent.cta.cv[language]}
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
```

### Task 13: Create Home Page

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Update home page**

```tsx
import { HeroSection } from '@/components/HeroSection'

export default function HomePage() {
  return <HeroSection />
}
```

---

## Projects Page

### Task 14: Create Project Card Component

**Files:**
- Create: `src/components/ProjectCard.tsx`

**Step 1: Buat ProjectCard component**

```tsx
'use client'

import { useAppStore } from '@/store'
import { getText } from '@/lib/content'
import { Project } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { IconExternalLink, IconBrandGithub } from '@tabler/icons-react'
import Link from 'next/link'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { language } = useAppStore()
  
  return (
    <Card className="group h-full flex flex-col">
      <div className="aspect-video bg-gray-800 rounded-lg mb-4 overflow-hidden">
        <img
          src={project.thumbnail}
          alt={getText(project.title, language)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">
        {getText(project.title, language)}
      </h3>
      
      <p className="text-gray-400 flex-grow mb-4">
        {getText(project.description, language)}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.slice(0, 4).map((tech) => (
          <Badge key={tech} variant="outline">
            {tech}
          </Badge>
        ))}
      </div>
      
      <div className="flex items-center gap-4 pt-4 border-t border-border">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-accent transition-colors"
          >
            <IconExternalLink size={20} />
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-accent transition-colors"
          >
            <IconBrandGithub size={20} />
          </a>
        )}
      </div>
    </Card>
  )
}
```

### Task 15: Create Projects Page

**Files:**
- Create: `src/app/projects/page.tsx`

**Step 1: Buat projects page**

```tsx
'use client'

import { useAppStore } from '@/store'
import { getText } from '@/lib/content'
import { ProjectCard } from '@/components/ProjectCard'
import { Badge } from '@/components/ui/Badge'
import { projects } from '@/content/projects'

export default function ProjectsPage() {
  const { language, activeProjectFilter, setProjectFilter } = useAppStore()
  
  const title = language === 'en' ? 'Projects' : 'Proyek'
  const subtitle = language === 'en' 
    ? 'A collection of projects I have worked on'
    : 'Kumpulan proyek yang telah saya kerjakan'
  
  const allTechnologies = [...new Set(projects.flatMap((p) => p.technologies))]
  
  const filteredProjects = activeProjectFilter
    ? projects.filter((p) => p.technologies.includes(activeProjectFilter))
    : projects
  
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
          <p className="text-gray-400">{subtitle}</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Badge
            variant={activeProjectFilter === null ? 'accent' : 'outline'}
            className="cursor-pointer"
            onClick={() => setProjectFilter(null)}
          >
            {language === 'en' ? 'All' : 'Semua'}
          </Badge>
          {allTechnologies.map((tech) => (
            <Badge
              key={tech}
              variant={activeProjectFilter === tech ? 'accent' : 'outline'}
              className="cursor-pointer"
              onClick={() => setProjectFilter(tech)}
            >
              {tech}
            </Badge>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Blog Page

### Task 16: Create Blog Card Component

**Files:**
- Create: `src/components/BlogCard.tsx`

**Step 1: Buat BlogCard component**

```tsx
'use client'

import { useAppStore } from '@/store'
import { getText } from '@/lib/content'
import { BlogPost } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const { language } = useAppStore()
  
  const formattedDate = new Date(post.date).toLocaleDateString(
    language === 'en' ? 'en-US' : 'id-ID',
    { year: 'numeric', month: 'short', day: 'numeric' }
  )
  
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="h-full group cursor-pointer">
        {post.coverImage && (
          <div className="aspect-video bg-gray-800 rounded-lg mb-4 overflow-hidden">
            <img
              src={post.coverImage}
              alt={getText(post.title, language)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <Badge variant="accent" className="mb-3">
          {getText(post.category, language)}
        </Badge>
        
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-accent transition-colors">
          {getText(post.title, language)}
        </h3>
        
        <p className="text-gray-400 flex-grow mb-4 line-clamp-3">
          {getText(post.excerpt, language)}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-border">
          <span>{formattedDate}</span>
          <span>{getText(post.readTime, language)}</span>
        </div>
      </Card>
    </Link>
  )
}
```

### Task 17: Create Blog Page

**Files:**
- Create: `src/app/blog/page.tsx`

**Step 1: Buat blog page**

```tsx
'use client'

import { useAppStore } from '@/store'
import { BlogCard } from '@/components/BlogCard'
import { Badge } from '@/components/ui/Badge'
import { blogPosts } from '@/content/blog'
import { useMemo } from 'react'

export default function BlogPage() {
  const { language, activeBlogCategory, setBlogCategory } = useAppStore()
  
  const title = language === 'en' ? 'Blog' : 'Blog'
  const subtitle = language === 'en'
    ? 'Thoughts, tutorials, and insights'
    : 'Pemikiran, tutorial, dan wawasan'
  
  const categories = useMemo(() => {
    const cats = [...new Set(blogPosts.map((p) => p.categorySlug))]
    return ['all', ...cats]
  }, [])
  
  const filteredPosts = activeBlogCategory
    ? blogPosts.filter((p) => p.categorySlug === activeBlogCategory)
    : blogPosts
  
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
          <p className="text-gray-400">{subtitle}</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={activeBlogCategory === cat || (cat === 'all' && !activeBlogCategory) ? 'accent' : 'outline'}
              className="cursor-pointer"
              onClick={() => setBlogCategory(cat === 'all' ? null : cat)}
            >
              {cat === 'all' 
                ? (language === 'en' ? 'All' : 'Semua')
                : cat.charAt(0).toUpperCase() + cat.slice(1)
              }
            </Badge>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Services Page

### Task 18: Create Services Page

**Files:**
- Create: `src/app/services/page.tsx`
- Create: `src/content/services.json`

**Step 1: Buat services page**

```tsx
'use client'

import { useAppStore } from '@/store'
import { getText } from '@/lib/content'
import { Card } from '@/components/ui/Card'
import { services } from '@/content/services'
import * as Icons from '@tabler/icons-react'

export default function ServicesPage() {
  const { language } = useAppStore()
  
  const title = language === 'en' ? 'Services' : 'Layanan'
  const subtitle = language === 'en'
    ? 'What I can do for you'
    : 'Apa yang bisa saya lakukan untuk Anda'
  
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
          <p className="text-gray-400">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComponent = (Icons as any)[service.icon]
            
            return (
              <Card key={service.id} className="text-center">
                {IconComponent && (
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 text-accent mb-4">
                    <IconComponent size={32} />
                  </div>
                )}
                
                <h3 className="text-xl font-semibold text-white mb-2">
                  {getText(service.title, language)}
                </h3>
                
                <p className="text-gray-400 mb-4">
                  {getText(service.description, language)}
                </p>
                
                {service.priceRange && (
                  <p className="text-accent font-medium">
                    {getText(service.priceRange, language)}
                  </p>
                )}
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

---

## Experience Page

### Task 19: Create Timeline Components

**Files:**
- Create: `src/components/Timeline.tsx`
- Create: `src/components/TimelineItem.tsx`

**Step 1: Buat TimelineItem component**

```tsx
'use client'

import { useAppStore } from '@/store'
import { getText } from '@/lib/content'
import { Experience } from '@/lib/types'
import { IconCheck } from '@tabler/icons-react'

interface TimelineItemProps {
  experience: Experience
  isLast?: boolean
}

export function TimelineItem({ experience, isLast = false }: TimelineItemProps) {
  const { language } = useAppStore()
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(language === 'en' ? 'en-US' : 'id-ID', {
      year: 'numeric',
      month: 'short',
    })
  }
  
  return (
    <div className="relative pl-8 pb-8">
      {!isLast && (
        <div className="absolute left-3 top-3 w-px h-full bg-border" />
      )}
      
      <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-background-secondary border-2 border-accent flex items-center justify-center">
        {experience.verified && <IconCheck size={12} className="text-accent" />}
      </div>
      
      <div className="bg-background-secondary border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs uppercase tracking-wider text-accent">
            {experience.type}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-1">
          {getText(experience.title, language)}
        </h3>
        
        <p className="text-gray-400 mb-2">
          {getText(experience.company, language)}
        </p>
        
        {experience.location && (
          <p className="text-gray-500 text-sm mb-2">
            {getText(experience.location, language)}
          </p>
        )}
        
        <p className="text-gray-500 text-sm mb-4">
          {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : (language === 'en' ? 'Present' : 'Sekarang')}
        </p>
        
        {experience.description && (
          <p className="text-gray-400">
            {getText(experience.description, language)}
          </p>
        )}
      </div>
    </div>
  )
}
```

### Task 20: Create Experience Page

**Files:**
- Create: `src/app/experience/page.tsx`
- Create: `src/content/experience.json`

**Step 1: Buat experience page**

```tsx
import { TimelineItem } from '@/components/TimelineItem'
import { experiences } from '@/content/experience'

export default function ExperiencePage() {
  const title = 'Experience'
  const subtitle = 'My professional journey'
  
  const sortedExperiences = [...experiences].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  )
  
  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
          <p className="text-gray-400">{subtitle}</p>
        </div>
        
        <div className="relative">
          {sortedExperiences.map((exp, index) => (
            <TimelineItem
              key={exp.id}
              experience={exp}
              isLast={index === sortedExperiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Contact Page

### Task 21: Create Contact Form

**Files:**
- Create: `src/components/ContactForm.tsx`

**Step 1: Buat ContactForm component**

```tsx
'use client'

import { useAppStore } from '@/store'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { useForm } from 'react-hook-form'

interface ContactFormData {
  name: string
  email: string
  message: string
}

export function ContactForm() {
  const { language } = useAppStore()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>()
  
  const onSubmit = async (data: ContactFormData) => {
    console.log('Form submitted:', data)
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Input
          {...register('name', { required: true })}
          placeholder={language === 'en' ? 'Your Name' : 'Nama Anda'}
          error={errors.name?.message}
        />
      </div>
      
      <div>
        <Input
          {...register('email', { 
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
          })}
          type="email"
          placeholder={language === 'en' ? 'Your Email' : 'Email Anda'}
          error={errors.email?.message}
        />
      </div>
      
      <div>
        <Textarea
          {...register('message', { required: true, minLength: 10 })}
          rows={5}
          placeholder={language === 'en' ? 'Your Message' : 'Pesan Anda'}
          error={errors.message?.message}
        />
      </div>
      
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting 
          ? (language === 'en' ? 'Sending...' : 'Mengirim...')
          : (language === 'en' ? 'Send Message' : 'Kirim Pesan')
        }
      </Button>
    </form>
  )
}
```

### Task 22: Create Input/Textarea Components

**Files:**
- Create: `src/components/ui/Input.tsx`
- Create: `src/components/ui/Textarea.tsx`

**Step 1: Buat Input component**

```tsx
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`
          w-full px-4 py-3 bg-background-secondary border rounded-lg
          text-white placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
          transition-colors duration-200
          ${error ? 'border-red-500' : 'border-border hover:border-gray-600'}
          ${className}
        `}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }
```

**Step 2: Buat Textarea component**

```tsx
import { TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`
          w-full px-4 py-3 bg-background-secondary border rounded-lg
          text-white placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
          transition-colors duration-200 resize-none
          ${error ? 'border-red-500' : 'border-border hover:border-gray-600'}
          ${className}
        `}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
```

### Task 23: Create Contact Page

**Files:**
- Create: `src/app/contact/page.tsx`

**Step 1: Buat contact page**

```tsx
'use client'

import { useAppStore } from '@/store'
import { ContactForm } from '@/components/ContactForm'
import { IconMail, IconMapPin, IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react'

export default function ContactPage() {
  const { language } = useAppStore()
  
  const title = language === 'en' ? 'Get in Touch' : 'Hubungi Saya'
  const subtitle = language === 'en'
    ? 'Have a project in mind? Let\'s talk!'
    : 'Ada proyek dalam pikiran? Mari kita bicara!'
  
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
          <p className="text-gray-400">{subtitle}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <ContactForm />
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                {language === 'en' ? 'Contact Info' : 'Informasi Kontak'}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <IconMail size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <a href="mailto:hello@okuru.id" className="text-white hover:text-accent">
                      hello@okuru.id
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <IconMapPin size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">
                      {language === 'en' ? 'Location' : 'Lokasi'}
                    </p>
                    <p className="text-white">Cilegon, Indonesia</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                {language === 'en' ? 'Follow Me' : 'Ikuti Saya'}
              </h3>
              
              <div className="flex gap-4">
                <a
                  href="https://github.com/kurob1993"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-background-secondary border border-border flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
                >
                  <IconBrandGithub size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/kurob1993"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-background-secondary border border-border flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
                >
                  <IconBrandLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## Content Files

### Task 24: Create Content JSON Files

**Files:**
- Create: `src/content/projects.json`
- Create: `src/content/blog.json`
- Create: `src/content/services.json`
- Create: `src/content/experience.json`

**Step 1: Buat projects.json**

```json
[
  {
    "id": "1",
    "title": { "en": "Tenant Management System", "id": "Sistem Manajemen Tenant" },
    "description": { "en": "A scalable tenant management system for PT Danareksa", "id": "Sistem manajemen tenant yang dapat diskalakan untuk PT Danareksa" },
    "thumbnail": "/images/projects/tenant.jpg",
    "technologies": ["Laravel", "PostgreSQL", "Vue.js"],
    "demoUrl": "#",
    "githubUrl": "#",
    "featured": true
  }
]
```

**Step 2: Buat blog.json**

```json
[
  {
    "slug": "building-scalable-web-applications-with-laravel",
    "title": { "en": "Building Scalable Web Applications with Laravel", "id": "Membangun Aplikasi Web yang Dapat Diskalakan dengan Laravel" },
    "excerpt": { "en": "Learn how to create robust and scalable web applications...", "id": "Pelajari cara membuat aplikasi web yang tangguh dan dapat diskalakan..." },
    "date": "2024-01-15",
    "readTime": { "en": "8 min read", "id": "8 menit baca" },
    "category": { "en": "Web Development", "id": "Pengembangan Web" },
    "categorySlug": "web-development",
    "coverImage": "/images/blog/laravel.jpg"
  }
]
```

**Step 3: Buat services.json**

```json
[
  {
    "id": "1",
    "icon": "IconCode",
    "title": { "en": "Web Development", "id": "Pengembangan Web" },
    "description": { "en": "Building modern, responsive websites...", "id": "Membangun website modern dan responsif..." },
    "priceRange": { "en": "Starting from $500", "id": "Mulai dari Rp 7.500.000" }
  }
]
```

**Step 4: Buat experience.json**

```json
[
  {
    "id": "1",
    "type": "work",
    "title": { "en": "Full-Stack Developer", "id": "Full-Stack Developer" },
    "company": { "en": "PT Krakatau IT", "id": "PT Krakatau IT" },
    "location": { "en": "Cilegon, Indonesia", "id": "Cilegon, Indonesia" },
    "startDate": "2022-01-01",
    "description": { "en": "Leading development of enterprise applications...", "id": "Memimpin pengembangan aplikasi enterprise..." },
    "verified": true
  }
]
```

---

## Polish & Testing

### Task 25: Add Page Transitions

**Files:**
- Create: `src/components/PageTransition.tsx`

**Step 1: Buat PageTransition component**

```tsx
'use client'

import { motion } from 'framer-motion'

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

### Task 26: Verify Build

**Step 1: Run build command**

```bash
npm run build
```

Expected: Build successful with no errors

**Step 2: Start dev server**

```bash
npm run dev
```

Expected: Dev server running at http://localhost:3000

---

## Deployment

### Task 27: Deploy to Vercel

**Step 1: Install Vercel CLI**

```bash
npm i -g vercel
```

**Step 2: Deploy**

```bash
vercel
```

Expected: Deployment URL returned

---

**Plan complete. Two execution options:**

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

**Which approach?**
