"use client";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PartnershipCTAProps {
    dict: any;
    lang: string;
}

export default function PartnershipCTA({ dict, lang }: PartnershipCTAProps) {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-white rounded-3xl p-10 md:p-16 border border-gray-100 shadow-2xl shadow-gray-200/50 text-center overflow-hidden"
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-crimson via-crimson/50 to-transparent" />
                    <div className="absolute -top-20 -right-20 w-60 h-60 bg-crimson/5 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        {/* Title */}
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {dict.title}
                        </h2>

                        {/* Subtitle */}
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                            {dict.subtitle}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                            <Link
                                href={`/${lang}/contact`}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-crimson text-white font-bold rounded-full hover:bg-crimson/90 transition-all duration-300 shadow-lg shadow-crimson/20 hover:shadow-xl hover:shadow-crimson/30 hover:-translate-y-0.5"
                            >
                                {dict.button}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Email */}
                        <div className="flex items-center justify-center gap-2 text-gray-400">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm">{dict.emailLabel}:</span>
                            <a
                                href={`mailto:${dict.email}`}
                                className="text-sm text-crimson font-medium hover:underline"
                            >
                                {dict.email}
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
