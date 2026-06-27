"use client";
import { MapPin } from "lucide-react";
import { Office, getStrapiImageUrl } from "@/lib/strapi";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface TeamByCityProps {
  lang: string;
  dict: any;
  offices: Office[];
}

export default function TeamByCity({ lang, dict, offices }: TeamByCityProps) {
  if (!offices.length) return null;

  return (
    <section className="bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page intro */}
        <div className="mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-crimson/10 text-crimson text-xs font-bold uppercase tracking-wider mb-4">
            {dict?.badge || (lang === 'ru' ? 'Наша команда' : 'Our Team')}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-4">
            {dict?.title || (lang === 'ru' ? 'Эксперты, Стоящие За Нами' : 'The Experts Behind Us')}
          </h1>
          {dict?.description && (
            <p className="text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed">
              {dict.description}
            </p>
          )}
        </div>

        {/* Office sections */}
        {offices.map((office) => {
          const members = office.teamMembers ?? [];
          if (!members.length) return null;

          return (
            <div key={office.id} className="mb-20">
              {/* Office heading */}
              <div className="flex items-center gap-3 mb-8">
                {office.photo ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-100">
                    <Image
                      src={getStrapiImageUrl(office.photo.url)}
                      alt={office.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-navy" />
                  </div>
                )}
                <h2 className="text-xl md:text-2xl font-black text-gray-900">{office.name}</h2>
                <div className="h-px flex-1 bg-gray-100" />
                <span className="text-sm text-gray-400 font-medium flex-shrink-0">
                  {members.length}&nbsp;
                  {lang === 'ru' ? 'чел.' : lang === 'tk' ? 'adam' : lang === 'oz' ? 'kishi' : 'members'}
                </span>
              </div>

              {/* Member cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {members.map((member, index) => (
                  <Link key={member.id} href={`/${lang}/teams/${member.slug}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
                      className="group relative cursor-pointer h-[260px] md:h-[340px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                      {member.photo ? (
                        <Image
                          src={getStrapiImageUrl(member.photo.url)}
                          alt={member.fullName}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl bg-gray-200">
                          👤
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4">
                        <div className="backdrop-blur-md bg-white/20 border border-white/20 rounded-xl p-3 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="text-white font-bold text-xs md:text-sm leading-tight uppercase tracking-tight">
                            {member.fullName}
                          </h3>
                          <p className="text-white/70 text-[10px] mt-1 font-medium">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
