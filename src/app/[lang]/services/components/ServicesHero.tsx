"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import servicesImg from "@/assets/services.png";

interface ServicesHeroProps {
  dict: any;
}

export default function ServicesHero({ dict }: ServicesHeroProps) {
  return (
    <section className="relative w-full min-h-screen flex items-center bg-[#06182E] overflow-visible pt-24 lg:pt-32 pb-16">
      {/* Background glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full lg:w-[1000px] h-full lg:h-[1000px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Main Content Container matching NavBar width */}
      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">

        {/* 2 Column Layout - Expanded space for Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Text Content - taking 5 columns on large screens */}
          <div className="lg:col-span-5 flex flex-col justify-start items-start text-left xl:pl-8">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8 lg:mb-12"
            >
              <h1 className="flex flex-col text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] font-black leading-[0.85] tracking-tighter uppercase whitespace-nowrap">
                <span className="text-crimson block">{dict.mainHeading.part1}</span>
                <div className="flex items-center gap-3">
                  <span className="text-crimson block">{dict.mainHeading.part2}</span>
                  <span className="text-white block">{dict.mainHeading.part3}</span>
                </div>
              </h1>
            </motion.div>

            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="flex flex-col justify-start items-start text-left space-y-4 lg:space-y-6"
            >
              <h2 className="text-white font-bold text-sm md:text-base lg:text-lg leading-tight tracking-wide uppercase max-w-lg">
                {dict.companyTitle}
              </h2>
              <p className="text-blue-100/70 text-sm md:text-base lg:text-lg leading-relaxed max-w-lg">
                {dict.companyDescription}
              </p>
              <div className="pt-2">
                <p className="text-white/40 text-xs md:text-sm lg:text-base leading-relaxed max-w-lg font-medium">
                  {dict.officialReps}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Content (Image) - taking 7 columns on large screens to display it without crops */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="relative hidden lg:block lg:col-span-7 flex justify-center items-center"
          >
             <div className="relative w-full overflow-visible xl:max-w-[100%] 2xl:max-w-[110%] flex justify-center">
                <Image
                  src={servicesImg}
                  alt="Student Services"
                  className="w-[80%] md:w-[75%] lg:w-[85%] xl:w-[80%] h-auto object-cover lg:object-contain drop-shadow-2xl"
                  priority
                  quality={100}
                />
             </div>
          </motion.div>

          {/* Mobile Image (Visible only on small screens) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="relative block lg:hidden w-full mt-8"
          >
             <Image
                src={servicesImg}
                alt="Student Services"
                className="w-full h-auto object-cover drop-shadow-2xl"
                priority
                quality={100}
             />
          </motion.div>

        </div>
      </div>
      
      {/* Dark gradient fade at the very bottom for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#06182E] via-[#06182E]/80 to-transparent pointer-events-none z-20" />
    </section>
  );
}
