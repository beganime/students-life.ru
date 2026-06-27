import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";
import AboutHero from "./components/AboutHero";
import MissionVisionCards from "./components/MissionVisionCards";
import CompanyTimeline from "./components/CompanyTimeline";
import DepartmentsGrid from "./components/DepartmentsGrid";
import TrustSection from "../services/components/TrustSection";
import TrustCertificates from "@/components/TrustCertificates";
import StudsGallery from "@/components/StudsGallery";
import ContactFormSection from "@/components/ContactFormSection";
import OfficeLocations from "@/components/OfficeLocations";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/JsonLd";
import { BreadcrumbList, AboutPage as AboutPageSchema, WithContext } from "schema-dts";
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const pageMeta = dict.metadata?.pages?.about;
  return generateSEOMetadata({
    lang,
    path: '/about',
    title: pageMeta?.title || `${dict.nav?.about || 'About Us'} | Student's Life`,
    description: pageMeta?.description || "Learn about Student's Life - your trusted partner for international education consulting.",
  });
}
export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
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
        name: "About Us",
        item: `https://studs-life.com/${lang}/about`,
      },
    ],
  };
  const aboutPageSchema: WithContext<AboutPageSchema> = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": dict.aboutPage?.hero?.title || "About Student's Life",
    "description": dict.metadata?.pages?.about?.description || "Learn about Student's Life - your trusted partner for international education consulting.",
    "url": `https://studs-life.com/${lang}/about`,
    "mainEntity": {
      "@type": "Organization",
      "name": "Student's Life",
      "foundingDate": "2018",
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "minValue": 10,
        "maxValue": 50
      },
      "areaServed": ["Russia", "Turkey", "China", "Belarus", "Bulgaria", "Cyprus", "Kazakhstan"],
      "knowsAbout": ["University Admissions", "Student Visa", "Study Abroad", "International Education"]
    },
    "inLanguage": lang === 'tk' ? 'tk' : lang === 'ru' ? 'ru' : 'en'
  };
  return (
    <main className="min-h-screen bg-gray-50">
      <JsonLd<BreadcrumbList> data={breadcrumbData} />
      <JsonLd<AboutPageSchema> data={aboutPageSchema} />
      <AboutHero dict={dict.aboutPage.hero} />
      <ScrollReveal direction="up">
        <MissionVisionCards dict={dict.aboutPage} />
      </ScrollReveal>
      <ScrollReveal direction="up">
        <CompanyTimeline dict={dict.aboutPage.timeline} />
      </ScrollReveal>
      <ScrollReveal direction="up">
        <TrustSection dict={dict.servicesPage.trust} />
      </ScrollReveal>
      <ScrollReveal direction="up">
        <DepartmentsGrid dict={dict.aboutPage.departments} />
      </ScrollReveal>
      <ScrollReveal direction="up">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">
            {lang === 'ru' ? 'Наши доверенности' : lang === 'tk' ? 'Ygtyýarnamalarymyz' : lang === 'oz' ? 'Ishonchnomalarimiz' : 'Our Authorizations'}
          </h2>
          <TrustCertificates />
        </section>
      </ScrollReveal>
      <ScrollReveal direction="up">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <StudsGallery title={lang === 'ru' ? 'Наши студенты' : lang === 'tk' ? 'Biziň talyplarmyz' : lang === 'oz' ? 'Bizning talabalarimiz' : 'Our Students'} />
        </section>
      </ScrollReveal>
      <ScrollReveal direction="up">
        <ContactFormSection lang={lang} dict={dict.contactForm} />
      </ScrollReveal>
      <OfficeLocations lang={lang} dict={dict.offices} />
    </main>
  );
}
