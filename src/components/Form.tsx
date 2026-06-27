"use client";
import { useState } from "react";
import { GraduationCap, Users, School, Plane as PlaneIcon, Briefcase, Ticket } from "lucide-react";
import UniversityForm from "./forms/UniversityForm";
import TransferForm from "./forms/TransferForm";
import SchoolForm from "./forms/SchoolForm";
import UmrahForm from "./forms/UmrahForm";
import WorkVisaForm from "./forms/WorkVisaForm";
import TicketForm from "./forms/TicketForm";
interface FormProps {
  lang: string;
  dict: {
    title: string;
    selectService: string;
    backButton: string;
    services: {
      university: { title: string; desc: string };
      transfer: { title: string; desc: string };
      school: { title: string; desc: string };
      umrah: { title: string; desc: string };
      workVisa: { title: string; desc: string };
      ticket: { title: string; desc: string };
    };
    fields: Record<string, string>;
    placeholders: Record<string, string>;
    options: Record<string, string>;
    buttons: Record<string, string>;
  };
}
type ServiceType = 'university' | 'transfer' | 'school' | 'umrah' | 'workVisa' | 'ticket' | null;
export default function Form({ lang, dict }: FormProps) {
  const [selectedService, setSelectedService] = useState<ServiceType>(null);
  const [step, setStep] = useState<number>(1);
  const services = [
    { 
      id: 'university' as const, 
      icon: GraduationCap, 
      color: 'bg-blue-500',
      title: dict.services.university.title,
      desc: dict.services.university.desc
    },
    { 
      id: 'transfer' as const, 
      icon: Users, 
      color: 'bg-purple-500',
      title: dict.services.transfer.title,
      desc: dict.services.transfer.desc
    },
    { 
      id: 'school' as const, 
      icon: School, 
      color: 'bg-green-500',
      title: dict.services.school.title,
      desc: dict.services.school.desc
    },
    { 
      id: 'umrah' as const, 
      icon: PlaneIcon, 
      color: 'bg-teal-500',
      title: dict.services.umrah.title,
      desc: dict.services.umrah.desc
    },
    { 
      id: 'workVisa' as const, 
      icon: Briefcase, 
      color: 'bg-orange-500',
      title: dict.services.workVisa.title,
      desc: dict.services.workVisa.desc
    },
    { 
      id: 'ticket' as const, 
      icon: Ticket, 
      color: 'bg-pink-500',
      title: dict.services.ticket.title,
      desc: dict.services.ticket.desc
    },
  ];
  const handleBack = () => {
    setStep(1);
    setSelectedService(null);
  };
  return (
    <section id="quick-form" className="relative py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black uppercase font-montserrat text-gray-900 mb-4">
            {dict.title}
          </h2>
          <p className="text-xl text-gray-600">
            {dict.selectService}
          </p>
        </div>
        {}
        {step === 1 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => {
                    setSelectedService(service.id);
                    setStep(2);
                  }}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg border-2 border-transparent hover:border-crimson hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-left"
                >
                  <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {service.desc}
                  </p>
                </button>
              );
            })}
          </div>
        )}
        {}
        {step === 2 && selectedService === 'university' && (
          <UniversityForm onBack={handleBack} dict={dict} />
        )}
        {step === 2 && selectedService === 'transfer' && (
          <TransferForm onBack={handleBack} dict={dict} />
        )}
        {step === 2 && selectedService === 'school' && (
          <SchoolForm onBack={handleBack} dict={dict} />
        )}
        {step === 2 && selectedService === 'umrah' && (
          <UmrahForm onBack={handleBack} dict={dict} />
        )}
        {step === 2 && selectedService === 'workVisa' && (
          <WorkVisaForm onBack={handleBack} dict={dict} />
        )}
        {step === 2 && selectedService === 'ticket' && (
          <TicketForm onBack={handleBack} dict={dict} />
        )}
      </div>
    </section>
  );
}
