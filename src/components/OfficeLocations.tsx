"use client";
import { MapPin, Phone, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/JsonLd";
import { EducationalOrganization, WithContext } from "schema-dts";
interface OfficeLocationsProps {
  lang: string;
  dict?: any;
}
export default function OfficeLocations({ dict }: OfficeLocationsProps) {
  const [activeOffice, setActiveOffice] = useState<string>("turkmenabat");
  const offices = [
    {
      id: "turkmenabat",
      country: "turkmenistan",
      countryCode: "tm",
      flag: "🇹🇲",
      city: dict?.turkmenabat?.city || "ТУРКМЕНАБАД",
      address: dict?.turkmenabat?.address || "Офисное здание снаружи городского парка, 4-й офис слева от главного входа",
      phone: "+993 71 832 749",
      color: "green"
    },
    {
      id: "mary",
      country: "turkmenistan",
      countryCode: "tm",
      flag: "🇹🇲",
      city: dict?.mary?.city || "МАРЫ",
      address: dict?.mary?.address || "Мерв базар, ул. 40 йыл, напротив ТЦ Белент",
      phones: ["+993 71 856 226", "+993 71 859 994"],
      color: "green"
    },
    {
      id: "dashoguz",
      country: "turkmenistan",
      countryCode: "tm",
      flag: "🇹🇲",
      city: dict?.dashoguz?.city || "ДАШОГУЗ",
      address: dict?.dashoguz?.address || "Улица А. Новаи, дом 17 (возле Ныгмат базара)",
      phones: ["+993 71 787 424", "+993 71 787 423"],
      color: "green"
    },
    {
      id: "ashgabat",
      country: "turkmenistan",
      countryCode: "tm",
      flag: "🇹🇲",
      city: dict?.ashgabat?.city || "АШХАБАД",
      address: dict?.ashgabat?.address || "Ул. Г. Кулиева (Объездная), здание Hil Gurluşyk (Бизнес-центр Regus)",
      phones: ["+993 71 810 797", "+993 71 027 524"],
      color: "green"
    },
    {
      id: "balkanabat",
      country: "turkmenistan",
      countryCode: "tm",
      flag: "🇹🇲",
      city: dict?.balkanabat?.city || "БАЛКАНАБАД",
      address: dict?.balkanabat?.address || "Улица 8 марта, дом 22, офисное помещение 2",
      phones: ["+993 71 856 664", "+993 71 036 948"],
      color: "green"
    },
    {
      id: "tashkent",
      country: "uzbekistan",
      countryCode: "uz",
      flag: "🇺🇿",
      city: dict?.tashkent?.city || "ТАШКЕНТ",
      address: dict?.tashkent?.address || "р. Мирзо-Улугбекский, ул. Сайрам, дом 1Б, офис (1 этаж), первый поворот направо (Корзинка Техномарт)",
      phone: "+998 50 115 65 19",
      color: "yellow"
    },
    {
      id: "kazan",
      country: "russia",
      countryCode: "ru",
      flag: "🇷🇺",
      city: dict?.kazan?.city || "КАЗАНЬ",
      address: dict?.kazan?.address || "Ул. Пушкина, дом 52, офис 306/4 (3 этаж)",
      phone: "+7 919 685 61 94",
      color: "blue"
    }
  ];
  const activeOfficeData = offices.find(o => o.id === activeOffice) || offices[0];
  const localBusinessSchema: WithContext<EducationalOrganization> = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Student's Life",
    description: dict?.subtitle || "Offices in Turkmenistan and Russia for your convenience",
    url: "https://studs-life.com",
    areaServed: ["Turkmenistan", "Russia"],
    parentOrganization: {
      "@type": "Organization",
      "name": "Student's Life",
      "url": "https://studs-life.com"
    },
    subOrganization: offices.map((office) => ({
      "@type": "EducationalOrganization",
      name: `Student's Life - ${office.city}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: office.address,
        addressLocality: office.city,
        addressCountry: office.country === "turkmenistan" ? "TM" : office.country === "uzbekistan" ? "UZ" : "RU",
      },
      telephone: office.phone || office.phones?.[0],
    })),
  };
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <JsonLd<EducationalOrganization> data={localBusinessSchema} />
      { }
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-crimson rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        { }
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-[10px] md:text-xs font-bold tracking-wider uppercase text-gray-500 mb-4">
              {dict?.badge || "HAШИ АДPECА"}
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-6">
              {dict?.title || "Мы рядом с вами"}
            </h2>
            <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
              {dict?.subtitle || "Офисы в Туркменистане и России для вашего удобства"}
            </p>
          </div>
        </ScrollReveal>
        <div className="flex flex-col lg:grid lg:grid-cols-2 md:gap-12 items-start">
          { }
          <div className="w-full">
            { }
            <div className="lg:hidden mb-8">
              <ScrollReveal direction="up">
                <div className="flex items-center justify-between bg-white rounded-2xl border-2 border-gray-100 p-2 shadow-sm">
                  <button
                    onClick={() => {
                      const currentIndex = offices.findIndex(o => o.id === activeOffice);
                      const prevIndex = (currentIndex - 1 + offices.length) % offices.length;
                      setActiveOffice(offices[prevIndex].id);
                    }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-50 text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-6 overflow-hidden rounded shadow-sm">
                      <Image
                        src={`https://flagcdn.com/w80/${activeOfficeData.countryCode}.png`}
                        alt={activeOfficeData.country}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-black text-gray-900 text-lg uppercase tracking-tight">
                      {activeOfficeData.city}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const currentIndex = offices.findIndex(o => o.id === activeOffice);
                      const nextIndex = (currentIndex + 1) % offices.length;
                      setActiveOffice(offices[nextIndex].id);
                    }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-50 text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </ScrollReveal>
            </div>
            { }
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {offices.map((office, index) => {
                const isActive = activeOffice === office.id;
                const borderColor = office.color === "green" ? "border-green-500" : "border-blue-500";
                const bgColor = office.color === "green" ? "bg-green-50" : "bg-blue-50";
                return (
                  <ScrollReveal
                    key={office.id}
                    direction="up"
                    delay={index * 0.1}
                  >
                    <motion.button
                      onClick={() => setActiveOffice(office.id)}
                      className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-300 w-full h-full ${isActive
                        ? `${borderColor} ${bgColor} shadow-xl scale-105`
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg"
                        }`}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className={`absolute -top-2 -right-2 w-6 h-6 rounded-full ${office.color === "green" ? "bg-green-500" : "bg-blue-500"} flex items-center justify-center`}
                          transition={{ type: "spring", bounce: 0.3 }}
                        >
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </motion.div>
                      )}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="relative w-10 h-7 overflow-hidden rounded shadow-sm">
                          <Image
                            src={`https://flagcdn.com/w80/${office.countryCode}.png`}
                            alt={office.country}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-black text-gray-900">{office.city}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {office.address}
                      </p>
                    </motion.button>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
          { }
          <ScrollReveal direction="right" className="w-full">
            <motion.div
              key={activeOffice}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 md:p-12 text-white shadow-2xl sticky top-8"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-16 h-16 rounded-2xl ${activeOfficeData.color === "green" ? "bg-green-500" : "bg-blue-500"} flex items-center justify-center shadow-lg overflow-hidden relative`}>
                  <Image
                    src={`https://flagcdn.com/w160/${activeOfficeData.countryCode}.png`}
                    alt={activeOfficeData.country}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black break-words leading-tight">{activeOfficeData.city}</h3>
                </div>
              </div>
              { }
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { id: "kazan", abbr: "КЗН" },
                  { id: "ashgabat", abbr: "АГ" },
                  { id: "balkanabat", abbr: "БН" },
                  { id: "turkmenabat", abbr: "ЛБ" },
                  { id: "dashoguz", abbr: "ДЗ" },
                  { id: "mary", abbr: "МР" },
                  { id: "tashkent", abbr: "ТАШ" },
                ].map(({ id, abbr }) => (
                  <button
                    key={id}
                    onClick={() => setActiveOffice(id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      activeOffice === id
                        ? "bg-crimson text-white"
                        : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    {abbr}
                  </button>
                ))}
              </div>
              <div className="space-y-6">
                { }
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{dict?.labels?.address || "Адрес"}</p>
                    <p className="text-white/90">{activeOfficeData.address}</p>
                  </div>
                </div>
                { }
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{dict?.labels?.phone || "Телефон"}</p>
                    {activeOfficeData.phone && (
                      <a href={`tel:${activeOfficeData.phone}`} className="text-white/90 hover:text-white transition-colors block">
                        {dict?.labels?.messenger || "ТГ / ВАТСАП / IMO"} {activeOfficeData.phone}
                      </a>
                    )}
                    {activeOfficeData.phones && activeOfficeData.phones.map((phone, idx) => (
                      <a key={idx} href={`tel:${phone}`} className="text-white/90 hover:text-white transition-colors block">
                        {dict?.labels?.messenger || "ТГ / ВАТСАП / IMO"} {phone}
                      </a>
                    ))}
                  </div>
                </div>
                { }
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{dict?.labels?.workingHours || "Время работы"}</p>
                    <p className="text-white/90">{dict?.labels?.weekdays || "Пн-Пт"}: 9:00 - 18:00</p>
                    <p className="text-white/70 text-sm">{dict?.labels?.saturday || "Сб"}: 10:00 - 14:00</p>
                  </div>
                </div>
              </div>
              { }
              <div className="mt-8 pt-8 border-t border-white/10">
                <a
                  href={`tel:${activeOfficeData.phone || activeOfficeData.phones?.[0]}`}
                  className="w-full bg-crimson hover:bg-crimson/90 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-crimson/20"
                >
                  <Phone className="w-5 h-5" />
                  {dict?.labels?.callOffice || "Позвонить в офис"}
                </a>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
