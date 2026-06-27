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
        title: dict.legal?.termsOfUse?.title || "Terms of Use",
        description: dict.legal?.termsOfUse?.content?.substring(0, 160) || "",
        path: "/terms-of-use"
    });
}
export default async function TermsOfUse({
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
                "name": dict.legal?.termsOfUse?.title || "Terms of Use",
                "item": `https://students-life.com/${lang}/terms-of-use`
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
                    {dict.legal?.termsOfUse?.title}
                </h1>
                <p className="text-blue-600 font-bold mb-12 flex items-center gap-2">
                    <span className="w-8 h-1 bg-blue-600"></span>
                    {dict.legal?.termsOfUse?.lastUpdated}
                </p>
                <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-8">
                    <p className="font-medium text-gray-900 text-xl italic border-l-4 border-blue-600 pl-6 py-2 bg-blue-50/50">
                        {dict.legal?.termsOfUse?.content}
                    </p>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">1. Terms</h2>
                        <p>By accessing this website, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">2. Use License</h2>
                        <p>Permission is granted to temporarily download one copy of the materials (information or software) on Student's Life Agency's website for personal, non-commercial transitory viewing only.</p>
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">3. Disclaimer</h2>
                        <p>The materials on Student's Life Agency's website are provided on an 'as is' basis. Student's Life Agency makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                    </section>
                </div>
            </div>
        </main>
    );
}
