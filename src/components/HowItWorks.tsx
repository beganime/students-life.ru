"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  UserCheck,
  FileCheck,
  PlaneTakeoff,
  ArrowRight,
  type LucideIcon,
  Search,
  ClipboardCheck,
  Rocket
} from "lucide-react";
import { cn } from "@/lib/utils";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import Link from "next/link";
const iconMap: Record<string, LucideIcon> = {
  "user-check": UserCheck,
  "file-check": FileCheck,
  "plane-takeoff": PlaneTakeoff,
  "search": Search,
  "clipboard": ClipboardCheck,
  "rocket": Rocket
};
export interface Step {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  iconName: string;
  image: string;
}
interface HowItWorksProps {
  steps: Step[];
  tagline?: string;
  title?: string;
  className?: string;
  dict?: any;
  lang: string;
}
export default function HowItWorks({
  steps,
  tagline = "EASY ONBOARDING",
  title = "How it works?",
  className,
  dict,
  lang
}: HowItWorksProps) {
  const [activeStepId, setActiveStepId] = useState(steps[0]?.id);
  const activeStep = steps.find(s => s.id === activeStepId) || steps[0];
  if (!steps.length) return null;
  return (
    <section className={cn("py-24 bg-white text-gray-900", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-[10px] md:text-xs font-bold tracking-wider uppercase text-gray-500 mb-4">
            {dict?.badge || tagline}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            {dict?.title || title}
          </h2>
          {dict?.subtitle && (
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mt-4 font-medium leading-relaxed">
              {dict.subtitle}
            </p>
          )}
        </div>
        {}
        <div className="bg-gray-50 p-2 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-2 mb-12">
          {steps.map((step) => {
            const isActive = activeStepId === step.id;
            const Icon = iconMap[step.iconName] || UserCheck;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepId(step.id)}
                className={cn(
                  "relative flex-1 flex items-center justify-between p-4 md:px-6 md:py-4 rounded-xl text-left transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-crimson/50",
                  isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeStepTab"
                    className="absolute inset-0 bg-white border border-gray-200 shadow-sm rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-3">
                  <Icon className={cn("w-5 h-5", isActive ? "text-crimson" : "text-gray-400")} />
                  <span className="font-bold text-sm md:text-base">{step.title}</span>
                </div>
                <span className={cn(
                  "relative z-10 font-mono text-xs md:text-sm font-medium",
                  isActive ? "text-gray-900" : "text-gray-500"
                )}>
                  {step.stepNumber}
                </span>
              </button>
            );
          })}
        </div>
        {}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {}
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-6xl font-black text-gray-200 mb-6">
                  {activeStep.stepNumber}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  {activeStep.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {activeStep.description}
                </p>
                <Link href={`/${lang}/contact`}>
                  <InteractiveHoverButton
                    className="bg-white text-black border-gray-200"
                    dotClassName="bg-crimson"
                  >
                    {dict?.getStarted || "Get Started"}
                  </InteractiveHoverButton>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
          {}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 border border-gray-200 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeStep.image}
                    alt={activeStep.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  {}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-crimson/10 flex items-center justify-center text-crimson">
                        {iconMap[activeStep.iconName] ? (
                          (() => {
                            const Icon = iconMap[activeStep.iconName];
                            return <Icon className="w-5 h-5" />
                          })()
                        ) : <UserCheck className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{dict?.currentStep || "Current Step"}</p>
                        <p className="text-sm font-bold text-gray-900">{activeStep.title} {dict?.phase || "Phase"}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
