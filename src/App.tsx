import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconMail, IconBrandGithub, IconBrandLinkedin, IconBrandInstagram, IconBrandWhatsapp, IconBrandThreads, IconLayoutGrid, IconDeviceDesktop, IconPalette, IconCode, IconBrandDocker, IconBrain, IconRoute, IconStar, IconLicense } from '@tabler/icons-react'
import contentData from '../content.json'

const clientLogos = [
  { name: 'Danareksa', logo: '/images/danareksa.png' },
  { name: 'Krakatau Medika', logo: '/images/km.png' },
  { name: 'CIMB NIAGA', logo: '/images/cimb-niaga.png' },
  { name: 'IASH', logo: '/images/iash.png' },
  { name: 'Krakatau Steel', logo: '/images/ks.png' },
  { name: 'Krakatau Tirta Industri', logo: '/images/kti.png' },
  { name: 'Pemkot Cilegon', logo: '/images/pemkot-cilegon.png' },
  { name: 'Yayasan Pendidikan Telkom', logo: '/images/ypt.png' },
]

const services = [
  {
    icon: IconCode,
    title: 'Fullstack App',
    description: 'Building end-to-end web and mobile applications with modern frameworks and scalable architecture.',
  },
  {
    icon: IconBrain,
    title: 'AI Integration Project',
    description: 'Integrating AI capabilities into existing systems to enhance automation and decision-making.',
  },
  {
    icon: IconRoute,
    title: 'Automation Workflow System',
    description: 'Designing workflow automation to streamline business processes and improve efficiency.',
  },
  {
    icon: IconBrandDocker,
    title: 'DevOps',
    description: 'Setting up CI/CD pipelines, containerization, and infrastructure for reliable deployments.',
  },
]

function App() {
  const [language, setLanguage] = useState<'en' | 'id'>('en')
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('kurob@okuru.id')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Toast Notification */}
      {copied && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white text-sm px-4 py-3 rounded-lg shadow-lg z-[100] animate-fade-in">
          Email copied to clipboard!
        </div>
      )}
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa]/80 backdrop-blur-md border-b border-[#e5e5e5]/50">
        <div className="max-width-container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Mobile: Just OKURU.ID */}
          <div className="flex items-center">
            <span className="text-xs sm:text-sm font-semibold text-[#1a1a1a]">OKURU.ID</span>
          </div>

          {/* Desktop: Full links */}
          <div className="hidden md:flex items-center gap-4 text-xs sm:text-sm text-[#6b7280]">
            <a href="#blog" className="hover:text-[#1a1a1a] transition-colors">Blog</a>
            <a href="#open-source" className="hover:text-[#1a1a1a] transition-colors">Open Source</a>
          </div>

          {/* Mobile: Social Icons Only */}
          <div className="flex md:hidden items-center gap-3 text-[#6b7280]">
            <a href="#blog" className="hover:text-[#1a1a1a] transition-colors text-xs sm:text-sm">Blog</a>
            <a href="#open-source" className="hover:text-[#1a1a1a] transition-colors text-xs sm:text-sm">Open Source</a>
          </div>
        </div>
      </header>

      <main className="pt-24 sm:pt-32 pb-12 sm:pb-16">
        {/* Hero Section */}
        <section className="max-width-container mx-auto px-4 text-center mb-16 sm:mb-24">
          <div className="animate-fade-in">
            {/* Mobile View - Full width photo with overlay text */}
            <div className="md:hidden w-full mb-8 sm:mb-12">
              <div className="w-full relative">
                <img
                  src="/images/profile-half.webp"
                  alt="Kurob"
                  className="w-full h-auto object-cover"
                />
                {/* Overlay Text */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md p-4 text-left">
                  <p className="text-xl sm:text-2xl font-semibold text-[#1a1a1a] mb-1">
                    {language === 'en' ? "Hi, I'm Kurob" : 'Halo, Saya Kurob'}
                  </p>
                  <h1 className="text-base font-medium text-[#6b7280] leading-tight">
                    {language === 'en'
                      ? "I'm from Indonesia with 10+ years of experience as a full-stack web developer. Currently at PT Krakatau IT and available for freelance projects. I build dynamic, responsive, and robust web solutions."
                      : "Saya dari Indonesia dengan 10+ tahun pengalaman sebagai full-stack web developer. Saat ini di PT Krakatau IT dan tersedia untuk proyek freelance. Saya membangun solusi web yang dinamis, responsif, dan tangguh."}
                  </h1>
                </div>
              </div>
            </div>

            {/* Desktop View - Side by side: Photo Left, Text Right */}
            <div className="hidden md:flex flex-row items-start gap-8 mb-12">
              {/* Photo - Left */}
              <div className="w-1/2">
                <img
                  src="/images/profile.webp"
                  alt="Kurob"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>

              {/* Text - Right, left aligned, no background */}
              <div className="w-1/2 self-center">
                <p className="text-xl lg:text-2xl font-semibold text-[#1a1a1a] mb-2">
                  {language === 'en' ? "Hi, I'm Kurob" : 'Halo, Saya Kurob'}
                </p>
                <h1 className="text-lg lg:text-xl font-medium text-[#6b7280] leading-tight mb-6">
                  {language === 'en'
                    ? "I'm from Indonesia with 10+ years of experience as a full-stack web developer. Currently at PT Krakatau IT and available for freelance projects. I build dynamic, responsive, and robust web solutions."
                    : "Saya dari Indonesia dengan 10+ tahun pengalaman sebagai full-stack web developer. Saat ini di PT Krakatau IT dan tersedia untuk proyek freelance. Saya membangun solusi web yang dinamis, responsif, dan tangguh."}
                </h1>
                {/* Contact Me Button */}
                <a href="#contact">
                  <button className="btn-primary inline-flex items-center gap-2">
                    {language === 'en' ? 'Contact Me' : 'Hubungi Saya'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </a>
              </div>
            </div>


            {/* Language Toggle - Mobile Only */}
            <div className="mt-6 sm:mt-8 flex flex-col items-center gap-4 max-w-xl mx-auto md:hidden">
              {/* Language Toggle */}
              <div className="flex items-center gap-1 bg-white rounded-full p-1 border border-[#e5e5e5]">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                    language === 'en' ? 'bg-[#1a1a1a] text-white' : 'text-[#6b7280] hover:text-[#1a1a1a]'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('id')}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                    language === 'id' ? 'bg-[#1a1a1a] text-white' : 'text-[#6b7280] hover:text-[#1a1a1a]'
                  }`}
                >
                  ID
                </button>
              </div>

              {/* Contact Button - Scroll to CTA */}
              <a href="#contact">
                <button className="btn-primary inline-flex items-center gap-2">
                  {language === 'en' ? 'Contact Me' : 'Hubungi Saya'}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </a>
            </div>

            {/* Language Toggle - Desktop Only */}
            <div className="hidden md:flex justify-center mt-8">
              <div className="flex items-center gap-1 bg-white rounded-full p-1 border border-[#e5e5e5]">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                    language === 'en' ? 'bg-[#1a1a1a] text-white' : 'text-[#6b7280] hover:text-[#1a1a1a]'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('id')}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                    language === 'id' ? 'bg-[#1a1a1a] text-white' : 'text-[#6b7280] hover:text-[#1a1a1a]'
                  }`}
                >
                  ID
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Client Logos - Auto scrolling marquee with card */}
        <section className="max-width-container mx-auto px-4 mb-12 sm:mb-16">
          <div className="bg-white rounded-2xl sm:rounded-3xl py-6 sm:py-10 shadow-[0_4px_40px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="flex animate-marquee">
              {[...clientLogos, ...clientLogos].map((client, index) => (
                <div
                  key={`${client.name}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center px-8 sm:px-10 opacity-60 hover:opacity-100 transition-opacity"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-8 sm:h-10 md:h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Collaborate Text */}
        <section className="max-width-container mx-auto px-4 mb-12 sm:mb-16 text-center">
          <p className="text-base sm:text-xl md:text-2xl text-[#6b7280]">
            Collaborate with brands and agencies to create impactful results.
          </p>
        </section>

        {/* Services Section */}
        <section className="max-width-container mx-auto px-4 mb-12 sm:mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 sm:p-8 shadow-[0_4px_40px_rgba(0,0,0,0.06)] text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_60px_rgba(0,0,0,0.1)]"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#fafafa] flex items-center justify-center mx-auto mb-3 sm:mb-6">
                  <service.icon className="w-5 h-5 sm:w-7 sm:h-7 text-[#1a1a1a]" />
                </div>
                <h3 className="text-sm sm:text-lg font-semibold text-[#1a1a1a] mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-xs sm:text-sm text-[#6b7280] leading-relaxed hidden sm:block">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="max-width-container mx-auto px-4 mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-2">
            {language === 'en' ? contentData.blog.title.en : contentData.blog.title.id}
          </h2>
          <p className="text-sm sm:text-base text-[#6b7280] mb-8">
            {language === 'en' ? contentData.blog.subtitle.en : contentData.blog.subtitle.id}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {contentData.blog.posts.slice(0, 3).map((post, index) => (
              <a key={index} href={post.url} className="group">
                <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_4px_40px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_60px_rgba(0,0,0,0.1)] h-full flex flex-col">
                  <span className="text-xs font-medium text-[#6b7280] mb-2">
                    {language === 'en' ? post.category.en : post.category.id}
                  </span>
                  <h3 className="text-sm sm:text-base font-semibold text-[#1a1a1a] mb-2 group-hover:text-[#4b5563] transition-colors">
                    {language === 'en' ? post.title.en : post.title.id}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6b7280] leading-relaxed flex-grow line-clamp-3">
                    {language === 'en' ? post.excerpt.en : post.excerpt.id}
                  </p>
                  <div className="flex items-center justify-between text-xs text-[#9ca3af] mt-4">
                    <span>{post.date}</span>
                    <span>{language === 'en' ? post.readTime.en : post.readTime.id}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-[#6b7280] hover:text-[#1a1a1a] transition-colors">
              {language === 'en' ? 'View All Posts' : 'Lihat Semua Artikel'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
        <section id="open-source" className="max-width-container mx-auto px-4 mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-8">
            {language === 'en' ? contentData.openSource.title.en : contentData.openSource.title.id}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {contentData.openSource.projects.map((project, index) => (
              <a key={index} href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="group">
                <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_4px_40px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_60px_rgba(0,0,0,0.1)] h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <IconBrandGithub className="w-5 h-5 text-[#1a1a1a]" />
                    <h3 className="text-sm sm:text-base font-semibold text-[#1a1a1a] group-hover:text-[#4b5563] transition-colors">
                      {language === 'en' ? project.title.en : project.title.id}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6b7280] leading-relaxed flex-grow mb-4">
                    {language === 'en' ? project.description.en : project.description.id}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className={`px-2 py-1 text-xs rounded-full ${tech.bgColor} ${tech.textColor}`}>
                        {tech.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#9ca3af]">
                    {project.stats.stars !== undefined && (
                      <span className="inline-flex items-center gap-1">
                        <IconStar size={14} /> {project.stats.stars}
                      </span>
                    )}
                    {project.stats.language && (
                      <span>{project.stats.language}</span>
                    )}
                    {project.stats.license && (
                      <span className="inline-flex items-center gap-1">
                        <IconLicense size={14} /> {project.stats.license}
                      </span>
                    )}
                    {project.stats.type && (
                      <span>{project.stats.type}</span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/open-source" className="inline-flex items-center gap-2 text-sm font-medium text-[#6b7280] hover:text-[#1a1a1a] transition-colors">
              {language === 'en' ? 'View All Projects' : 'Lihat Semua Proyek'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
        <section id="contact" className="max-width-container mx-auto px-4 mb-12 sm:mb-16">
          <div className="bg-[#1a1a1a] rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-center text-white">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6 sm:mb-8">
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8">
              Tell me about your next project
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={handleCopyEmail}
                className="bg-white text-[#1a1a1a] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors inline-flex items-center gap-2 justify-center"
              >
                <IconMail size={18} />
                Contact Me
              </button>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                <button className="bg-transparent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-sm border border-white/30 hover:border-white transition-colors inline-flex items-center gap-2 justify-center">
                  <IconBrandWhatsapp size={18} />
                  WhatsApp
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e5e5e5]">
        <div className="max-width-container mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6b7280]">
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://linkedin.com/in/kurob1993" target="_blank" rel="noopener noreferrer" className="text-[#6b7280] hover:text-[#1a1a1a] transition-colors">
              <IconBrandLinkedin size={20} />
            </a>
            <a href="https://www.threads.com/@_okuru.id" target="_blank" rel="noopener noreferrer" className="text-[#6b7280] hover:text-[#1a1a1a] transition-colors">
              <IconBrandThreads size={20} />
            </a>
            <a href="https://instagram.com/kurob1993" target="_blank" rel="noopener noreferrer" className="text-[#6b7280] hover:text-[#1a1a1a] transition-colors">
              <IconBrandInstagram size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
