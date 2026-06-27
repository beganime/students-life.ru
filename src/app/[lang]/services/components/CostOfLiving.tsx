"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Utensils, Bus, Wallet } from "lucide-react";
interface CostOfLivingProps {
  dict: any;
}
export default function CostOfLiving({ dict }: CostOfLivingProps) {
  const [activeTab, setActiveTab] = useState<"russia" | "china" | "turkey">("russia");
  const countries = [
    { key: "russia", label: dict.data.russia.name },
    { key: "china", label: dict.data.china.name },
    { key: "turkey", label: dict.data.turkey.name },
  ];
  const activeData = dict.data[activeTab];
  return (
    <section className="relative py-24 bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase font-montserrat tracking-wide text-[#0B1E3D]">
            {dict.title}
          </h2>
          <p className="mt-4 text-xl text-gray-600">{dict.subtitle}</p>
        </div>
        {}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {countries.map((country) => (
            <button
              key={country.key}
              onClick={() => setActiveTab(country.key as any)}
              className={`px-8 py-3 rounded-full text-lg font-bold transition-all ${
                activeTab === country.key
                  ? "bg-crimson text-white shadow-lg scale-105"
                  : "bg-white text-gray-500 hover:bg-gray-100"
              }`}
            >
              {country.label}
            </button>
          ))}
        </div>
        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {activeData.cities.map((city: any, index: number) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
              >
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <h3 className="text-2xl font-black text-[#0B1E3D] font-montserrat">{city.name}</h3>
                    <span className="text-xs font-bold px-2 py-1 bg-gray-100 rounded text-gray-500">ESTIMATED</span>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-gray-600">
                            <Home className="w-5 h-5 text-crimson" />
                            <span>{dict.rent}</span>
                        </div>
                        <span className="font-bold text-gray-900">{city.rent}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-gray-600">
                            <Utensils className="w-5 h-5 text-crimson" />
                            <span>{dict.food}</span>
                        </div>
                        <span className="font-bold text-gray-900">{city.food}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-gray-600">
                            <Bus className="w-5 h-5 text-crimson" />
                            <span>{dict.transport}</span>
                        </div>
                        <span className="font-bold text-gray-900">{city.transport}</span>
                    </div>
                    <div className="pt-4 mt-4 border-t border-dashed border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-[#0B1E3D] font-bold">
                            <Wallet className="w-5 h-5" />
                            <span>{dict.total}</span>
                        </div>
                        <span className="font-black text-xl text-crimson">{city.total}</span>
                    </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
