"use client";
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
interface LicensesCertificatesProps {
  dict: {
    title: string;
    subtitle: string;
  };
}
export default function LicensesCertificates({ dict }: LicensesCertificatesProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const certificates = [
    "https://images.unsplash.com/photo-1554224311-beee4ead2e10?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&auto=format&fit=crop"
  ];
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-800 mb-4">
            {dict.title}
          </h2>
          <p className="text-xl text-slate-600">
            {dict.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <div 
              key={index}
              onClick={() => setSelectedImage(cert)}
              className="relative aspect-[3/4] rounded-3xl overflow-hidden border-2 border-gray-300 shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Image 
                src={cert} 
                alt={`Certificate ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      {}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-red-600 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-4xl w-full aspect-[3/4]">
            <Image 
              src={selectedImage} 
              alt="Certificate" 
              fill
              className="object-contain rounded-3xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
