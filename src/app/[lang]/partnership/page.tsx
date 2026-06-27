import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";
import PartnershipHero from "./components/PartnershipHero";

import PartnershipModels from "./components/PartnershipModels";
import CountryCityShowcase from "./components/CountryCityShowcase";
import ContactFormSection from "@/components/ContactFormSection";
import TrustCertificates from "@/components/TrustCertificates";
import OfficeLocations from "@/components/OfficeLocations";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/JsonLd";
import { BreadcrumbList, WithContext } from "schema-dts";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const page = dict.partnershipPage;

    return generateSEOMetadata({
        lang,
        path: "/partnership",
        title: `${page?.hero?.title || "University Partnership"} | Student's Life`,
        description:
            page?.hero?.subtitle ||
            "Partner with Student's Life to recruit talented international students from Central Asia.",
    });
}

export default async function PartnershipPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const page = dict.partnershipPage;

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
                name: page?.hero?.title || "Partnership",
                item: `https://studs-life.com/${lang}/partnership`,
            },
        ],
    };

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Student's Life",
        url: "https://studs-life.com",
        description: page?.hero?.subtitle,
        contactPoint: {
            "@type": "ContactPoint",
            email: page?.contact?.email || "partners@stud-life.com",
            telephone: page?.contact?.phone || "+99371250041",
            contactType: "Partnership",
        },
    };

    return (
        <main className="min-h-screen bg-gray-50 overflow-x-hidden">
            <JsonLd<BreadcrumbList> data={breadcrumbData} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />

            <PartnershipHero dict={page.hero} benefits={page.benefits} lang={lang} />

            <ScrollReveal direction="up">
                <PartnershipModels dict={page.b2bModels} />
            </ScrollReveal>

            <ScrollReveal direction="up">
                <CountryCityShowcase dict={page.geography} stats={page.stats} />
            </ScrollReveal>

            <ScrollReveal direction="up">
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
                </section>
            </ScrollReveal>

            <div id="contact-form">
                <ContactFormSection lang={lang} dict={dict.contactForm} />
            </div>

            <OfficeLocations lang={lang} dict={dict.offices} />
        </main>
    );
}
