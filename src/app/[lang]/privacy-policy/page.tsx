import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import { generateSEOMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { BreadcrumbList, WithContext } from "schema-dts";
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    return generateSEOMetadata({
        lang,
        title: dict.legal?.privacyPolicy?.title || "Privacy Policy",
        description: dict.legal?.privacyPolicy?.content?.substring(0, 160) || "",
        path: "/privacy-policy"
    });
}
export default async function PrivacyPolicy({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
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
                "name": dict.legal?.privacyPolicy?.title || "Privacy Policy",
                "item": `https://students-life.com/${lang}/privacy-policy`
            }
        ]
    };
    return (
        <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tighter">
                    {dict.legal?.privacyPolicy?.title}
                </h1>
                <p className="text-blue-600 font-bold mb-12 flex items-center gap-2">
                    <span className="w-8 h-1 bg-blue-600"></span>
                    {dict.legal?.privacyPolicy?.lastUpdated}
                </p>
                <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-8">
                    <p className="font-medium text-gray-900 text-xl italic border-l-4 border-blue-600 pl-6 py-2 bg-blue-50/50">
                        {dict.legal?.privacyPolicy?.content}
                    </p>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">1. Information Collection</h2>
                        <p>We collect information you provide directly to us when you fill out contact forms, apply for services, or communicate with us.</p>
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">2. How We Use Information</h2>
                        <p>We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect Student's Life Agency and our users.</p>
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">3. Information Sharing</h2>
                        <p>We do not share your personal information with companies, organizations, or individuals outside of Student's Life Agency except in cases where it is necessary for service provision (e.g., university applications).</p>
                    </section>
                </div>
            </div>
        </main>
    );
}
