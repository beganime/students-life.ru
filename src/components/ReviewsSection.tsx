import { getReviews } from "@/lib/strapi";
import ReviewForm from "@/components/ReviewForm";
import { Star } from "lucide-react";
import Link from "next/link";

interface ReviewsSectionProps {
    lang: string;
    dict?: any;
}

export function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(star => (
                <Star
                    key={star}
                    className={`w-4 h-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                />
            ))}
        </div>
    );
}

export const SERVICE_LABELS: Record<string, string> = {
    university: "University",
    school: "School",
    transfer: "Transfer",
    visa: "Visa",
    umrah: "Umrah",
    ticket: "Ticket",
    other: "Other",
};

export function ReviewCard({ review, t, lang }: { review: any; t: any; lang: string }) {
    const formatDate = (iso: string) =>
        new Date(iso).toLocaleDateString(lang === "ru" ? "ru-RU" : lang === "tk" ? "tr-TR" : "en-US", {
            year: "numeric",
            month: "short",
        });

    const serviceLabel = (service?: string) => {
        if (!service) return null;
        return t?.services?.[service] || SERVICE_LABELS[service] || service;
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                    <p className="font-bold text-gray-900">{review.name}</p>
                    {review.city && <p className="text-xs text-gray-400">{review.city}</p>}
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <StarRating rating={review.rating} />
                    <span className="text-xs text-gray-400">{formatDate(review.publishedAt)}</span>
                </div>
            </div>
            {review.service && review.service !== "other" && (
                <span className="inline-block mb-2 px-2 py-0.5 rounded-full bg-gray-100 text-xs font-semibold text-gray-600">
                    {serviceLabel(review.service)}
                </span>
            )}
            <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">{review.content}</p>
        </div>
    );
}

export default async function ReviewsSection({ lang, dict }: ReviewsSectionProps) {
    const reviews = await getReviews(3);
    const t = dict?.reviews || {};

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 bg-white text-[10px] md:text-xs font-bold tracking-wider uppercase text-gray-500 mb-4">
                        {t.badge || "ОТЗЫВЫ"}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-4">
                        {t.title || "What Our Students Say"}
                    </h2>
                    <p className="text-base md:text-lg text-gray-500 font-medium max-w-2xl mx-auto">
                        {t.subtitle || "Real reviews from students we've helped"}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div>
                        {reviews.length === 0 ? (
                            <div className="text-center py-16 text-gray-400 font-medium">
                                {t.empty || "No reviews yet. Be the first!"}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {reviews.map(review => (
                                    <ReviewCard key={review.id} review={review} t={t} lang={lang} />
                                ))}
                                <Link
                                    href={`/${lang}/reviews`}
                                    className="block text-center w-full py-3 rounded-xl border-2 border-gray-200 text-sm font-bold text-gray-600 hover:border-crimson hover:text-crimson transition-colors"
                                >
                                    {t.viewAll || "View all reviews →"}
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="lg:sticky lg:top-8">
                        <ReviewForm lang={lang} dict={dict} />
                    </div>
                </div>
            </div>
        </section>
    );
}
