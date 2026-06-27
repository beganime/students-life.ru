import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";
import TeamByCity from "@/components/TeamByCity";
import { getOffices, getTeamMembers, type TeamMember, type Office } from "@/lib/strapi";
import JsonLd from "@/components/JsonLd";
import { BreadcrumbList, WithContext } from "schema-dts";
import ContactFormSection from "@/components/ContactFormSection";
import OfficeLocations from "@/components/OfficeLocations";
import ScrollReveal from "@/components/ui/ScrollReveal";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const pageMeta = dict.metadata?.pages?.teams;
  return generateSEOMetadata({
    lang,
    path: '/teams',
    title: pageMeta?.title || `${dict.team?.title || 'Our Team'} | Student's Life`,
    description: pageMeta?.description || "Meet our diverse team of education consultants dedicated to helping students achieve their study abroad goals.",
  });
}
export default async function TeamsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dict = await getDictionary(lang);
  let teamMembers: TeamMember[] = [];
  let offices: Office[] = [];
  try {
    [teamMembers, offices] = await Promise.all([
      getTeamMembers(lang),
      getOffices(),
    ]);
  } catch (error) {
    console.error('Teams page fetch failed:', error);
  }
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
        name: "Team",
        item: `https://studs-life.com/${lang}/teams`,
      },
    ],
  };
  const personSchemas = teamMembers.map((member) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.fullName,
    jobTitle: member.role,
    worksFor: {
      "@type": "Organization",
      name: "Student's Life",
      url: "https://studs-life.com"
    },
    ...(member.email && { email: member.email }),
    ...(member.phone && { telephone: member.phone }),
    ...(member.photo?.url && { image: member.photo.url }),
  }));
  return (
    <div className="bg-gray-50 pt-10 pb-8">
      <JsonLd<BreadcrumbList> data={breadcrumbData} />
      {personSchemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <TeamByCity lang={lang} dict={dict.team} offices={offices} />

      {/* Contact Form */}
      <ScrollReveal direction="up">
        <ContactFormSection lang={lang} dict={dict.contactForm} />
      </ScrollReveal>

      {/* Office Locations */}
      <ScrollReveal direction="up">
        <OfficeLocations lang={lang} dict={dict.offices} />
      </ScrollReveal>
    </div>
  );
}
