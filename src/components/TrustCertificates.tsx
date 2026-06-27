import { Download, ExternalLink } from "lucide-react";
import Image from "next/image";
import nguLogo from "@/assets/uni/ngu.jpg";
import kgmuLogo from "@/assets/uni/KSMU_logo.png";
import gguLogo from "@/assets/uni/ggu.jpg";
import vumLogo from "@/assets/uni/varna.png";
import emuLogo from "@/assets/uni/emu.png";
import utarLogo from "@/assets/uni/tunku.png";

interface Certificate {
  logo: any;
  name: string;
  country: string;
  flag: string;
  file: string;
}

const CERTIFICATES: Certificate[] = [
  {
    logo: nguLogo,
    name: "Новосибирский государственный университет",
    country: "Россия",
    flag: "ru",
    file: "/trusts/ngu-novosibirsk.pdf",
  },
  {
    logo: kgmuLogo,
    name: "Казанский государственный медицинский университет",
    country: "Россия",
    flag: "ru",
    file: "/trusts/kgmu-kazan.pdf",
  },
  {
    logo: gguLogo,
    name: "Гомельский государственный университет им. Франциска Скорины",
    country: "Беларусь",
    flag: "by",
    file: "/trusts/ggu-gomel.pdf",
  },
  {
    logo: vumLogo,
    name: "Varna University of Management",
    country: "Болгария",
    flag: "bg",
    file: "/trusts/vum-varna.pdf",
  },
  {
    logo: emuLogo,
    name: "Eastern Mediterranean University",
    country: "Кипр",
    flag: "cy",
    file: "/trusts/emu-cyprus.pdf",
  },
  {
    logo: utarLogo,
    name: "Universiti Tunku Abdul Rahman",
    country: "Малайзия",
    flag: "my",
    file: "/trusts/utar-malaysia.pdf",
  },
];

export default function TrustCertificates() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
      {CERTIFICATES.map((cert, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm hover:border-crimson/40 hover:shadow-md p-6 transition-all duration-200"
        >
          {/* University logo */}
          <div className="h-16 flex items-center mb-4">
            <Image
              src={cert.logo}
              alt={cert.name}
              height={64}
              className="max-h-16 w-auto object-contain"
            />
          </div>

          {/* University name */}
          <p className="font-semibold text-gray-900 text-sm leading-snug mb-3">
            {cert.name}
          </p>

          {/* Flag + country */}
          <div className="flex items-center gap-2 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://flagcdn.com/24x18/${cert.flag}.png`}
              width={24}
              height={18}
              alt={cert.country}
              className="rounded-sm object-cover flex-shrink-0"
            />
            <span className="text-xs text-gray-500">{cert.country}</span>
          </div>

          {/* View / download links — always visible */}
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <a
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-crimson hover:underline"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Просмотреть
            </a>
            <a
              href={cert.file}
              download
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900"
            >
              <Download className="w-3.5 h-3.5" />
              Скачать
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
