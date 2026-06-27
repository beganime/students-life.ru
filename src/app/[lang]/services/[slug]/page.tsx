import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";
import ContactFormSection from "@/components/ContactFormSection";
import TrustCertificates from "@/components/TrustCertificates";
import StudsGallery from "@/components/StudsGallery";
import {
  serviceContent,
  serviceSlugMap,
  ServiceSlug,
} from "@/data/serviceContent";

export const revalidate = 3600;

const ALL_SLUGS: ServiceSlug[] = [
  "university",
  "visa",
  "transport",
  "translation",
  "support",
  "work-visa",
  "rvp",
];

export async function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const serviceSlug = serviceSlugMap[slug] as ServiceSlug | undefined;
  if (!serviceSlug) return {};
  const content =
    serviceContent[lang]?.[serviceSlug] ||
    serviceContent["ru"][serviceSlug];
  return generateSEOMetadata({
    lang,
    path: `/services/${slug}`,
    title: `${content.title} | Student's Life`,
    description: content.intro,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  const serviceSlug = serviceSlugMap[slug] as ServiceSlug | undefined;
  if (!serviceSlug) notFound();

  const content =
    serviceContent[lang]?.[serviceSlug] ||
    serviceContent["ru"][serviceSlug];
  if (!content) notFound();

  const dict: any = await getDictionary(lang as Locale);
  const backLabel =
    dict?.teamMember?.backToTeam ||
    (lang === "ru"
      ? "Назад к услугам"
      : lang === "tk"
      ? "Hyzmatlara dolanmak"
      : lang === "oz"
      ? "Xizmatlarga qaytish"
      : "Back to Services");



  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-[#0A2647] pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Link
            href={`/${lang}/services`}
            className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-8 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {backLabel}
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            {content.title}
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl">
            {content.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Intro */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12">
          <p className="text-gray-700 text-lg leading-relaxed">{content.intro}</p>
        </div>

        {/* Countries */}
        {content.countries && content.countries.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6">
              {lang === "ru"
                ? "Страны поступления"
                : lang === "tk"
                ? "Okuwa girjek ýurtlar"
                : lang === "oz"
                ? "O'qish mamlakatlari"
                : "Destination Countries"}
            </h2>
            <div className="flex flex-wrap gap-3">
              {content.countries.map((c, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-800 shadow-sm"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://flagcdn.com/24x18/${c.flag}.png`}
                    width={24}
                    height={18}
                    alt={c.name}
                    className="rounded-sm object-cover flex-shrink-0"
                  />
                  {c.name}
                  {c.note && (
                    <span className="text-xs font-normal text-crimson">
                      {c.note}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Features grid */}
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">
          {lang === "ru"
            ? "Что входит в услугу"
            : lang === "tk"
            ? "Hyzmatyň mazmuny"
            : lang === "oz"
            ? "Xizmat tarkibi"
            : "What's Included"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {content.features.map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex gap-4"
            >
              <CheckCircle2 className="w-6 h-6 text-crimson flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Process steps */}
        {content.process && (
          <>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">
              {lang === "ru"
                ? "Как мы работаем"
                : lang === "tk"
                ? "Nähili işleýäris"
                : lang === "oz"
                ? "Qanday ishlaymiz"
                : "How We Work"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {content.process.map((step, i) => (
                <div key={i} className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="text-4xl font-black text-crimson/20 mb-3">{step.step}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                  {i < content.process!.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300 z-10" />
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Trust Certificates — university only */}
        {serviceSlug === 'university' && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">
              {lang === 'ru'
                ? 'Наши доверенности'
                : lang === 'tk'
                ? 'Ygtyýarnamalarymyz'
                : lang === 'oz'
                ? 'Ishonchnomalarimiz'
                : 'Our Authorizations'}
            </h2>
            <TrustCertificates />
          </div>
        )}

        {/* Student Photo Gallery — university only */}
        {serviceSlug === 'university' && (
          <StudsGallery
            title={
              lang === 'ru'
                ? 'Наши студенты'
                : lang === 'tk'
                ? 'Biziň talyplarymyz'
                : lang === 'oz'
                ? "Bizning talabalarimiz"
                : 'Our Students'
            }
          />
        )}

      </div>
      <ContactFormSection lang={lang} dict={dict.contactForm} />
    </main>
  );
}
