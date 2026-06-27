'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import { universitiesList, totalUniversities } from '@/data/universitiesList';

interface Props {
  lang: string;
  title: string;
}

export default function UniversitiesPage({ lang, title }: Props) {
  const [query, setQuery] = useState('');
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const [scrolledDown, setScrolledDown] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const onScroll = () => {
      const down = window.scrollY >= 60;
      setScrolledDown(down);
      if (!down) setManualOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const pillsVisible = !scrolledDown || manualOpen;

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    let list = activeCountry
      ? universitiesList.filter(c => c.id === activeCountry)
      : universitiesList;

    if (!q) return list.map(c => ({ ...c, filtered: c.universities }));

    return list
      .map(c => ({
        ...c,
        filtered: c.universities.filter(u => u.toLowerCase().includes(q)),
      }))
      .filter(c => c.filtered.length > 0 || c.nameRu.toLowerCase().includes(q));
  }, [query, activeCountry]);

  const scrollToCountry = (id: string) => {
    setActiveCountry(prev => (prev === id ? null : id));
    setTimeout(() => {
      sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const clearFilters = () => {
    setQuery('');
    setActiveCountry(null);
  };

  const matchCount = filtered.reduce((a, c) => a + c.filtered.length, 0);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-[#0A2647] pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
<h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            {title}
          </h1>
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="bg-white/10 rounded-2xl px-5 py-3">
              <div className="text-white font-black text-2xl">{universitiesList.length}</div>
              <div className="text-white/60 text-xs">
                {lang === 'ru' ? 'стран' : lang === 'tk' ? 'ýurt' : lang === 'oz' ? 'mamlakat' : 'countries'}
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl px-5 py-3">
              <div className="text-white font-black text-2xl">{totalUniversities}+</div>
              <div className="text-white/60 text-xs">
                {lang === 'ru' ? 'университетов' : lang === 'tk' ? 'uniwersitet' : lang === 'oz' ? 'universitet' : 'universities'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky search + filter bar */}
      <div className="sticky top-20 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-3">
          {/* Search */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={
                  lang === 'ru' ? 'Поиск по названию университета...' :
                  lang === 'tk' ? 'Uniwersitet adyny gözle...' :
                  lang === 'oz' ? 'Universitet nomini qidirish...' :
                  'Search universities...'
                }
                className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson/30"
              />
              {(query || activeCountry) && (
                <button
                  onClick={clearFilters}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {scrolledDown && (
              <button
                onClick={() => setManualOpen(prev => !prev)}
                className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  manualOpen
                    ? 'bg-crimson text-white border-crimson'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-crimson/50'
                }`}
              >
                {lang === 'ru' ? 'Страны' : lang === 'tk' ? 'Ýurtlar' : lang === 'oz' ? 'Mamlakatlar' : 'Countries'}
                {manualOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          {/* Country pills */}
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{ maxHeight: pillsVisible ? '800px' : '0px', opacity: pillsVisible ? 1 : 0 }}
          >
          <div className="flex flex-wrap gap-2 pb-1">
            {universitiesList.map(c => (
              <button
                key={c.id}
                onClick={() => scrollToCountry(c.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  activeCountry === c.id
                    ? 'bg-crimson text-white border-crimson'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-crimson/50'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://flagcdn.com/20x15/${c.flag}.png`}
                  width={20}
                  height={15}
                  alt={c.nameRu}
                  className="rounded-sm flex-shrink-0"
                />
                {c.nameRu}
                <span className={`${activeCountry === c.id ? 'bg-white/20' : 'bg-gray-100'} rounded-full px-1.5 py-0.5 text-xs`}>
                  {c.universities.length}
                </span>
              </button>
            ))}
          </div>
          </div>
        </div>
      </div>

      {/* Results meta */}
      {(query || activeCountry) && (
        <div className="max-w-7xl mx-auto px-4 pt-4 text-sm text-gray-500">
          {query
            ? `${matchCount} ${lang === 'ru' ? 'результатов по запросу' : 'results for'} «${query}»`
            : null}
        </div>
      )}

      {/* Country sections */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">
              {lang === 'ru' ? 'Ничего не найдено' : 'No results found'}
            </p>
          </div>
        ) : (
          filtered.map(country => (
            <div
              key={country.id}
              ref={el => { sectionRefs.current[country.id] = el; }}
              id={`country-${country.id}`}
              className="scroll-mt-40"
            >
              {/* Country header */}
              <div className="flex items-center gap-3 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://flagcdn.com/32x24/${country.flag}.png`}
                  width={32}
                  height={24}
                  alt={country.nameRu}
                  className="rounded-sm shadow-sm flex-shrink-0"
                />
                <h2 className="text-xl md:text-2xl font-black text-gray-900">
                  {country.nameRu}
                </h2>
                <span className="ml-1 bg-crimson/10 text-crimson text-xs font-bold px-2.5 py-1 rounded-full">
                  {country.filtered.length}
                </span>
              </div>

              {/* University list */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 divide-gray-100">
                  {country.filtered.map((uni, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 px-5 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors"
                    >
                      <span className="text-xs font-bold text-crimson/50 mt-0.5 w-6 flex-shrink-0 text-right">
                        {i + 1}
                      </span>
                      <span className="text-sm text-gray-800 leading-snug">{uni}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
