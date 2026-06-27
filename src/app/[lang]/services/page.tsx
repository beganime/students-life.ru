import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";
import ServicesHero from "./components/ServicesHero";
import ServicesGrid from "./components/ServicesGrid";
import CostOfLiving from "./components/CostOfLiving";
import DestinationsHub from "./components/DestinationsHub";
import AccommodationAssistant from "./components/AccommodationAssistant";
import FAQ from "./components/FAQ";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ContactFormSection from "@/components/ContactFormSection";
import OfficeLocations from "@/components/OfficeLocations";
import JsonLd from "@/components/JsonLd";
import { FAQPage, BreadcrumbList, WithContext } from "schema-dts";
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const pageMeta = dict.metadata?.pages?.services;
  return generateSEOMetadata({
    lang,
    path: '/services',
    title: pageMeta?.title || `${dict.nav?.services || 'Services'} | Student's Life`,
    description: pageMeta?.description || "Comprehensive educational support including university admissions, visa assistance, accommodation, and more.",
  });
}
export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const faqItems = Object.keys(dict.servicesPage.faq)
    .filter((key) => key.startsWith("q"))
    .map((key) => {
      const item = dict.servicesPage.faq[key as keyof typeof dict.servicesPage.faq] as any;
      return {
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      };
    });
  const jsonLdData: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems as any,
  };
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
        name: "Services",
        item: `https://studs-life.com/${lang}/services`,
      },
    ],
  };
  const serviceSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: dict.services?.university || "University Admissions",
      description: dict.services?.universityDesc || "Comprehensive university admission support",
      provider: {
        "@type": "Organization",
        name: "Student's Life",
        url: "https://studs-life.com"
      },
      serviceType: "Educational Consulting",
      areaServed: ["Russia", "China", "Turkey", "Cyprus", "Belarus", "Bulgaria"]
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: dict.services?.visa || "Visa Assistance",
      description: dict.services?.visaDesc || "Student visa processing with 99% success rate",
      provider: {
        "@type": "Organization",
        name: "Student's Life"
      },
      serviceType: "Visa Consulting"
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Accommodation",
      description: dict.services?.accommodationDesc || "Student housing and dormitory arrangements",
      provider: {
        "@type": "Organization",
        name: "Student's Life"
      },
      serviceType: "Housing Services"
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: dict.services?.translation || "Document Translation",
      description: dict.services?.translationDesc || "Certified document translation services",
      provider: {
        "@type": "Organization",
        name: "Student's Life"
      },
      serviceType: "Translation Services"
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: dict.services?.ticket || "Flight Tickets",
      description: dict.services?.ticketDesc || "Student discount flight bookings",
      provider: {
        "@type": "Organization",
        name: "Student's Life"
      },
      serviceType: "Travel Services"
    }
  ];
  return (
    <main className="min-h-screen bg-gray-50">
      <JsonLd<FAQPage> data={jsonLdData} />
      <JsonLd<BreadcrumbList> data={breadcrumbData} />
      {serviceSchemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ServicesHero dict={dict.servicesPage.hero} />
      <ScrollReveal direction="up">
        <ServicesGrid dict={dict.servicesPage.coreServices} lang={lang} />
      </ScrollReveal>
      <ScrollReveal direction="up">
        <CostOfLiving dict={dict.servicesPage.costOfLiving} />
      </ScrollReveal>
      <ScrollReveal direction="up">
        <DestinationsHub dict={dict.servicesPage.destinations} lang={lang} />
      </ScrollReveal>
      <ScrollReveal direction="up">
        <AccommodationAssistant dict={dict.servicesPage.accommodationAssistant} lang={lang} />
      </ScrollReveal>
      <ScrollReveal direction="up">
        <FAQ dict={dict.servicesPage.faq} />
      </ScrollReveal>

      {/* Contact Form */}
      <ScrollReveal direction="up">
        <ContactFormSection lang={lang} dict={dict.contactForm} />
      </ScrollReveal>

      {/* Office Locations */}
      <ScrollReveal direction="up">
        <OfficeLocations lang={lang} dict={dict.offices} />
      </ScrollReveal>
    </main>
  );
}
