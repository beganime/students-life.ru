"use client";
import { UserPlus } from "lucide-react";
import { TeamMember, getStrapiImageUrl } from "@/lib/strapi";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
interface TeamProps {
  lang: string;
  dict: any;
  teamMembers: TeamMember[];
  showViewAll?: boolean;
}
export default function Team({ lang, dict, teamMembers, showViewAll = false }: TeamProps) {
  let filteredMembers = teamMembers;
  if (lang === 'ru') {
    filteredMembers = teamMembers.filter(member =>
      member.fullName !== "Нурана Джемшидова" &&
      member.fullName !== "Nurana Jemshidova"
    );
  }
  const displayMembers = filteredMembers;
  return (
    <section className="relative pt-24 bg-white text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {}
          <div className="bg-[#0A2647] rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-10 flex flex-col justify-start border border-white/10 h-[340px] md:h-[450px] text-white overflow-hidden">
            <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold tracking-wider uppercase text-white/70 mb-3 md:mb-4 w-fit">
              {dict.badge || "Our Team"}
            </div>
            <h2 className="text-xl md:text-4xl font-black text-white tracking-tight leading-tight">
              {dict.title || "The Experts Behind Us"}
            </h2>
            <p className="text-white/80 text-xs md:text-sm leading-relaxed mt-auto line-clamp-5 md:line-clamp-none">
              {dict.description || "Dedicated individuals passionate about holistic well-being. Meet the diverse team driving innovation and shaping the future of wellness."}
            </p>
          </div>
          {}
          {displayMembers.map((member, index) => (
            <Link key={member.id} href={`/${lang}/teams/${member.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="group relative cursor-pointer h-[340px] md:h-[450px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {member.photo ? (
                  <Image
                    src={getStrapiImageUrl(member.photo.url)}
                    alt={member.fullName}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"

                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl bg-gray-200">
                    👤
                  </div>
                )}
                <div className="absolute bottom-3 left-3 right-3 md:bottom-6 md:left-6 md:right-6">
                  <div className="backdrop-blur-md bg-white/20 border border-white/20 rounded-xl md:rounded-2xl p-3 md:p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white font-bold text-sm md:text-lg leading-tight uppercase tracking-tight">
                      {member.fullName}
                    </h3>
                    <p className="text-white/70 text-[10px] md:text-xs mt-1 font-medium">
                      {member.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
          {}
          {showViewAll ? (
            <div className="bg-[#5D0E0E] rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-10 flex flex-col justify-between text-white h-[340px] md:h-[450px] relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-xl md:text-3xl font-bold font-montserrat tracking-tight mb-4" dangerouslySetInnerHTML={{ __html: dict.cta_card_title || "Meet Our<br />Whole Team" }} />
                <p className="text-white/80 text-[10px] md:text-xs leading-relaxed max-w-[90%]">
                  {dict.cta_card_desc || "Explore the full directory of our dedicated professionals."}
                </p>
              </div>
              <Link
                href={`/${lang}/teams`}
                className="relative z-10 bg-white text-[#0A2647] w-full py-3 md:py-4 rounded-full font-bold text-xs md:text-base text-center hover:bg-white/90 transition-colors mt-auto"
              >
                {dict.cta_card_button || "View All Team"}
              </Link>
              <UserPlus className="absolute -top-10 -right-10 w-40 h-40 text-white/5 rotate-12" />
            </div>
          ) : (
            <div className="bg-[#0A2647] rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-10 flex flex-col justify-between text-white h-[340px] md:h-[450px] relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-xl md:text-3xl font-bold font-montserrat tracking-tight mb-4">
                  {lang === 'ru' ? 'Начни Своё Обучение За Рубежом' : lang === 'tk' ? 'Daşary ýurtda Okuw Başla' : lang === 'oz' ? "Xorijda O'qishni Boshlang" : 'Start Studying Abroad'}
                </h3>
                <p className="text-white/80 text-[10px] md:text-xs leading-relaxed max-w-[90%]">
                  {lang === 'ru' ? 'Оставь заявку — мы свяжемся с тобой и подберём лучший вариант.' : lang === 'tk' ? 'Arza galdyr, biz saňa jaň ederis.' : lang === 'oz' ? "Ariza qoldiring, biz siz bilan bog'lanamiz." : "Leave a request and we'll find the best option for you."}
                </p>
              </div>
              <Link
                href={`/${lang}/contact`}
                className="relative z-10 bg-white text-[#0A2647] w-full py-3 md:py-4 rounded-full font-bold text-xs md:text-base text-center hover:bg-white/90 transition-colors mt-auto"
              >
                {lang === 'ru' ? 'Подать заявку' : lang === 'tk' ? 'Arza tabşyr' : lang === 'oz' ? "Ariza yuborish" : 'Apply Now'}
              </Link>
              <UserPlus className="absolute -top-10 -right-10 w-40 h-40 text-white/5 rotate-12" />
            </div>
          )}
        </div>
        {showViewAll && filteredMembers.length > 6 && (
          <div className="text-center mt-16">
            <Link href={`/${lang}/teams`}>
              <InteractiveHoverButton
                className="bg-white text-black border-gray-200"
                dotClassName="bg-crimson"
              >
                {lang === 'ru' ? 'Посмотреть всю команду' : 'View All Team'}
              </InteractiveHoverButton>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
