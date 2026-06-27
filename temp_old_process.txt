"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Locale } from "@/i18n-config";

interface ProcessSectionProps {
  lang: Locale;
  dict: any;
}

// Kart Bileşeni
const Card = ({
  i,
  step,
  progress,
  range,
  targetScale,
  totalSteps,
}: {
  i: number;
  step: any;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
  totalSteps: number;
}) => {
  const container = useRef(null);
  
  // Kartın kendi içindeki scroll takibi
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  // Scale animasyonu: Kart yukarı doğru itildikçe hafifçe küçülür
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="flex flex-col items-center justify-center sticky"
      style={{
        // Navbar + Offset
        top: `calc(120px + ${i * 40}px)`,
        // Scroll distance until next card
        marginBottom: "35vh", // Slightly tightened for better pacing
        // Stack order: ensure later cards are on top (standard DOM), but explicit is safe
        zIndex: i,
      }}
    >
      <motion.div
        style={{
          scale,
        }}
        className="relative flex flex-col h-[400px] w-full max-w-xl rounded-3xl border border-gray-200 bg-white shadow-2xl p-8 origin-top"
      >
        {/* Numara Alanı */}
        <div className="absolute top-0 left-0 bg-red-50 px-6 py-4 rounded-br-3xl border-b border-r border-red-100">
          <span className="text-3xl font-bold text-red-600">
            0{step.number}
          </span>
        </div>

        <div className="mt-12 flex flex-col justify-center h-full px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {step.title}
          </h3>
          <p className="text-gray-600 leading-relaxed text-base">
            {step.desc}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default function ProcessSection({ lang, dict }: ProcessSectionProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  if (!dict) return null;

  const steps = [
    dict.steps.s1,
    dict.steps.s2,
    dict.steps.s3,
    dict.steps.s4,
    dict.steps.s5,
  ];

  return (
    // relative ve h-fit kullanarak sticky context'i koruyoruz
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Ana Grid Yapısı */}
        <div ref={container} className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative">
          
          {/* SOL KOLON - Sticky Başlık */}
          <div className="w-full h-fit lg:sticky lg:top-32 self-start">
             <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col gap-8 pr-8"
              >
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                  {dict.title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  {dict.description}
                </p>

                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center justify-center w-fit gap-3 px-8 py-4 bg-crimson text-white rounded-full font-semibold text-lg transition-all hover:bg-red-700 hover:scale-105 shadow-lg group"
                >
                  {dict.cta}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
          </div>

          {/* SAĞ KOLON - Kartlar */}
          <div className="w-full relative pt-10 pb-20">
            {steps.map((step: any, i: number) => {
              // Kartların arkaya doğru küçülmesi için hesaplama
              const targetScale = 1 - (steps.length - i - 1) * 0.05;
              
              return (
                <Card
                  key={i}
                  i={i}
                  step={step}
                  progress={scrollYProgress}
                  range={[i * (1 / steps.length), 1]}
                  targetScale={targetScale}
                  totalSteps={steps.length}
                />
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}