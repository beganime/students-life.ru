import { MetadataRoute } from 'next';
import { i18n } from '@/i18n-config';
import { getCountries, getCities, getLatestBlogs } from '@/lib/strapi';
const BASE_URL = 'https://studs-life.com';
const staticRoutes = [
    { path: '', priority: 1.0, changeFreq: 'daily' as const },
    { path: '/services', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/about', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/contact', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/teams', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/blog', priority: 0.8, changeFreq: 'daily' as const },
    { path: '/universities-2026-2027', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/privacy-policy', priority: 0.3, changeFreq: 'yearly' as const },
    { path: '/terms-of-use', priority: 0.3, changeFreq: 'yearly' as const },
    { path: '/cookie-policy', priority: 0.3, changeFreq: 'yearly' as const },
];
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const locales = i18n.locales;
    const sitemapEntries: MetadataRoute.Sitemap = [];
    for (const locale of locales) {
        for (const route of staticRoutes) {
            sitemapEntries.push({
                url: `${BASE_URL}/${locale}${route.path}`,
                lastModified: new Date(),
                changeFrequency: route.changeFreq,
                priority: route.priority,
                alternates: {
                    languages: Object.fromEntries(
                        locales.map(l => [l, `${BASE_URL}/${l}${route.path}`])
                    ),
                },
            });
        }
    }
    try {
        for (const locale of locales) {
            const countries = await getCountries(locale);
            for (const country of countries) {
                sitemapEntries.push({
                    url: `${BASE_URL}/${locale}/${country.slug}`,
                    lastModified: new Date(country.updatedAt || country.publishedAt),
                    changeFrequency: 'weekly',
                    priority: 0.8,
                    alternates: {
                        languages: Object.fromEntries(
                            locales.map(l => [l, `${BASE_URL}/${l}/${country.slug}`])
                        ),
                    },
                });
            }
        }
    } catch (error) {
        console.error('Error fetching countries for sitemap:', error);
    }
    try {
        for (const locale of locales) {
            const cities = await getCities(undefined, locale);
            for (const city of cities) {
                if (city.country?.slug) {
                    sitemapEntries.push({
                        url: `${BASE_URL}/${locale}/${city.country.slug}/${city.slug}`,
                        lastModified: new Date(city.updatedAt || city.publishedAt),
                        changeFrequency: 'weekly',
                        priority: 0.7,
                        alternates: {
                            languages: Object.fromEntries(
                                locales.map(l => [l, `${BASE_URL}/${l}/${city.country.slug}/${city.slug}`])
                            ),
                        },
                    });
                }
            }
        }
    } catch (error) {
        console.error('Error fetching cities for sitemap:', error);
    }
    try {
        for (const locale of locales) {
            const blogs = await getLatestBlogs();
            for (const blog of blogs) {
                sitemapEntries.push({
                    url: `${BASE_URL}/${locale}/blog/${blog.slug}`,
                    lastModified: new Date(blog.publishedAt),
                    changeFrequency: 'monthly',
                    priority: 0.6,
                    alternates: {
                        languages: Object.fromEntries(
                            locales.map(l => [l, `${BASE_URL}/${l}/blog/${blog.slug}`])
                        ),
                    },
                });
            }
        }
    } catch (error) {
        console.error('Error fetching blogs for sitemap:', error);
    }
    const entriesByUrl = new Map<string, MetadataRoute.Sitemap[number]>();
    for (const entry of sitemapEntries) {
        entriesByUrl.set(entry.url, entry);
    }
    return Array.from(entriesByUrl.values());
}
