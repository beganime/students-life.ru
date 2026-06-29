"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Globe, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import type { Country as StrapiCountry } from "@/lib/strapi";
import { getBestStrapiImage, getStrapiImageUrl, isRemoteStrapiMediaUrl } from "@/lib/strapi-media";
interface CountryData {
  name: string;
  slogan: string;
  description: string;
  tags: string[];
}
interface CountriesProps {
  lang: string;
  dict: {
    badge?: string;
    title: string;
    description?: string;
    viewMore: string;
    contactCta: string;
    [key: string]: any;
  };
  countries?: StrapiCountry[];
}
import russiaImg from "../assets/images/russia.webp";
import chinaImg from "../assets/images/china.webp";
import turkeyImg from "../assets/images/turkey.webp";
import cyprusImg from "../assets/images/cyprus.webp";
import belarusImg from "../assets/images/belarus.webp";
import bulgariaImg from "../assets/images/bulgaria.webp";
const countriesList = [
  { key: "china", img: chinaImg },
  { key: "russia", img: russiaImg },
  { key: "turkey", img: turkeyImg },
  { key: "cyprus", img: cyprusImg },
  { key: "belarus", img: belarusImg },
  { key: "bulgaria", img: bulgariaImg },
];

const countryAliases: Record<string, string[]> = {
  china: ["china", "kitay", "китай", "hytaý", "xitoy"],
  russia: ["russia", "rossiya", "россия", "russiya", "russiýa"],
  turkey: ["turkey", "turkiye", "türkiye", "турция", "turkiya", "türkiýe"],
  cyprus: ["cyprus", "kipr", "кипр"],
  belarus: ["belarus", "belarus'", "беларусь", "belorussiya", "белоруссия"],
  bulgaria: ["bulgaria", "bolgariya", "болгария", "bolgariýa"],
};

function normalizeCountryValue(value?: string) {
  return (value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zа-яё0-9]+/gi, "");
}

function findStrapiCountry(key: string, countries: StrapiCountry[] = []) {
  const aliases = (countryAliases[key] || [key]).map(normalizeCountryValue);
  return countries.find((country) => {
    const slug = normalizeCountryValue(country.slug);
    const name = normalizeCountryValue(country.name);
    return aliases.includes(slug) || aliases.includes(name);
  });
}

function resolveCountrySlug(key: string, countries: StrapiCountry[] = []) {
  return findStrapiCountry(key, countries)?.slug || key;
}

export default function Countries({ lang, dict, countries = [] }: CountriesProps) {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const getCardWidth = () => {
    if (scrollContainerRef.current) {
      const firstCard = scrollContainerRef.current.querySelector('div > div > div') as HTMLElement;
      if (firstCard) {
        return firstCard.offsetWidth + 32;
      }
    }
    return 932;
  };
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = getCardWidth();
      const containerWidth = container.offsetWidth;
      const targetScroll = (cardWidth * 1) - (containerWidth / 2) + (cardWidth / 2);
      container.scrollLeft = targetScroll;
      setActiveIndex(1);
    }
  }, []);
  const handleScroll = () => {
    if (scrollContainerRef.current && !isDragging) {
      const { scrollLeft } = scrollContainerRef.current;
      const cardWidth = getCardWidth();
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);
    }
  };
  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = getCardWidth();
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    scrollContainerRef.current.style.scrollSnapType = 'none';
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };
  const handleMouseLeave = () => {
    if (isDragging && scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollSnapType = 'x mandatory';
      setIsDragging(false);
    }
  };
  const handleMouseUp = () => {
    if (isDragging && scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollSnapType = 'x mandatory';
      setIsDragging(false);
      setTimeout(() => {
        handleScroll();
      }, 100);
    }
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleCardClick = (key: string) => {
    if (!isDragging) {
      router.push(`/${lang}/${resolveCountrySlug(key, countries)}`);
    }
  };
  return (
    <section className="relative py-16 bg-[#F8F9FA] text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="flex-1 text-left">
            <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-[10px] md:text-xs font-bold tracking-wider uppercase text-gray-500 mb-4">
              {dict.badge || "Destinations"}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              {dict.title}
            </h2>
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mt-4 font-medium leading-relaxed">
              {dict.description}
            </p>
          </div>
          <div className="pb-2">
            <Link href={`/${lang}/contact`}>
              <InteractiveHoverButton
                className="bg-white text-black border-gray-200"
                dotClassName="bg-crimson"
              >
                {dict.contactCta}
              </InteractiveHoverButton>
            </Link>
          </div>
        </div>
      </div>
      {}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="relative w-full overflow-x-auto pb-12 hide-scrollbar cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="flex gap-8 px-4 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2))] min-w-max select-none">
          {countriesList.map((country, index) => {
            const countryData = dict[country.key as keyof typeof dict] as CountryData;
            const strapiCountry = findStrapiCountry(country.key, countries);
            const countryName = countryData?.name || strapiCountry?.name || country.key;
            const countryDescription = countryData?.description || strapiCountry?.description || "";
            const cmsImage = getBestStrapiImage(strapiCountry?.images);
            const imageSrc = cmsImage?.url ? getStrapiImageUrl(cmsImage.url) : country.img;
            const tags = countryData?.tags || [];
            return (
              <motion.div
                key={country.key}
                initial={{ opacity: 0, scale: 1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onClick={() => handleCardClick(country.key)}
                className="flex h-[260px] w-[350px] flex-row overflow-hidden rounded-[1.75rem] border border-gray-100 bg-white shadow-xl transition-all duration-500 group cursor-pointer hover:shadow-2xl sm:h-[320px] sm:w-[560px] md:h-[420px] md:w-[900px] md:rounded-[2.5rem]"
              >
                {}
                <div className="z-10 flex flex-[1.18] flex-col justify-between bg-white p-5 sm:p-7 md:flex-[1.2] md:p-10">
                  <div>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 transition-colors duration-300 group-hover:bg-crimson group-hover:text-white sm:mb-5 sm:h-12 sm:w-12">
                      <Globe className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold tracking-tight transition-colors group-hover:text-crimson sm:text-2xl md:mb-3 md:text-3xl">
                      {countryName}
                    </h3>
                    <p className="mb-4 line-clamp-3 text-xs leading-5 text-gray-500 sm:text-sm md:mb-6 md:text-base md:leading-relaxed">
                      {countryDescription}
                    </p>
                    <div className="mb-6 hidden flex-wrap gap-2 sm:flex">
                      {tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-bold tracking-widest uppercase px-4 py-2 bg-gray-50 text-gray-400 rounded-full border border-gray-100 group-hover:border-crimson/20 group-hover:bg-crimson/5 group-hover:text-crimson transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto origin-left scale-[0.88] sm:scale-100">
                    <InteractiveHoverButton
                      className="bg-white text-black border-gray-200"
                      dotClassName="bg-crimson"
                    >
                      {dict.viewMore}
                    </InteractiveHoverButton>
                  </div>
                </div>
                {}
                <div className="relative h-full w-[42%] flex-none overflow-hidden md:flex-1">
                  <Image
                    src={imageSrc}
                    alt={cmsImage?.alternativeText || countryName}
                    fill
                    loading="lazy"
                    unoptimized={typeof imageSrc === 'string' && isRemoteStrapiMediaUrl(imageSrc)}
                    className="pointer-events-none object-cover object-center transition-transform duration-1000 group-hover:scale-110"
                    draggable={false}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      {}
      <div className="flex justify-center gap-1 mt-8" role="tablist" aria-label="Country slides">
        {countriesList.map((country, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={activeIndex === index}
            role="tab"
            className={`p-3 group`}
          >
            <span className={`block rounded-full transition-all duration-300 ${activeIndex === index ? "w-8 h-2.5 bg-crimson" : "w-2.5 h-2.5 bg-gray-300 group-hover:bg-gray-400"}`} />
          </button>
        ))}
      </div>
    </section>
  );
}
