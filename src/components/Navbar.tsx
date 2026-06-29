"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale, i18n } from "@/i18n-config";
import { useState, useEffect } from "react";
import { Menu, X, Globe, ChevronDown, ChevronRight, Phone } from "lucide-react";
import type { Country } from "@/lib/strapi";
import logo from "../assets/header-logo.svg";
import Image from "next/image";
import { companyLinks, trustBadges, studentProfile } from "@/data/navData";

interface NavbarProps {
  lang: Locale;
  dict: any;
  countries: Country[];
}
export default function Navbar({ lang, dict, countries }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileCountriesOpen, setIsMobileCountriesOpen] = useState(false);
  const [isMobileCompanyOpen, setIsMobileCompanyOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
  const pathname = usePathname();
  const redirectedPathName = (locale: Locale) => `/${locale}`;
  const universityListLabel =
    lang === 'ru' ? 'Вузы 2026-2027' :
    lang === 'tk' ? 'Uniwersitetler 2026-2027' :
    lang === 'oz' ? 'Universitetlar 2026-2027' :
    'Universities 2026-2027';
  const navLinks = [
    { name: dict?.nav?.home, href: `/${lang}` },
    { name: dict?.nav?.countries, href: "#", type: "countries" },
    { name: dict?.nav?.company, href: "#", type: "mega" },
    { name: universityListLabel, href: `/${lang}/universities-2026-2027` },
    { name: dict?.nav?.megaMenu?.blog || "Blog", href: `/${lang}/blog` },
    { name: dict?.nav?.contact, href: `/${lang}/contact` },
  ];
  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-md py-2"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          { }
          <div className="flex-shrink-0 relative z-50">
            <Link href={`/${lang}`} className="flex items-center gap-2">
              <Image
                src={logo}
                alt="students life"
                priority
                sizes="(max-width: 768px) 120px, 150px"
                className="h-10 w-auto"
              />
            </Link>
          </div>
          { }
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => {
              if (link.type === 'countries') {
                return (
                  <div key={index} className="relative group px-3 py-2">
                    <button className="flex items-center gap-1 text-sm font-bold uppercase transition-colors text-gray-900 hover:text-navy">
                      {link.name}
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </button>
                    { }
                    <div className="absolute left-1/2 top-full w-[min(92vw,760px)] -translate-x-1/2 translate-y-2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
                        <div className="border-b border-gray-100 bg-gray-50/70 px-5 py-4">
                          <div className="text-[11px] font-black uppercase tracking-[0.22em] text-gray-400">
                            {dict?.nav?.countries || "Countries"}
                          </div>
                        </div>
                        <div className="max-h-[min(72vh,560px)] overflow-y-auto p-3">
                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                            {countries?.map((country) => (
                              <div key={country.id} className="group/country min-w-0">
                                <Link
                                  href={`/${lang}/${country.slug}`}
                                  className="block min-h-[74px] rounded-xl border border-transparent px-4 py-3 text-left text-sm text-black transition-colors hover:border-gray-100 hover:bg-gray-50 hover:text-navy"
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                      <span className="block truncate font-bold">{country.name || (country as any).attributes?.name}</span>
                                      {country.cities && country.cities.length > 0 && (
                                        <span className="mt-1 block text-xs font-medium text-gray-400">
                                          {country.cities.length} {lang === 'ru' ? 'города' : 'cities'}
                                        </span>
                                      )}
                                    </div>
                                    <ChevronRight className="mt-0.5 h-4 w-4 flex-none text-gray-300 transition-colors group-hover/country:text-navy" />
                                  </div>
                                </Link>
                                {country.cities && country.cities.length > 0 && (
                                  <div className="px-4 pb-3">
                                    <div className="flex flex-wrap gap-1.5">
                                      {country.cities.slice(0, 5).map((city: any) => (
                                        <Link
                                          key={city.id}
                                          href={`/${lang}/${country.slug}/${city.slug}`}
                                          className="rounded-full bg-gray-50 px-2.5 py-1 text-[11px] font-semibold text-gray-500 transition-colors hover:bg-navy hover:text-white"
                                        >
                                          {city.name}
                                        </Link>
                                      ))}
                                      {country.cities.length > 5 && (
                                        <Link
                                          href={`/${lang}/${country.slug}`}
                                          className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-bold text-gray-500 transition-colors hover:bg-navy hover:text-white"
                                        >
                                          +{country.cities.length - 5}
                                        </Link>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                );
              }
              if (link.type === 'mega') {
                return (
                  <div key={index} className="relative group px-3 py-2 cursor-pointer">
                    <button className="flex items-center gap-1 text-sm font-bold uppercase transition-colors text-gray-900 hover:text-navy">
                      {link.name}
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </button>
                    { }
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[90vw] md:w-[600px] lg:w-[800px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden grid grid-cols-12">
                        { }
                        <div className="col-span-8 p-8">
                          <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                            {companyLinks.map((item, i) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={i}
                                  href={`/${lang}${item.href}`}
                                  className="group/item flex items-start gap-4 p-2 -mx-2 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center text-navy group-hover/item:bg-navy group-hover/item:text-white transition-colors">
                                    <Icon className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-bold text-gray-900 group-hover/item:text-navy transition-colors">
                                      {dict?.nav?.megaMenu?.[item.titleKey]}
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                      {dict?.nav?.megaMenu?.[item.descKey]}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                          { }
                          <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
                            <Link
                              href={`/${lang}/contact`}
                              className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-blue-900 transition-colors"
                            >
                              {dict?.nav?.megaMenu?.getConsultation}
                              <ChevronRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                        { }
                        <div className="col-span-4 bg-slate-900 p-8 text-white relative overflow-hidden">
                          { }
                          <div className="absolute top-0 right-0 w-32 h-32 bg-navy blur-[80px] opacity-20 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                          <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                              <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-white/20">
                                <Image
                                  src={studentProfile.image}
                                  alt="Student"
                                  width={64}
                                  height={64}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <h3 className="text-lg font-bold">{dict?.nav?.megaMenu?.[studentProfile.nameKey]}</h3>
                              <p className="text-sm text-gray-400 mb-6">{dict?.nav?.megaMenu?.[studentProfile.roleKey]}</p>
                              <blockquote className="text-sm italic text-gray-300 border-l-2 border-navy pl-4">
                                "{dict?.nav?.megaMenu?.[studentProfile.quoteKey]}"
                              </blockquote>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={index}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-bold uppercase transition-colors ${pathname === link.href
                    ? "text-navy"
                    : "text-gray-900 hover:text-navy"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          { }
          <div className="hidden md:flex items-center gap-6">
            { }
            <div className="relative group">
              <button className="flex items-center gap-2 px-2 py-1 rounded-md text-sm font-bold transition-colors text-gray-900 hover:text-navy">
                <div className="relative w-6 h-4 shadow-sm rounded-[2px] overflow-hidden">
                  <Image
                    src={`https://flagcdn.com/w40/${{ en: 'gb', ru: 'ru', tk: 'tm', oz: 'uz' }[lang]}.png`}
                    alt={lang}
                    fill
                    className="object-cover"
                    sizes="24px"
                  />
                </div>
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute right-0 pt-2 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 py-2">
                  {i18n.locales.map((locale) => {
                    const flags = { en: 'gb', ru: 'ru', tk: 'tm', oz: 'uz' };
                    const names = { en: 'English', ru: 'Русский', tk: 'Türkmençe', oz: 'O\'zbekcha' };
                    return (
                      <Link
                        key={locale}
                        href={redirectedPathName(locale)}
                        className={`group flex items-center px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${lang === locale ? 'text-navy font-bold bg-gray-50' : 'text-gray-700'
                          }`}
                      >
                        <div className="relative w-5 h-3.5 mr-3 shadow-sm rounded-[1px] overflow-hidden">
                          <Image
                            src={`https://flagcdn.com/w40/${flags[locale as keyof typeof flags]}.png`}
                            alt={names[locale as keyof typeof names]}
                            fill
                            className="object-cover"
                            sizes="20px"
                          />
                        </div>
                        {names[locale as keyof typeof names]}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            { }
            <Link
              href={`/${lang}/contact`}
              className="px-6 py-2.5 bg-navy text-white text-sm font-bold rounded-full shadow-lg hover:bg-blue-900 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {dict?.nav?.letsTalk}
            </Link>
          </div>
          { }
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
                className="flex items-center gap-1 p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                aria-label="Change language"
              >
                <div className="relative w-6 h-4 shadow-sm rounded-[2px] overflow-hidden">
                  <Image
                    src={`https://flagcdn.com/w40/${{ en: 'gb', ru: 'ru', tk: 'tm', oz: 'uz' }[lang]}.png`}
                    alt={lang}
                    fill
                    className="object-cover"
                    sizes="24px"
                  />
                </div>
                <ChevronDown className={`w-3 h-3 text-gray-600 transition-transform ${isMobileLangOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMobileLangOpen && (
                <>
                  {/* Backdrop to close dropdown on outside click */}
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsMobileLangOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-2xl ring-1 ring-black/5 py-2 z-40">
                    {i18n.locales.map((locale) => {
                      const flags = { en: 'gb', ru: 'ru', tk: 'tm', oz: 'uz' };
                      const names = { en: 'English', ru: 'Русский', tk: 'Türkmençe', oz: 'O\'zbekcha' };
                      return (
                        <Link
                          key={locale}
                          href={redirectedPathName(locale)}
                          onClick={() => setIsMobileLangOpen(false)}
                          className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${lang === locale
                            ? 'text-navy font-bold bg-blue-50'
                            : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                          <div className="relative w-5 h-3.5 shadow-sm rounded-[1px] overflow-hidden">
                            <Image
                              src={`https://flagcdn.com/w40/${flags[locale as keyof typeof flags]}.png`}
                              alt={names[locale as keyof typeof names]}
                              fill
                              className="object-cover"
                              sizes="20px"
                            />
                          </div>
                          {names[locale as keyof typeof names]}
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-navy focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      { }
      <div className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: '80px', height: 'calc(100vh - 80px)' }}
      >
        <div className="h-full overflow-y-auto pb-20 px-6 py-8">
          <div className="space-y-4">
            {navLinks.map((link, index) => {
              if (link.type === 'countries') {
                return (
                  <div key={index} className="border-b border-gray-100 pb-2">
                    <button
                      onClick={() => setIsMobileCountriesOpen(!isMobileCountriesOpen)}
                      className="w-full flex items-center justify-between py-3 text-lg font-bold text-gray-900"
                    >
                      {link.name}
                      <ChevronDown className={`w-5 h-5 transition-transform ${isMobileCountriesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isMobileCountriesOpen && (
                      <div className="pl-4 space-y-4 pb-4">
                        {countries?.map((country) => (
                          <div key={country.id}>
                            <Link
                              href={`/${lang}/${country.slug}`}
                              onClick={() => setIsOpen(false)}
                              className="font-bold text-gray-900 hover:text-navy mb-2 block"
                            >
                              {country.name}
                            </Link>
                            <div className="grid grid-cols-2 gap-2">
                              {country.cities && country.cities.map((city: any) => (
                                <Link
                                  key={city.id}
                                  href={`/${lang}/${country.slug}/${city.slug}`}
                                  onClick={() => setIsOpen(false)}
                                  className="text-sm text-gray-600 py-1 hover:text-navy"
                                >
                                  {city.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              if (link.type === 'mega') {
                return (
                  <div key={index} className="border-b border-gray-100 pb-2">
                    <button
                      onClick={() => setIsMobileCompanyOpen(!isMobileCompanyOpen)}
                      className="w-full flex items-center justify-between py-3 text-lg font-bold text-gray-900"
                    >
                      {link.name}
                      <ChevronDown className={`w-5 h-5 transition-transform ${isMobileCompanyOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isMobileCompanyOpen && (
                      <div className="pl-4 grid grid-cols-1 gap-4 pb-4">
                        {companyLinks.filter(item => item.href !== '/universities').map((item, i) => (
                          <Link
                            key={i}
                            href={`/${lang}${item.href}`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 text-gray-600 hover:text-navy"
                          >
                            <item.icon className="w-5 h-5 opacity-70" />
                            <span className="font-medium">{dict?.nav?.megaMenu?.[item.titleKey]}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={index}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 text-lg font-bold text-gray-900 border-b border-gray-100 hover:text-navy"
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href={`/${lang}/universities`}
              onClick={() => setIsOpen(false)}
              className="block py-3 text-lg font-bold text-gray-900 border-b border-gray-100 hover:text-navy"
            >
              {lang === 'ru' ? 'Список университетов в Туркменистане' : lang === 'tk' ? 'Türkmenistanda ykrar edilýän universitetler' : lang === 'oz' ? "Türkmanistonda tan olingan universitetlar" : 'Recognized Universities in Turkmenistan'}
            </Link>
          </div>
          { }
          <div className="mt-8">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Language</div>
            <div className="grid grid-cols-1 gap-2">
              {i18n.locales.map((locale) => {
                const flags = { en: 'gb', ru: 'ru', tk: 'tm', oz: 'uz' };
                const names = { en: 'English', ru: 'Русский', tk: 'Türkmençe', oz: 'O\'zbekcha' };
                return (
                  <Link
                    key={locale}
                    href={redirectedPathName(locale)}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${lang === locale ? "border-navy bg-blue-50 text-navy" : "border-gray-200"
                      }`}
                  >
                    <div className="relative w-6 h-4 shadow-sm rounded-[1px] overflow-hidden">
                      <Image
                        src={`https://flagcdn.com/w40/${flags[locale as keyof typeof flags]}.png`}
                        alt={names[locale as keyof typeof names]}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-bold">{names[locale as keyof typeof names]}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          { }
          <div className="mt-8">
            <Link
              href={`/${lang}/contact`}
              onClick={() => setIsOpen(false)}
              className="block w-full py-4 text-center bg-navy text-white text-lg font-bold rounded-xl shadow-lg"
            >
              {dict?.nav?.letsTalk}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
