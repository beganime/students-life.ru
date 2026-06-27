"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { NewsPost, getStrapiImageUrl } from "@/lib/strapi";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import ScrollReveal from "@/components/ui/ScrollReveal";
interface LatestJournalProps {
    lang: string;
    dict: any;
    posts: NewsPost[];
}
export default function LatestJournal({ lang, dict, posts = [] }: LatestJournalProps) {
    if (!posts || posts.length === 0) return null;
    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                    <ScrollReveal direction="left" className="lg:w-1/3 flex flex-col justify-center">
                        <div>
                            <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-[10px] md:text-xs font-bold tracking-wider uppercase text-gray-500 mb-6 w-fit">
                                {dict.badge || "Journal"}
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-8 leading-tight">
                                {dict?.title_part1 || "Explore Our"} {dict?.title_part2 || "Latest News"}
                            </h2>
                            <div className="flex">
                                <Link href={`/${lang}/blog`}>
                                    <InteractiveHoverButton
                                        className="bg-white text-black border-gray-200"
                                        dotClassName="bg-crimson"
                                    >
                                        {dict?.viewAll || "View all news"}
                                    </InteractiveHoverButton>
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                    <div className="lg:w-2/3 flex flex-col gap-6">
                        {posts.map((post, index) => {
                            const imageUrl = post.image?.url ? getStrapiImageUrl(post.image.url) : null;
                            return (
                                <ScrollReveal
                                    key={post.id}
                                    direction="up"
                                    delay={index * 0.15}
                                >
                                    <Link
                                        href={`/${lang}/blog/${post.slug}`}
                                        className="group flex flex-col md:flex-row gap-6 p-4 rounded-3xl hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="relative h-48 md:h-32 w-full md:w-48 overflow-hidden rounded-2xl flex-shrink-0">
                                            {imageUrl ? (
                                                <Image
                                                    src={imageUrl}
                                                    alt={post.image?.alternativeText || post.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"

                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                    <span className="text-gray-400 text-xs">{dict?.noImage || "No Image"}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col justify-center flex-grow">
                                            <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>
                                                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </span>
                                                {post.category && (
                                                    <>
                                                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                                                        <span>{post.category}</span>
                                                    </>
                                                )}
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-crimson transition-colors line-clamp-2 mb-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-2">
                                                {post.summary}
                                            </p>
                                        </div>
                                        <div className="hidden md:flex items-center flex-shrink-0 text-gray-300 group-hover:text-crimson transition-colors">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </Link>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
