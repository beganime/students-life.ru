interface CompanyTimelineProps {
  dict: {
    title: string;
    milestones: Array<{
      year: string;
      title: string;
      description: string;
    }>;
  };
}
export default function CompanyTimeline({ dict }: CompanyTimelineProps) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-black text-slate-800 text-center mb-16">
          {dict.title}
        </h2>
        <div className="relative">
          {}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300" />
          {}
          <div className="space-y-12">
            {dict.milestones.map((milestone: any, index: number) => (
              <div key={index} className="relative pl-20">
                {}
                <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-red-600 border-4 border-white shadow-lg" />
                {}
                <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                  <div className="text-red-600 font-bold text-sm mb-2">{milestone.year}</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{milestone.title}</h3>
                  <p className="text-slate-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
