import Image from "next/image";
import Link from "next/link";
import iconUniversity from "@/assets/core_services/1.png";
import iconVisa from "@/assets/core_services/2.png";
import iconTransport from "@/assets/core_services/3.png";
import iconTranslation from "@/assets/core_services/4.png";
import iconSupport from "@/assets/core_services/5.png";
import iconWorkVisa from "@/assets/core_services/6.png";
import iconRvp from "@/assets/contact_icons/rvp.png";

interface ServicesGridProps {
  dict: any;
  lang: string;
}

const SERVICE_SLUGS: Record<string, string> = {
  university: "university",
  visa: "visa",
  transport: "transport",
  translation: "translation",
  support: "support",
  workVisa: "work-visa",
  rvp: "rvp",
};

export default function ServicesGrid({ dict, lang }: ServicesGridProps) {
  const services = [
    { key: "university", icon: iconUniversity },
    { key: "visa", icon: iconVisa },
    { key: "transport", icon: iconTransport },
    { key: "translation", icon: iconTranslation },
    { key: "support", icon: iconSupport },
    { key: "workVisa", icon: iconWorkVisa },
    { key: "rvp", icon: iconRvp },
  ];

  return (
    <section className="relative py-24 bg-gray-50 text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase font-montserrat tracking-wide text-[#0B1E3D]">
            {dict.title}
          </h2>
          <div className="mt-4 h-1 w-24 bg-crimson mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {services.slice(0, 3).map((service) => (
            <Link
              key={service.key}
              href={`/${lang}/services/${SERVICE_SLUGS[service.key]}`}
              className="group p-8 pt-12 mt-8 rounded-2xl bg-white backdrop-blur-md border border-gray-200 hover:border-crimson hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer relative block"
            >
              <div className="absolute -top-10 left-8 w-24 h-24 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 drop-shadow-md">
                <Image
                  src={service.icon}
                  alt={dict[service.key]?.title || service.key}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 mt-4 font-montserrat text-[#0B1E3D] group-hover:text-crimson transition-colors">
                {dict[service.key]?.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {dict[service.key]?.desc}
              </p>
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.slice(3).map((service) => (
            <Link
              key={service.key}
              href={`/${lang}/services/${SERVICE_SLUGS[service.key]}`}
              className="group p-8 pt-12 mt-8 rounded-2xl bg-white backdrop-blur-md border border-gray-200 hover:border-crimson hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer relative block"
            >
              <div className="absolute -top-10 left-8 w-24 h-24 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 drop-shadow-md">
                <Image
                  src={service.icon}
                  alt={dict[service.key]?.title || service.key}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 mt-4 font-montserrat text-[#0B1E3D] group-hover:text-crimson transition-colors">
                {dict[service.key]?.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {dict[service.key]?.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-crimson/20 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
