import {
  ArrowRight,
  Download,
  PlayCircle,
  Smartphone,
} from "lucide-react";
import Image from "next/image";

interface MobileAppSectionProps {
  lang: string;
}

const copyByLang = {
  ru: {
    badge: "Мобильное приложение",
    title: "Student's Life теперь и в телефоне",
    description:
      "Следите за заявкой, документами и новостями поступления в одном официальном приложении.",
    android: "Скачать в Google Play",
    ios: "Версия для iOS скоро выйдет",
    note: "Официальное приложение Student's Life",
    features: ["Статус заявки", "Документы", "Уведомления"],
  },
  en: {
    badge: "Mobile app",
    title: "Student's Life is now on your phone",
    description:
      "Track your application, documents, and admission updates in one official app.",
    android: "Get it on Google Play",
    ios: "iOS version coming soon",
    note: "Official Student's Life app",
    features: ["Application status", "Documents", "Notifications"],
  },
  tk: {
    badge: "Mobil programma",
    title: "Student's Life indi telefonyňyzda",
    description:
      "Arza ýagdaýyny, resminamalary we kabul täzeliklerini resmi programmada yzarlaň.",
    android: "Google Play-den ýükläň",
    ios: "iOS görnüşi ýakynda çykar",
    note: "Student's Life resmi programmasy",
    features: ["Arza ýagdaýy", "Resminamalar", "Habarnamalar"],
  },
  oz: {
    badge: "Mobil ilova",
    title: "Student's Life endi telefoningizda",
    description:
      "Ariza holati, hujjatlar va qabul yangiliklarini bitta rasmiy ilovada kuzating.",
    android: "Google Play'dan yuklab oling",
    ios: "iOS versiyasi tez orada chiqadi",
    note: "Student's Life rasmiy ilovasi",
    features: ["Ariza holati", "Hujjatlar", "Bildirishnomalar"],
  },
};

export default function MobileAppSection({ lang }: MobileAppSectionProps) {
  const copy = copyByLang[lang as keyof typeof copyByLang] || copyByLang.en;

  return (
    <section className="overflow-hidden bg-white py-16 text-gray-900 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <div className="relative mx-auto flex w-full max-w-[430px] justify-center lg:order-2 lg:max-w-none">
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c91622]/10 blur-3xl" />
          <div className="relative aspect-[9/16] w-[235px] rounded-[2.25rem] border-[10px] border-gray-950 bg-gray-950 shadow-2xl shadow-gray-900/20 sm:w-[280px]">
            <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-gray-950" />
            <div className="relative h-full overflow-hidden rounded-[1.55rem] bg-[#f5f7fb]">
              <Image
                src="/screenshot_mobile_app.jpg"
                alt="Student's Life mobile app"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 235px, 280px"
                priority={false}
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
          </div>
        </div>

        <div className="max-w-2xl text-center lg:text-left">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-wider text-gray-500 sm:text-xs">
            <Smartphone className="h-4 w-4 text-[#c91622]" />
            {copy.badge}
          </div>
          <h2 className="text-4xl font-black leading-tight tracking-tight text-gray-950 sm:text-5xl">
            {copy.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-7 text-gray-500 sm:text-lg lg:mx-0">
            {copy.description}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <a
              href="https://play.google.com/store/apps/details?id=com.students.life"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-gray-950 px-5 py-3 text-sm font-black text-white shadow-lg shadow-gray-900/10 transition hover:bg-[#0a3156]"
            >
              <PlayCircle className="h-5 w-5" />
              {copy.android}
              <ArrowRight className="h-4 w-4" />
            </a>
            <div className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-500">
              <Download className="h-4 w-4" />
              {copy.ios}
            </div>
          </div>
          <p className="mt-5 text-sm font-semibold text-gray-400">{copy.note}</p>
        </div>
      </div>
    </section>
  );
}
