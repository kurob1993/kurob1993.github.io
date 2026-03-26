# Pixel Art Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement pixel art / retro gaming style aesthetic pada portfolio Next.js dengan Press Start 2P font, chunky borders, dan bounce animations.

**Architecture:** Update Tailwind configuration dengan custom colors dan fonts, modify globals.css untuk pixel art styles dan animations, update components dengan pixel-styled variants.

**Tech Stack:** Next.js 14, Tailwind CSS, Google Fonts (Press Start 2P, VT323)

---

## Task 1: Update Tailwind Config

**Files:**
- Modify: `tailwind.config.ts`

**Step 1: Update tailwind config dengan pixel colors dan fonts**

Read the existing file first, then overwrite with:

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
        background: '#1a1c2c',
        'background-secondary': '#2a2d3a',
        accent: '#f4b41b',
        'accent-dark': '#c4920f',
        secondary: '#41e89a',
        danger: '#e84c5d',
        pixel: '#f0f0e8',
        muted: '#6b7280',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        body: ['VT323', 'monospace'],
      },
      boxShadow: {
        pixel: '4px 4px 0 rgba(0, 0, 0, 0.5)',
        'pixel-sm': '2px 2px 0 rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'bounce-in': 'bounceIn 0.5s ease-out',
        'bounce-hover': 'bounceHover 0.3s ease-out',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceHover: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
          '100%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build successful

---

## Task 2: Update Global Styles

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Update globals.css dengan pixel art styles**

Read the existing file first, then overwrite with:

```css
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply bg-background text-pixel antialiased;
    font-family: 'VT323', monospace;
    font-size: 18px;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Press Start 2P', cursive;
    letter-spacing: 1px;
  }
  
  body {
    background-image: 
      radial-gradient(circle at 20% 80%, rgba(65, 232, 154, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(244, 180, 27, 0.05) 0%, transparent 50%);
  }
}

@layer components {
  .pixel-card {
    @apply bg-background-secondary border-4 border-pixel rounded-none;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    image-rendering: pixelated;
  }
  
  .pixel-card:hover {
    transform: translateY(-4px);
    box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.5);
  }
  
  .pixel-button {
    @apply bg-accent text-background font-pixel text-xs px-6 py-4 border-4 border-pixel rounded-none;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5);
    transition: transform 0.1s ease, box-shadow 0.1s ease;
    cursor: pointer;
  }
  
  .pixel-button:hover {
    @apply bg-accent-dark;
  }
  
  .pixel-button:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
  }
  
  .pixel-button-secondary {
    @apply pixel-button bg-background-secondary text-pixel border-pixel;
  }
  
  .pixel-button-secondary:hover {
    @apply bg-background;
  }
  
  .pixel-border {
    @apply border-4 border-pixel;
  }
  
  .pixel-badge {
    @apply bg-accent text-background px-3 py-1 text-xs font-pixel border-2 border-pixel;
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
  }
  
  .pixel-input {
    @apply w-full px-4 py-3 bg-background border-4 border-pixel text-pixel 
           placeholder-muted focus:outline-none focus:border-accent;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5);
  }
}

@layer utilities {
  .text-shadow-pixel {
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
  }
  
  .bg-pixel-pattern {
    background-image: 
      linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%),
      linear-gradient(-45deg, rgba(255,255,255,0.02) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.02) 75%),
      linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.02) 75%);
    background-size: 4px 4px;
  }
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build successful with new styles

---

## Task 3: Update UI Components (Button, Card, Badge)

**Files:**
- Modify: `src/components/ui/Button.tsx`
- Modify: `src/components/ui/Card.tsx`
- Modify: `src/components/ui/Badge.tsx`
- Modify: `src/components/ui/index.ts`

**Step 1: Update Button component**

Read existing file, then overwrite with:

```tsx
import { forwardRef, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = 'font-pixel transition-all duration-200 inline-flex items-center justify-center border-4'
    
    const variants = {
      primary: 'bg-accent text-background border-pixel hover:bg-accent-dark',
      secondary: 'bg-background-secondary text-pixel border-pixel hover:bg-background',
      ghost: 'bg-transparent text-muted border-transparent hover:text-pixel',
    }
    
    const sizes = {
      sm: 'px-3 py-2 text-xs',
      md: 'px-4 py-3 text-xs',
      lg: 'px-6 py-4 text-sm',
    }
    
    const shadows = {
      primary: 'shadow-pixel hover:shadow-none active:translate-x-[2px] active:translate-y-[2px]',
      secondary: 'shadow-pixel hover:shadow-none active:translate-x-[2px] active:translate-y-[2px]',
      ghost: '',
    }
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${shadows[variant]} ${className}`}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }
```

**Step 2: Update Card component**

Read existing file, then overwrite with:

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
          pixel-card ${hover ? 'cursor-pointer' : ''} ${className}
        `}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

export { Card }
```

**Step 3: Update Badge component**

Read existing file, then overwrite with:

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
    default: 'bg-muted/20 text-pixel border-muted',
    accent: 'bg-accent text-background border-pixel',
    outline: 'bg-transparent text-muted border-pixel',
  }
  
  return (
    <span
      className={`
        pixel-badge inline-flex items-center font-pixel text-xs
        ${variants[variant]} ${className}
      `}
      {...props}
    />
  )
}
```

**Step 4: Verify build**

Run: `npm run build`
Expected: Build successful

---

## Task 4: Update Header Component

**Files:**
- Modify: `src/components/Header.tsx`

**Step 1: Update Header with pixel styling**

Read existing file, then overwrite with:

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
    <header className="sticky top-0 z-50 bg-background border-b-4 border-pixel shadow-pixel">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-pixel text-sm text-accent text-shadow-pixel hover:text-secondary transition-colors">
            OKURU.ID
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-body text-lg text-pixel hover:text-accent transition-colors"
              >
                {item.label[language]}
              </Link>
            ))}
            <LanguageSwitcher />
          </nav>
          
          <button
            className="md:hidden text-pixel hover:text-accent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t-4 border-pixel">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 font-body text-lg text-pixel hover:text-accent"
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

**Step 2: Verify build**

Run: `npm run build`
Expected: Build successful

---

## Task 5: Update Hero Section

**Files:**
- Modify: `src/components/HeroSection.tsx`

**Step 1: Update Hero with pixel styling**

Read existing file, then overwrite with:

```tsx
'use client'

import { useAppStore } from '@/store'
import { Button } from '@/components/ui/Button'
import { IconDownload, IconMail, IconBrandGithub, IconBrandLinkedin, IconBrandInstagram } from '@tabler/icons-react'
import Link from 'next/link'

interface HeroContent {
  name: string
  tagline: { en: string; id: string }
  bio: { en: string; id: string }
  cta: { contact: { en: string; id: string }; cv: { en: string; id: string } }
  socialLinks: { platform: string; url: string; icon: any }[]
}

const heroContent: HeroContent = {
  name: 'KUROB',
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
    { platform: 'github', url: 'https://github.com/kurob1993', icon: IconBrandGithub },
    { platform: 'linkedin', url: 'https://linkedin.com/in/kurob1993', icon: IconBrandLinkedin },
    { platform: 'instagram', url: 'https://instagram.com/kurob1993', icon: IconBrandInstagram },
  ],
}

export function HeroSection() {
  const { language } = useAppStore()
  
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-24 bg-pixel-pattern">
      <div className="max-w-3xl mx-auto text-center animate-bounce-in">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto border-4 border-pixel shadow-pixel bg-background-secondary">
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-5xl font-pixel text-accent text-shadow-pixel">K</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-pixel text-pixel mb-4 text-shadow-pixel">
          {heroContent.name}
        </h1>
        
        <p className="text-2xl md:text-3xl font-pixel text-accent mb-6 text-shadow-pixel">
          {heroContent.tagline[language]}
        </p>
        
        <p className="font-body text-xl text-muted mb-8 max-w-2xl mx-auto">
          {heroContent.bio[language]}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
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
        
        <div className="flex items-center justify-center gap-4">
          {heroContent.socialLinks.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border-4 border-pixel bg-background-secondary flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-all shadow-pixel hover:shadow-none"
            >
              <social.icon size={24} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build successful

---

## Task 6: Update Footer Component

**Files:**
- Modify: `src/components/Footer.tsx`

**Step 1: Update Footer with pixel styling**

Read existing file, then overwrite with:

```tsx
'use client'

import { useAppStore } from '@/store'
import { IconBrandGithub, IconBrandLinkedin, IconBrandInstagram } from '@tabler/icons-react'

const socialLinks = [
  { icon: IconBrandGithub, href: 'https://github.com/kurob1993', label: 'GitHub' },
  { icon: IconBrandLinkedin, href: 'https://linkedin.com/in/kurob1993', label: 'LinkedIn' },
  { icon: IconBrandInstagram, href: 'https://instagram.com/kurob1993', label: 'Instagram' },
]

export function Footer() {
  const { language } = useAppStore()
  const currentYear = new Date().getFullYear()
  
  const copyrightText = language === 'en' 
    ? `© ${currentYear} OKURU.ID All Rights Reserved.`
    : `© ${currentYear} OKURU.ID Hak Cipta Dilindungi.`
  
  return (
    <footer className="border-t-4 border-pixel py-8 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-muted">{copyrightText}</p>
          
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors"
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

**Step 2: Verify build**

Run: `npm run build`
Expected: Build successful

---

## Task 7: Update Card Components (ProjectCard, BlogCard)

**Files:**
- Modify: `src/components/ProjectCard.tsx`
- Modify: `src/components/BlogCard.tsx`

**Step 1: Update ProjectCard**

Read existing file, then overwrite with:

```tsx
'use client'

import { useAppStore } from '@/store'
import { getText } from '@/lib/content'
import { Project } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { IconExternalLink, IconBrandGithub } from '@tabler/icons-react'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { language } = useAppStore()
  
  return (
    <Card className="group h-full flex flex-col">
      <div className="aspect-video border-4 border-pixel bg-background mb-4 overflow-hidden">
        <img
          src={project.thumbnail}
          alt={getText(project.title, language)}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />
      </div>
      
      <h3 className="font-pixel text-sm text-pixel mb-2 group-hover:text-accent transition-colors">
        {getText(project.title, language)}
      </h3>
      
      <p className="font-body text-lg text-muted flex-grow mb-4">
        {getText(project.description, language)}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.slice(0, 4).map((tech) => (
          <Badge key={tech} variant="outline">
            {tech}
          </Badge>
        ))}
      </div>
      
      <div className="flex items-center gap-4 pt-4 border-t-4 border-pixel">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
          >
            <IconExternalLink size={20} />
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
          >
            <IconBrandGithub size={20} />
          </a>
        )}
      </div>
    </Card>
  )
}
```

**Step 2: Update BlogCard**

Read existing file, then overwrite with:

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
          <div className="aspect-video border-4 border-pixel bg-background mb-4 overflow-hidden">
            <img
              src={post.coverImage}
              alt={getText(post.title, language)}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </div>
        )}
        
        <Badge variant="accent" className="mb-3">
          {getText(post.category, language)}
        </Badge>
        
        <h3 className="font-pixel text-xs text-pixel mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {getText(post.title, language)}
        </h3>
        
        <p className="font-body text-lg text-muted flex-grow mb-4 line-clamp-3">
          {getText(post.excerpt, language)}
        </p>
        
        <div className="flex items-center justify-between font-body text-muted pt-4 border-t-4 border-pixel">
          <span>{formattedDate}</span>
          <span>{getText(post.readTime, language)}</span>
        </div>
      </Card>
    </Link>
  )
}
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build successful

---

## Task 8: Update Timeline Item

**Files:**
- Modify: `src/components/TimelineItem.tsx`

**Step 1: Update TimelineItem**

Read existing file, then overwrite with:

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
        <div className="absolute left-3 top-3 w-1 h-full bg-pixel" />
      )}
      
      <div className="absolute left-0 top-1 w-6 h-6 bg-accent border-4 border-pixel flex items-center justify-center">
        {experience.verified && <IconCheck size={12} className="text-background" />}
      </div>
      
      <div className="pixel-card">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-pixel text-xs text-accent uppercase tracking-wider">
            {experience.type}
          </span>
        </div>
        
        <h3 className="font-pixel text-sm text-pixel mb-1">
          {getText(experience.title, language)}
        </h3>
        
        <p className="font-body text-lg text-secondary mb-2">
          {getText(experience.company, language)}
        </p>
        
        {experience.location && (
          <p className="font-body text-muted text-sm mb-2">
            {getText(experience.location, language)}
          </p>
        )}
        
        <p className="font-body text-muted text-sm mb-4">
          {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : (language === 'en' ? 'Present' : 'Sekarang')}
        </p>
        
        {experience.description && (
          <p className="font-body text-muted">
            {getText(experience.description, language)}
          </p>
        )}
      </div>
    </div>
  )
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Build successful

---

## Task 9: Update Form Components (Input, Textarea)

**Files:**
- Modify: `src/components/ui/Input.tsx`
- Modify: `src/components/ui/Textarea.tsx`
- Modify: `src/components/ContactForm.tsx`

**Step 1: Update Input**

Read existing file, then overwrite with:

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
          pixel-input w-full
          ${error ? 'border-danger' : ''}
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

**Step 2: Update Textarea**

Read existing file, then overwrite with:

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
          pixel-input w-full resize-none
          ${error ? 'border-danger' : ''}
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

**Step 3: Update ContactForm**

Read existing file, then overwrite with:

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

**Step 4: Verify build**

Run: `npm run build`
Expected: Build successful

---

## Task 10: Update Services Page

**Files:**
- Modify: `src/app/services/page.tsx`

**Step 1: Update Services page**

Read existing file, then overwrite with:

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
    <section className="py-24 px-4 bg-pixel-pattern">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-pixel text-pixel mb-4 text-shadow-pixel">{title}</h1>
          <p className="font-body text-xl text-muted">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComponent = (Icons as any)[service.icon]
            
            return (
              <Card key={service.id} className="text-center">
                {IconComponent && (
                  <div className="inline-flex items-center justify-center w-16 h-16 border-4 border-pixel bg-accent mb-4">
                    <IconComponent size={32} className="text-background" />
                  </div>
                )}
                
                <h3 className="font-pixel text-xs text-pixel mb-2">
                  {getText(service.title, language)}
                </h3>
                
                <p className="font-body text-lg text-muted mb-4">
                  {getText(service.description, language)}
                </p>
                
                {service.priceRange && (
                  <p className="font-pixel text-xs text-accent">
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

**Step 2: Verify build**

Run: `npm run build`
Expected: Build successful

---

## Task 11: Final Build Verification

**Step 1: Full build verification**

Run: `rm -rf .next && npm run build`

Expected: 
```
✓ Compiled successfully
✓ Generating static pages
Route (app)                              Size     First Load JS
┌ ○ /                                    2.51 kB        99.3 kB
...
```

---

**Plan complete. Two execution options:**

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

**Which approach?**
