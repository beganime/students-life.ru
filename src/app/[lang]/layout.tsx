import type { Metadata } from "next";
import { Manrope, Montserrat } from "next/font/google";
import "../globals.css";
import { i18n, type Locale } from "@/i18n-config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/get-dictionary";
import { getCountriesWithCities, type Country } from "@/lib/strapi";
import JsonLd from "@/components/JsonLd";
import { Organization } from "schema-dts";
import CookieConsent from "@/components/CookieConsent";
import FloatingApplyButton from "@/components/FloatingApplyButton";
const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope" });
const montserrat = Montserrat({ subsets: ["latin", "cyrillic"], variable: "--font-montserrat", weight: ["400", "700", "800", "900"] });
const BASE_URL = 'https://studs-life.com';
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const title = dict.metadata?.title || "Student's Life | Study Abroad, Visa & Travel Services";
  const description = dict.metadata?.description || "Guiding students through university applications, visa processing, and relocation support for a successful study abroad experience.";
  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    icons: {
      icon: '/favicon.ico',
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en': '/en',
        'ru': '/ru',
        'tk': '/tk',
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}`,
      siteName: "Student's Life",
      locale: lang === 'tk' ? 'tr_TR' : lang === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: "Student's Life - Study Abroad Excellence",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}
export const revalidate = 60;
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  let dict;
  let countries: Country[] = [];
  try {
    [dict, countries] = await Promise.all([
      getDictionary(lang as Locale),
      getCountriesWithCities(lang).catch(err => {
        console.error('Layout fetch failed (countries):', err);
        return [] as Country[];
      }),
    ]);
  } catch (error) {
    console.error('Layout fetch failed (critical):', error);
    dict = await getDictionary(lang as Locale);
    countries = [];
  }
  return (
    <html lang={lang}>
      <head>
        {}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://img.youtube.com" />
        <link rel="preconnect" href="https://flagcdn.com" />
        {}
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'} />
        {}
        <link
          rel="preload"
          href="/fonts/octin-stencil.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        {}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'Octin Stencil';
                font-style: normal;
                font-weight: 400;
                font-display: optional;
                src: url('/fonts/octin-stencil.woff') format('woff');
              }
            `
          }}
        />
      </head>
      <body className={`${manrope.variable} ${montserrat.variable} font-sans antialiased bg-gray-50 text-gray-900 w-full`}>
        {}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-crimson focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:font-bold"
        >
          Skip to main content
        </a>
        <JsonLd<Organization>
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Student's Life",
            "url": BASE_URL,
            "logo": `${BASE_URL}/logo.webp`,
            "sameAs": [
              "https://www.instagram.com/stud_life_ru",
              "https://www.tiktok.com/@aga_sila"
            ],
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+993 71 832 749",
                "contactType": "customer service",
                "areaServed": ["TM", "RU", "BG", "TR", "KZ"],
                "availableLanguage": ["Russian", "English", "Turkmen"]
              }
            ],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Pushkina 52",
              "addressLocality": "Kazan",
              "addressRegion": "Tatarstan",
              "addressCountry": "RU"
            }
          }}
        />
        <Navbar lang={lang as Locale} dict={dict} countries={countries} />
        <main id="main-content" className="min-h-screen flex flex-col" role="main">
          {children}
        </main>
        <Footer lang={lang} dict={dict} />
        <CookieConsent lang={lang} dict={dict} />
        <FloatingApplyButton lang={lang} />
      </body>
    </html>
  );
}
