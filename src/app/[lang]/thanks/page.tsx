import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Link from "next/link";
import { Instagram, FileDown, MessageCircle, Home, CheckCircle } from "lucide-react";
import { generateSEOMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { BreadcrumbList, WithContext } from "schema-dts";
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return generateSEOMetadata({
    lang,
    title: dict.thanksPage.title,
    description: dict.thanksPage.message.substring(0, 160),
    path: "/thanks",
    noIndex: true
  });
}
export default async function ThanksPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dict = await getDictionary(lang);
  const INSTAGRAM_URL = "https://www.instagram.com/stud_life_ru";
  const WHATSAPP_NUMBER = "99312345678";
  const PDF_URL = "/downloads/russia-student-guide.pdf";
  const ctas = [
    {
      icon: Instagram,
      title: dict.thanksPage.ctas.instagram.title,
      description: dict.thanksPage.ctas.instagram.description,
      button: dict.thanksPage.ctas.instagram.button,
      href: INSTAGRAM_URL,
      color: "from-pink-500 to-purple-600",
      external: true,
    },
    {
      icon: FileDown,
      title: dict.thanksPage.ctas.pdf.title,
      description: dict.thanksPage.ctas.pdf.description,
      button: dict.thanksPage.ctas.pdf.button,
      href: PDF_URL,
      color: "from-blue-500 to-cyan-600",
      external: false,
      download: true,
    },
    {
      icon: MessageCircle,
      title: dict.thanksPage.ctas.whatsapp.title,
      description: dict.thanksPage.ctas.whatsapp.description,
      button: dict.thanksPage.ctas.whatsapp.button,
      href: `https://wa.me/${WHATSAPP_NUMBER}`,
      color: "from-green-500 to-emerald-600",
      external: true,
    },
  ];
  const jsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": lang === 'ru' ? 'Главная' : lang === 'tk' ? 'Baş sahypa' : 'Home',
        "item": `https://students-life.com/${lang}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": dict.thanksPage.title,
        "item": `https://students-life.com/${lang}/thanks`
      }
    ]
  };
  return (
    <main className="h-screen bg-gray-50 flex items-center justify-center px-4 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl w-full">
        {}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-3 md:mb-4 shadow-xl">
            <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={3} />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-1 md:mb-2 uppercase tracking-tight">
            {dict.thanksPage.title}
          </h1>
          <p className="text-base md:text-xl text-gray-700 font-bold mb-1 md:mb-2">
            {dict.thanksPage.subtitle}
          </p>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
            {dict.thanksPage.message}
          </p>
        </div>
        {}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
          {ctas.map((cta, index) => {
            const Icon = cta.icon;
            return (
              <a
                key={index}
                href={cta.href}
                target={cta.external ? "_blank" : undefined}
                rel={cta.external ? "noopener noreferrer" : undefined}
                download={cta.download}
                className="group bg-white rounded-xl p-3 md:p-4 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-crimson flex md:block items-center md:items-start gap-3 md:gap-0"
              >
                <div className={`flex-shrink-0 inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${cta.color} rounded-lg mb-0 md:mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1 md:flex-none">
                  <h3 className="text-xs md:text-sm font-black text-gray-900 mb-0.5 md:mb-1 uppercase">
                    {cta.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-1 md:mb-3 leading-relaxed line-clamp-1 md:line-clamp-2">
                    {cta.description}
                  </p>
                  <span className="inline-block text-crimson font-bold text-xs group-hover:underline">
                    {cta.button} →
                  </span>
                </div>
              </a>
            );
          })}
        </div>
        {}
        <div className="text-center">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-crimson text-white font-black uppercase tracking-widest rounded-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-xs md:text-sm"
          >
            <Home className="w-3.5 h-3.5 md:w-4 md:h-4" />
            {dict.thanksPage.ctas.home}
          </Link>
        </div>
      </div>
    </main>
  );
}
