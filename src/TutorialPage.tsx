import { Link } from 'react-router-dom'
import {
  IconBrandLinkedin,
  IconBrandThreads,
  IconBrandInstagram,
  IconBrandGoogleDrive,
  IconWifi,
  IconDeviceMobile,
  IconDeviceTv,
  IconShieldLock,
  IconBellRinging,
  IconDownload,
  IconCloudDownload,
  IconHistory,
  IconShare,
  IconArrowLeft,
} from '@tabler/icons-react'
import { useSeo } from './seo'

const YOUTUBE_TUTORIAL_URL = 'https://www.youtube.com/watch?v=RhEmwJHyTg4'
const IPTV_APK_URL = 'https://drive.google.com/drive/folders/1Vgu8msKIpY2lcPk9xNdp2reJaJISj8qz'
const IPTV_QR_API_URL = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(IPTV_APK_URL)}`

const steps = [
  {
    number: 1,
    icon: IconWifi,
    title: 'Hubungkan ke Wi-Fi yang Sama',
    description:
      'Pastikan Smart TV dan HP/laptop Anda terhubung ke jaringan Wi-Fi yang sama. LocalSend hanya bekerja di jaringan lokal — tidak butuh internet.',
    detail: 'Wi-Fi yang sama wajib untuk TV + HP + Laptop',
  },
  {
    number: 2,
    icon: IconBrandGoogleDrive,
    title: 'Install LocalSend di TV',
    description:
      'Buka Google Play Store di Android TV/Google TV, cari "LocalSend", lalu install. App ini open-source dan gratis.',
    detail: 'Play Store → Cari "LocalSend" → Install',
  },
  {
    number: 3,
    icon: IconDeviceMobile,
    title: 'Install LocalSend di HP',
    description:
      'Install LocalSend di HP Android/iOS atau laptop Windows/Mac/Linux. Tersedia gratis di semua app store.',
    detail: 'Tersedia di Play Store, App Store, Microsoft Store, Flathub',
  },
  {
    number: 4,
    icon: IconShare,
    title: 'Kirim File dari HP ke TV',
    description:
      'Buka LocalSend di HP → tab Send → pilih file/foto/video/apk → pilih nama TV Anda dari daftar perangkat terdekat.',
    detail: 'Send → pilih file → tap nama TV',
  },
  {
    number: 5,
    icon: IconShieldLock,
    title: 'Terima File di TV',
    description:
      'Di TV, buka tab Receive. Default minta konfirmasi (Accept/Decline) agar aman. Atau set Favorite/On untuk auto-accept dari perangkat tepercaya.',
    detail: 'Receive → Accept → file tersimpan di folder Download',
  },
  {
    number: 6,
    icon: IconHistory,
    title: 'Cek File di File Manager',
    description:
      'File tersimpan di folder Download. Gunakan File Manager (FX File Explorer, X-Plore, File Commander) untuk lihat, install apk, atau hapus file.',
    detail: 'Download folder → File Manager untuk akses mudah',
  },
]

const tips = [
  {
    icon: IconBellRinging,
    title: 'Mode Receive',
    description:
      'Off = minta konfirmasi tiap file. Favorite = auto-accept dari perangkat tertentu. On = auto-accept semua perangkat di jaringan yang sama.',
  },
  {
    icon: IconShieldLock,
    title: 'Aktifkan PIN',
    description:
      'Di Settings → Require PIN untuk menambah keamanan. Setiap transfer wajib masukkan PIN sehingga tidak semua orang di jaringan bisa kirim file.',
  },
  {
    icon: IconDeviceTv,
    title: 'Ganti Nama Perangkat',
    description:
      'Settings → Device Name untuk ubah nama TV. Ganti nama agar mudah dikenali saat muncul di daftar perangkat terdekat HP.',
  },
]

function TutorialPage() {
  useSeo({
    title: 'Panduan Instalasi APK IPTV di Android TV | Okuru.id',
    description:
      'Tutorial lengkap cara install APK IPTV di Android TV/Smart TV menggunakan LocalSend. Transfer cepat via Wi-Fi tanpa internet, cross-platform Android/iOS/Windows/Mac/Linux.',
    canonicalPath: '/#/ip-tv',
    keywords:
      'tutorial localsend, transfer file ke android tv, kirim file ke smart tv, localsend android tv, wireless file transfer tv, share file hp ke tv, localsend google tv',
    type: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Panduan Instalasi APK IPTV di Android TV',
      description:
        'Panduan langkah demi langkah cara mengirim file dari HP ke Android TV/Smart TV menggunakan aplikasi LocalSend.',
      inLanguage: 'id',
      totalTime: 'PT10M',
      supply: 'Aplikasi LocalSend di TV dan HP, koneksi Wi-Fi yang sama',
      tool: [{ '@type': 'HowToTool', name: 'LocalSend' }],
      step: steps.map((s) => ({
        '@type': 'HowToStep',
        position: s.number,
        name: s.title,
        text: s.description,
      })),
    },
    lang: 'id',
  })

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa]/80 backdrop-blur-md border-b border-[#e5e5e5]/50">
        <div className="max-width-container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-[#1a1a1a]">
            <IconArrowLeft size={18} />
            <span className="text-xs sm:text-sm font-semibold">OKURU.ID</span>
          </Link>

          <nav aria-label="Navigasi tutorial" className="hidden md:flex items-center gap-4 text-xs sm:text-sm text-[#6b7280]">
            <Link to="/" className="hover:text-[#1a1a1a] transition-colors">Home</Link>
            <span className="text-[#1a1a1a] font-medium">Tutorial</span>
          </nav>

          <nav aria-label="Navigasi tutorial mobile" className="flex md:hidden items-center gap-3 text-[#6b7280]">
            <Link to="/" className="hover:text-[#1a1a1a] transition-colors text-xs sm:text-sm">Home</Link>
            <span className="text-xs sm:text-sm text-[#1a1a1a] font-medium">Tutorial</span>
          </nav>
        </div>
      </header>

      <main className="pt-24 sm:pt-32 pb-12 sm:pb-16">
        {/* Page Header */}
        <section className="max-width-container mx-auto px-4 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F9D58]/10 mb-4">
            <IconShare size={14} className="text-[#0F9D58]" />
            <span className="text-xs font-medium text-[#0F9D58]">Tutorial LocalSend</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-3">
            Panduan Instalasi APK IPTV di Android TV
          </h1>
          <p className="text-sm sm:text-base text-[#6b7280] mb-5 max-w-2xl leading-relaxed">
            Kirim file, foto, video, atau APK dari HP/laptop ke Smart TV dengan cepat melalui Wi-Fi lokal — tanpa internet, tanpa kabel.
            Cross-platform Android, iOS, Windows, Mac, dan Linux. Mengacu pada{' '}
            <a
              href={YOUTUBE_TUTORIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1a1a1a] font-medium underline underline-offset-2 hover:text-[#0F9D58] transition-colors"
            >
              tutorial YouTube Smart TV Guide
            </a>
            .
          </p>
          <a
            href={YOUTUBE_TUTORIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#6b7280] hover:text-[#1a1a1a] transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>
            Tonton Video Tutorial (11:39)
          </a>
        </section>

        {/* Download IPTV APK */}
        <section className="max-width-container mx-auto px-4 mb-12 sm:mb-16">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-[0_4px_40px_rgba(0,0,0,0.06)] text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#22C55E]/10 mb-6">
              <IconCloudDownload size={16} className="text-[#22C55E]" />
              <span className="text-xs sm:text-sm font-medium text-[#22C55E]">Download APK IPTV</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-3">
              Unduh APK IPTV
            </h2>
            <p className="text-sm text-[#6b7280] mb-8 max-w-md mx-auto">
              Scan QR Code di bawah dengan HP Anda untuk mengunduh file APK IPTV, lalu transfer ke TV menggunakan LocalSend.
            </p>

            {/* Large QR Code */}
            <div className="inline-block bg-white p-4 sm:p-6 rounded-2xl border border-[#e5e5e5] mb-6">
              <img
                src={IPTV_QR_API_URL}
                alt="QR Code untuk download APK IPTV"
                width={240}
                height={240}
                className="w-[220px] h-[220px] sm:w-[240px] sm:h-[240px]"
                loading="lazy"
              />
            </div>
            <p className="text-xs text-[#9ca3af] mb-6">Atau buka link manual di bawah</p>

            <a
              href={IPTV_APK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#22C55E] hover:bg-[#16a34a] text-white font-medium text-sm px-7 py-4 rounded-full transition-all duration-200 break-all"
            >
              <IconDownload size={18} />
              Buka Link Download APK
            </a>
          </div>
        </section>

        {/* Steps Grid */}
        <section className="max-width-container mx-auto px-4 mb-12 sm:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_4px_40px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_60px_rgba(0,0,0,0.1)] h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#fafafa] flex items-center justify-center">
                    <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a1a1a]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-[#e5e5e5] leading-none">
                      {String(step.number).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-semibold text-[#1a1a1a] mb-2">
                  Langkah {step.number}: {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6b7280] leading-relaxed mb-4">{step.description}</p>

                <div className="mt-auto bg-[#fafafa] rounded-xl px-4 py-3">
                  <p className="text-xs sm:text-sm text-[#1a1a1a] font-medium leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section className="max-width-container mx-auto px-4 mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6 sm:mb-8">
            Tips Penting Penggunaan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_4px_40px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_60px_rgba(0,0,0,0.1)]"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0F9D58]/10 flex items-center justify-center mb-4">
                  <tip.icon className="w-5 h-5 text-[#0F9D58]" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-[#1a1a1a] mb-2">{tip.title}</h3>
                <p className="text-xs sm:text-sm text-[#6b7280] leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#e5e5e5]">
        <div className="max-width-container mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6b7280]">
            © {new Date().getFullYear()} Okuru.id. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://linkedin.com/in/kurob1993" target="_blank" rel="noopener noreferrer" className="text-[#6b7280] hover:text-[#1a1a1a] transition-colors" aria-label="LinkedIn Kurob">
              <IconBrandLinkedin size={20} />
            </a>
            <a href="https://www.threads.com/@_okuru.id" target="_blank" rel="noopener noreferrer" className="text-[#6b7280] hover:text-[#1a1a1a] transition-colors" aria-label="Threads Kurob">
              <IconBrandThreads size={20} />
            </a>
            <a href="https://instagram.com/kurob1993" target="_blank" rel="noopener noreferrer" className="text-[#6b7280] hover:text-[#1a1a1a] transition-colors" aria-label="Instagram Kurob">
              <IconBrandInstagram size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default TutorialPage
