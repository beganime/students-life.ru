"use client";
import { motion } from "framer-motion";
import { Users, Megaphone, Shield, Handshake, LucideIcon } from "lucide-react";

interface BenefitItem {
    title: string;
    description: string;
    icon: string;
}

interface PartnershipBenefitsProps {
    dict: any;
}

const iconMap: Record<string, LucideIcon> = {
    users: Users,
    megaphone: Megaphone,
    shield: Shield,
    handshake: Handshake,
};

export default function PartnershipBenefits({ dict }: PartnershipBenefitsProps) {
    return (
        <section className="py-24 bg-white">
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

                {/* Benefits grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {dict.items?.map((item: BenefitItem, index: number) => {
                        const IconComponent = iconMap[item.icon] || Users;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100 hover:border-crimson/20 hover:shadow-xl hover:shadow-crimson/5 transition-all duration-500"
                            >
                                {/* Icon */}
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 border border-gray-100 group-hover:bg-crimson group-hover:border-crimson transition-colors duration-300 shadow-sm">
                                    <IconComponent className="w-6 h-6 text-crimson group-hover:text-white transition-colors duration-300" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-crimson transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed">
                                    {item.description}
                                </p>

                                {/* Decorative corner */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-crimson/5 to-transparent rounded-tr-3xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
