# Okuru.id Portfolio Website

Portfolio website untuk Kurob, seorang Full-Stack Developer dari Indonesia. Website ini menggunakan pendekatan content-driven dengan konten yang dipisahkan ke dalam file JSON terpisah.

## Struktur File

```
kurob1993.github.io/
├── index.html              # File HTML utama
├── blog.html               # Halaman blog terpisah
├── cv.html                 # Halaman CV dengan auto-print
├── index-content.json      # Konten untuk halaman utama
├── blog-content.json       # Konten khusus untuk halaman blog
├── content-loader.js       # JavaScript untuk memuat konten halaman utama
├── blog-loader.js          # JavaScript khusus untuk halaman blog
├── kurob.jpg              # Gambar profil
└── README.md              # Dokumentasi ini
```

## Fitur

- **Content-Driven**: Konten dipisahkan dari HTML dan disimpan dalam file JSON terpisah
- **Multi-language Support**: Dukungan bahasa Indonesia dan Inggris
- **Responsive Design**: Desain responsif dengan Tailwind CSS
- **Glassmorphism UI**: Efek visual modern dengan glassmorphism
- **Interactive Elements**: Swiper carousel, language switcher, dan animasi
- **Blog System**: Halaman blog terpisah dengan fitur filtering dan pagination
- **Category Filtering**: Filter artikel berdasarkan kategori
- **Load More**: Pagination dengan tombol "Load More"
- **Separated Content**: Konten halaman utama dan blog dipisahkan untuk kemudahan maintenance
- **CV Download**: Fungsi download CV dengan notifikasi sukses

## Cara Menggunakan

### 1. Mengubah Konten Halaman Utama

Untuk mengubah konten halaman utama, edit file `index-content.json`:

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

### 2. Mengubah Konten Blog

Untuk mengubah konten blog, edit file `blog-content.json`:

```json
{
  "blog": {
    "categories": [
      {
        "slug": "web-development",
        "en": "Web Development",
        "id": "Pengembangan Web"
      }
    ],
    "posts": [
      {
        "title": {
          "en": "New Blog Post Title",
          "id": "Judul Artikel Blog Baru"
        },
        "excerpt": {
          "en": "Blog post excerpt in English",
          "id": "Ringkasan artikel blog dalam bahasa Indonesia"
        },
        "date": "2024-01-25",
        "readTime": {
          "en": "5 min read",
          "id": "5 menit baca"
        },
        "category": {
          "en": "Web Development",
          "id": "Pengembangan Web"
        },
        "categorySlug": "web-development",
        "url": "#"
      }
    ]
  }
}
```

### 3. Menambah Proyek Baru

Untuk menambah proyek baru, tambahkan ke array `projects.items` di `index-content.json`:

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

### 4. Menambah Kategori Blog Baru

Untuk menambah kategori blog baru, tambahkan ke array `blog.categories` di `blog-content.json`:

```json
{
  "blog": {
    "categories": [
      {
        "slug": "new-category",
        "en": "New Category",
        "id": "Kategori Baru"
      }
    ]
  }
}
```

### 5. Menambah Teknologi Baru

Untuk menambah teknologi baru di section Skills, edit `index-content.json`:

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

### 6. Mengubah Social Links

Untuk mengubah link sosial media, edit `index-content.json`:

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

### 7. Mengatur Download CV

Untuk mengatur fungsi download CV, edit `index-content.json`:

```json
{
  "navigation": {
    "downloadCv": {
      "en": "Download CV",
      "id": "Unduh CV",
      "file": "cv.html",
      "filename": {
        "en": "Kurob-FullStack-Developer-CV.html",
        "id": "Kurob-FullStack-Developer-CV.html"
      }
    }
  }
}
```

Untuk mengubah konten CV, edit file `cv.html`. CV akan otomatis membuka dialog print saat halaman dibuka.

## Struktur JSON

### index-content.json (Halaman Utama)
- `meta`: Meta information (title, description, language)
- `navigation`: Menu navigasi, brand, dan download CV
- `hero`: Section hero dengan title, description, dan social links
- `projects`: Proyek-proyek yang ditampilkan
- `blog`: Preview artikel blog (3 artikel terbaru)
- `openSource`: Proyek open source
- `skills`: Teknologi dan keahlian
- `contact`: Form kontak
- `footer`: Copyright
- `profile`: Informasi profil

### blog-content.json (Halaman Blog)
- `meta`: Meta information untuk halaman blog
- `navigation`: Menu navigasi (sama dengan halaman utama)
- `blog`: 
  - `title`: Judul halaman blog
  - `subtitle`: Subtitle halaman blog
  - `categories`: Array kategori untuk filtering
  - `posts`: Array artikel blog lengkap
- `footer`: Copyright

## Halaman Blog

Website memiliki halaman blog terpisah (`blog.html`) dengan fitur:

### Fitur Blog
- **Dynamic Category Filtering**: Filter artikel berdasarkan kategori yang didefinisikan di JSON
- **Load More**: Pagination dengan tombol "Load More" untuk memuat artikel tambahan
- **Multi-language Support**: Dukungan bahasa Indonesia dan Inggris
- **Responsive Design**: Desain responsif dengan Tailwind CSS

### Fitur CV Download
- **HTML CV Page**: CV ditampilkan dalam format HTML yang responsif dan print-friendly
- **Auto Print**: CV akan otomatis membuka dialog print saat halaman dibuka
- **New Tab**: CV dibuka di tab baru untuk pengalaman yang lebih baik
- **Print Controls**: Tombol print dan close tersedia di halaman CV
- **Customizable Content**: Konten CV dapat dengan mudah diedit di file `cv.html`

### Kategori Blog (Dapat Dikustomisasi)
- **All Posts**: Semua artikel
- **Web Development**: Artikel tentang pengembangan web
- **DevOps**: Artikel tentang DevOps dan deployment
- **JavaScript**: Artikel tentang JavaScript dan frontend
- **Laravel**: Artikel khusus tentang Laravel framework
- **React**: Artikel tentang React dan frontend frameworks
- **Docker**: Artikel tentang containerization dan Docker

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