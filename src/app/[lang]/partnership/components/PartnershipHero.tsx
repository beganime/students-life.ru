"use client";
import { motion } from "framer-motion";
import { GraduationCap, Handshake, ArrowDown, Users, Megaphone, Shield, LucideIcon, Globe, TrendingUp, Building2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import heroImg from "@/assets/partnership_hero.png";

interface BenefitItem {
    title: string;
    description: string;
    icon: string;
}

interface PartnershipHeroProps {
    dict: any;
    benefits: any;
    lang: string;
}

import img1 from "@/assets/partnership_grid/1.png";
import img2 from "@/assets/partnership_grid/2.png";
import img3 from "@/assets/partnership_grid/3.png";
import img4 from "@/assets/partnership_grid/4.png";

const iconMap: Record<string, any> = {
    users: img1,
    megaphone: img2,
    shield: img3,
    handshake: img4,
};

export default function PartnershipHero({ dict, benefits, lang }: PartnershipHeroProps) {
    return (
        <div className="relative lg:mb-[160px] xl:mb-[180px]">
            {/* Dark hero section - full screen */}
            <section className="relative w-full h-screen lg:min-h-screen flex items-center bg-[#06182E] overflow-visible pt-24 pb-16 lg:pt-16 lg:pb-48">
                {/* Background effects */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-crimson/8 rounded-full blur-[150px]" />
                    <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-[120px]" />
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                            backgroundSize: "60px 60px",
                        }}
                    />
                </div>

                {/* Hero content - 2 column layout */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* LEFT COLUMN - Content */}
                        <div className="text-center lg:text-left">
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-crimson/10 border border-crimson/20 rounded-full mb-8"
                            >
                                <GraduationCap className="w-4 h-4 text-crimson" />
                                <span className="text-crimson text-xs font-bold tracking-widest uppercase">
                                    {dict.badge}
                                </span>
                            </motion.div>

                            {/* Title */}
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
                            >
                                {dict.title}
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="text-lg md:text-xl text-blue-100/60 max-w-xl mb-10 leading-relaxed"
                            >
                                {dict.subtitle}
                            </motion.p>

                            {/* CTA Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                                className="flex items-center justify-center lg:justify-start gap-4"
                            >
                                <Link
                                    href="#contact-form"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-crimson text-white font-bold text-lg rounded-full hover:bg-crimson/90 transition-all duration-300 shadow-lg shadow-crimson/30 hover:shadow-xl hover:shadow-crimson/40 hover:-translate-y-1"
                                >
                                    <Handshake className="w-5 h-5" />
                                    {dict.cta}
                                </Link>
                            </motion.div>


                        </div>

                        {/* RIGHT COLUMN - Image with floating elements */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative hidden lg:block"
                        >
                            {/* Main image container */}
                            <div className="relative w-full max-w-lg mx-auto">
                                {/* Decorative background shapes */}
                                <div className="absolute -top-8 -right-8 w-72 h-72 bg-crimson/10 rounded-full blur-xl" />
                                <div className="absolute -bottom-8 -left-8 w-56 h-56 bg-blue-500/10 rounded-full blur-xl" />

                                {/* Yellow accent shape behind image */}
                                <div className="absolute bottom-0 left-8 w-64 h-64 bg-amber-400/20 rounded-full" />

                                {/* Main image */}
                                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-black/30">
                                    <Image
                                        src={heroImg}
                                        alt="B2B Partnership"
                                        width={520}
                                        height={600}
                                        className="object-cover w-full h-auto"
                                        priority
                                    />
                                </div>

                                {/* Floating badge - top right: Partner Count */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                    className="absolute -top-4 -right-4 z-20 bg-white rounded-2xl px-5 py-3 shadow-xl shadow-gray-900/10 border border-gray-100"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-crimson/10 rounded-xl flex items-center justify-center">
                                            <Building2 className="w-5 h-5 text-crimson" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">Partners</p>
                                            <p className="text-lg font-extrabold text-gray-900">50+</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Floating badge - left middle: Growth */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 1.0 }}
                                    className="absolute top-1/3 -left-12 z-20 bg-white rounded-2xl px-5 py-3 shadow-xl shadow-gray-900/10 border border-gray-100"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-crimson/10 rounded-xl flex items-center justify-center">
                                            <TrendingUp className="w-5 h-5 text-crimson" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">Growth</p>
                                            <p className="text-lg font-extrabold text-gray-900">↑ 35%</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Floating badge - bottom right: Countries */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 1.2 }}
                                    className="absolute -bottom-6 right-4 z-20 bg-white rounded-2xl px-5 py-3 shadow-xl shadow-gray-900/10 border border-gray-100"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-crimson/10 rounded-xl flex items-center justify-center">
                                            <Globe className="w-5 h-5 text-crimson" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">Countries</p>
                                            <p className="text-lg font-extrabold text-gray-900">8+</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Decorative dotted pattern */}
                                <div className="absolute -top-12 right-12 z-0 opacity-20">
                                    <svg width="80" height="80" viewBox="0 0 80 80">
                                        {[0, 1, 2, 3].map(row =>
                                            [0, 1, 2, 3].map(col => (
                                                <circle key={`${row}-${col}`} cx={col * 20 + 10} cy={row * 20 + 10} r="3" fill="#DC2626" />
                                            ))
                                        )}
                                    </svg>
                                </div>

                                {/* Decorative curved line */}
                                <div className="absolute -top-8 left-4 z-0 opacity-30">
                                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                        <path d="M5 55 C5 25, 30 5, 55 5" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
                                        <path d="M15 55 C15 30, 35 15, 55 15" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="hidden lg:block absolute bottom-0 left-0 right-0 z-20 translate-y-1/2">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-2 xl:grid-cols-4 gap-px bg-gray-100 rounded-2xl shadow-2xl shadow-gray-900/10 overflow-hidden border border-gray-100"
                        >
                            {benefits?.items?.map((item: BenefitItem, index: number) => {
                                const isLast = index === (benefits?.items?.length || 0) - 1;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                        className="group relative p-5 lg:p-6 xl:p-8 text-center flex flex-col items-center justify-start min-w-0 bg-white"
                                    >
                                        <div className="w-16 h-16 xl:w-20 xl:h-20 bg-crimson/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-crimson/10 transition-colors duration-300 overflow-hidden p-3 shrink-0">
                                            <Image
                                                src={iconMap[item.icon] || img1}
                                                alt={item.title}
                                                width={60}
                                                height={60}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <h3 className="text-sm xl:text-base font-bold text-crimson mb-2 w-full break-words hyphens-auto">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs xl:text-sm text-gray-500 leading-relaxed w-full">
                                            {item.description}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mobile hero image - shown below hero on small screens */}
            <div className="lg:hidden relative bg-[#06182E] px-6 pb-10 -mt-1">
                <div className="relative max-w-sm mx-auto">
                    <div className="absolute -top-4 -right-4 w-48 h-48 bg-crimson/10 rounded-full blur-xl" />
                    <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
                        <Image
                            src={heroImg}
                            alt="B2B Partnership"
                            width={400}
                            height={460}
                            className="object-cover w-full h-auto"
                        />
                    </div>

                    {/* Floating badge - top right: Partners */}
                    <div className="absolute -top-3 -right-2 z-20 bg-white rounded-xl px-3 py-2 shadow-lg border border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-crimson/10 rounded-lg flex items-center justify-center">
                                <Building2 className="w-4 h-4 text-crimson" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-medium">Partners</p>
                                <p className="text-sm font-extrabold text-gray-900">50+</p>
                            </div>
                        </div>
                    </div>

                    {/* Floating badge - left middle: Growth */}
                    <div className="absolute top-1/3 -left-3 z-20 bg-white rounded-xl px-3 py-2 shadow-lg border border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-crimson/10 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-4 h-4 text-crimson" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-medium">Growth</p>
                                <p className="text-sm font-extrabold text-gray-900">↑ 35%</p>
                            </div>
                        </div>
                    </div>

                    {/* Floating badge - bottom right: Countries */}
                    <div className="absolute -bottom-3 right-6 z-20 bg-white rounded-xl px-3 py-2 shadow-lg border border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-crimson/10 rounded-lg flex items-center justify-center">
                                <Globe className="w-4 h-4 text-crimson" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-medium">Countries</p>
                                <p className="text-sm font-extrabold text-gray-900">8+</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits cards - mobile only: normal flow below hero */}
            <div className="lg:hidden px-4 py-8 bg-white">
                <div className="grid grid-cols-2 gap-4">
                    {benefits?.items?.map((item: BenefitItem, index: number) => (
                        <div
                            key={index}
                            className="group p-5 text-center bg-gray-50 rounded-xl border border-gray-100"
                        >
                            <div className="w-14 h-14 bg-crimson/5 rounded-xl flex items-center justify-center mx-auto mb-3 overflow-hidden p-2">
                                <Image
                                    src={iconMap[item.icon] || img1}
                                    alt={item.title}
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <h3 className="text-xs font-bold text-crimson mb-1">{item.title}</h3>
                            <p className="text-[10px] text-gray-500 leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
