import { Metadata } from "next";
import UniversityListDocumentPage from "@/components/UniversityListDocumentPage";
import fallbackList from "@/data/universityLists/recognized-2026-2027.json";
import { generateSEOMetadata } from "@/lib/seo";
import { getLatestUniversityList, getStrapiMediaUrl } from "@/lib/strapi";

interface PageProps {
  params: Promise<{ lang: string }>;
}

const titleByLocale: Record<string, string> = {
  ru: "Список вузов 2026-2027 | Student's Life",
  en: "University List 2026-2027 | Student's Life",
  tk: "Uniwersitet sanawy 2026-2027 | Student's Life",
  oz: "Universitetlar ro‘yxati 2026-2027 | Student's Life",
};

const headingByLocale: Record<string, string> = {
  ru: "Список вузов, подтверждающихся в банке 2026/27",
  en: "Recognized university list for 2026/27",
  tk: "2026/27 üçin tassyklanýan uniwersitetler sanawy",
  oz: "2026/27 uchun tasdiqlanadigan universitetlar ro‘yxati",
};

const descriptionByLocale: Record<string, string> = {
  ru: "Актуальный список университетов на 2026-2027 учебный год с поиском, фильтрацией по странам и возможностью скачать исходный Word-документ.",
  en: "Current university list for the 2026-2027 academic year with search, country filtering, and source Word document download.",
  tk: "2026-2027 okuw ýyly üçin uniwersitetleriň sanawy: gözleg, ýurt boýunça filter we asyl Word dokumentini ýükläp almak.",
  oz: "2026-2027 o‘quv yili uchun universitetlar ro‘yxati: qidiruv, mamlakat bo‘yicha filter va asl Word hujjatini yuklab olish.",
};

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return generateSEOMetadata({
    lang,
    path: "/universities-2026-2027",
    title: titleByLocale[lang] || titleByLocale.en,
    description: descriptionByLocale[lang] || descriptionByLocale.en,
  });
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const cmsList = await getLatestUniversityList("2026-2027");
  const cmsCountries = cmsList?.entries?.countries;
  const countries = Array.isArray(cmsCountries) && cmsCountries.length > 0
    ? cmsCountries
    : fallbackList.countries;

  const downloadUrl = cmsList?.sourceDocument?.url
    ? getStrapiMediaUrl(cmsList.sourceDocument.url)
    : fallbackList.downloadUrl;

  return (
    <UniversityListDocumentPage
      lang={lang}
      title={cmsList?.title || headingByLocale[lang] || headingByLocale.en}
      description={cmsList?.description || descriptionByLocale[lang] || descriptionByLocale.en}
      academicYear={cmsList?.academicYear || fallbackList.academicYear}
      countries={countries}
      downloadUrl={downloadUrl}
      updatedAt={cmsList?.updatedAt}
      parseStatus={cmsList?.parseStatus}
    />
  );
}
