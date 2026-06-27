"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
interface FAQProps {
  dict: any;
}
export default function FAQ({ dict }: FAQProps) {
  const questions = Object.keys(dict)
    .filter((key) => key.startsWith("q"))
    .map((key) => dict[key]);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  return (
    <section className="py-24 bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase font-montserrat tracking-wide text-[#0B1E3D]">
            {dict.title}
          </h2>
          <div className="mt-4 h-1 w-24 bg-crimson mx-auto rounded-full" />
        </div>
        <div className="space-y-4">
          {questions.map((item: any, index: number) => (
            <div 
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
              >
                <span className="font-bold font-montserrat text-lg text-[#0B1E3D]">
                  {item.q}
                </span>
                <span className="ml-4 text-crimson">
                  {activeIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </span>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="p-6 pt-0 bg-gray-50 text-gray-600 leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
