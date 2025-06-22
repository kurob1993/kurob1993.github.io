# Okuru.id Portfolio Website

Portfolio website untuk Kurob, seorang Full-Stack Developer dari Indonesia. Website ini menggunakan pendekatan content-driven dengan konten yang dipisahkan ke dalam file JSON terpisah.

## Struktur File

```
kurob1993.github.io/
├── index.html          # File HTML utama
├── content.json        # File konten dalam format JSON
├── content-loader.js   # JavaScript untuk memuat dan menampilkan konten
├── kurob.jpg          # Gambar profil
└── README.md          # Dokumentasi ini
```

## Fitur

- **Content-Driven**: Konten dipisahkan dari HTML dan disimpan dalam file JSON
- **Multi-language Support**: Dukungan bahasa Indonesia dan Inggris
- **Responsive Design**: Desain responsif dengan Tailwind CSS
- **Glassmorphism UI**: Efek visual modern dengan glassmorphism
- **Interactive Elements**: Swiper carousel, language switcher, dan animasi

## Cara Menggunakan

### 1. Mengubah Konten

Untuk mengubah konten website, edit file `content.json`:

```json
{
  "hero": {
    "title": {
      "en": "Hi, I'm Kurob",
      "id": "Halo, Saya Kurob"
    },
    "description": {
      "en": "Your English description here",
      "id": "Deskripsi bahasa Indonesia di sini"
    }
  }
}
```

### 2. Menambah Proyek Baru

Untuk menambah proyek baru, tambahkan ke array `projects.items`:

```json
{
  "projects": {
    "items": [
      {
        "title": {
          "en": "New Project Title",
          "id": "Judul Proyek Baru"
        },
        "description": {
          "en": "Project description in English",
          "id": "Deskripsi proyek dalam bahasa Indonesia"
        }
      }
    ]
  }
}
```

### 3. Menambah Teknologi Baru

Untuk menambah teknologi baru di section Skills:

```json
{
  "skills": {
    "technologies": [
      {
        "name": "Vue.js",
        "icon": "fab fa-vuejs",
        "color": "text-green-400"
      }
    ]
  }
}
```

### 4. Mengubah Social Links

Untuk mengubah link sosial media:

```json
{
  "hero": {
    "socialLinks": [
      {
        "platform": "github",
        "url": "https://github.com/yourusername",
        "icon": "fab fa-github"
      }
    ]
  }
}
```

## Struktur JSON

### Meta Information
- `title`: Judul halaman
- `description`: Meta description
- `language`: Bahasa default

### Navigation
- `brand`: Nama brand
- `menu`: Array menu navigasi
- `downloadCv`: Teks tombol download CV

### Hero Section
- `title`: Judul utama
- `description`: Deskripsi
- `highlightedRole`: Role yang di-highlight
- `cta`: Call-to-action button
- `socialLinks`: Array link sosial media

### Projects
- `title`: Judul section
- `items`: Array proyek-proyek

### Open Source
- `title`: Judul section
- `projects`: Array proyek open source dengan teknologi dan stats

### Skills
- `title`: Judul section
- `subtitle`: Subtitle section
- `technologies`: Array teknologi dengan icon dan warna

### Contact
- `title`: Judul section
- `subtitle`: Subtitle section
- `form`: Form fields dengan placeholder

## Language Switching

Website mendukung pergantian bahasa secara dinamis:
- Bahasa Inggris (EN)
- Bahasa Indonesia (ID)

Konten akan berubah secara otomatis ketika user memilih bahasa yang berbeda.

## Teknologi yang Digunakan

- **HTML5**: Struktur halaman
- **CSS3**: Styling dengan Tailwind CSS
- **JavaScript**: Interaktivitas dan content loading
- **Swiper.js**: Carousel untuk proyek
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Poppins)

## Deployment

Website ini dapat di-deploy ke:
- GitHub Pages
- Netlify
- Vercel
- Atau hosting static lainnya

## Kontribusi

Untuk berkontribusi:
1. Fork repository
2. Buat branch baru
3. Lakukan perubahan
4. Submit pull request

## Lisensi

© 2024 Okuru.id. All Rights Reserved. 