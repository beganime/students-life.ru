"use client";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, GraduationCap, Bookmark, ChevronRight, Globe, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface Country {
    name: string;
    flag: string;
    cities: Record<string, string[]>;
    programs?: string[];
}

interface CountryCityShowcaseProps {
    dict: any;
    stats: any;
}

// Map country keys to ISO 3166-1 alpha-2 codes for flag images
const countryCodeMap: Record<string, string> = {
    turkey: "tr",
    germany: "de",
    china: "cn",
    cyprus: "cy",
    bulgaria: "bg",
    canada: "ca",
    belarus: "by",
    russia: "ru",
};

function getFlagUrl(countryKey: string, size: number = 80) {
    const code = countryCodeMap[countryKey] || "xx";
    return `https://flagcdn.com/w${size}/${code}.webp`;
}

export default function CountryCityShowcase({ dict, stats }: CountryCityShowcaseProps) {
    const [expandedCountry, setExpandedCountry] = useState<string | null>(null);

    const countries: Record<string, Country> = dict.countries || {};

    const toggleCountry = (key: string) => {
        setExpandedCountry(expandedCountry === key ? null : key);
    };

    return (
        <section className="py-24 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
                    >
                        {dict.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-500 max-w-2xl mx-auto"
                    >
                        {dict.subtitle}
                    </motion.p>
                </div>

                {/* Stats bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-16"
                >
                    {[
                        { value: stats.students, label: stats.studentsLabel },
                        { value: stats.universities, label: stats.universitiesLabel },
                        { value: stats.countries, label: stats.countriesLabel },
                        { value: stats.cities, label: stats.citiesLabel },
                        { value: stats.years, label: stats.yearsLabel },
                    ].map((stat, idx) => (
                        <div
                            key={idx}
                            className="text-center bg-white rounded-2xl p-4 md:p-6 border border-gray-100 shadow-sm"
                        >
                            <div className="text-2xl md:text-4xl font-extrabold text-crimson mb-1">
                                {stat.value}
                            </div>
                            <div className="text-xs md:text-sm text-gray-400 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Country Cards - Pricing card style */}
                <div className="space-y-6">
                    {Object.entries(countries).map(([key, country], index) => {
                        const cityEntries = Object.entries(country.cities);
                        const cityCount = cityEntries.length;
                        const uniCount = Object.values(country.cities).reduce((s, u) => s + u.length, 0);
                        const isExpanded = expandedCountry === key;

                        // Split cities into two columns for the middle section
                        const midpoint = Math.ceil(cityEntries.length / 2);
                        const citiesCol1 = cityEntries.slice(0, midpoint);
                        const citiesCol2 = cityEntries.slice(midpoint);

                        return (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className="relative bg-white rounded-3xl border border-gray-100 overflow-hidden hover:border-crimson/20 hover:shadow-lg transition-all duration-500 shadow-sm"
                            >
                                {/* Top accent line */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-crimson via-crimson/40 to-transparent" />

                                {/* Header row - always visible */}
                                <button
                                    onClick={() => toggleCountry(key)}
                                    className="w-full flex items-center justify-between p-6 md:p-8 text-left group cursor-pointer"
                                >
                                    <div className="flex items-center gap-5">
                                        {/* Flag image + accent */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-1 h-10 bg-crimson rounded-full" />
                                            <div className="w-12 h-9 relative rounded-md overflow-hidden shadow-sm border border-gray-100">
                                                <Image
                                                    src={getFlagUrl(key, 160)}
                                                    alt={`${country.name} flag`}
                                                    fill
                                                    className="object-cover"

                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-crimson transition-colors">
                                                {country.name}
                                            </h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    {cityCount} {cityCount === 1 ? "city" : "cities"}
                                                </span>
                                                {uniCount > 0 && (
                                                    <span className="flex items-center gap-1.5">
                                                        <GraduationCap className="w-3.5 h-3.5" />
                                                        {uniCount} universities
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Programs badges + arrow */}
                                    <div className="flex items-center gap-3">
                                        {country.programs && country.programs.length > 0 && (
                                            <div className="hidden md:flex items-center gap-2">
                                                {country.programs.slice(0, 2).map((prog, pidx) => (
                                                    <span
                                                        key={pidx}
                                                        className="px-3 py-1 bg-crimson/10 text-crimson rounded-full text-xs font-semibold border border-crimson/20"
                                                    >
                                                        {prog}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-crimson/10 transition-colors">
                                            <motion.div
                                                animate={{ rotate: isExpanded ? 45 : 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                {isExpanded ? (
                                                    <X className="w-5 h-5 text-crimson" />
                                                ) : (
                                                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-crimson transition-colors" />
                                                )}
                                            </motion.div>
                                        </div>
                                    </div>
                                </button>

                                {/* Expanded content with slide animation */}
                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{
                                                height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                                                opacity: { duration: 0.3, delay: 0.05 },
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 md:px-10 pb-8 md:pb-10">
                                                {/* Divider */}
                                                <div className="h-px bg-gray-100 mb-8" />

                                                {/* 3-column layout */}
                                                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_240px] gap-8 lg:gap-10">
                                                    {/* LEFT COLUMN - Country info */}
                                                    <div className="space-y-5">
                                                        {/* Flag image large */}
                                                        <div className="w-24 h-16 relative rounded-xl overflow-hidden shadow-md border border-gray-100">
                                                            <Image
                                                                src={getFlagUrl(key, 320)}
                                                                alt={`${country.name} flag`}
                                                                fill
                                                                className="object-cover"

                                                            />
                                                        </div>

                                                        {/* Stats */}
                                                        <div className="space-y-3">
                                                            <div>
                                                                <span className="text-3xl md:text-4xl font-black text-gray-900">
                                                                    {uniCount > 0 ? uniCount : "—"}
                                                                </span>
                                                                <span className="text-sm text-gray-400 ml-2">universities</span>
                                                            </div>
                                                            <p className="text-sm text-gray-400">
                                                                across <span className="text-gray-900 font-semibold">{cityCount}</span> {cityCount === 1 ? "city" : "cities"}
                                                            </p>
                                                        </div>

                                                        {/* Programs */}
                                                        {country.programs && country.programs.length > 0 && (
                                                            <div className="flex flex-wrap gap-2 pt-1">
                                                                {country.programs.map((prog, pidx) => (
                                                                    <span
                                                                        key={pidx}
                                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-crimson/10 text-crimson rounded-full text-xs font-semibold border border-crimson/20"
                                                                    >
                                                                        <Bookmark className="w-3 h-3" />
                                                                        {prog}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* MIDDLE COLUMN - Cities & Universities */}
                                                    <div className="lg:border-l lg:border-r border-gray-100 lg:px-10">
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                                            {/* Column 1 */}
                                                            <div className="space-y-4">
                                                                {citiesCol1.map(([cityName, universities], cidx) => (
                                                                    <div key={cidx} className="space-y-2">
                                                                        <div className="flex items-center gap-2">
                                                                            <MapPin className="w-3.5 h-3.5 text-crimson" />
                                                                            <span className="text-sm font-bold text-gray-900">{cityName}</span>
                                                                        </div>
                                                                        {universities.length > 0 && (
                                                                            <div className="ml-5 space-y-1.5">
                                                                                {universities.map((uni, uidx) => (
                                                                                    <div key={uidx} className="flex items-start gap-2 text-xs text-gray-500">
                                                                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                                                                                        <span>{uni}</span>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            {/* Column 2 */}
                                                            <div className="space-y-4">
                                                                {citiesCol2.map(([cityName, universities], cidx) => (
                                                                    <div key={cidx} className="space-y-2">
                                                                        <div className="flex items-center gap-2">
                                                                            <MapPin className="w-3.5 h-3.5 text-crimson" />
                                                                            <span className="text-sm font-bold text-gray-900">{cityName}</span>
                                                                        </div>
                                                                        {universities.length > 0 && (
                                                                            <div className="ml-5 space-y-1.5">
                                                                                {universities.map((uni, uidx) => (
                                                                                    <div key={uidx} className="flex items-start gap-2 text-xs text-gray-500">
                                                                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                                                                                        <span>{uni}</span>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* RIGHT COLUMN - Highlights & CTA */}
                                                    <div className="space-y-6">
                                                        {/* Highlights */}
                                                        <div className="space-y-3">
                                                            <div className="flex items-start gap-2">
                                                                <span className="text-crimson font-bold text-sm mt-0.5">+</span>
                                                                <span className="text-sm text-gray-500 italic">
                                                                    Direct university partnerships
                                                                </span>
                                                            </div>
                                                            <div className="flex items-start gap-2">
                                                                <span className="text-crimson font-bold text-sm mt-0.5">+</span>
                                                                <span className="text-sm text-gray-500 italic">
                                                                    Visa & admission support
                                                                </span>
                                                            </div>
                                                            <div className="flex items-start gap-2">
                                                                <span className="text-crimson font-bold text-sm mt-0.5">+</span>
                                                                <span className="text-sm text-gray-500 italic">
                                                                    Accommodation assistance
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* CTA */}
                                                        <a
                                                            href="#contact"
                                                            className="flex items-center justify-center gap-2 w-full py-3.5 bg-crimson text-white font-bold text-sm rounded-xl hover:bg-crimson/90 transition-all duration-300 shadow-lg shadow-crimson/20 hover:shadow-xl hover:shadow-crimson/30 tracking-wide uppercase"
                                                        >
                                                            Get Started
                                                            <ChevronRight className="w-4 h-4" />
                                                        </a>

                                                        {/* Additional info */}
                                                        <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
                                                            <Globe className="w-3.5 h-3.5" />
                                                            <span>{cityCount} {cityCount === 1 ? "city" : "cities"} available</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Decorative elements */}
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-crimson/5 rounded-full blur-3xl pointer-events-none" />
                                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gray-200/30 rounded-full blur-2xl pointer-events-none" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
