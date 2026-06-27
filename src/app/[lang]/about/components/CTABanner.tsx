import Link from "next/link";
interface CTABannerProps {
  dict: {
    title: string;
    button: string;
  };
}
export default function CTABanner({ dict }: CTABannerProps) {
  return (
    <section className="py-20 bg-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="text-3xl md:text-5xl font-black text-white">
            {dict.title}
          </h2>
          <Link 
            href="#contact"
            className="px-8 py-4 bg-white text-red-600 font-bold tracking-widest uppercase rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
          >
            {dict.button}
          </Link>
        </div>
      </div>
    </section>
  );
}
