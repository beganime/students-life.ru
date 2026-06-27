import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  FileCheck2,
  GraduationCap,
  Headphones,
  Plane,
  ShieldCheck,
} from "lucide-react";

import figmaHeroBg from "../assets/figma-hero/s3-04-5f80-d872-7280039d56294c1939cc1853862b0108.png";
import figmaLogo from "../assets/figma-hero/students-life-script-logo.svg";

interface HeroProps {
  lang: string;
  dict: any;
}

const copyByLang = {
  ru: {
    eyebrow: "ОБУЧЕНИЕ ЗА РУБЕЖОМ",
    title: "СОЗДАЙ СВОЕ БУДУЩЕЕ",
    description:
      "Открой глобальные карьерные возможности с образованием мирового уровня.",
    partnerLabel: "STUDENT'S LIFE",
    partnerText: "Официальный партнер университетов России, Европы и Азии",
    services: [
      "Подбор университета",
      "Поступление в вуз",
      "Виза и документы",
      "Поддержка 24/7",
    ],
  },
  en: {
    eyebrow: "STUDY ABROAD",
    title: "CREATE YOUR FUTURE",
    description:
      "Open global career opportunities with world-class education.",
    partnerLabel: "STUDENT'S LIFE",
    partnerText: "Official partner of universities across Russia, Europe and Asia",
    services: [
      "University selection",
      "Admission support",
      "Visa and documents",
      "24/7 support",
    ],
  },
  tk: {
    eyebrow: "DASHARY YURTDA OKUW",
    title: "GELJEGINIZI GURUN",
    description:
      "Dunya derejeli bilim bilen halkara mumkinchilikleri acyn.",
    partnerLabel: "STUDENT'S LIFE",
    partnerText: "Russiya, Yewropa we Aziya uniwersitetlerinin resmi hyzmatdasy",
    services: [
      "Uniwersitet saylawy",
      "Kabul goldawy",
      "Wiza we resminamalar",
      "24/7 goldaw",
    ],
  },
  oz: {
    eyebrow: "CHET ELDA TA'LIM",
    title: "KELAJAGINGIZNI YARATING",
    description:
      "Jahon darajasidagi ta'lim bilan global imkoniyatlarni oching.",
    partnerLabel: "STUDENT'S LIFE",
    partnerText: "Rossiya, Yevropa va Osiyo universitetlarining rasmiy hamkori",
    services: [
      "Universitet tanlash",
      "Qabul yordami",
      "Viza va hujjatlar",
      "24/7 yordam",
    ],
  },
};

const serviceIcons = [Building2, GraduationCap, FileCheck2, Headphones];

export default function Hero({ lang, dict }: HeroProps) {
  const copy = copyByLang[lang as keyof typeof copyByLang] || copyByLang.en;
  const title = dict?.rightTitle || copy.title;
  const description = dict?.rightSubtitle || copy.description;
  const cta = dict?.cta || (lang === "en" ? "Apply now" : "Подать заявку");

  return (
    <section className="relative isolate min-h-[calc(100svh-80px)] overflow-hidden bg-[#0a4570] pt-20 text-white md:min-h-[760px]">
      <Image
        src={figmaHeroBg}
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-30 object-cover object-[58%_center] md:object-center"
      />

      <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,rgba(201,17,31,0.78)_0%,rgba(193,22,36,0.64)_34%,rgba(76,48,91,0.38)_58%,rgba(8,74,123,0.4)_78%,rgba(6,62,106,0.52)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_73%_34%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.02)_0%,rgba(4,23,45,0.03)_58%,rgba(4,23,45,0.24)_100%)]" />

      <div className="mx-auto flex min-h-[calc(100svh-80px)] w-full max-w-7xl flex-col justify-between px-4 pb-6 pt-8 sm:px-6 md:min-h-[760px] lg:px-8">
        <div className="grid flex-1 items-center gap-7 lg:grid-cols-[0.56fr_0.44fr]">
          <div className="relative z-10 max-w-[620px] text-center lg:text-left">
            <div className="mb-4 flex justify-center lg:justify-start">
              <Image
                src={figmaLogo}
                alt="Student's Life"
                priority
                className="h-auto w-[265px] drop-shadow-[0_4px_18px_rgba(0,0,0,0.18)] sm:w-[320px] lg:w-[370px]"
              />
            </div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-sm border border-white/35 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-wide text-white backdrop-blur-sm">
              <Plane className="h-4 w-4" />
              {copy.eyebrow}
            </div>

            <h1 className="mx-auto max-w-[10.8ch] text-balance text-[40px] font-black uppercase leading-[0.92] tracking-normal text-white sm:text-6xl md:text-7xl lg:mx-0 lg:text-[76px]">
              {title}
            </h1>

            <p className="mx-auto mt-5 max-w-[470px] text-sm font-medium leading-7 text-white/90 sm:text-base lg:mx-0 lg:text-lg">
              {description}
            </p>

            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <Link
                href={`/${lang}/contact`}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-white/55 bg-[#0a3156]/35 px-5 py-3 text-xs font-black uppercase tracking-wide text-white backdrop-blur-sm transition hover:bg-white hover:text-[#c91622]"
              >
                {cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/${lang}/universities-2026-2027`}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-white/35 bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-wide text-white backdrop-blur-sm transition hover:bg-white/18"
              >
                <GraduationCap className="h-4 w-4" />
                2026-2027
              </Link>
            </div>
          </div>

          <div className="relative z-10 hidden min-h-[360px] lg:block">
            <div className="absolute right-4 top-[36%] w-[245px] rounded-sm border border-white/25 bg-[#0b416a]/32 p-5 text-white shadow-2xl backdrop-blur-sm">
              <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-wide">
                <ShieldCheck className="h-5 w-5" />
                {copy.partnerLabel}
              </div>
              <p className="text-xs font-medium leading-5 text-white/82">
                {dict?.partnerText || copy.partnerText}
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-20 grid grid-cols-2 overflow-hidden rounded-sm border border-white/15 bg-[#c91622]/95 shadow-2xl shadow-black/18 backdrop-blur-sm lg:grid-cols-4">
          {copy.services.map((item, index) => {
            const Icon = serviceIcons[index];
            return (
              <div
                key={item}
                className="flex min-h-[74px] items-center gap-3 border-b border-white/15 px-3 py-3 last:border-b-0 odd:border-r odd:border-white/15 [&:nth-child(2)]:border-r-0 [&:nth-child(3)]:border-b-0 lg:min-h-[82px] lg:border-b-0 lg:border-r lg:px-4 lg:last:border-r-0 lg:[&:nth-child(2)]:border-r lg:[&:nth-child(3)]:border-r"
              >
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-sm bg-white/14 text-white ring-1 ring-white/18">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-black uppercase leading-tight tracking-wide text-white sm:text-sm">
                    {item}
                  </p>
                  <p className="mt-1 text-[11px] font-medium leading-4 text-white/72">
                    Student's Life
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
