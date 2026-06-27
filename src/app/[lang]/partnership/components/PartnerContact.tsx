"use client";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Calendar, Briefcase } from "lucide-react";

interface PartnerContactProps {
    dict: any;
}

export default function PartnerContact({ dict }: PartnerContactProps) {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm"
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{dict.title}</h3>
                    <p className="text-sm text-crimson font-semibold mb-6">{dict.role}</p>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <Briefcase className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                            <p className="text-sm text-gray-600">{dict.department}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <a href={`tel:${dict.phone}`} className="text-sm text-gray-900 font-medium hover:text-crimson transition-colors">
                                {dict.phone}
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <a href={`mailto:${dict.email}`} className="text-sm text-crimson font-medium hover:underline">
                                {dict.email}
                            </a>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-600">{dict.location}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <p className="text-sm text-gray-500">{dict.startDate}</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
