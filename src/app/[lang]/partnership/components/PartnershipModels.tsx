"use client";
import { motion } from "framer-motion";
import { Building2, Megaphone, Coins, Users, Globe, Headphones, LucideIcon } from "lucide-react";

interface B2BModelItem {
    title: string;
    description: string;
    icon: string;
}

interface PartnershipModelsProps {
    dict: any;
}

import Image from "next/image";
import img1 from "@/assets/partnership_bento/1.png";
import img2 from "@/assets/partnership_bento/2.png";
import img3 from "@/assets/partnership_bento/3.png";
import img4 from "@/assets/partnership_bento/4.png";
import img5 from "@/assets/partnership_bento/5.png";
import img6 from "@/assets/partnership_bento/6.png";

const iconMap: Record<string, any> = {
    building: img1,
    megaphone: img2,
    coins: img3,
    users: img4,
    globe: img5,
    headphones: img6,
};

export default function PartnershipModels({ dict }: PartnershipModelsProps) {
    return (
        <section className="py-24 bg-gray-50">
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

                {/* B2B Models Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dict.items?.map((item: B2BModelItem, index: number) => {
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className="group bg-white rounded-2xl p-6 md:p-8 border border-gray-100 hover:border-crimson/20 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                            >
                                {/* Number badge */}
                                <div className="absolute top-4 right-4 text-5xl font-black text-gray-100 group-hover:text-crimson/10 transition-colors select-none">
                                    0{index + 1}
                                </div>

                                {/* Icon */}
                                <div className="w-16 h-16 bg-crimson/5 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-crimson/10 transition-colors duration-300 overflow-hidden p-3 relative z-10">
                                    <Image
                                        src={iconMap[item.icon] || img1}
                                        alt={item.title}
                                        width={48}
                                        height={48}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                {/* Content */}
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-crimson transition-colors relative z-10">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed relative z-10">
                                    {item.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
