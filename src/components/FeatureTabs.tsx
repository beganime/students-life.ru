"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
export interface FeatureTab {
  id: string;
  title: string;
  description: string;
  icon: StaticImageData;
  image: string;
}
interface FeatureTabsProps {
  features: FeatureTab[];
  title?: string;
  subtitle?: string;
  className?: string;
}
export default function FeatureTabs({
  features,
  title,
  subtitle,
  className
}: FeatureTabsProps) {
  const [activeTabId, setActiveTabId] = useState<string>("");
  useEffect(() => {
    if (features.length > 0 && !activeTabId) {
      setActiveTabId(features[0].id);
    }
  }, [features, activeTabId]);
  const activeFeature = features.find(f => f.id === activeTabId) || features[0];
  if (!features.length) return null;
  return (
    <section className={cn("py-24 bg-white text-gray-900 overflow-hidden", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {}
        {(title || subtitle) && (
          <div className="mb-16 md:mb-24 max-w-3xl">
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {}
          <div className="flex flex-col space-y-4">
            {features.map((feature) => {
              const isActive = activeTabId === feature.id;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveTabId(feature.id)}
                  className={cn(
                    "group relative flex items-start text-left p-6 rounded-2xl transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-crimson/50",
                    isActive ? "opacity-100" : "opacity-100 hover:opacity-100"
                  )}
                >
                  {}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {}
                  <div className="relative z-10 flex gap-6 items-center">
                    <div className={cn(
                      "flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 relative",
                      isActive
                        ? "bg-[#C40201] text-white shadow-[0_8px_20px_rgba(196,2,1,0.3)]"
                        : "bg-transparent text-gray-500 group-hover:bg-gray-50"
                    )}>
                      <div className="relative w-8 h-8">
                        <Image
                          src={feature.icon}
                          alt={feature.title}
                          fill
                          sizes="32px"
                          className={cn(
                            "object-contain transition-all duration-300",
                            isActive ? "brightness-0 invert" : "opacity-100"
                          )}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className={cn(
                        "text-xl font-bold mb-1 transition-colors",
                        isActive ? "text-[#06182E]" : "text-gray-700"
                      )}>
                        {feature.title}
                      </h3>
                      <p className={cn(
                        "text-sm leading-relaxed max-w-sm transition-colors",
                        isActive ? "text-gray-600" : "text-gray-500"
                      )}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          {}
          <div className="relative h-[400px] md:h-[600px] w-full rounded-3xl bg-gray-50 border border-gray-200 p-2 overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.id}
                initial={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-full rounded-2xl overflow-hidden"
              >
                {}
                {activeFeature.image ? (
                  <Image
                    src={activeFeature.image}
                    alt={activeFeature.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-400">No Image Preview</p>
                  </div>
                )}
                {}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
