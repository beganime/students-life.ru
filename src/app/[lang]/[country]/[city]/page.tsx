import { notFound } from 'next/navigation';
import { getCity, getCities, getStrapiImageUrl } from '@/lib/strapi';
import { generateSEOMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import { marked } from 'marked';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { Article, BreadcrumbList, WithContext } from 'schema-dts';
import {
  ArrowLeft,
  BookOpen,
  Bus,
  CheckCircle2,
  CloudSun,
  Home,
  Images,
  Landmark,
  MapPin,
  WalletCards,
  type LucideIcon,
} from 'lucide-react';

interface CityPageProps {
  params: Promise<{
    lang: string;
    country: string;
    city: string;
  }>;
}

type ContentSection = {
  id: string;
  navTitle: string;
  title: string;
  content?: string;
  icon: LucideIcon;
};

const copyByLocale = {
  ru: {
    home: 'Главная',
    backToCountry: 'К стране',
    cityGuide: 'Гид по городу',
    overview: 'Обзор',
    economy: 'Экономика и стоимость жизни',
    housing: 'Проживание студентов',
    transport: 'Транспорт и инфраструктура',
    climate: 'Климат',
    conclusion: 'Итог',
    gallery: 'Галерея',
    sections: 'Разделы',
    updated: 'Обновляемый материал',
    season: 'Сезон',
    temperature: 'Температура',
    features: 'Особенности',
    fallbackDescription: 'Подробный гид для студентов по городу, условиям жизни и обучению.',
    empty: 'Материал по этому городу скоро появится.',
  },
  en: {
    home: 'Home',
    backToCountry: 'Back to country',
    cityGuide: 'City guide',
    overview: 'Overview',
    economy: 'Economy and cost of living',
    housing: 'Student accommodation',
    transport: 'Transport and infrastructure',
    climate: 'Climate',
    conclusion: 'Conclusion',
    gallery: 'Gallery',
    sections: 'Sections',
    updated: 'Updated guide',
    season: 'Season',
    temperature: 'Temperature',
    features: 'Features',
    fallbackDescription: 'A detailed student guide to the city, living conditions, and study experience.',
    empty: 'Content for this city will be added soon.',
  },
  tk: {
    home: 'Baş sahypa',
    backToCountry: 'Ýurda dolanmak',
    cityGuide: 'Şäher gollanmasy',
    overview: 'Gysgaça',
    economy: 'Ykdysadyýet we ýaşaýyş çykdajylary',
    housing: 'Talyp ýaşaýyş jaýy',
    transport: 'Ulag we infrastruktura',
    climate: 'Howa',
    conclusion: 'Netije',
    gallery: 'Galereýa',
    sections: 'Bölümler',
    updated: 'Täzelenýän maglumat',
    season: 'Möwsüm',
    temperature: 'Temperatura',
    features: 'Aýratynlyklar',
    fallbackDescription: 'Şäher, ýaşaýyş şertleri we okuw tejribesi barada giňişleýin talyp gollanmasy.',
    empty: 'Bu şäher barada maglumat ýakynda goşular.',
  },
  oz: {
    home: 'Bosh sahifa',
    backToCountry: 'Mamlakatga qaytish',
    cityGuide: 'Shahar bo‘yicha qo‘llanma',
    overview: 'Umumiy maʼlumot',
    economy: 'Iqtisodiyot va yashash xarajatlari',
    housing: 'Talabalar turar joyi',
    transport: 'Transport va infratuzilma',
    climate: 'Iqlim',
    conclusion: 'Xulosa',
    gallery: 'Galereya',
    sections: 'Bo‘limlar',
    updated: 'Yangilanadigan qo‘llanma',
    season: 'Mavsum',
    temperature: 'Harorat',
    features: 'Xususiyatlar',
    fallbackDescription: 'Shahar, yashash sharoitlari va taʼlim tajribasi bo‘yicha batafsil talaba qo‘llanmasi.',
    empty: 'Bu shahar bo‘yicha material tez orada qo‘shiladi.',
  },
};

function getCopy(lang: string) {
  return copyByLocale[lang as keyof typeof copyByLocale] ?? copyByLocale.en;
}

function toPlainText(content?: string): string {
  if (!content) return '';
  return content
    .replace(/<[^>]*>/g, ' ')
    .replace(/[#*_>`~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getClimateRows(climateTable: any): any[] {
  if (Array.isArray(climateTable?.seasons)) return climateTable.seasons;
  if (Array.isArray(climateTable)) return climateTable;
  return [];
}

export async function generateStaticParams() {
  try {
    const cities = await getCities();
    return cities
      .filter((city) => city?.country?.slug)
      .map((city) => ({
        country: city.country.slug,
        city: city.slug,
      }));
  } catch (error) {
    console.error('Build-time fetch failed (this is expected if Strapi is not reachable during build):', error);
    return [];
  }
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  try {
    const { country, city: citySlug, lang } = await params;
    const city = await getCity(country, citySlug, lang);
    if (!city) {
      return {
        title: 'City Not Found',
      };
    }

    const plainIntro = toPlainText(city.intro);
    const title = `${city.title} | Student's Life`;
    const description = city.metaDescription || (plainIntro
      ? plainIntro.substring(0, 160)
      : `Study in ${city.title}, ${city.country?.name}. Comprehensive guide for international students.`);
    const image = city.images && city.images.length > 0 ? getStrapiImageUrl(city.images[0].url) : undefined;

    return generateSEOMetadata({
      lang,
      path: `/${country}/${citySlug}`,
      title,
      description,
      image,
    });
  } catch (error) {
    console.error('Build-time fetch failed in generateMetadata:', error);
    return {
      title: 'Student\'s Life',
      description: 'Comprehensive guide for international students.'
    };
  }
}

export const revalidate = 60;

export default async function CityPage({ params }: CityPageProps) {
  const { country, city: citySlug, lang } = await params;
  const city = await getCity(country, citySlug, lang);
  if (!city) {
    return notFound();
  }

  const {
    title,
    intro,
    economyContent,
    housingContent,
    transportContent,
    climateContent,
    climateTable,
    conclusion,
    images: cityImages,
    country: cityCountry,
    publishedAt,
    updatedAt
  } = city;

  const copy = getCopy(lang);
  const heroImage = cityImages?.[0];
  const heroImageUrl = heroImage ? getStrapiImageUrl(heroImage.url) : '';
  const plainIntro = toPlainText(intro);
  const heroDescription = plainIntro || copy.fallbackDescription;
  const climateRows = getClimateRows(climateTable);

  marked.setOptions({ breaks: true, gfm: true });
  const parseMarkdown = (content?: string) => {
    if (!content) return null;
    return { __html: marked.parse(content) as string };
  };

  const sections: ContentSection[] = [
    { id: 'overview', navTitle: copy.overview, title: copy.overview, content: intro, icon: BookOpen },
    { id: 'economy', navTitle: copy.economy, title: copy.economy, content: economyContent, icon: WalletCards },
    { id: 'housing', navTitle: copy.housing, title: copy.housing, content: housingContent, icon: Home },
    { id: 'transport', navTitle: copy.transport, title: copy.transport, content: transportContent, icon: Bus },
    { id: 'climate', navTitle: copy.climate, title: copy.climate, content: climateContent, icon: CloudSun },
    { id: 'conclusion', navTitle: copy.conclusion, title: copy.conclusion, content: conclusion, icon: CheckCircle2 },
  ].filter((section) => Boolean(section.content) || (section.id === 'climate' && climateRows.length > 0));

  const articleSchema: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: heroDescription.substring(0, 160),
    image: heroImageUrl ? [heroImageUrl] : undefined,
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: {
      "@type": "Organization",
      name: "Student's Life",
      url: "https://studs-life.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Student's Life",
      logo: {
        "@type": "ImageObject",
        url: "https://studs-life.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://studs-life.com/${lang}/${country}/${citySlug}`,
    },
  };

  const breadcrumbSchema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: copy.home,
        item: `https://studs-life.com/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: cityCountry?.name || country,
        item: `https://studs-life.com/${lang}/${country}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `https://studs-life.com/${lang}/${country}/${citySlug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-gray-950">
      <JsonLd<Article> data={articleSchema} />
      <JsonLd<BreadcrumbList> data={breadcrumbSchema} />

      <section className="relative overflow-hidden bg-navy pt-28 md:pt-36">
        {heroImage ? (
          <Image
            src={heroImageUrl}
            alt={heroImage.alternativeText || title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#06182E_0%,#132a45_52%,#273344_100%)]" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,24,46,0.95),rgba(6,24,46,0.78),rgba(6,24,46,0.46))]" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-24">
          <Link
            href={`/${lang}/${country}`}
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-white/75 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {copy.backToCountry}
          </Link>

          <div className="max-w-5xl">
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-sm">
              <MapPin className="h-4 w-4 shrink-0 text-crimson" />
              <span className="truncate">{cityCountry?.name || country}</span>
            </div>

            <h1 className="max-w-5xl break-words text-4xl font-black leading-tight text-white md:text-6xl">
              {title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-white/80 md:text-lg">
              {heroDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white/85 backdrop-blur-sm">
                <Landmark className="h-4 w-4 text-crimson" />
                {copy.cityGuide}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white/85 backdrop-blur-sm">
                <BookOpen className="h-4 w-4 text-crimson" />
                {copy.updated}
              </span>
            </div>
          </div>
        </div>
      </section>

      {sections.length > 0 && (
        <section className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur-md lg:hidden">
          <div className="mx-auto max-w-7xl overflow-x-auto px-4 py-3">
            <div className="flex min-w-max gap-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold text-gray-700"
                  >
                    <Icon className="h-4 w-4 text-crimson" />
                    {section.navTitle}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <article className="min-w-0">
            {sections.length > 0 ? (
              <div className="space-y-10">
                {sections.map((section, index) => {
                  const Icon = section.icon;

                  return (
                    <section
                      key={section.id}
                      id={section.id}
                      className={`scroll-mt-28 ${index === 0 ? '' : 'border-t border-gray-200 pt-10'}`}
                    >
                      <div className="mb-5 flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-crimson/10 text-crimson">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-black uppercase tracking-wide text-crimson">
                            {copy.cityGuide}
                          </p>
                          <h2 className="mt-1 break-words text-2xl font-black leading-tight text-navy md:text-4xl">
                            {section.title}
                          </h2>
                        </div>
                      </div>

                      {section.content && (
                        <div
                          className="study-rich-text rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:p-8"
                          dangerouslySetInnerHTML={parseMarkdown(section.content) || { __html: '' }}
                        />
                      )}

                      {section.id === 'climate' && climateRows.length > 0 && (
                        <div className="mt-5 overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
                          <table className="min-w-full border-collapse text-left text-sm text-gray-700">
                            <thead className="bg-gray-50 text-navy">
                              <tr>
                                <th className="min-w-44 border-b border-gray-200 px-4 py-3 font-black">{copy.season}</th>
                                <th className="min-w-44 border-b border-gray-200 px-4 py-3 font-black">{copy.temperature}</th>
                                <th className="min-w-64 border-b border-gray-200 px-4 py-3 font-black">{copy.features}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {climateRows.map((season: any, rowIndex: number) => (
                                <tr key={rowIndex} className="odd:bg-white even:bg-gray-50/60">
                                  <td className="border-b border-gray-100 px-4 py-3 align-top">{season.name}</td>
                                  <td className="border-b border-gray-100 px-4 py-3 align-top">{season.temperature}</td>
                                  <td className="border-b border-gray-100 px-4 py-3 align-top">{season.features}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
                <p className="text-lg font-bold text-gray-500">{copy.empty}</p>
              </div>
            )}

            {cityImages && cityImages.length > 1 && (
              <section id="gallery" className="mt-12 border-t border-gray-200 pt-10">
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-crimson/10 text-crimson">
                    <Images className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-wide text-crimson">{copy.cityGuide}</p>
                    <h2 className="mt-1 text-2xl font-black text-navy md:text-4xl">{copy.gallery}</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {cityImages.slice(1).map((image) => (
                    <div key={image.id} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-gray-200 bg-gray-200 shadow-sm">
                      <Image
                        src={getStrapiImageUrl(image.url)}
                        alt={image.alternativeText || title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </article>

          {sections.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <p className="mb-3 text-xs font-black uppercase tracking-wide text-gray-500">{copy.sections}</p>
                <nav className="space-y-1">
                  {sections.map((section) => {
                    const Icon = section.icon;

                    return (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 hover:text-crimson"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-crimson" />
                        <span className="break-words">{section.navTitle}</span>
                      </a>
                    );
                  })}
                  {cityImages && cityImages.length > 1 && (
                    <a
                      href="#gallery"
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 hover:text-crimson"
                    >
                      <Images className="h-4 w-4 shrink-0 text-crimson" />
                      <span>{copy.gallery}</span>
                    </a>
                  )}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </section>
    </main>
  );
}
