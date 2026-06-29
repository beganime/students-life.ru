export interface StrapiImage {
    id?: number;
    url: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: Record<string, { url?: string; width?: number; height?: number }>;
    attributes?: StrapiImage;
}

export function normalizeStrapiImages(input: any): StrapiImage[] {
    if (!input) return [];
    if (Array.isArray(input)) return input.flatMap(normalizeStrapiImages);
    if (Array.isArray(input.data)) return normalizeStrapiImages(input.data);
    if (input.data) return normalizeStrapiImages(input.data);

    const image = input.attributes ? { id: input.id, ...input.attributes } : input;
    if (image?.url) return [image as StrapiImage];
    return [];
}

export function getBestStrapiImage(input: any): StrapiImage | null {
    return normalizeStrapiImages(input)[0] || null;
}

export function getStrapiImageUrl(url: string | null | undefined): string {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('//')) {
        return url;
    }
    const isProd = process.env.NODE_ENV === 'production';
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || (isProd ? 'https://admin-studs-life.defyzer.com' : 'http://localhost:1337');
    return `${baseUrl}${url}`;
}

export const getStrapiMediaUrl = getStrapiImageUrl;
