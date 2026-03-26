import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconBrandLinkedin, IconBrandThreads, IconBrandInstagram } from '@tabler/icons-react'
import blogContent from '../blog-content.json'

function BlogPage() {
  const language = useState<'en' | 'id'>('en')[0]
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredPosts = activeCategory === 'all'
    ? blogContent.blog.posts
    : blogContent.blog.posts.filter((post) => post.categorySlug === activeCategory)

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
            <span className="text-[#1a1a1a] font-medium">Blog</span>
          </div>

          <div className="flex md:hidden items-center gap-3 text-[#6b7280]">
            <Link to="/" className="hover:text-[#1a1a1a] transition-colors text-xs sm:text-sm">Home</Link>
            <span className="text-xs sm:text-sm text-[#1a1a1a] font-medium">Blog</span>
          </div>
        </div>
      </header>

      <main className="pt-24 sm:pt-32 pb-12 sm:pb-16">
        {/* Page Header */}
        <section className="max-width-container mx-auto px-4 mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2">
            {language === 'en' ? blogContent.blog.title.en : blogContent.blog.title.id}
          </h1>
          <p className="text-sm sm:text-base text-[#6b7280]">
            {language === 'en' ? blogContent.blog.subtitle.en : blogContent.blog.subtitle.id}
          </p>
        </section>

        {/* Category Filter */}
        <section className="max-width-container mx-auto px-4 mb-8 sm:mb-12">
          <div className="flex flex-wrap gap-2">
            {blogContent.blog.categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setActiveCategory(category.slug)}
                className={`px-4 py-2 text-xs sm:text-sm rounded-full transition-all ${
                  activeCategory === category.slug
                    ? 'bg-[#1a1a1a] text-white'
                    : 'bg-white text-[#6b7280] border border-[#e5e5e5] hover:text-[#1a1a1a] hover:border-[#1a1a1a]'
                }`}
              >
                {language === 'en' ? category.en : category.id}
              </button>
            ))}
          </div>
        </section>

        {/* Blog Grid */}
        <section className="max-width-container mx-auto px-4 mb-12 sm:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredPosts.map((post, index) => (
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

          {filteredPosts.length === 0 && (
            <div className="text-center py-16 text-[#6b7280]">
              <p className="text-sm sm:text-base">No posts found in this category.</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e5e5e5]">
        <div className="max-width-container mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6b7280]">
            {blogContent.footer.copyright.replace('{year}', new Date().getFullYear().toString())}
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

export default BlogPage
