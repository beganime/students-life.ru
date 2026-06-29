import { notFound } from 'next/navigation';
import { getBestStrapiImage, getCountry, getCities, getStrapiImageUrl, isRemoteStrapiMediaUrl, normalizeStrapiImages } from '@/lib/strapi';
import { generateSEOMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import JsonLd from '@/components/JsonLd';
import { BreadcrumbList, WithContext } from 'schema-dts';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import dynamic from 'next/dynamic';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { ArrowRight, Building2, Globe2, GraduationCap, MapPin } from 'lucide-react';

const OfficeLocations = dynamic(() => import('@/components/OfficeLocations'));
const ContactFormSection = dynamic(() => import('@/components/ContactFormSection'));

interface CountryPageProps {
  params: Promise<{
    lang: string;
    country: string;
  }>;
}

const copyByLocale = {
  ru: {
    home: 'Главная',
    eyebrow: 'Страна для обучения',
    studyIn: 'Обучение:',
    overview: 'О направлении',
    overviewLead: 'Краткая информация о стране, городах и возможностях для студентов.',
    citiesTitle: 'Города для обучения',
    citiesLead: 'Выберите город и изучите условия жизни, жилье, транспорт, климат и расходы.',
    viewCities: 'Смотреть города',
    contact: 'Получить консультацию',
    citiesEmpty: 'Города скоро появятся',
    citiesCount: 'городов',
    cmsManaged: 'Контент из CMS',
    details: 'Подробнее',
    gallery: 'Фотографии направления',
    fallbackDescription: 'Информация по этому направлению скоро будет обновлена.',
  },
  en: {
    home: 'Home',
    eyebrow: 'Study destination',
    studyIn: 'Study in',
    overview: 'Destination overview',
    overviewLead: 'A concise guide to the country, student cities, and opportunities.',
    citiesTitle: 'Cities for studying',
    citiesLead: 'Choose a city and explore life costs, housing, transport, climate, and student life.',
    viewCities: 'View cities',
    contact: 'Get consultation',
    citiesEmpty: 'Cities coming soon',
    citiesCount: 'cities',
    cmsManaged: 'CMS content',
    details: 'Details',
    gallery: 'Destination photos',
    fallbackDescription: 'Information for this destination will be updated soon.',
  },
  tk: {
    home: 'Baş sahypa',
    eyebrow: 'Okuw ugry',
    studyIn: 'Okuw:',
    overview: 'Ýurt barada',
    overviewLead: 'Ýurt, talyp şäherleri we mümkinçilikler barada gysga maglumat.',
    citiesTitle: 'Okuw üçin şäherler',
    citiesLead: 'Şäher saýlaň we ýaşaýyş çykdajylaryny, jaý, ulag, howa we talyp durmuşyny öwreniň.',
    viewCities: 'Şäherleri görmek',
    contact: 'Maslahat almak',
    citiesEmpty: 'Şäherler ýakynda goşular',
    citiesCount: 'şäher',
    cmsManaged: 'CMS mazmuny',
    details: 'Has giňişleýin',
    gallery: 'Ugur suratlary',
    fallbackDescription: 'Bu ugur barada maglumat ýakynda täzelener.',
  },
  oz: {
    home: 'Bosh sahifa',
    eyebrow: 'Taʼlim yoʻnalishi',
    studyIn: 'Taʼlim:',
    overview: 'Yoʻnalish haqida',
    overviewLead: 'Mamlakat, talabalar shaharlari va imkoniyatlar haqida qisqa maʼlumot.',
    citiesTitle: 'Taʼlim uchun shaharlar',
    citiesLead: 'Shaharni tanlang va yashash xarajatlari, turar joy, transport, iqlim va talaba hayotini oʻrganing.',
    viewCities: 'Shaharlarni ko‘rish',
    contact: 'Maslahat olish',
    citiesEmpty: 'Shaharlar tez orada qoʻshiladi',
    citiesCount: 'shahar',
    cmsManaged: 'CMS kontenti',
    details: 'Batafsil',
    gallery: 'Yoʻnalish suratlari',
    fallbackDescription: 'Bu yoʻnalish bo‘yicha maʼlumot tez orada yangilanadi.',
  },
};

function getCopy(lang: string) {
  return copyByLocale[lang as keyof typeof copyByLocale] ?? copyByLocale.en;
}

export async function generateStaticParams() {
  try {
    const countries = await import('@/lib/strapi').then(m => m.getCountries());
    return countries.map((country) => ({
      country: country.slug,
    }));
  } catch (error) {
    console.error('Build-time fetch failed:', error);
    return [];
  }
}

export const revalidate = 60;

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  try {
    const { country: countrySlug, lang } = await params;
    const country = await getCountry(countrySlug, lang);
    if (!country) return { title: 'Country Not Found' };

    return generateSEOMetadata({
      lang,
      path: `/${countrySlug}`,
      title: `${country.name} | Student's Life`,
      description: country.description || `Discover study opportunities in ${country.name}. Universities, cities, and student life guide.`,
    });
  } catch {
    return { title: 'Student\'s Life' };
  }
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { country: countrySlug, lang } = await params;
  const country = await getCountry(countrySlug, lang);
  const cities = await getCities(countrySlug, lang);

  if (!country) {
    return notFound();
  }

  const dict: any = await getDictionary(lang as Locale);
  const copy = getCopy(lang);
  const countryImages = normalizeStrapiImages(country.images);
  const cityPreviewImages = cities.flatMap((city) => normalizeStrapiImages(city.images));
  const heroImage = countryImages[0] || cityPreviewImages[0] || null;
  const heroImageUrl = heroImage?.url ? getStrapiImageUrl(heroImage.url) : '';
  const galleryImages = [...countryImages.slice(heroImage ? 1 : 0), ...cityPreviewImages]
    .filter((image, index, all) => image.url && all.findIndex((item) => item.url === image.url) === index)
    .slice(0, 4);
  const description = country.description?.trim() || copy.fallbackDescription;

  const breadcrumbData: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: copy.home, item: `https://studs-life.com/${lang}` },
      { "@type": "ListItem", position: 2, name: country.name, item: `https://studs-life.com/${lang}/${countrySlug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-gray-950">
      <JsonLd<BreadcrumbList> data={breadcrumbData} />

      <section className="relative min-h-[620px] overflow-hidden bg-navy pt-24 md:min-h-[640px] md:pt-36">
        {heroImage ? (
          <Image
            src={heroImageUrl}
            alt={heroImage.alternativeText || country.name}
            fill
            unoptimized={isRemoteStrapiMediaUrl(heroImageUrl)}
            className="object-cover object-center md:object-[center_45%]"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#06182E_0%,#10243f_55%,#202938_100%)]" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,24,46,0.88),rgba(6,24,46,0.72)_45%,rgba(6,24,46,0.9)),linear-gradient(90deg,rgba(6,24,46,0.88),rgba(6,24,46,0.55),rgba(6,24,46,0.32))]" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-24">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/70">
            <Link href={`/${lang}`} className="hover:text-white transition-colors">
              {copy.home}
            </Link>
            <span>/</span>
            <span className="text-white">{country.name}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-sm">
              <MapPin className="h-4 w-4 shrink-0 text-crimson" />
              <span className="truncate">{copy.eyebrow}</span>
            </div>

            <h1 className="max-w-4xl break-words text-4xl font-black leading-tight text-white md:text-6xl">
              {copy.studyIn} <span className="text-crimson">{country.name}</span>
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-white/80 md:text-lg">
              {description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#cities"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-crimson px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-black/20 transition-colors hover:bg-red-700"
              >
                {copy.viewCities}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#country-contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 py-3 text-sm font-black uppercase tracking-wide text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                {copy.contact}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-px bg-gray-200 px-4 md:grid-cols-3 md:px-8">
          <div className="bg-white py-6 md:pr-8">
            <div className="flex items-center gap-3">
              <Globe2 className="h-5 w-5 text-crimson" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500">{copy.eyebrow}</p>
                <p className="mt-1 break-words text-lg font-black text-navy">{country.name}</p>
              </div>
            </div>
          </div>
          <div className="bg-white py-6 md:px-8">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-crimson" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500">{copy.citiesTitle}</p>
                <p className="mt-1 text-lg font-black text-navy">{cities.length} {copy.citiesCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-white py-6 md:pl-8">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-crimson" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Student's Life</p>
                <p className="mt-1 text-lg font-black text-navy">{copy.cmsManaged}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f7f9] py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
          {galleryImages.length > 0 && (
            <div>
              <p className="mb-4 text-sm font-black uppercase tracking-wide text-crimson">{copy.gallery}</p>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {galleryImages.map((img, index) => (
                  <div
                    key={img.id ?? img.url}
                    className={`relative overflow-hidden rounded-lg border border-white bg-gray-200 shadow-sm ${index === 0 ? 'col-span-2 aspect-[16/9] sm:col-span-1 sm:row-span-2 sm:aspect-auto sm:min-h-80' : 'aspect-[4/3]'}`}
                  >
                    <Image
                      src={getStrapiImageUrl(img.url)}
                      alt={img.alternativeText || `${country.name} ${index + 1}`}
                      fill
                      unoptimized={isRemoteStrapiMediaUrl(img.url)}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={galleryImages.length > 0 ? '' : 'lg:col-span-2'}>
            <p className="text-sm font-black uppercase tracking-wide text-crimson">{copy.overview}</p>
            <h2 className="mt-3 max-w-3xl break-words text-3xl font-black leading-tight text-navy md:text-5xl">
              {country.name}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-gray-500">
              {copy.overviewLead}
            </p>
            <div className="study-rich-text mt-8 max-w-4xl whitespace-pre-line rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:p-8">
              {description}
            </div>
          </div>
        </div>
      </section>

      <section id="cities" className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-9 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-wide text-crimson">{copy.citiesTitle}</p>
            <h2 className="mt-3 break-words text-3xl font-black leading-tight text-navy md:text-5xl">
              {copy.citiesTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600 md:text-lg">
              {copy.citiesLead}
            </p>
          </div>

          {cities.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {cities.map((city) => {
                const image = getBestStrapiImage(city.images) || heroImage;
                const imageUrl = image?.url ? getStrapiImageUrl(image.url) : null;

                return (
                  <Link
                    key={city.id}
                    href={`/${lang}/${countrySlug}/${city.slug}`}
                    className="group flex min-h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-crimson/30 hover:shadow-xl"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(135deg,#06182E,#26384f)]">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={`${city.name} - Student life`}
                          fill
                          unoptimized={isRemoteStrapiMediaUrl(imageUrl)}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-white/80">
                          <MapPin className="h-10 w-10" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="break-words text-2xl font-black leading-tight text-gray-950 transition-colors group-hover:text-crimson">
                        {city.name}
                      </h3>
                      <p className="mt-3 line-clamp-3 break-words text-sm leading-6 text-gray-600">
                        {city.title}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-navy">
                        {copy.details}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-5 py-12 text-center">
              <p className="text-lg font-bold text-gray-500">{copy.citiesEmpty}</p>
            </div>
          )}
        </div>
      </section>

      <section id="country-contact">
        <ScrollReveal direction="up">
          <ContactFormSection lang={lang} dict={dict.contactForm} />
        </ScrollReveal>
      </section>

      <ScrollReveal direction="up">
        <OfficeLocations lang={lang} dict={dict.offices} />
      </ScrollReveal>
    </main>
  );
}
