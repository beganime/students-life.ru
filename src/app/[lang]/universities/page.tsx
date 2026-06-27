import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";
import UniversitiesPage from "@/components/UniversitiesPage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const titles: Record<string, string> = {
        ru: 'Список признаваемых университетов Туркменистана | Student\'s Life',
        tk: 'Türkmenistanyň ykrar edilýän uniwersitetleri | Student\'s Life',
        oz: 'Turkmaniston tan olingan universitetlar ro\'yxati | Student\'s Life',
        en: 'List of Recognized Universities of Turkmenistan | Student\'s Life',
    };
    const descs: Record<string, string> = {
        ru: 'Полный список из 1179+ университетов в 25 странах, признаваемых в Туркменистане. Поиск по названию и стране.',
        tk: 'Türkmenistanda ykrar edilýän 25 ýurtdaky 1179+ uniwersitetleriň doly sanawy.',
        oz: 'Turkmanistonda tan olingan 25 mamlakatdagi 1179+ universitetlarning to\'liq ro\'yxati.',
        en: 'Complete list of 1179+ universities in 25 countries recognized by Turkmenistan. Search by name and country.',
    };
    return generateSEOMetadata({
        lang,
        path: '/universities',
        title: titles[lang] || titles.en,
        description: descs[lang] || descs.en,
    });
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const title =
    lang === 'ru' ? 'Список признаваемых университетов Туркменистана' :
    lang === 'tk' ? 'Türkmenistanyň ykrar edilýän uniwersitetleriniň sanawy' :
    lang === 'oz' ? "Turkmaniston tan olingan universitetlar ro'yxati" :
    'List of Recognized Universities of Turkmenistan';

  return <UniversitiesPage lang={lang} title={title} />;
}
