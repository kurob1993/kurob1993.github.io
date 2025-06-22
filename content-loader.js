// Content Loader for Okuru.id Portfolio
class ContentLoader {
    constructor() {
        this.content = null;
        this.currentLanguage = 'en';
        this.init();
    }

    async init() {
        try {
            await this.loadContent();
            this.setupLanguageSwitcher();
            this.renderContent();
        } catch (error) {
            console.error('Error loading content:', error);
            // Fallback: use default content if JSON loading fails
            this.useDefaultContent();
        }
    }

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

    useDefaultContent() {
        // Fallback content if JSON loading fails
        this.content = {
            navigation: {
                brand: "Okuru.id",
                menu: [
                    { en: "Projects", id: "Proyek" },
                    { en: "Open Source", id: "Open Source" },
                    { en: "Skills", id: "Keahlian" },
                    { en: "Contact", id: "Kontak" }
                ],
                downloadCv: { en: "Download CV", id: "Unduh CV" }
            },
            hero: {
                title: { en: "Hi, I'm Kurob", id: "Halo, Saya Kurob" },
                description: { 
                    en: "I'm from Indonesia with 8+ years of experience as a full-stack web developer. Currently at PT Krakatau IT and available for freelance projects. I build dynamic, responsive, and robust web solutions.",
                    id: "Saya dari Indonesia dengan pengalaman 8+ tahun sebagai full-stack web developer. Saat ini bekerja di PT Krakatau IT dan tersedia untuk proyek freelance. Saya membangun solusi web yang dinamis, responsif, dan tangguh."
                },
                highlightedRole: { en: "full-stack web developer", id: "full-stack web developer" },
                cta: { en: "Contact Me", id: "Hubungi Saya" }
            },
            projects: {
                title: { en: "Selected Projects", id: "Proyek Pilihan" }
            },
            blog: {
                title: { en: "Latest Blog Posts", id: "Artikel Blog Terbaru" },
                subtitle: { 
                    en: "Thoughts, tutorials, and insights about web development and technology",
                    id: "Pemikiran, tutorial, dan wawasan tentang pengembangan web dan teknologi"
                }
            },
            openSource: {
                title: { en: "Open Source Projects", id: "Proyek Open Source" }
            },
            skills: {
                title: { en: "Technologies & Skills", id: "Teknologi & Keahlian" },
                subtitle: { 
                    en: "Here are some of the tools and technologies I frequently work with to bring ideas to life.",
                    id: "Berikut adalah beberapa alat dan teknologi yang sering saya gunakan untuk mewujudkan ide menjadi kenyataan."
                }
            },
            contact: {
                title: { en: "Get in Touch", id: "Hubungi Saya" },
                subtitle: { en: "Have a project in mind? Let's talk!", id: "Ada proyek dalam pikiran? Mari kita bicara!" },
                form: {
                    name: { placeholder: { en: "Your Name", id: "Nama Anda" } },
                    email: { placeholder: { en: "Your Email", id: "Email Anda" } },
                    message: { placeholder: { en: "Your Message", id: "Pesan Anda" } },
                    submit: { en: "Send Message", id: "Kirim Pesan" }
                }
            }
        };
    }

    setupLanguageSwitcher() {
        // Language switching functionality
        window.toggleLanguageDropdown = () => {
            const dropdown = document.getElementById('language-dropdown');
            dropdown.classList.toggle('show');
        };

        window.changeLanguage = (lang) => {
            this.currentLanguage = lang;
            
            // Update current language display
            document.getElementById('current-lang').textContent = lang.toUpperCase();
            
            // Update active state in dropdown
            document.querySelectorAll('.language-option').forEach(option => {
                option.classList.remove('active');
            });
            event.target.closest('.language-option').classList.add('active');
            
            // Close dropdown
            document.getElementById('language-dropdown').classList.remove('show');
            
            // Re-render content with new language
            this.renderContent();
        };

        // Close dropdown when clicking outside
        document.addEventListener('click', (event) => {
            const languageSwitcher = document.querySelector('.language-switcher');
            if (!languageSwitcher.contains(event.target)) {
                document.getElementById('language-dropdown').classList.remove('show');
            }
        });
    }

    getText(element) {
        if (!element || !element[this.currentLanguage]) {
            return element?.en || element || '';
        }
        return element[this.currentLanguage];
    }

    renderContent() {
        if (!this.content) return;

        this.renderNavigation();
        this.renderHero();
        this.renderProjects();
        this.renderBlog();
        this.renderOpenSource();
        this.renderSkills();
        this.renderContact();
        this.renderFooter();
    }

    renderNavigation() {
        // Update brand name
        const brandElement = document.querySelector('.text-2xl.font-bold');
        if (brandElement) {
            brandElement.textContent = this.content.navigation.brand;
        }

        // Update menu items
        this.content.navigation.menu.forEach((menuItem, index) => {
            const menuElements = document.querySelectorAll('nav a[href^="#"]');
            if (menuElements[index]) {
                menuElements[index].textContent = this.getText(menuItem);
            }
        });

        // Update download CV button
        const downloadCvBtn = document.querySelector('a[href="#download-cv"]');
        if (downloadCvBtn) {
            downloadCvBtn.textContent = this.getText(this.content.navigation.downloadCv);
        }
    }

    renderHero() {
        // Update title
        const titleElement = document.querySelector('h1');
        if (titleElement) {
            titleElement.textContent = this.getText(this.content.hero.title);
        }

        // Update description
        const descElement = document.querySelector('.text-lg.mt-4.text-gray-300.max-w-2xl');
        if (descElement) {
            const description = this.getText(this.content.hero.description);
            const highlightedRole = this.getText(this.content.hero.highlightedRole);
            
            // Replace the highlighted role in the description
            const updatedDescription = description.replace(
                /full-stack web developer/g, 
                `<span class="role-highlight">${highlightedRole}</span>`
            );
            descElement.innerHTML = updatedDescription;
        }

        // Update CTA button
        const ctaBtn = document.querySelector('a[href="#contact"]');
        if (ctaBtn) {
            ctaBtn.textContent = this.getText(this.content.hero.cta);
        }

        // Update social links if they exist in content
        if (this.content.hero.socialLinks) {
            this.content.hero.socialLinks.forEach((social, index) => {
                const socialElements = document.querySelectorAll('.flex.space-x-6 a');
                if (socialElements[index]) {
                    socialElements[index].href = social.url;
                }
            });
        }
    }

    renderProjects() {
        // Update section title
        const sectionTitle = document.querySelector('#projects h2');
        if (sectionTitle) {
            sectionTitle.textContent = this.getText(this.content.projects.title);
        }

        // Update project items if they exist in content
        if (this.content.projects.items) {
            const projectSlides = document.querySelectorAll('#projects .swiper-slide');
            this.content.projects.items.forEach((project, index) => {
                if (projectSlides[index]) {
                    const titleElement = projectSlides[index].querySelector('h3');
                    const descElement = projectSlides[index].querySelector('p');
                    
                    if (titleElement) {
                        titleElement.textContent = this.getText(project.title);
                    }
                    if (descElement) {
                        descElement.textContent = this.getText(project.description);
                    }
                }
            });
        }
    }

    renderBlog() {
        // Update section title and subtitle
        const sectionTitle = document.querySelector('#blog h2');
        const sectionSubtitle = document.querySelector('#blog p');
        
        if (sectionTitle) {
            sectionTitle.textContent = this.getText(this.content.blog.title);
        }
        if (sectionSubtitle) {
            sectionSubtitle.textContent = this.getText(this.content.blog.subtitle);
        }

        // Update blog posts if they exist in content
        if (this.content.blog.posts) {
            const blogArticles = document.querySelectorAll('#blog article');
            this.content.blog.posts.forEach((post, index) => {
                if (blogArticles[index]) {
                    const titleElement = blogArticles[index].querySelector('h3');
                    const excerptElement = blogArticles[index].querySelector('p');
                    const categoryElement = blogArticles[index].querySelector('span');
                    const dateElement = blogArticles[index].querySelector('.flex.items-center.justify-between span:first-child');
                    const readTimeElement = blogArticles[index].querySelector('.flex.items-center.justify-between span:last-child');
                    const readMoreLink = blogArticles[index].querySelector('a[href="#"]');
                    
                    if (titleElement) {
                        titleElement.textContent = this.getText(post.title);
                    }
                    if (excerptElement) {
                        excerptElement.textContent = this.getText(post.excerpt);
                    }
                    if (categoryElement) {
                        categoryElement.textContent = this.getText(post.category);
                    }
                    if (dateElement) {
                        // Format date
                        const date = new Date(post.date);
                        dateElement.textContent = date.toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                        });
                    }
                    if (readTimeElement) {
                        readTimeElement.textContent = this.getText(post.readTime);
                    }
                    if (readMoreLink && post.url) {
                        readMoreLink.href = post.url;
                    }
                }
            });
        }

        // Update "View All Posts" button
        const viewAllBtn = document.querySelector('#blog .text-center a');
        if (viewAllBtn) {
            viewAllBtn.textContent = this.currentLanguage === 'id' ? 'Lihat Semua Artikel' : 'View All Posts';
        }
    }

    renderOpenSource() {
        // Update section title
        const sectionTitle = document.querySelector('#open-source h2');
        if (sectionTitle) {
            sectionTitle.textContent = this.getText(this.content.openSource.title);
        }

        // Update open source projects if they exist in content
        if (this.content.openSource.projects) {
            const projectCards = document.querySelectorAll('#open-source .glass-card');
            this.content.openSource.projects.forEach((project, index) => {
                if (projectCards[index]) {
                    const titleElement = projectCards[index].querySelector('h3');
                    const descElement = projectCards[index].querySelector('p');
                    const githubLink = projectCards[index].querySelector('a[href*="github"]');
                    
                    if (titleElement) {
                        titleElement.textContent = this.getText(project.title);
                    }
                    if (descElement) {
                        descElement.textContent = this.getText(project.description);
                    }
                    if (githubLink && project.githubUrl) {
                        githubLink.href = project.githubUrl;
                    }

                    // Update technology badges
                    const techBadges = projectCards[index].querySelector('.tech-badges');
                    if (techBadges && project.technologies) {
                        techBadges.innerHTML = project.technologies.map(tech => 
                            `<span class="px-3 py-1 bg-${tech.bgColor} text-${tech.textColor} rounded-full text-sm tech-badge">${tech.name}</span>`
                        ).join('');
                    }

                    // Update stats
                    const statsElement = projectCards[index].querySelector('.mt-4.flex.items-center');
                    if (statsElement && project.stats) {
                        if (project.stats.stars) {
                            const starsSpan = statsElement.querySelector('span');
                            if (starsSpan) {
                                starsSpan.textContent = `${project.stats.stars} stars`;
                            }
                            const licenseSpan = statsElement.querySelectorAll('span')[2];
                            if (licenseSpan) {
                                licenseSpan.textContent = project.stats.license;
                            }
                        } else if (project.stats.language) {
                            const languageSpan = statsElement.querySelector('span');
                            if (languageSpan) {
                                languageSpan.textContent = project.stats.language;
                            }
                            const typeSpan = statsElement.querySelectorAll('span')[2];
                            if (typeSpan) {
                                typeSpan.textContent = project.stats.type;
                            }
                        }
                    }
                }
            });
        }
    }

    renderSkills() {
        // Update section title and subtitle
        const sectionTitle = document.querySelector('#skills h2');
        const sectionSubtitle = document.querySelector('#skills p');
        
        if (sectionTitle) {
            sectionTitle.textContent = this.getText(this.content.skills.title);
        }
        if (sectionSubtitle) {
            sectionSubtitle.textContent = this.getText(this.content.skills.subtitle);
        }

        // Update technology cards if they exist in content
        if (this.content.skills.technologies) {
            const techCards = document.querySelectorAll('#skills .glass-card');
            this.content.skills.technologies.forEach((tech, index) => {
                if (techCards[index]) {
                    const iconElement = techCards[index].querySelector('i');
                    const nameElement = techCards[index].querySelector('h3');
                    
                    if (iconElement) {
                        iconElement.className = `${tech.icon} text-5xl ${tech.color} mb-4`;
                    }
                    if (nameElement) {
                        nameElement.textContent = tech.name;
                    }
                }
            });
        }
    }

    renderContact() {
        // Update section title and subtitle
        const sectionTitle = document.querySelector('#contact h2');
        const sectionSubtitle = document.querySelector('#contact p');
        
        if (sectionTitle) {
            sectionTitle.textContent = this.getText(this.content.contact.title);
        }
        if (sectionSubtitle) {
            sectionSubtitle.textContent = this.getText(this.content.contact.subtitle);
        }

        // Update form placeholders and submit button
        const nameInput = document.querySelector('#contact input[type="text"]');
        const emailInput = document.querySelector('#contact input[type="email"]');
        const messageTextarea = document.querySelector('#contact textarea');
        const submitBtn = document.querySelector('#contact button[type="submit"]');

        if (nameInput) {
            nameInput.placeholder = this.getText(this.content.contact.form.name.placeholder);
        }
        if (emailInput) {
            emailInput.placeholder = this.getText(this.content.contact.form.email.placeholder);
        }
        if (messageTextarea) {
            messageTextarea.placeholder = this.getText(this.content.contact.form.message.placeholder);
        }
        if (submitBtn) {
            submitBtn.textContent = this.getText(this.content.contact.form.submit);
        }
    }

    renderFooter() {
        const footerElement = document.querySelector('footer p');
        if (footerElement && this.content.footer) {
            footerElement.textContent = this.content.footer.copyright;
        }
    }
}

// Initialize content loader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContentLoader();
}); 