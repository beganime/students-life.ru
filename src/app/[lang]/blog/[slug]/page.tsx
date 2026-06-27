import { notFound } from 'next/navigation';
import { getNewsPost, getNewsPosts, getStrapiImageUrl } from '@/lib/strapi';
import { generateSEOMetadata } from '@/lib/seo';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import Image from 'next/image';
import Link from 'next/link';
import { marked } from 'marked';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { BreadcrumbList, Article, WithContext } from 'schema-dts';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';

interface NewsPostPageProps {
    params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
    try {
        const posts = await getNewsPosts();
        return posts.filter((p) => p?.slug).map((p) => ({ slug: p.slug }));
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }: NewsPostPageProps): Promise<Metadata> {
    try {
        const { slug, lang } = await params;
        const post = await getNewsPost(slug);
        if (!post) return { title: 'Not Found' };
        const image = post.image?.url ? getStrapiImageUrl(post.image.url) : undefined;
        return generateSEOMetadata({
            lang,
            path: `/blog/${slug}`,
            title: `${post.title} | Student's Life`,
            description: post.summary,
            image,
        });
    } catch {
        return { title: "Student's Life" };
    }
}

export const revalidate = 60;

export default async function NewsPostPage({ params }: NewsPostPageProps) {
    const { slug, lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const blogDict = (dict as any).latestJournal || {};

    const post = await getNewsPost(slug);
    if (!post) notFound();

    marked.setOptions({ breaks: true, gfm: true });
    const contentHtml = post.content
        ? (marked.parse(post.content) as string)
        : null;

    const imageUrl = post.image?.url ? getStrapiImageUrl(post.image.url) : null;

    const articleSchema: WithContext<Article> = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.summary,
        datePublished: post.publishedAt,
        ...(imageUrl && { image: imageUrl }),
        author: { '@type': 'Organization', name: "Student's Life" },
        publisher: {
            '@type': 'Organization',
            name: "Student's Life",
            url: 'https://studs-life.com',
        },
    };

    const breadcrumbSchema: WithContext<BreadcrumbList> = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `https://studs-life.com/${lang}` },
            { '@type': 'ListItem', position: 2, name: blogDict.label || 'News', item: `https://studs-life.com/${lang}/blog` },
            { '@type': 'ListItem', position: 3, name: post.title, item: `https://studs-life.com/${lang}/blog/${slug}` },
        ],
    };

    return (
        <main className="min-h-screen bg-gray-50 text-black">
            <JsonLd<Article> data={articleSchema} />
            <JsonLd<BreadcrumbList> data={breadcrumbSchema} />

            {/* Hero image */}
            <div className="relative w-full h-[40vh] md:h-[55vh] bg-gray-200 pt-16">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={post.image?.alternativeText || post.title}
                        fill
                        className="object-cover"
                        priority

                    />
                ) : (
                    <div className="w-full h-full bg-[#0A2647]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-24">
                {/* Card */}
                <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-12">
                    {/* Back link */}
                    <Link
                        href={`/${lang}/blog`}
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-700 transition-colors mb-8 text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {blogDict.label || 'News'}
                    </Link>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-6 font-medium">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>
                                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </span>
                        </div>
                        {post.category && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                <div className="flex items-center gap-1.5">
                                    <Tag className="w-3.5 h-3.5" />
                                    <span>{post.category}</span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-6">
                        {post.title}
                    </h1>

                    {/* Summary */}
                    <p className="text-lg text-gray-500 leading-relaxed mb-8 border-l-4 border-crimson pl-6">
                        {post.summary}
                    </p>

                    {/* Content */}
                    {contentHtml && (
                        <div
                            className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-headings:font-bold prose-strong:text-gray-900 prose-a:text-navy prose-li:text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: contentHtml }}
                        />
                    )}
                </div>
            </div>
        </main>
    );
}
