import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";
import JsonLd from "@/components/JsonLd";
import { WebSite, WebPage, WithContext } from "schema-dts";
import { getTeamMembers, getNewsPosts } from "@/lib/strapi";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import ReviewsSection from "@/components/ReviewsSection";
import supportUniversityIcon from "@/assets/support_icons/admission.webp";
import supportVisaIcon from "@/assets/support_icons/visa.webp";
import supportAccommodationIcon from "@/assets/support_icons/accommadation.webp";
import supportCareerIcon from "@/assets/support_icons/career.webp";
import universityImg from "@/assets/student_support/university.webp";
import visaImg from "@/assets/student_support/visa.webp";
import accommodationImg from "@/assets/student_support/accommadation.webp";
import careerImg from "@/assets/student_support/career.webp";
import consultationImg from "@/assets/how_it_works/free_consultation.webp";
import preparationImg from "@/assets/how_it_works/visa.webp";
import departureImg from "@/assets/how_it_works/departure_support.webp";
import { Suspense } from "react";
const FeatureTabs = dynamic(() => import("@/components/FeatureTabs"), { ssr: true });
const Services = dynamic(() => import("@/components/Services"), { ssr: true });
const Countries = dynamic(() => import("@/components/Countries"), { ssr: true });
const HowItWorks = dynamic(() => import("@/components/HowItWorks"), { ssr: true });
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"), { ssr: true });
const Team = dynamic(() => import("@/components/Team"), { ssr: true });
const Statistics = dynamic(() => import("@/components/Statistics"), { ssr: true });
const ContactFormSection = dynamic(() => import("@/components/ContactFormSection"), { ssr: true });
const LatestJournal = dynamic(() => import("@/components/LatestJournal"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-2xl mx-4" />,
});
const OfficeLocations = dynamic(() => import("@/components/OfficeLocations"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-2xl mx-4" />,
});
const ProcessSection = dynamic(() => import("@/components/ProcessSection"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-2xl mx-4" />,
});
const LeadMagnet = dynamic(() => import("@/components/LeadMagnet"), {
  loading: () => <div className="h-48 bg-gray-100 animate-pulse rounded-2xl mx-4" />,
});
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict: any = await getDictionary(lang as Locale);
    const pageMeta = dict.metadata?.title ? {
        title: dict.metadata.title,
        description: dict.metadata.description
    } : {
        title: "Student's Life | Study Abroad, Visa & Travel Services",
        description: "Guiding students through university applications, visa processing, and relocation support for a successful study abroad experience."
    };
    return generateSEOMetadata({
        lang,
        path: '',
        title: pageMeta.title,
        description: pageMeta.description,
    });
}
export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
    const { lang: langParam } = await params;
    const lang = langParam as Locale;
    let dict, teamMembers, latestNews;
    try {
        [dict, teamMembers, latestNews] = await Promise.all([
            getDictionary(lang),
            getTeamMembers(lang),
            getNewsPosts(3),
        ]) as [any, any, any];
    } catch (error) {
        console.error('Homepage fetch failed, falling back to static content:', error);
        try {
            dict = await getDictionary(lang);
        } catch (e) {
            dict = {};
        }
        teamMembers = [];
        latestNews = [];
    }
    const features = [
        {
            id: "admissions",
            title: dict.featureTabs?.features?.admissions?.title || "University Admissions",
            description: dict.featureTabs?.features?.admissions?.description || "Guiding through top-tier university applications with personalized strategy and detailed roadmap planning.",
            icon: supportUniversityIcon,
            image: universityImg.src
        },
        {
            id: "visa",
            title: dict.featureTabs?.features?.visa?.title || "Visa Assistance",
            description: dict.featureTabs?.features?.visa?.description || "Hassle-free student visa processing with high success rates and comprehensive document verification.",
            icon: supportVisaIcon,
            image: visaImg.src
        },
        {
            id: "accommodation",
            title: dict.featureTabs?.features?.accommodation?.title || "Accommodation",
            description: dict.featureTabs?.features?.accommodation?.description || "Finding safe, affordable, and comfortable housing options near your campus.",
            icon: supportAccommodationIcon,
            image: accommodationImg.src
        },
        {
            id: "career",
            title: dict.featureTabs?.features?.career?.title || "Career Guidance",
            description: dict.featureTabs?.features?.career?.description || "Post-graduation planning, resume building, and interview preparation for a successful career launch.",
            icon: supportCareerIcon,
            image: careerImg.src
        }
    ];
    const howItWorksSteps = [
        {
            id: "consultation",
            stepNumber: "01",
            title: dict.howItWorks?.steps?.consultation?.title || "Free Consultation",
            description: dict.howItWorks?.steps?.consultation?.description || "We analyze your academic profile and career goals to recommend the best universities and programs tailored to your aspirations.",
            iconName: "search",
            image: consultationImg.src
        },
        {
            id: "preparation",
            stepNumber: "02",
            title: dict.howItWorks?.steps?.preparation?.title || "Preparation & Visa",
            description: dict.howItWorks?.steps?.preparation?.description || "Our experts handle the entire application process, document verification, and visa submission to ensure a smooth approval.",
            iconName: "clipboard",
            image: preparationImg.src
        },
        {
            id: "departure",
            stepNumber: "03",
            title: dict.howItWorks?.steps?.departure?.title || "Departure & Support",
            description: dict.howItWorks?.steps?.departure?.description || "From flight bookings to finding accommodation, we support you until you are settled in your new student life.",
            iconName: "rocket",
            image: departureImg.src
        }
    ];
    const BASE_URL = 'https://studs-life.com';
    const websiteSchema: WithContext<WebSite> = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Student's Life",
        "url": BASE_URL,
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${BASE_URL}/${lang}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        } as any,
        "inLanguage": lang === 'tk' ? 'tk' : lang === 'ru' ? 'ru' : 'en'
    };
    const webPageSchema: WithContext<WebPage> = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": dict.metadata?.title || "Student's Life | Study Abroad Services",
        "description": dict.metadata?.description || "Expert guidance for university admissions, visa processing, and relocation support.",
        "url": `${BASE_URL}/${lang}`,
        "isPartOf": {
            "@type": "WebSite",
            "name": "Student's Life",
            "url": BASE_URL
        },
        "about": {
            "@type": "Thing",
            "name": "Study Abroad Services"
        },
        "inLanguage": lang === 'tk' ? 'tk' : lang === 'ru' ? 'ru' : 'en'
    };
    return (
        <main className="min-h-screen bg-gray-50">
            <JsonLd<WebSite> data={websiteSchema} />
            <JsonLd<WebPage> data={webPageSchema} />
            { }
            <Hero lang={lang} dict={dict.hero} />
            { }
            <FeatureTabs
                features={features}
                title={dict.featureTabs?.title || "Comprehensive Student Support"}
                subtitle={dict.featureTabs?.subtitle || "Detailed assistance at every step of your study abroad journey."}
            />
            <Services lang={lang} dict={dict.services} />
            <Countries lang={lang} dict={dict.countries} />
            <HowItWorks steps={howItWorksSteps} dict={dict.howItWorks} lang={lang} />
            <WhyChooseUs lang={lang} dict={dict.whyUs} />
            <Team lang={lang} dict={dict.team} teamMembers={teamMembers.slice(0, 6)} showViewAll={true} />
            <Statistics lang={lang} dict={dict.statistics} />
            <TestimonialsCarousel title={dict.team.testimonials_title} videoCategory={dict.team.videoTestimonialCategory} lang={lang} />
            <ReviewsSection lang={lang} dict={dict} />
            <ContactFormSection lang={lang} dict={dict.contactForm} />
            <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-2xl mx-4" />}>
              <LatestJournal lang={lang} dict={dict.latestJournal} posts={latestNews} />
            </Suspense>
            <Suspense fallback={<div className="h-48 bg-gray-100 animate-pulse rounded-2xl mx-4" />}>
              <LeadMagnet lang={lang} />
            </Suspense>
            <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-2xl mx-4" />}>
              <ProcessSection lang={lang} dict={(dict as any).processWorkflow} />
            </Suspense>
            <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-2xl mx-4" />}>
              <OfficeLocations lang={lang} dict={dict.offices} />
            </Suspense>
        </main>
    );
}
