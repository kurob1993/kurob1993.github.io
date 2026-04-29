import { useEffect } from 'react'

const SITE_NAME = 'Okuru.id'
const SITE_URL = 'https://kurob1993.github.io'
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/profile-half.webp`
const STRUCTURED_DATA_ID = 'seo-structured-data'

type SchemaValue = Record<string, unknown> | Array<Record<string, unknown>>

type SeoConfig = {
  title: string
  description: string
  canonicalPath: string
  keywords?: string
  type?: string
  image?: string
  schema?: SchemaValue
  lang?: string
}

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)

  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value)
  })
}

function setMetaByName(name: string, content: string) {
  upsertMeta(`meta[name="${name}"]`, { name, content })
}

function setMetaByProperty(property: string, content: string) {
  upsertMeta(`meta[property="${property}"]`, { property, content })
}

function setCanonicalUrl(url: string) {
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }

  canonical.href = url
}

function setStructuredData(schema?: SchemaValue) {
  const existing = document.getElementById(STRUCTURED_DATA_ID)

  if (!schema) {
    existing?.remove()
    return
  }

  const script = existing ?? document.createElement('script')
  script.id = STRUCTURED_DATA_ID
  script.setAttribute('type', 'application/ld+json')
  script.textContent = JSON.stringify(schema)

  if (!existing) {
    document.head.appendChild(script)
  }
}

function toAbsoluteUrl(path: string) {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  return `${SITE_URL}${path}`
}

export function useSeo({
  title,
  description,
  canonicalPath,
  keywords,
  type = 'website',
  image = DEFAULT_OG_IMAGE,
  schema,
  lang = 'id',
}: SeoConfig) {
  useEffect(() => {
    const canonicalUrl = toAbsoluteUrl(canonicalPath)
    const imageUrl = toAbsoluteUrl(image)

    document.title = title
    document.documentElement.lang = lang

    setMetaByName('description', description)

    if (keywords) {
      setMetaByName('keywords', keywords)
    }

    setMetaByName('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    setMetaByName('author', 'Kurob')
    setMetaByName('twitter:card', 'summary_large_image')
    setMetaByName('twitter:title', title)
    setMetaByName('twitter:description', description)
    setMetaByName('twitter:image', imageUrl)

    setMetaByProperty('og:type', type)
    setMetaByProperty('og:site_name', SITE_NAME)
    setMetaByProperty('og:title', title)
    setMetaByProperty('og:description', description)
    setMetaByProperty('og:url', canonicalUrl)
    setMetaByProperty('og:image', imageUrl)

    setCanonicalUrl(canonicalUrl)
    setStructuredData(schema)
  }, [canonicalPath, description, image, keywords, lang, schema, title, type])
}

export { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE }
