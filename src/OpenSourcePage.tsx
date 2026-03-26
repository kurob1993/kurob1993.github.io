import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconBrandLinkedin, IconBrandThreads, IconBrandInstagram, IconBrandGithub, IconStar, IconLicense } from '@tabler/icons-react'
import contentData from '../content.json'

function OpenSourcePage() {
  const language = useState<'en' | 'id'>('en')[0]

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa]/80 backdrop-blur-md border-b border-[#e5e5e5]/50">
        <div className="max-width-container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-xs sm:text-sm font-semibold text-[#1a1a1a]">OKURU.ID</span>
          </Link>

          <div className="hidden md:flex items-center gap-4 text-xs sm:text-sm text-[#6b7280]">
            <Link to="/" className="hover:text-[#1a1a1a] transition-colors">Home</Link>
            <span className="text-[#1a1a1a] font-medium">Open Source</span>
          </div>

          <div className="flex md:hidden items-center gap-3 text-[#6b7280]">
            <Link to="/" className="hover:text-[#1a1a1a] transition-colors text-xs sm:text-sm">Home</Link>
            <span className="text-xs sm:text-sm text-[#1a1a1a] font-medium">Open Source</span>
          </div>
        </div>
      </header>

      <main className="pt-24 sm:pt-32 pb-12 sm:pb-16">
        {/* Page Header */}
        <section className="max-width-container mx-auto px-4 mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2">
            {language === 'en' ? contentData.openSource.title.en : contentData.openSource.title.id}
          </h1>
          <p className="text-sm sm:text-base text-[#6b7280]">
            {language === 'en'
              ? 'Open source projects I have built and contributed to.'
              : 'Proyek open source yang telah saya buat dan kontribusi.'}
          </p>
        </section>

        {/* Open Source Grid */}
        <section className="max-width-container mx-auto px-4 mb-12 sm:mb-16">
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

          {contentData.openSource.projects.length === 0 && (
            <div className="text-center py-16 text-[#6b7280]">
              <p className="text-sm sm:text-base">
                {language === 'en' ? 'No open source projects yet.' : 'Belum ada proyek open source.'}
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e5e5e5]">
        <div className="max-width-container mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6b7280]">
            © {new Date().getFullYear()} Okuru.id. All Rights Reserved.
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

export default OpenSourcePage
