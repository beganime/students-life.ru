import Image from "next/image";
import img1 from "@/assets/vision_mision/1.png";
import img2 from "@/assets/vision_mision/2.png";
import img3 from "@/assets/vision_mision/3.png";
interface MissionVisionCardsProps {
  dict: {
    mission: { title: string; content: string };
    vision: { title: string; content: string };
    values: { title: string; content: string };
  };
}
export default function MissionVisionCards({ dict }: MissionVisionCardsProps) {
  const cards = [
    { key: "mission" as const, image: img1 },
    { key: "vision" as const, image: img2 },
    { key: "values" as const, image: img3 }
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.key}
              className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-6 relative w-24 h-24">
                <Image
                  src={card.image}
                  alt={dict[card.key].title}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                {dict[card.key].title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {dict[card.key].content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
