"use client";
import React from "react";
import { Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import footerLogo from "../assets/footer_logo.webp";
import onlyLogo from "../assets/onlylogo.png";
import ctaIcon1 from "@/assets/core_services/1.png";
import ctaIcon2 from "@/assets/core_services/2.png";
import ctaIcon3 from "@/assets/core_services/3.png";
import ctaIcon4 from "@/assets/core_services/4.png";

interface FooterProps {
  lang: string;
  dict: any;
}


export default function Footer({ lang, dict }: FooterProps) {
  const t = dict?.footer || {};
  const legal = dict?.legal || {};

  return (
    <footer className="relative bg-white text-gray-900 pt-6 pb-0 overflow-hidden ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* === TOP CTA BANNER (Red Section) === */}
        <div className="relative w-full rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-crimson to-red-900 px-8 py-12 md:p-16 lg:p-20 shadow-2xl shadow-crimson/20 mb-12 sm:mb-16">

          {/* Decorative Background Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Glowing Orbs */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-400/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-[80px]" />

            {/* Connecting SVG Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
              <path d="M -100,100 C 200,100 300,300 500,200 S 700,100 1200,200" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M 200,450 C 400,300 500,100 800,150" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            </svg>

            {/* Floating Icons */}
            <div className="hidden lg:flex absolute top-12 right-1/3 w-14 h-14 bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl items-center justify-center overflow-hidden p-2">
              <Image src={ctaIcon1} alt="" className="w-full h-full object-contain" />
            </div>
            <div className="hidden lg:flex absolute bottom-20 right-1/4 w-16 h-16 bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl items-center justify-center overflow-hidden p-2 shadow-xl">
              <Image src={ctaIcon2} alt="" className="w-full h-full object-contain" />
            </div>
            <div className="hidden lg:flex absolute top-24 right-20 w-14 h-14 bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl items-center justify-center overflow-hidden p-2 shadow-xl">
              <Image src={ctaIcon3} alt="" className="w-full h-full object-contain" />
            </div>
            <div className="hidden lg:flex absolute bottom-12 right-12 w-12 h-12 bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl items-center justify-center overflow-hidden p-2 shadow-lg">
              <Image src={ctaIcon4} alt="" className="w-full h-full object-contain" />
            </div>

            {/* Small animated dots */}
            <div className="hidden lg:block absolute top-[28%] right-[32%] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] animate-pulse" />
            <div className="hidden lg:block absolute bottom-[35%] right-[20%] w-3 h-3 bg-red-300 rounded-full shadow-[0_0_15px_pink] animate-pulse delay-300" />
          </div>

          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
              {lang === 'ru' ? 'Сделай шаг.' : 'Take the step.'}<br />
              <span className="text-white/80 font-semibold tracking-normal">
                {lang === 'ru' ? 'Не просто мечтай.' : 'Don\'t just dream it.'}
              </span>
            </h2>
            <p className="text-red-50 text-base md:text-lg mb-10 max-w-lg leading-relaxed font-light">
              {lang === 'ru'
                ? 'Присоединяйтесь к тысячам успешных студентов. Начните свое образование без границ прямо сейчас!'
                : 'Join thousands of successful students. Begin your journey to experience education without borders today!'
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Primary CTA */}
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 font-bold px-8 py-4 rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl shadow-black/10"
              >
                {lang === 'ru' ? 'Начать процесс' : 'Start Process'}
              </Link>
              {/* Secondary CTA */}
              <Link
                href={`/${lang}/services`}
                className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold px-8 py-4 rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-300"
              >
                {lang === 'ru' ? 'Наши Услуги' : 'Our Services'}
              </Link>
            </div>
          </div>
        </div>

        {/* === BOTTOM NAVIGATION SECTION (Light Area) === */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-8 pb-16">

          {/* Col 1 */}
          <div className="space-y-6">
            <h3 className="text-gray-900 font-bold text-base">{lang === 'ru' ? 'Платформа' : 'Platform'}</h3>
            <ul className="space-y-3.5 text-gray-600 text-sm">
              <li><Link href={`/${lang}/partnership`} className="hover:text-crimson transition-colors">{t.partner || (lang === 'ru' ? 'B2B Партнерство' : 'B2B Partnership')}</Link></li>
              <li><Link href={`/${lang}/countries`} className="hover:text-crimson transition-colors">{lang === 'ru' ? 'Страны' : 'Countries'}</Link></li>
              <li><Link href={`/${lang}/services`} className="hover:text-crimson transition-colors">{lang === 'ru' ? 'Услуги' : 'Services'}</Link></li>
              <li><Link href={`/${lang}`} className="hover:text-crimson transition-colors">{lang === 'ru' ? 'Университеты' : 'Universities'}</Link></li>
              <li><a href="https://www.tiktok.com/@aga_sila" target="_blank" rel="noopener noreferrer" className="hover:text-crimson transition-colors">TikTok</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-6">
            <h3 className="text-gray-900 font-bold text-base">{lang === 'ru' ? 'Компания' : 'Company'}</h3>
            <ul className="space-y-3.5 text-gray-600 text-sm">
              <li><Link href={`/${lang}/about`} className="hover:text-crimson transition-colors">{t.about || (lang === 'ru' ? 'О нас' : 'About Us')}</Link></li>
              <li><Link href={`/${lang}/teams`} className="hover:text-crimson transition-colors">{lang === 'ru' ? 'Наша команда' : 'Our Team'}</Link></li>
              <li><Link href={`/${lang}/contact`} className="hover:text-crimson transition-colors">{lang === 'ru' ? 'Контакты' : 'Contact Us'}</Link></li>
              <li><Link href={`/${lang}/contact`} className="hover:text-crimson transition-colors">{lang === 'ru' ? 'Карьера' : 'Careers'}</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-6">
            <h3 className="text-gray-900 font-bold text-base">{lang === 'ru' ? 'Ресурсы' : 'Resources'}</h3>
            <ul className="space-y-3.5 text-gray-600 text-sm">
              <li><Link href={`/${lang}/blog`} className="hover:text-crimson transition-colors">{lang === 'ru' ? 'Блог' : 'Blog'}</Link></li>
              <li><Link href={`/${lang}/blog`} className="hover:text-crimson transition-colors">{lang === 'ru' ? 'Новости' : 'News'}</Link></li>
              <li><Link href={`/${lang}`} className="hover:text-crimson transition-colors">{lang === 'ru' ? 'Отзывы' : 'Testimonials'}</Link></li>
              <li><Link href={`/${lang}/contact`} className="hover:text-crimson transition-colors">{lang === 'ru' ? 'Поддержка' : 'FAQ'}</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-6">
            <h3 className="text-gray-900 font-bold text-base">{lang === 'ru' ? 'Юридическая' : 'Legal'}</h3>
            <ul className="space-y-3.5 text-gray-600 text-sm">
              <li><Link href={`/${lang}/terms-of-use`} className="hover:text-crimson transition-colors">{legal.termsOfUse?.title || (lang === 'ru' ? 'Условия Использования' : 'Terms of Service')}</Link></li>
              <li><Link href={`/${lang}/privacy-policy`} className="hover:text-crimson transition-colors">{legal.privacyPolicy?.title || (lang === 'ru' ? 'Политика Конфиденциальности' : 'Privacy Policy')}</Link></li>
              <li><Link href={`/${lang}/cookie-policy`} className="hover:text-crimson transition-colors">{legal.cookiePolicy?.title || (lang === 'ru' ? 'Политика файлов cookie' : 'Cookies Policy')}</Link></li>
              <li><Link href={`/${lang}/privacy-policy`} className="hover:text-crimson transition-colors">{lang === 'ru' ? 'Обработка данных' : 'Data Processing'}</Link></li>
            </ul>
          </div>

          {/* Col 5: Custom Highlight Card (Matches the tweet-like card in the reference) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 pt-4 lg:pt-0">
            <div className="bg-gray-50 border border-gray-100 rounded-[1.5rem] p-6 hover:border-gray-200 transition-colors duration-300 h-full flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 border border-gray-100 shadow-sm overflow-hidden p-1.5">
                      <Image
                        src={onlyLogo}
                        alt="Student's Life Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold text-sm leading-tight">Student's Life</p>
                      <p className="text-gray-500 text-xs mt-0.5">@stud_life_ru</p>
                    </div>
                  </div>
                  {/* Social icon placeholder from reference */}
                  <Instagram className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-gray-600 text-xs leading-relaxed mb-6 font-medium">
                  {lang === 'ru'
                    ? 'Мы только что запустили новые грантовые программы. Подпишитесь на нас в Instagram, чтобы не пропустить.'
                    : 'We\'ve just announced new scholarship programs that will help you increase your chances of studying abroad.'}
                </p>
              </div>

              <a
                href="https://www.instagram.com/stud_life_ru"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl transition-colors text-xs"
              >
                {lang === 'ru' ? 'Подписаться' : 'Follow Us'}
              </a>
            </div>
          </div>

        </div>

        {/* === BOTTOM STRIP (Copyright & Logo) === */}
        <div className="border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center py-8 mt-4 gap-4">
          <div className="flex items-center gap-3">
            <Image
              src={onlyLogo}
              alt="Student's Life Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-gray-500 text-sm font-medium">
              Student's Life, {new Date().getFullYear()}.
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}
