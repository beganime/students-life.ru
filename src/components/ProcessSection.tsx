"use client";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Locale } from "@/i18n-config";
import step1Img from "@/assets/five_steps/01.png";
import step2Img from "@/assets/five_steps/02.png";
import step3Img from "@/assets/five_steps/03.png";
import step4Img from "@/assets/five_steps/04.png";
import step5Img from "@/assets/five_steps/05.png";
interface ProcessSectionProps {
  lang: Locale;
  dict: any;
}
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
  const scale = useTransform(progress, range, [1, targetScale]);
  return (
    <div
      className="h-[500px] lg:h-screen flex items-start lg:items-center justify-center sticky top-0 pt-14 lg:pt-0"
      style={{
        top: `calc(5vh + ${i * 25}px)`,
        marginBottom: "-5vh",
      }}
    >
      <motion.div
        style={{
          scale,
        }}
        className="relative flex flex-col h-[480px] w-full max-w-xl rounded-3xl border border-gray-200 bg-white shadow-2xl p-6 md:p-8 origin-top overflow-hidden"
      >
        {}
        <div className="absolute top-0 left-0 bg-red-50 px-6 py-4 rounded-br-3xl border-b border-r border-red-100 z-10">
          <span className="text-3xl font-bold text-red-600">
            0{step.number}
          </span>
        </div>
        <div className="mt-8 flex flex-col h-full">
          {}
          <div className="relative w-full h-48 md:h-56 mb-6 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={step.image}
              alt={step.title}
              fill
              className="object-cover"
              priority={i === 0}
            />
          </div>
          <div className="px-2">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              {step.title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {step.desc}
            </p>
          </div>
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
    { ...dict.steps?.s1, image: step1Img },
    { ...dict.steps?.s2, image: step2Img },
    { ...dict.steps?.s3, image: step3Img },
    { ...dict.steps?.s4, image: step4Img },
    { ...dict.steps?.s5, image: step5Img },
  ];
  return (
    <section ref={container} className="bg-gray-50 relative pt-12 md:pt-24 pb-24 md:pb-48 ">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {}
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-16 relative">
          {}
          <div className="w-full h-full lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center">
            {}
            <div className="flex flex-col gap-4 md:gap-8 pr-0 md:pr-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col gap-4 md:gap-8"
              >
                <div className="inline-block w-fit px-4 py-1.5 rounded-full border border-red-100 bg-red-50 text-[10px] md:text-xs font-bold tracking-wider uppercase text-red-600">
                  {dict.badge || "Наш Процесс"}
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                  {dict.title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  {dict.description}
                </p>
                <Link href={`/${lang}/contact`}>
                  <InteractiveHoverButton
                    className="bg-white text-black border-gray-200"
                    dotClassName="bg-crimson"
                  >
                    {dict.cta || "Связаться"}
                  </InteractiveHoverButton>
                </Link>
              </motion.div>
            </div>
          </div>
          {}
          <div className="w-full relative">
            {steps.map((step: any, i: number) => {
              const targetScale = 1 - (steps.length - i - 1) * 0.05;
              const rangeStart = i * (1 / steps.length);
              const rangeEnd = 1;
              return (
                <Card
                  key={i}
                  i={i}
                  step={step}
                  progress={scrollYProgress}
                  range={[rangeStart, rangeEnd]}
                  targetScale={targetScale}
                  totalSteps={steps.length}
                />
              );
            })}
          </div>
        </div>
      </div>
      {}
    </section>
  );
}
