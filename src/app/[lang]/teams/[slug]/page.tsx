import { notFound } from 'next/navigation';
import { getTeamMember, getTeamMembers, getStrapiImageUrl } from '@/lib/strapi';
import { generateSEOMetadata } from '@/lib/seo';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import Image from 'next/image';
import Link from 'next/link';
import { marked } from 'marked';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { BreadcrumbList, Person, WithContext } from 'schema-dts';
import { Phone, Mail, MapPin, Globe, Calendar, ArrowLeft } from 'lucide-react';

interface TeamMemberPageProps {
    params: Promise<{
        lang: string;
        slug: string;
    }>;
}

export async function generateStaticParams() {
    try {
        const members = await getTeamMembers('en');
        return members
            .filter((member) => member?.slug)
            .map((member) => ({ slug: member.slug }));
    } catch (error) {
        console.error('generateStaticParams for team member failed:', error);
        return [];
    }
}

export async function generateMetadata({ params }: TeamMemberPageProps): Promise<Metadata> {
    try {
        const { slug, lang } = await params;
        const member = await getTeamMember(slug, lang);
        if (!member) return { title: 'Team Member Not Found' };
        const title = `${member.fullName} | Student's Life`;
        const description = member.responsibilities
            ? member.responsibilities.replace(/[#*_`[\]]/g, '').substring(0, 160)
            : `${member.role} at Student's Life. ${member.city}.`;
        const image = member.photo?.url ? getStrapiImageUrl(member.photo.url) : undefined;
        return generateSEOMetadata({ lang, path: `/teams/${slug}`, title, description, image });
    } catch {
        return { title: "Student's Life" };
    }
}

export const revalidate = 60;

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
    const { slug, lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const memberDict = (dict as any).teamMember;

    const member = await getTeamMember(slug, lang);
    if (!member) notFound();

    marked.setOptions({ breaks: true, gfm: true });
    const parseMarkdown = (content?: string) => {
        if (!content) return null;
        return { __html: marked.parse(content) as string };
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return null;
        const localeMap: Record<string, string> = { ru: 'ru-RU', tk: 'tk-TM', oz: 'uz-UZ', en: 'en-US' };
        return new Date(dateStr).toLocaleDateString(localeMap[lang] ?? 'en-US', {
            year: 'numeric',
            month: 'long',
        });
    };

    const photoUrl = member.photo?.url ? getStrapiImageUrl(member.photo.url) : null;

    const personSchema: WithContext<Person> = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: member.fullName,
        jobTitle: member.role,
        worksFor: {
            '@type': 'Organization',
            name: "Student's Life",
            url: 'https://studs-life.com',
        },
        ...(member.email && { email: member.email }),
        ...(member.phone && { telephone: member.phone }),
        ...(photoUrl && { image: photoUrl }),
        ...(member.city && { address: { '@type': 'PostalAddress', addressLocality: member.city } }),
    };

    const breadcrumbSchema: WithContext<BreadcrumbList> = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: memberDict?.breadcrumbHome ?? 'Home',
                item: `https://studs-life.com/${lang}`,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: memberDict?.breadcrumbTeam ?? 'Team',
                item: `https://studs-life.com/${lang}/teams`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: member.fullName,
                item: `https://studs-life.com/${lang}/teams/${slug}`,
            },
        ],
    };

    return (
        <main className="min-h-screen bg-gray-50 text-black">
            <JsonLd<Person> data={personSchema} />
            <JsonLd<BreadcrumbList> data={breadcrumbSchema} />

            {/* Hero */}
            <section className="bg-[#0A2647] text-white pt-24 pb-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href={`/${lang}/teams`}
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {memberDict?.backToTeam ?? 'Back to Team'}
                    </Link>

                    <div className="flex flex-col md:flex-row items-start gap-10">
                        <div className="w-48 h-48 md:w-64 md:h-64 relative rounded-[2rem] overflow-hidden flex-shrink-0 bg-white/10 shadow-2xl">
                            {photoUrl ? (
                                <Image
                                    src={photoUrl}
                                    alt={member.photo?.alternativeText ?? member.fullName}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 192px, 256px"

                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-6xl">👤</div>
                            )}
                        </div>

                        <div className="flex-1 pt-2">
                            <p className="text-crimson font-serif italic text-lg mb-2">{member.role}</p>
                            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4 leading-tight">
                                {member.fullName}
                            </h1>
                            {member.city && (
                                <div className="flex items-center gap-2 text-white/70 text-sm">
                                    <MapPin className="w-4 h-4 flex-shrink-0" />
                                    <span>{member.city}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-100">
                            <h2 className="font-bold text-gray-900 text-lg mb-5 pb-3 border-b border-gray-100">
                                {memberDict?.contactInfo ?? 'Contact Information'}
                            </h2>
                            <div className="space-y-4">
                                {member.phone && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-crimson flex-shrink-0">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <a
                                            href={`tel:${member.phone}`}
                                            className="text-gray-700 font-medium hover:text-crimson transition-colors text-sm"
                                        >
                                            {member.phone}
                                        </a>
                                    </div>
                                )}
                                {member.email && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-crimson flex-shrink-0">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <a
                                            href={`mailto:${member.email}`}
                                            className="text-gray-700 font-medium hover:text-crimson transition-colors text-sm break-all"
                                        >
                                            {member.email}
                                        </a>
                                    </div>
                                )}
                                {member.languages && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-crimson flex-shrink-0">
                                            <Globe className="w-5 h-5" />
                                        </div>
                                        <span className="text-gray-700 font-medium text-sm">{member.languages}</span>
                                    </div>
                                )}
                                {member.officeAddress && (
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-crimson flex-shrink-0 mt-0.5">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <span className="text-gray-700 font-medium text-sm leading-relaxed">
                                            {member.officeAddress}
                                        </span>
                                    </div>
                                )}
                                {member.startDate && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-crimson flex-shrink-0">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                                                {memberDict?.since ?? 'With us since'}
                                            </p>
                                            <p className="text-gray-700 font-medium text-sm">
                                                {formatDate(member.startDate)}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </aside>

                    {/* Responsibilities */}
                    <div className="lg:col-span-2">
                        {member.responsibilities && (
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                                    {memberDict?.responsibilities ?? 'Expertise & How I Can Help'}
                                </h2>
                                <div
                                    className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-headings:font-bold prose-strong:text-gray-900 prose-li:text-gray-700 leading-relaxed"
                                    dangerouslySetInnerHTML={parseMarkdown(member.responsibilities) ?? { __html: '' }}
                                />
                            </section>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}
