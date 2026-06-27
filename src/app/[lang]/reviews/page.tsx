import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";
import { getReviews } from "@/lib/strapi";
import { ReviewCard, StarRating } from "@/components/ReviewsSection";
import ReviewForm from "@/components/ReviewForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const titles: Record<string, string> = {
        ru: 'Отзывы студентов | Student\'s Life',
        tk: 'Talyp synlary | Student\'s Life',
        oz: 'Talabalar sharhlari | Student\'s Life',
        en: 'Student Reviews | Student\'s Life',
    };
    const descs: Record<string, string> = {
        ru: 'Читайте реальные отзывы студентов, которым мы помогли поступить в университеты по всему миру.',
        tk: 'Biz kömek eden talyplarymyzyň hakyky synlaryny okaň.',
        oz: 'Biz yordam bergan talabalarning haqiqiy sharhlarini o\'qing.',
        en: 'Read real reviews from students we\'ve helped apply to universities around the world.',
    };
    return generateSEOMetadata({
        lang,
        path: '/reviews',
        title: titles[lang] || titles.en,
        description: descs[lang] || descs.en,
    });
}

export default async function ReviewsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict: any = await getDictionary(lang as Locale);
    const reviews = await getReviews();
    const t = dict?.reviews || {};

    const avgRating = reviews.length
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : null;

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-[#0A2647] pt-24 pb-16 px-4">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <Link
                        href={`/${lang}`}
                        className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-8 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        {t.backHome || "Back to Home"}
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">{t.title || "What Our Students Say"}</h1>
                    <p className="text-white/70 text-lg">{t.subtitle || "Real reviews from students we've helped"}</p>
                    {avgRating && (
                        <div className="mt-6 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                            <StarRating rating={Math.round(Number(avgRating))} />
                            <span className="font-black text-2xl">{avgRating}</span>
                            <span className="text-white/60 text-sm">/ 5 · {reviews.length} {t.reviewCount || "reviews"}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* All reviews */}
                    <div className="lg:col-span-2">
                        {reviews.length === 0 ? (
                            <div className="text-center py-24 text-gray-400 font-medium">
                                {t.empty || "No reviews yet. Be the first!"}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {reviews.map(review => (
                                    <ReviewCard key={review.id} review={review} t={t} lang={lang} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Form */}
                    <div className="lg:sticky lg:top-8">
                        <ReviewForm lang={lang} dict={dict} />
                    </div>
                </div>
            </div>
        </main>
    );
}
