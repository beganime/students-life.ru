"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Globe, GraduationCap } from "lucide-react";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
interface City {
  name: string;
  slug: string;
  country: string;
  countrySlug: string;
  description: string;
  majors: string;
  tags: string[];
  img: string;
}
interface DestinationsHubProps {
  dict: {
    title: string;
    description: string;
    viewAll: string;
    viewDetails: string;
    cities: City[];
  };
  lang: string;
}
export default function DestinationsHub({ dict, lang }: DestinationsHubProps) {
  return (
    <section className="relative py-24 bg-[#F8F9FA] text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold font-montserrat tracking-tight mb-4">
              {dict.title}
            </h2>
            <p className="text-gray-600 text-lg">
              {dict.description}
            </p>
          </div>
          <Link href={`/${lang}/contact`}>
            <InteractiveHoverButton
              className="bg-white text-black border-gray-200"
              dotClassName="bg-crimson"
            >
              {dict.viewAll}
            </InteractiveHoverButton>
          </Link>
        </div>
        {}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {dict.cities.map((city: City, index: number) => (
            <Link
              key={index}
              href={`/${lang}/${city.countrySlug}/${city.slug}`}
              className="block h-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row h-full border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer"
              >
                {}
                <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 border border-gray-100 group-hover:bg-crimson group-hover:text-white transition-colors duration-300">
                      <Globe className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-crimson transition-colors">
                      {city.name}, {city.country}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {city.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {city.tags?.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 bg-gray-50 text-gray-500 rounded-full border border-gray-100 group-hover:border-crimson/20 group-hover:bg-crimson/5 group-hover:text-crimson transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-crimson text-white rounded-full hover:bg-crimson/90 transition-all group-hover:shadow-lg group-hover:shadow-crimson/20">
                      <span>{dict.viewDetails}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
                {}
                <div className="flex-1 relative min-h-[300px] md:min-h-full overflow-hidden">
                  <Image
                    src={city.img}
                    alt={city.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
