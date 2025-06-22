// Blog Loader for Okuru.id Blog Page
class BlogLoader {
    constructor() {
        this.content = null;
        this.currentLanguage = 'en';
        this.allPosts = [];
        this.displayedPosts = 0;
        this.postsPerPage = 6;
        this.init();
    }

    async init() {
        try {
            await this.loadContent();
            this.setupLanguageSwitcher();
            this.setupBlogPosts();
            this.renderBlogPosts();
            this.renderFooter();
        } catch (error) {
            console.error('Error loading blog content:', error);
            this.useDefaultContent();
        }
    }

    async loadContent() {
        try {
            const response = await fetch('blog-content.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.content = await response.json();
        } catch (error) {
            console.error('Failed to load blog-content.json:', error);
            throw error;
        }
    }

    useDefaultContent() {
        this.content = {
            navigation: {
                brand: "Okuru.id"
            },
            blog: {
                title: { en: "Blog", id: "Blog" },
                subtitle: { 
                    en: "Thoughts, tutorials, and insights about web development and technology",
                    id: "Pemikiran, tutorial, dan wawasan tentang pengembangan web dan teknologi"
                },
                posts: this.getDefaultBlogPosts(),
                categories: [
                    { slug: "all", en: "All Posts", id: "Semua Artikel" },
                    { slug: "web-development", en: "Web Development", id: "Pengembangan Web" },
                    { slug: "mobile-development", en: "Mobile Development", id: "Pengembangan Mobile" },
                    { slug: "ui-ux", en: "UI/UX Design", id: "Desain UI/UX" }
                ],
                footer: {
                    copyright: "© {year} Okuru.id. All Rights Reserved."
                }
            }
        };
        this.setupLanguageSwitcher();
        this.setupBlogPosts();
        this.renderBlogPosts();
        this.renderFooter();
    }

    getDefaultBlogPosts() {
        return [
            {
                title: { en: "Building Scalable Web Applications with Laravel", id: "Membangun Aplikasi Web yang Dapat Diskalakan dengan Laravel" },
                excerpt: { en: "Learn how to create robust and scalable web applications using Laravel framework.", id: "Pelajari cara membuat aplikasi web yang tangguh dan dapat diskalakan menggunakan framework Laravel." },
                date: "2024-01-15",
                readTime: { en: "8 min read", id: "8 menit baca" },
                category: { en: "Web Development", id: "Pengembangan Web" },
                categorySlug: "web-development",
                url: "#"
            },
            {
                title: { en: "Docker Best Practices for Development Teams", id: "Praktik Terbaik Docker untuk Tim Pengembangan" },
                excerpt: { en: "Discover essential Docker practices that every development team should follow.", id: "Temukan praktik Docker yang penting yang harus diikuti setiap tim pengembangan." },
                date: "2024-01-10",
                readTime: { en: "12 min read", id: "12 menit baca" },
                category: { en: "DevOps", id: "DevOps" },
                categorySlug: "devops",
                url: "#"
            },
            {
                title: { en: "Modern JavaScript Patterns for Better Code", id: "Pola JavaScript Modern untuk Kode yang Lebih Baik" },
                excerpt: { en: "Explore modern JavaScript patterns and techniques that can improve your code quality.", id: "Jelajahi pola dan teknik JavaScript modern yang dapat meningkatkan kualitas kode." },
                date: "2024-01-05",
                readTime: { en: "10 min read", id: "10 menit baca" },
                category: { en: "JavaScript", id: "JavaScript" },
                categorySlug: "javascript",
                url: "#"
            }
        ];
    }

    setupLanguageSwitcher() {
        window.toggleLanguageDropdown = () => {
            const dropdown = document.getElementById('language-dropdown');
            dropdown.classList.toggle('show');
        };

        window.changeLanguage = (lang) => {
            this.currentLanguage = lang;
            
            document.getElementById('current-lang').textContent = lang.toUpperCase();
            
            document.querySelectorAll('.language-option').forEach(option => {
                option.classList.remove('active');
            });
            event.target.closest('.language-option').classList.add('active');
            
            document.getElementById('language-dropdown').classList.remove('show');
            
            this.renderBlogPosts();
        };

        document.addEventListener('click', (event) => {
            const languageSwitcher = document.querySelector('.language-switcher');
            if (!languageSwitcher.contains(event.target)) {
                document.getElementById('language-dropdown').classList.remove('show');
            }
        });
    }

    setupBlogPosts() {
        // Use posts from blog-content.json
        this.allPosts = this.content.blog.posts || [];

        // Setup load more functionality
        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMorePosts();
            });
        }

        // Setup category filters
        this.setupCategoryFilters();
    }

    setupCategoryFilters() {
        const filterContainer = document.querySelector('.flex.flex-wrap.justify-center.gap-4.mb-12');
        if (!filterContainer || !this.content.blog.categories) return;

        // Clear existing filters
        filterContainer.innerHTML = '';

        // Add category filter buttons
        this.content.blog.categories.forEach(category => {
            const button = document.createElement('button');
            button.className = `category-filter px-4 py-2 rounded-lg font-medium transition-colors ${
                category.slug === 'all' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`;
            button.setAttribute('data-category', category.slug);
            button.textContent = this.getText(category);
            filterContainer.appendChild(button);
        });

        // Add event listeners
        const filterButtons = document.querySelectorAll('.category-filter');
        filterButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const category = event.target.getAttribute('data-category');
                
                // Update active button
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-green-500', 'text-white');
                    btn.classList.add('bg-gray-700', 'text-gray-300');
                });
                event.target.classList.remove('bg-gray-700', 'text-gray-300');
                event.target.classList.add('bg-green-500', 'text-white');

                // Filter posts
                this.filterPosts(category);
            });
        });
    }

    filterPosts(category) {
        const posts = document.querySelectorAll('.blog-post');
        posts.forEach(post => {
            const postCategory = post.getAttribute('data-category');
            if (category === 'all' || postCategory === category) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
        
        // Update load more button visibility
        this.updateLoadMoreButton();
    }

    getText(element) {
        if (!element || !element[this.currentLanguage]) {
            return element?.en || element || '';
        }
        return element[this.currentLanguage];
    }

    getCategoryClass(categorySlug) {
        const categoryClasses = {
            'web-development': 'category-web-dev',
            'devops': 'category-devops',
            'javascript': 'category-javascript',
            'laravel': 'category-laravel',
            'react': 'category-react',
            'docker': 'category-docker'
        };
        return categoryClasses[categorySlug] || 'category-web-dev';
    }

    renderBlogPosts() {
        const blogGrid = document.getElementById('blog-grid');
        if (!blogGrid) return;

        // Clear existing posts
        blogGrid.innerHTML = '';

        // Render posts
        const postsToShow = this.allPosts.slice(0, this.displayedPosts + this.postsPerPage);
        this.displayedPosts = postsToShow.length;

        postsToShow.forEach(post => {
            const postElement = this.createPostElement(post);
            blogGrid.appendChild(postElement);
        });

        // Update load more button
        this.updateLoadMoreButton();
    }

    createPostElement(post) {
        const article = document.createElement('article');
        article.className = 'glass-card p-6 flex flex-col h-full hover:transform hover:scale-105 transition-all duration-300 blog-post';
        article.setAttribute('data-category', post.categorySlug);

        const date = new Date(post.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });

        article.innerHTML = `
            <div class="mb-4">
                <span class="category-badge ${this.getCategoryClass(post.categorySlug)}">${this.getText(post.category)}</span>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-white">${this.getText(post.title)}</h3>
            <p class="text-gray-300 flex-grow mb-4">${this.getText(post.excerpt)}</p>
            <div class="flex items-center justify-between text-sm text-gray-400">
                <span>${formattedDate}</span>
                <span>${this.getText(post.readTime)}</span>
            </div>
            <a href="${post.url}" class="mt-4 text-green-400 hover:text-green-300 transition-colors font-medium">${this.currentLanguage === 'id' ? 'Baca Selengkapnya →' : 'Read More →'}</a>
        `;

        return article;
    }

    loadMorePosts() {
        this.renderBlogPosts();
    }

    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) {
            if (this.displayedPosts >= this.allPosts.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-block';
                loadMoreBtn.textContent = this.currentLanguage === 'id' ? 'Muat Artikel Lainnya' : 'Load More Posts';
            }
        }
    }

    renderFooter() {
        const footerElement = document.querySelector('footer p');
        if (footerElement && this.content.footer) {
            const currentYear = new Date().getFullYear();
            const copyright = this.content.footer.copyright.replace(/{year}/g, currentYear);
            footerElement.textContent = copyright;
        }
    }
}

// Initialize blog loader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogLoader();
}); 