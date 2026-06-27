"use client";

import { useMemo, useState } from "react";
import {
  Download,
  FileText,
  GraduationCap,
  Search,
  X,
} from "lucide-react";
import type { UniversityListCountry } from "@/lib/strapi";

interface UniversityListDocumentPageProps {
  lang: string;
  title: string;
  description?: string;
  academicYear: string;
  countries: UniversityListCountry[];
  downloadUrl: string;
  updatedAt?: string;
  parseStatus?: string;
}

const copyByLocale = {
  ru: {
    eyebrow: "Список вузов",
    search: "Поиск по университету или стране...",
    countries: "стран",
    universities: "вузов",
    download: "Скачать документ",
    source: "Исходный DOCX",
    noResults: "Ничего не найдено",
    clear: "Сбросить",
    all: "Все страны",
    updated: "Обновлено",
    status: "Статус данных",
  },
  en: {
    eyebrow: "University list",
    search: "Search by university or country...",
    countries: "countries",
    universities: "universities",
    download: "Download document",
    source: "Source DOCX",
    noResults: "No results found",
    clear: "Clear",
    all: "All countries",
    updated: "Updated",
    status: "Data status",
  },
  tk: {
    eyebrow: "Uniwersitet sanawy",
    search: "Uniwersitet ýa-da ýurt boýunça gözle...",
    countries: "ýurt",
    universities: "uniwersitet",
    download: "Dokument ýükläp al",
    source: "Asyl DOCX",
    noResults: "Netije tapylmady",
    clear: "Arassala",
    all: "Ähli ýurtlar",
    updated: "Täzelendi",
    status: "Maglumat ýagdaýy",
  },
  oz: {
    eyebrow: "Universitetlar ro‘yxati",
    search: "Universitet yoki mamlakat bo‘yicha qidirish...",
    countries: "mamlakat",
    universities: "universitet",
    download: "Hujjatni yuklab olish",
    source: "Asl DOCX",
    noResults: "Natija topilmadi",
    clear: "Tozalash",
    all: "Barcha mamlakatlar",
    updated: "Yangilandi",
    status: "Maʼlumot holati",
  },
};

function getCopy(lang: string) {
  return copyByLocale[lang as keyof typeof copyByLocale] ?? copyByLocale.en;
}

function formatDate(date?: string, lang?: string) {
  if (!date) return null;
  const localeMap: Record<string, string> = { ru: "ru-RU", tk: "tk-TM", oz: "uz-UZ", en: "en-US" };
  return new Intl.DateTimeFormat(localeMap[lang || "en"] || "en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default function UniversityListDocumentPage({
  lang,
  title,
  description,
  academicYear,
  countries,
  downloadUrl,
  updatedAt,
  parseStatus,
}: UniversityListDocumentPageProps) {
  const copy = getCopy(lang);
  const [query, setQuery] = useState("");
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  const totalUniversities = countries.reduce((sum, country) => sum + country.universities.length, 0);
  const normalizedQuery = query.trim().toLowerCase();
  const updatedLabel = formatDate(updatedAt, lang);

  const filteredCountries = useMemo(() => {
    return countries
      .filter((country) => !activeCountry || country.country === activeCountry)
      .map((country) => {
        if (!normalizedQuery) return country;

        const countryMatches = country.country.toLowerCase().includes(normalizedQuery);
        const universities = countryMatches
          ? country.universities
          : country.universities.filter((university) => university.toLowerCase().includes(normalizedQuery));

        return { ...country, universities };
      })
      .filter((country) => country.universities.length > 0);
  }, [activeCountry, countries, normalizedQuery]);

  const filteredCount = filteredCountries.reduce((sum, country) => sum + country.universities.length, 0);

  const clearFilters = () => {
    setQuery("");
    setActiveCountry(null);
  };

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-gray-950">
      <section className="bg-navy pt-28 md:pt-36">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <div className="max-w-5xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white">
              <FileText className="h-4 w-4 text-crimson" />
              {copy.eyebrow} {academicYear}
            </div>

            <h1 className="break-words text-4xl font-black leading-tight text-white md:text-6xl">
              {title}
            </h1>

            {description && (
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
                {description}
              </p>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={downloadUrl}
                download
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-crimson px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-black/20 transition-colors hover:bg-red-700"
              >
                <Download className="h-4 w-4" />
                {copy.download}
              </a>
              <span className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white/85">
                <FileText className="h-4 w-4 text-crimson" />
                {copy.source}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-px bg-gray-200 px-4 md:grid-cols-3 md:px-8">
          <div className="bg-white py-6 md:pr-8">
            <p className="text-3xl font-black text-navy">{countries.length}</p>
            <p className="mt-1 text-sm font-bold uppercase tracking-wide text-gray-500">{copy.countries}</p>
          </div>
          <div className="bg-white py-6 md:px-8">
            <p className="text-3xl font-black text-navy">{totalUniversities}</p>
            <p className="mt-1 text-sm font-bold uppercase tracking-wide text-gray-500">{copy.universities}</p>
          </div>
          <div className="bg-white py-6 md:pl-8">
            <p className="text-base font-black text-navy">{updatedLabel || parseStatus || academicYear}</p>
            <p className="mt-1 text-sm font-bold uppercase tracking-wide text-gray-500">
              {updatedLabel ? copy.updated : copy.status}
            </p>
          </div>
        </div>
      </section>

      <section className="sticky top-20 z-30 border-b border-gray-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={copy.search}
                  className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-10 text-sm outline-none transition-colors focus:border-crimson focus:ring-2 focus:ring-crimson/10"
                />
                {(query || activeCountry) && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    aria-label={copy.clear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="hidden shrink-0 rounded-lg bg-gray-50 px-4 py-3 text-sm font-black text-navy sm:block">
                {filteredCount}
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setActiveCountry(null)}
                className={`shrink-0 rounded-lg border px-3 py-2 text-xs font-black uppercase tracking-wide transition-colors ${
                  activeCountry === null
                    ? "border-crimson bg-crimson text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-crimson/40"
                }`}
              >
                {copy.all}
              </button>
              {countries.map((country) => (
                <button
                  type="button"
                  key={country.country}
                  onClick={() => setActiveCountry(country.country)}
                  className={`shrink-0 rounded-lg border px-3 py-2 text-xs font-black uppercase tracking-wide transition-colors ${
                    activeCountry === country.country
                      ? "border-crimson bg-crimson text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-crimson/40"
                  }`}
                >
                  {country.country}
                  <span className="ml-2 opacity-70">{country.universities.length}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        {filteredCountries.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
            <GraduationCap className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <p className="text-lg font-bold text-gray-500">{copy.noResults}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredCountries.map((country) => (
              <section key={country.country} className="scroll-mt-44">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <h2 className="break-words text-2xl font-black text-navy md:text-3xl">
                    {country.country}
                  </h2>
                  <span className="rounded-lg bg-crimson/10 px-3 py-1 text-sm font-black text-crimson">
                    {country.universities.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 md:grid-cols-2 xl:grid-cols-3">
                  {country.universities.map((university, index) => (
                    <div key={`${country.country}-${university}-${index}`} className="flex gap-3 bg-white p-4 transition-colors hover:bg-gray-50">
                      <span className="mt-0.5 w-8 shrink-0 text-right text-sm font-black text-crimson/55">
                        {index + 1}
                      </span>
                      <p className="min-w-0 break-words text-sm font-semibold leading-6 text-gray-800">
                        {university}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
