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
        title: dict.legal?.cookiePolicy?.title || "Cookie Policy",
        description: dict.legal?.cookiePolicy?.content?.substring(0, 160) || "",
        path: "/cookie-policy"
    });
}
export default async function CookiePolicy({
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
                "name": dict.legal?.cookiePolicy?.title || "Cookie Policy",
                "item": `https://students-life.com/${lang}/cookie-policy`
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
                    {dict.legal?.cookiePolicy?.title}
                </h1>
                <p className="text-blue-600 font-bold mb-12 flex items-center gap-2">
                    <span className="w-8 h-1 bg-blue-600"></span>
                    {dict.legal?.cookiePolicy?.lastUpdated}
                </p>
                <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-8">
                    <p className="font-medium text-gray-900 text-xl italic border-l-4 border-blue-600 pl-6 py-2 bg-blue-50/50">
                        {dict.legal?.cookiePolicy?.content}
                    </p>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">What are cookies?</h2>
                        <p>Cookies are small text files that are used to store small pieces of information. They are stored on your device when the website is loaded on your browser.</p>
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">How do we use cookies?</h2>
                        <p>As most of the online services, our website uses first-party and third-party cookies for several purposes. First-party cookies are mostly necessary for the website to function the right way, and they do not collect any of your personally identifiable data.</p>
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">Types of cookies we use</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Necessary:</strong> These cookies are essential for you to experience the full functionality of our site.</li>
                            <li><strong>Analytics:</strong> These cookies store information like the number of visitors to the website, the number of unique visitors, which pages of the website have been visited, etc.</li>
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    );
}
