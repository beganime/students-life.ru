import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";
import MultiStepContactForm from "@/components/MultiStepContactForm";
import JsonLd from "@/components/JsonLd";
import { BreadcrumbList, LocalBusiness, WithContext } from "schema-dts";
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const pageMeta = dict.metadata?.pages?.contact;
  return generateSEOMetadata({
    lang,
    path: '/contact',
    title: pageMeta?.title || `${dict.nav?.contact || 'Contact'} | Student's Life`,
    description: pageMeta?.description || "Get in touch with us for your study abroad journey. Free consultation available.",
  });
}
export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const breadcrumbData: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://studs-life.com/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: `https://studs-life.com/${lang}/contact`,
      },
    ],
  };
  const localBusinessSchema: WithContext<LocalBusiness> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Student's Life",
    "description": "International student education agency providing university admissions, visa assistance, and relocation support.",
    "url": "https://studs-life.com",
    "logo": "https://studs-life.com/logo.webp",
    "image": "https://studs-life.com/og-image.png",
    "telephone": "+993 71 832 749",
    "email": "info@studs-life.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Pushkina 52",
      "addressLocality": "Kazan",
      "addressRegion": "Tatarstan",
      "postalCode": "420111",
      "addressCountry": "RU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 55.7887,
      "longitude": 49.1221
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/stud_life_ru",
      "https://www.tiktok.com/@aga_sila"
    ],
    "priceRange": "$$",
    "areaServed": [
      { "@type": "Country", "name": "Russia" },
      { "@type": "Country", "name": "Turkey" },
      { "@type": "Country", "name": "China" },
      { "@type": "Country", "name": "Turkmenistan" },
      { "@type": "Country", "name": "Kazakhstan" }
    ]
  };
  return (
    <main className="flex-grow">
      <JsonLd<BreadcrumbList> data={breadcrumbData} />
      <JsonLd<LocalBusiness> data={localBusinessSchema} />
      <MultiStepContactForm lang={lang} dict={dict.form as any} />
    </main>
  );
}
