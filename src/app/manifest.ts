import { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Student's Life - Study Abroad Services",
        short_name: "Student's Life",
        description: "Expert guidance for university admissions, visa processing, and relocation support. Study in Russia, China, Turkey, and Europe.",
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait-primary',
        background_color: '#ffffff',
        theme_color: '#6d1314',
        categories: ['education', 'travel', 'lifestyle'],
        lang: 'ru',
        dir: 'ltr',
        icons: [
            {
                src: '/favicon.ico',
                sizes: '48x48',
                type: 'image/x-icon',
            },
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
        ],
        screenshots: [
            {
                src: '/screenshots/home.png',
                sizes: '1280x720',
                type: 'image/png',
                form_factor: 'wide',
            },
        ],
        shortcuts: [
            {
                name: 'Contact Us',
                short_name: 'Contact',
                url: '/ru/contact',
                icons: [{ src: '/icon-192.png', sizes: '192x192' }],
            },
            {
                name: 'Our Services',
                short_name: 'Services',
                url: '/ru/services',
                icons: [{ src: '/icon-192.png', sizes: '192x192' }],
            },
        ],
        related_applications: [],
        prefer_related_applications: false,
    };
}
