"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Award, FileCheck } from "lucide-react";
interface TrustSectionProps {
  dict: any;
}
export default function TrustSection({ dict }: TrustSectionProps) {
  return (
    <section className="relative py-20 bg-gray-50 text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold uppercase font-montserrat mb-12 tracking-wider">
          {dict.title}
        </h2>
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-80 hover:opacity-100 transition-opacity">
           {}
           <div className="flex flex-col items-center gap-4 group">
                <div className="bg-gray-100 p-4 rounded-full border border-gray-300 group-hover:border-crimson transition-colors">
                    <ShieldCheck className="w-12 h-12 text-crimson" />
                </div>
                <span className="text-sm uppercase tracking-wide text-gray-600 group-hover:text-crimson">Certified Partner</span>
           </div>
           <div className="flex flex-col items-center gap-4 group">
                <div className="bg-gray-100 p-4 rounded-full border border-gray-300 group-hover:border-crimson transition-colors">
                    <Award className="w-12 h-12 text-crimson" />
                </div>
                <span className="text-sm uppercase tracking-wide text-gray-600 group-hover:text-crimson">Top Agency Award</span>
           </div>
           <div className="flex flex-col items-center gap-4 group">
                <div className="bg-gray-100 p-4 rounded-full border border-gray-300 group-hover:border-crimson transition-colors">
                    <FileCheck className="w-12 h-12 text-crimson" />
                </div>
                <span className="text-sm uppercase tracking-wide text-gray-600 group-hover:text-crimson">Legal Compliance</span>
           </div>
        </div>
      </div>
    </section>
  );
}
