import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { getNewsPosts, getStrapiImageUrl, type NewsPost } from "@/lib/strapi";
import { generateSEOMetadata } from "@/lib/seo";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { BreadcrumbList, CollectionPage, WithContext } from "schema-dts";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const pageMeta = (dict as any).metadata?.pages?.blog;
  return generateSEOMetadata({
    lang,
    path: '/blog',
    title: pageMeta?.title || `News | Student's Life`,
    description: pageMeta?.description || "Latest news, guides, and articles for international students.",
  });
}
export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dict = await getDictionary(lang);
  let posts: NewsPost[] = [];
  try {
    posts = await getNewsPosts();
  } catch (error) {
    console.error('BlogPage fetch failed:', error);
  }
  const blogDict = (dict as any).latestJournal || {};
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
        name: blogDict.label || "News",
        item: `https://studs-life.com/${lang}/blog`,
      },
    ],
  };
  const collectionPageSchema: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${blogDict.title_part1 || "Latest"} ${blogDict.title_part2 || "News"}`,
    description: "Latest news and articles for international students.",
    url: `https://studs-life.com/${lang}/blog`,
    inLanguage: lang === 'tk' ? 'tk' : lang === 'ru' ? 'ru' : 'en',
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.slice(0, 10).map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://studs-life.com/${lang}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <JsonLd<BreadcrumbList> data={breadcrumbData} />
      <JsonLd<CollectionPage> data={collectionPageSchema} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center md:text-left">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-[10px] md:text-xs font-bold tracking-wider uppercase text-gray-500 mb-6">
            {blogDict.label || "News"}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-4">
            {blogDict.title_part1 || "Explore our"}{" "}
            <span className="text-navy">{blogDict.title_part2 || "Latest News"}</span>
          </h1>
        </div>
        {posts.length === 0 ? (
          <p className="text-gray-400 text-center py-24 text-lg">
            {lang === 'ru' ? 'Новостей пока нет.' : lang === 'tk' ? 'Habar ýok.' : lang === 'oz' ? 'Yangiliklar yo\'q.' : 'No news yet.'}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const imageUrl = post.image?.url ? getStrapiImageUrl(post.image.url) : null;
              return (
                <article
                  key={post.id}
                  className="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col"
                >
                  <Link href={`/${lang}/blog/${post.slug}`} className="relative h-64 overflow-hidden block">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={post.image?.alternativeText || post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                        {blogDict.noImage || "No Image"}
                      </div>
                    )}
                    {post.category && (
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-navy border border-white/20 shadow-sm">
                          {post.category}
                        </span>
                      </div>
                    )}
                  </Link>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-navy transition-colors line-clamp-2 leading-tight">
                      <Link href={`/${lang}/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">{post.summary}</p>
                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                      <Link
                        href={`/${lang}/blog/${post.slug}`}
                        className="text-sm font-bold text-navy flex items-center gap-2 group/btn"
                      >
                        {blogDict.readMore || "Read More"}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
