import axios from 'axios';
import qs from 'qs';
import type { StrapiImage } from './strapi-media';

export type { StrapiImage } from './strapi-media';
export { getBestStrapiImage, getStrapiImageUrl, getStrapiMediaUrl, isRemoteStrapiMediaUrl, normalizeStrapiImages } from './strapi-media';

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const strapiToken = process.env.STRAPI_API_TOKEN;

const STRAPI_LOCALE_MAP: Record<string, string> = {
    oz: 'uz',
};

function toStrapiLocale(locale: string = 'en'): string {
    return STRAPI_LOCALE_MAP[locale] ?? locale;
}

export const strapiClient = axios.create({
    baseURL: `${strapiUrl}/api`,
    headers: {
        'Content-Type': 'application/json',
        ...(strapiToken && strapiToken !== 'buraya_strapi_admin_panelinden_alacagin_tokeni_yaz' && { Authorization: `Bearer ${strapiToken}` }),
    },
    timeout: 5000,
});

export interface Country {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description?: string;
    featured: boolean;
    locale: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cities?: City[];
    images?: StrapiImage[] | any;
}
export interface City {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    title: string;
    intro?: string;
    economyContent?: string;
    housingContent?: string;
    transportContent?: string;
    climateContent?: string;
    climateTable?: any;
    conclusion?: string;
    featured: boolean;
    metaDescription?: string;
    locale: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    country: Country;
    images?: StrapiImage[] | any;
}
interface StrapiResponse<T> {
    data: T;
    meta: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}
export async function getCountries(locale: string = 'en'): Promise<Country[]> {
    const query = qs.stringify({
        locale: toStrapiLocale(locale),
        populate: '*',
        sort: ['featured:desc', 'name:asc'],
    });
    const { data } = await strapiClient.get<StrapiResponse<Country[]>>(`/countries?${query}`);
    return data.data;
}
export async function getCountry(slug: string, locale: string = 'en'): Promise<Country | null> {
    const query = qs.stringify({
        locale: toStrapiLocale(locale),
        filters: {
            slug: {
                $eq: slug,
            },
        },
        populate: {
            cities: {
                populate: '*',
            },
            images: true,
        },
    });
    try {
        const { data } = await strapiClient.get<StrapiResponse<Country[]>>(`/countries?${query}`);
        return data.data[0] || null;
    } catch (error) {
        // Fallback: try without images populate (for older Strapi schemas)
        try {
            const fallbackQuery = qs.stringify({
                locale: toStrapiLocale(locale),
                filters: { slug: { $eq: slug } },
                populate: { cities: { populate: '*' } },
            });
            const { data } = await strapiClient.get<StrapiResponse<Country[]>>(`/countries?${fallbackQuery}`);
            return data.data[0] || null;
        } catch {
            console.error('getCountry failed:', error);
            return null;
        }
    }
}
export async function getCities(countrySlug?: string, locale: string = 'en'): Promise<City[]> {
    const query = qs.stringify({
        locale: toStrapiLocale(locale),
        populate: {
            country: {
                populate: { images: true },
            },
            images: true,
        },
        ...(countrySlug && {
            filters: {
                country: {
                    slug: {
                        $eq: countrySlug,
                    },
                },
            },
        }),
        sort: ['name:asc'],
    });
    const { data } = await strapiClient.get<StrapiResponse<City[]>>(`/cities?${query}`);
    return data.data;
}
export async function getCity(
    countrySlug: string,
    citySlug: string,
    locale: string = 'en'
): Promise<City | null> {
    const query = qs.stringify({
        locale: toStrapiLocale(locale),
        filters: {
            slug: {
                $eq: citySlug,
            },
            country: {
                slug: {
                    $eq: countrySlug,
                },
            },
        },
        populate: {
            country: {
                populate: { images: true },
            },
            images: true,
        },
    });
    const { data } = await strapiClient.get<StrapiResponse<City[]>>(`/cities?${query}`);
    return data.data[0] || null;
}
export async function getCityBySlug(
    citySlug: string,
    locale: string = 'en'
): Promise<City | null> {
    const query = qs.stringify({
        locale: toStrapiLocale(locale),
        filters: {
            slug: {
                $eq: citySlug,
            },
        },
        populate: {
            country: {
                populate: { images: true },
            },
            images: true,
        },
    });
    const { data } = await strapiClient.get<StrapiResponse<City[]>>(`/cities?${query}`);
    return data.data[0] || null;
}
export async function getFeaturedCities(locale: string = 'en'): Promise<City[]> {
    const query = qs.stringify({
        locale: toStrapiLocale(locale),
        filters: {
            featured: {
                $eq: true,
            },
        },
        populate: {
            country: {
                populate: { images: true },
            },
            images: true,
        },
        sort: ['name:asc'],
    });
    const { data } = await strapiClient.get<StrapiResponse<City[]>>(`/cities?${query}`);
    return data.data;
}
export async function getCountriesWithCities(locale: string = 'en'): Promise<Country[]> {
    try {
        const query = qs.stringify({
            locale: toStrapiLocale(locale),
            populate: {
                images: true,
                cities: {
                    fields: ['name', 'slug'],
                    sort: ['name:asc'],
                },
            },
            sort: ['featured:desc', 'name:asc'],
        });
        const { data } = await strapiClient.get<StrapiResponse<Country[]>>(`/countries?${query}`);
        return data.data;
    } catch (error) {
        console.error('getCountriesWithCities error:', error);
        return [];
    }
}
export interface Office {
    id: number;
    documentId: string;
    name: string;
    order: number;
    photo?: {
        url: string;
        alternativeText?: string;
    };
    teamMembers?: TeamMember[];
}

export interface TeamMember {
    id: number;
    documentId: string;
    slug: string;
    fullName: string;
    role: string;
    photo?: {
        url: string;
        alternativeText?: string;
    };
    city: string;
    office?: { id: number; documentId: string; name: string };
    officeAddress?: string;
    birthDate?: string;
    startDate?: string;
    languages?: string;
    phone?: string;
    email?: string;
    responsibilities?: string;
    locale: string;
}
export async function getOffices(): Promise<Office[]> {
    const query = qs.stringify({
        populate: {
            photo: true,
            teamMembers: {
                populate: { photo: true },
                sort: ['order:asc', 'fullName:asc'],
            },
        },
        sort: ['order:asc', 'name:asc'],
    });
    try {
        const { data } = await strapiClient.get<StrapiResponse<Office[]>>(`/offices?${query}`);
        return data.data;
    } catch (error) {
        console.error('getOffices failed:', error);
        return [];
    }
}

export async function getTeamMembers(locale: string = 'en'): Promise<TeamMember[]> {
    const query = qs.stringify({
        locale: toStrapiLocale(locale),
        populate: { photo: true },
        sort: ['order:asc', 'fullName:asc'],
    });
    const { data } = await strapiClient.get<StrapiResponse<TeamMember[]>>(`/team-members?${query}`);
    return data.data;
}
export async function getTeamMember(slug: string, locale: string = 'en'): Promise<TeamMember | null> {
    const query = qs.stringify({
        locale: toStrapiLocale(locale),
        filters: { slug: { $eq: slug } },
        populate: { photo: true },
    });
    try {
        const { data } = await strapiClient.get<StrapiResponse<TeamMember[]>>(`/team-members?${query}`);
        return data.data[0] || null;
    } catch (error) {
        console.error('getTeamMember failed:', error);
        return null;
    }
}
export interface NewsPost {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    publishedAt: string;
    image?: {
        url: string;
        alternativeText?: string;
    };
    category?: string;
}
function buildNewsQuery(options: { limit?: number; slug?: string; locale?: string }) {
    return qs.stringify({
        populate: '*',
        sort: ['publishedAt:desc'],
        ...(options.locale ? { locale: toStrapiLocale(options.locale) } : {}),
        ...(options.slug ? { filters: { slug: { $eq: options.slug } } } : {}),
        ...(options.limit ? { pagination: { limit: options.limit } } : {}),
    });
}

async function fetchNewsPosts(query: string): Promise<NewsPost[]> {
    const { data } = await strapiClient.get<StrapiResponse<NewsPost[]>>(`/news-list?${query}`);
    return data.data;
}

export async function getNewsPosts(limit?: number, locale?: string): Promise<NewsPost[]> {
    try {
        return await fetchNewsPosts(buildNewsQuery({ limit, locale }));
    } catch (error) {
        if (locale) {
            try {
                return await fetchNewsPosts(buildNewsQuery({ limit }));
            } catch {
                // Keep the original error for easier Strapi permission debugging.
            }
        }
        console.error('getNewsPosts failed:', error);
        return [];
    }
}
export async function getNewsPost(slug: string, locale?: string): Promise<NewsPost | null> {
    try {
        const posts = await fetchNewsPosts(buildNewsQuery({ slug, locale }));
        return posts[0] || null;
    } catch (error) {
        if (locale) {
            try {
                const posts = await fetchNewsPosts(buildNewsQuery({ slug }));
                return posts[0] || null;
            } catch {
                // Keep the original error for easier Strapi permission debugging.
            }
        }
        console.error('getNewsPost failed:', error);
        return null;
    }
}
/** @deprecated Use getNewsPosts instead */
export async function getLatestBlogs(locale?: string): Promise<NewsPost[]> {
    return getNewsPosts(3, locale);
}
export async function getLatestCities(locale: string = 'en'): Promise<City[]> {
    const query = qs.stringify({
        locale: toStrapiLocale(locale),
        populate: {
            images: true,
            country: true
        },
        sort: ['publishedAt:desc'],
        pagination: {
            limit: 3,
        },
    });
    const { data } = await strapiClient.get<StrapiResponse<City[]>>(`/cities?${query}`);
    return data.data;
}

export interface Testimonial {
    id: number;
    documentId: string;
    title: string;
    studentName: string;
    content?: string;
    video?: { url: string; mime: string };
    thumbnail?: { url: string; alternativeText?: string };
    order: number;
    locale: string;
}

export interface Review {
    id: number;
    documentId: string;
    name: string;
    city?: string;
    service?: string;
    rating: number;
    content: string;
    publishedAt: string;
}

export async function getReviews(limit?: number): Promise<Review[]> {
    const query = qs.stringify({ sort: ['publishedAt:desc'], pagination: { limit: limit ?? 100 } });
    try {
        const { data } = await strapiClient.get<StrapiResponse<Review[]>>(`/reviews?${query}`);
        return data.data;
    } catch (error) {
        console.error('getReviews failed:', error);
        return [];
    }
}

export async function getTestimonials(locale: string = 'en'): Promise<Testimonial[]> {
    const query = qs.stringify({
        locale: toStrapiLocale(locale),
        populate: ['video', 'thumbnail'],
        sort: ['order:asc'],
    });
    try {
        const { data } = await strapiClient.get<StrapiResponse<Testimonial[]>>(`/testimonials?${query}`);
        return data.data;
    } catch {
        return [];
    }
}

export interface UniversityListCountry {
    country: string;
    declaredCount?: number;
    universities: string[];
}

export interface UniversityListEntries {
    title?: string;
    countries: UniversityListCountry[];
    totalCountries?: number;
    totalUniversities?: number;
    parser?: string;
}

export interface UniversityListDocument {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    academicYear: string;
    description?: string;
    entries?: UniversityListEntries;
    totalCountries?: number;
    totalUniversities?: number;
    featured?: boolean;
    parseStatus?: 'pending' | 'parsed' | 'manual' | 'error';
    parseMessage?: string;
    publishedAt?: string;
    updatedAt?: string;
    sourceDocument?: {
        id: number;
        url: string;
        name?: string;
        alternativeText?: string;
        mime?: string;
        size?: number;
    };
}

export async function getUniversityLists(): Promise<UniversityListDocument[]> {
    const query = qs.stringify({
        populate: { sourceDocument: true },
        sort: ['featured:desc', 'academicYear:desc', 'publishedAt:desc'],
    });

    try {
        const { data } = await strapiClient.get<StrapiResponse<UniversityListDocument[]>>(`/university-lists?${query}`);
        return data.data;
    } catch (error) {
        console.error('getUniversityLists failed:', error);
        return [];
    }
}

export async function getLatestUniversityList(academicYear?: string): Promise<UniversityListDocument | null> {
    const query = qs.stringify({
        populate: { sourceDocument: true },
        ...(academicYear && {
            filters: {
                academicYear: {
                    $eq: academicYear,
                },
            },
        }),
        sort: ['featured:desc', 'academicYear:desc', 'publishedAt:desc'],
        pagination: { limit: 1 },
    });

    try {
        const { data } = await strapiClient.get<StrapiResponse<UniversityListDocument[]>>(`/university-lists?${query}`);
        return data.data[0] || null;
    } catch (error) {
        console.error('getLatestUniversityList failed:', error);
        return null;
    }
}
