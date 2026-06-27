"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Globe, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
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
export default function Countries({ lang, dict }: CountriesProps) {
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
      router.push(`/${lang}/${key}`);
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
            return (
              <motion.div
                key={country.key}
                initial={{ opacity: 0, scale: 1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onClick={() => handleCardClick(country.key)}
                className="bg-white rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row w-[350px] md:w-[900px] h-[480px] md:h-[420px] border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 group cursor-pointer"
              >
                {}
                <div className="flex-[1.2] p-8 md:p-10 flex flex-col justify-between items-start bg-white z-10">
                  <div>
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100 group-hover:bg-crimson group-hover:text-white transition-colors duration-300">
                      <Globe className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-crimson transition-colors font-montserrat tracking-tight">
                      {countryData.name}
                    </h3>
                    <p className="text-gray-500 line-clamp-2 md:line-clamp-3 leading-relaxed text-sm md:text-base mb-6">
                      {countryData.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {countryData.tags?.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-bold tracking-widest uppercase px-4 py-2 bg-gray-50 text-gray-400 rounded-full border border-gray-100 group-hover:border-crimson/20 group-hover:bg-crimson/5 group-hover:text-crimson transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto">
                    <InteractiveHoverButton
                      className="bg-white text-black border-gray-200"
                      dotClassName="bg-crimson"
                    >
                      {dict.viewMore}
                    </InteractiveHoverButton>
                  </div>
                </div>
                {}
                <div className="flex-1 relative h-full overflow-hidden">
                  <Image
                    src={country.img}
                    alt={countryData.name}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 pointer-events-none"
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
