"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Image imports
import dormImg1 from "@/assets/dormitory/1.png";
import dormImg2 from "@/assets/dormitory/2.png";
import dormImg3 from "@/assets/dormitory/3.png";

interface AccommodationAssistantProps {
  dict: any;
  lang: string;
}

export default function AccommodationAssistant({ dict, lang }: AccommodationAssistantProps) {
  const options = [
    { key: "dorms", image: dormImg1, color: "bg-blue-500", topBg: "bg-[#182C4C]" }, // Dark blue top bg
    { key: "shared", image: dormImg2, color: "bg-purple-500", topBg: "bg-[#182C4C]" }, // Dark blue top bg
    { key: "private", image: dormImg3, color: "bg-crimson", topBg: "bg-[#E6222A]" }, // Red top bg
  ];

  return (
    <section className="relative py-24 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase font-montserrat tracking-wide text-[#0B1E3D]">
            {dict.title}
          </h2>
          <div className="mt-4 h-1 w-24 bg-crimson mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {options.map((option, index) => {
            const data = dict[option.key];

            return (
              <Link key={option.key} href={`/${lang}/contact`} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full cursor-pointer flex flex-col bg-white mt-12"
                >
                  {/* Top Header Background with Image */}
                  <div className="relative w-full flex justify-center items-center">
                    {/* The 3D image protruding outwards */}
                    <div className="relative w-full z-10 flex justify-center -mt-16 group-hover:-mt-20 transition-all duration-500">
                      <Image
                        src={option.image}
                        alt={data.title}
                        className="w-[90%] max-w-[300px] h-auto object-contain drop-shadow-2xl"
                        priority
                        quality={100}
                      />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="relative z-20 flex flex-col flex-grow p-8 pt-10 bg-white">
                    <h3 className="text-2xl font-bold mb-2 font-montserrat text-[#0B1E3D]">{data.title}</h3>
                    <div className="text-3xl font-black text-crimson mb-4">{data.price}</div>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      {data.desc}
                    </p>

                    <div className="mt-auto pt-8 border-t border-gray-200">
                      <button className="text-sm font-bold uppercase tracking-wider text-[#0B1E3D] group-hover:text-crimson transition-colors flex items-center gap-2">
                        View Options <span className="text-lg">→</span>
                      </button>
                    </div>
                  </div>

                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
