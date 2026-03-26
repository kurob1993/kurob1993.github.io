# AGENTS.md - Okuru.id Portfolio Website

## Deskripsi Proyek

Website portfolio statis untuk Kurob, Full-Stack Developer dari Indonesia. Menggunakan pendekatan content-driven dengan konten terpisah dalam file JSON.

## Build/Lint/Test Commands

### Build Commands
```bash
# Tidak ada build process - ini adalah static site
# Untuk preview lokal, buka file HTML langsung di browser
# Atau gunakan simple HTTP server:
python3 -m http.server 8000
# Atau:
npx serve .
```

### Lint Commands
```bash
# JavaScript linting (jikaESLint terinstall):
npx eslint .

# HTML validation:
npx htmlhint *.html
```

### Test Commands
```bash
# Tidak ada test framework terinstall
# Site ini adalah static site - tidak memerlukan unit test
```

### Deployment
```bash
# Deploy ke GitHub Pages - push ke branch main
git push origin master

# Atau deploy ke Netlify/Vercel dengan drag-and-drop
```

## Struktur Direktori

```
kurob1993.github.io/
├── index.html              # Halaman utama
├── blog.html                # Halaman blog
├── cv.html                  # Halaman CV dengan auto-print
├── programmer-cilegon.html  # Halaman alternatif
├── index-content.json       # Konten halaman utama
├── blog-content.json        # Konten halaman blog
├── content.json             # Konten tambahan
├── content-loader.js        # Loader konten utama
├── blog-loader.js           # Loader halaman blog
├── kurob.jpg                # Gambar profil
├── assets/
│   ├── css/                 # Stylesheets
│   ├── fonts/               # Font files
│   └── js/                  # JavaScript libraries
└── README.md
```

## Code Style Guidelines

### JavaScript - ES6 Conventions

#### Classes
```javascript
// Gunakan ES6 class untuk komponen
class ContentLoader {
    constructor() {
        this.content = null;
        this.currentLanguage = 'en';
        this.init();
    }
}

// Private methods dengan underscore prefix (konvensi)
_async loadContent() {
    // implementation
}
```

#### Naming Conventions
```javascript
// Classes: PascalCase
class ContentLoader {}

// Methods/Variables: camelCase
const currentLanguage = 'en';
function setupLanguageSwitcher() {}

// Constants: UPPER_SNAKE_CASE
const POSTS_PER_PAGE = 6;

// Private methods: _prefixed
_init() {}

// Boolean: is/has/can prefix
this.isLoading = true;
```

#### Error Handling
```javascript
// Selalu gunakan try-catch untuk async operations
async init() {
    try {
        await this.loadContent();
        this.renderContent();
    } catch (error) {
        console.error('Error loading content:', error);
        this.useDefaultContent();
    }
}

// Fetch dengan error checking
async loadContent() {
    try {
        const response = await fetch('index-content.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.content = await response.json();
    } catch (error) {
        console.error('Failed to load index-content.json:', error);
        throw error;
    }
}
```

#### Multi-language Support
```javascript
// Fungsi getText untuk konten bilingual
getText(element) {
    if (!element || !element[this.currentLanguage]) {
        return element?.en || element || '';
    }
    return element[this.currentLanguage];
}
```

### HTML Guidelines

#### Structure
```html
<!-- Gunakan semantic HTML5 -->
<header>
    <nav>
        <a href="#section">Link</a>
    </nav>
</header>
<main>
    <section id="projects">
        <!-- content -->
    </section>
</main>
<footer>
    <!-- copyright -->
</footer>
```

#### Attributes
```html
<!-- Data attributes untuk elemen dinamis -->
<span data-en="Read More" data-id="Baca Selengkapnya">Read More</span>

<!-- Lazy loading untuk images -->
<img src="image.jpg" alt="Description" loading="lazy" decoding="async">

<!-- Accessible links -->
<a href="https://..." target="_blank" rel="noopener noreferrer">Link</a>
```

### CSS Guidelines

#### Tailwind CSS
```html
<!-- Gunakan Tailwind classes untuk styling -->
<div class="glass-card p-6 flex flex-col items-center">
    <i class="fab fa-laravel text-5xl text-red-400 mb-4"></i>
</div>

<!-- Custom colors dengan Tailwind format -->
bg-green-500/20 text-green-400
```

#### Custom CSS
```css
/* Glassmorphism Card Style */
.glass-card {
    background: rgba(255, 255, 255, 0.05);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
}

/* Animations */
@keyframes moveBlob1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(10vw, -15vh) scale(1.2); }
}
```

### JSON Content Structure

#### Bilingual Content Format
```json
{
    "title": {
        "en": "English Title",
        "id": "Judul Bahasa Indonesia"
    },
    "description": {
        "en": "English description",
        "id": "Deskripsi bahasa Indonesia"
    }
}
```

#### Categories & Posts
```json
{
    "categories": [
        {
            "slug": "web-development",
            "en": "Web Development",
            "id": "Pengembangan Web"
        }
    ],
    "posts": [
        {
            "title": { "en": "", "id": "" },
            "excerpt": { "en": "", "id": "" },
            "date": "2024-01-15",
            "readTime": { "en": "5 min read", "id": "5 menit baca" },
            "categorySlug": "web-development",
            "url": "#"
        }
    ]
}
```

## Technology Stack

- **HTML5** - Semantic markup
- **Tailwind CSS** (via CDN) - Utility-first CSS
- **Vanilla JavaScript** (ES6+) - Interaktivitas
- **Swiper.js** (via CDN) - Carousel
- **Font Awesome** - Icons
- **Google Fonts (Poppins)** - Typography
- **PostCSS/Tailwind.js** - CSS processing

## Deployment Notes

- Site di-deploy ke **GitHub Pages**
- Branch: `master`
- Direktori root (`/`) digunakan
- File `.nojekyll` ada untuk menonaktifkan Jekyll processing

## Language Preference

CRITICAL: Selalu jawab dalam Bahasa Indonesia.
- Semua penjelasan, komentar, dan dokumentasi harus dalam Bahasa Indonesia
- Technical terms dalam English boleh dipertahankan (misal: API, database, Laravel, React, dll)
- Code comments dalam English boleh untuk code clarity

## Git Workflow

### PENTING: Jangan pernah commit atau push ke git kecuali diminta secara eksplisit oleh user
- Jika user tidak meminta untuk commit, push, atau membuat PR, jangan lakukan
- Jika belum yakin apakah perlu melakukan git operation, tanyakan dulu ke user
- Jangan membuat branch baru kecuali diminta

## Troubleshooting

### Local Development
```bash
# Jika JSON tidak loading di browser (CORS):
# Gunakan HTTP server
python3 -m http.server 8000

# Atau gunakan VS Code Live Server extension
```

### Common Issues
1. **Content tidak muncul** - Cek console untuk error fetch
2. **Swiper tidak berfungsi** - Pastikan CDN scripts loaded
3. **Bahasa tidak switch** - Cek `currentLanguage` state
