"use client";
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { Locale } from "@/i18n-config";
interface StatisticsProps {
  lang: Locale;
  dict: any;
}
export default function Statistics({ lang, dict }: StatisticsProps) {
  const stats = [
    { 
      number: "1200", 
      label: dict.results?.totalStudents || "Students over all time", 
      icon: true 
    },
    { 
      number: "200", 
      label: dict.results?.lastYearStudents || "Students only last academic year", 
      icon: true 
    },
    { 
      number: "35%", 
      label: dict.results?.averageGrowth || "Average annual growth", 
      icon: true 
    },
    { 
      number: "95%", 
      label: dict.results?.firstAttempt || "Enroll on first attempt", 
      icon: false 
    },
    { 
      number: "70%", 
      label: dict.results?.scholarships || "Receive scholarships", 
      icon: false 
    },
  ];
  return (
    <section className="py-16 bg-white overflow-hidden border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-20">
          <div className="md:col-span-1">
            <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-[10px] md:text-xs font-bold tracking-wider uppercase text-gray-500">
              {dict.badge || "Statistics"}
            </div>
          </div>
          <div className="md:col-span-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0A2647] leading-tight tracking-tight">
              {dict.description || "Our dedicated team of education consultants, visa experts, and mentors works tirelessly to ensure your success."}
            </h2>
          </div>
        </div>
        {}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-12 relative">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative px-4 first:pl-0 last:pr-0"
            >
              {}
              {index !== 0 && (
                <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-gray-100" />
              )}
              <div className="group">
                <div className="flex items-start gap-1 mb-2">
                  <span className="text-4xl md:text-4xl lg:text-5xl font-bold text-[#0A2647] tracking-tighter">
                    {stat.number}
                  </span>
                  {stat.icon && (
                    <TrendingUp className="w-5 h-5 text-[#0A2647]/20 mt-1 transition-transform group-hover:translate-y-[-2px] group-hover:translate-x-[2px]" />
                  )}
                </div>
                <p className="text-[10px] md:text-xs text-gray-400 font-medium uppercase tracking-wider leading-relaxed pr-4">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
