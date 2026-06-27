import Image from "next/image";
interface AboutHeroProps {
  dict: {
    title: string;
    subtitle: string;
  };
}
export default function AboutHero({ dict }: AboutHeroProps) {
  const photos = [
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop"
  ];
  return (
    <section className="relative py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-6xl font-black text-slate-800 leading-tight">
              {dict.title}
            </h1>
            <p className="text-xl text-slate-600 font-light">
              {dict.subtitle}
            </p>
          </div>
          {}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg">
                <Image 
                  src={photos[0]} 
                  alt="Team working" 
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="relative h-48 rounded-3xl overflow-hidden shadow-lg">
                <Image 
                  src={photos[1]} 
                  alt="Students" 
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative h-48 rounded-3xl overflow-hidden shadow-lg">
                <Image 
                  src={photos[2]} 
                  alt="Graduation" 
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg">
                <Image 
                  src={photos[3]} 
                  alt="Team meeting" 
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
