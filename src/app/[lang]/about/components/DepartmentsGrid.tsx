import Image from "next/image";
import icon1 from "@/assets/departments_grid/1.png";
import icon2 from "@/assets/departments_grid/2.png";
import icon3 from "@/assets/departments_grid/3.png";
import icon4 from "@/assets/departments_grid/4.png";
import icon5 from "@/assets/departments_grid/5.png";
import iconRvp from "@/assets/contact_icons/rvp.png";
interface DepartmentsGridProps {
  dict: {
    title: string;
    list: Array<{
      title: string;
      description: string;
    }>;
  };
}
export default function DepartmentsGrid({ dict }: DepartmentsGridProps) {
  const icons = [icon1, icon2, icon3, icon4, icon5, iconRvp];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-black text-slate-800 text-center mb-16">
          {dict.title}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {dict.list.slice(0, 3).map((dept: any, index: number) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-6 relative w-20 h-20">
                <Image
                  src={icons[index] || icon1}
                  alt={dept.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {dept.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {dept.description}
              </p>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dict.list.slice(3).map((dept: any, index: number) => (
            <div
              key={index + 3}
              className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-6 relative w-20 h-20">
                <Image
                  src={icons[index + 3] || icon1}
                  alt={dept.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {dept.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {dept.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
