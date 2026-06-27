"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Info, MessageCircle, PhoneCall, Mail } from "lucide-react";
import Image from "next/image";
import ctaBg from "@/assets/ctaform.webp";
import { submitToGoogleSheets } from "@/lib/submitToGoogleSheets";
import { submitToCRM } from "@/lib/submitToCRM";
interface ContactFormSectionProps {
  lang: string;
  dict: any;
}
type ContactPreference = "call" | "whatsapp" | "telegram" | "email";
type Country = "RU" | "TM" | null;
export default function ContactFormSection({ lang, dict }: ContactFormSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preference: "whatsapp" as ContactPreference,
  });
  const [country, setCountry] = useState<Country>("RU");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  useEffect(() => {
    setFormData((prev) => ({ ...prev, phone: "" }));
  }, [country]);
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData.preference === "telegram") {
      setFormData((prev) => ({ ...prev, phone: e.target.value }));
      return;
    }
    let raw = e.target.value.replace(/\D/g, "");
    if (country === "RU") {
      if (raw.startsWith("7")) raw = raw.slice(1);
      raw = raw.slice(0, 10);
      let masked = "";
      if (raw.length > 0) masked += "(" + raw.slice(0, 3);
      if (raw.length > 3) masked += ") " + raw.slice(3, 6);
      if (raw.length > 6) masked += "-" + raw.slice(6, 8);
      if (raw.length > 8) masked += "-" + raw.slice(8, 10);
      setFormData((prev) => ({ ...prev, phone: masked }));
    } else if (country === "TM") {
      if (raw.startsWith("993")) raw = raw.slice(3);
      raw = raw.slice(0, 8);
      let masked = "";
      if (raw.length > 0) masked += raw.slice(0, 2);
      if (raw.length > 2) masked += " " + raw.slice(2, 8);
      setFormData((prev) => ({ ...prev, phone: masked }));
    } else {
      setFormData((prev) => ({ ...prev, phone: e.target.value }));
    }
  };
  useEffect(() => {
    if (formData.preference === "telegram") {
      setShowTelegramModal(true);
    } else {
      setShowTelegramModal(false);
    }
  }, [formData.preference]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const submissionData = {
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      preference: formData.preference,
      country: country || 'Other'
    };
    const [sheetsResult] = await Promise.allSettled([
      submitToGoogleSheets('General Inquiry', submissionData),
      submitToCRM('General Inquiry', submissionData)
    ]);
    setIsSubmitting(false);
    const result = sheetsResult.status === 'fulfilled'
      ? sheetsResult.value
      : { success: false, message: 'Google Sheets submission failed' };
    if (result.success) {
      setSubmitted(true);
    } else {
      alert(result.message);
    }
  };
  return (
    <section id="contact" className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#06182E] max-w-6xl mx-auto">
          {}
          <div className="absolute inset-0 z-0">
            <Image
              src={ctaBg}
              alt="Background"
              fill
              className="object-cover object-right pointer-events-none"
              priority
            />
            {}
            <div className="absolute inset-0 bg-gradient-to-r from-[#06182E] via-[#06182E]/60 to-transparent" />
          </div>
          <div className="relative z-10 px-8 md:px-16 py-8 md:py-10">
            <div className="max-w-4xl mx-auto md:mx-0 text-center md:text-left mb-12">
              {}
              <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-xs font-bold tracking-wider uppercase text-gray-500 mb-4">
                {dict.badge}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight leading-tight">
                {dict.title}
              </h2>
              <p className="text-blue-100/60 text-base font-medium max-w-2xl mx-auto md:mx-0">
                {dict.subtitle}
              </p>
            </div>
            <div className="max-w-lg mx-auto md:mx-0 text-left">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 text-left"
                >
                  <CheckCircle2 className="w-16 h-16 text-white mb-6" />
                  <h3 className="text-3xl font-bold text-white mb-2">{dict.success}</h3>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-blue-200/40 uppercase tracking-[0.2em] pl-1">
                        {dict.fields.name}
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={dict.placeholders.name}
                        className="w-full bg-[#0A2647]/60 backdrop-blur-md border border-white/10 focus:border-white/30 outline-none px-5 py-3 rounded-xl text-white placeholder-white/10 transition-all font-medium text-sm"
                      />
                    </div>
                    {}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-blue-200/40 uppercase tracking-[0.2em] pl-1">
                        {dict.fields.email}
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={dict.placeholders.email}
                        className="w-full bg-[#0A2647]/60 backdrop-blur-md border border-white/10 focus:border-white/30 outline-none px-5 py-3 rounded-xl text-white placeholder-white/10 transition-all font-medium text-sm"
                      />
                    </div>
                  </div>
                  {}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pl-1">
                      <label className="text-[10px] font-bold text-blue-200/40 uppercase tracking-[0.2em]">
                        {formData.preference === "telegram" ? (dict.fields.telegramUsername || "Phone or Telegram") : dict.fields.phone}
                      </label>
                      {formData.preference !== "telegram" && (
                        <div className="flex bg-[#0A2647]/60 backdrop-blur-md scale-90 border border-white/10 p-1 rounded-full">
                          <button
                            type="button"
                            onClick={() => setCountry("RU")}
                            className={`px-3 py-1 text-[9px] font-black rounded-full transition-all ${country === "RU" ? "bg-white text-[#0A2647]" : "text-blue-200/30"}`}
                          >
                            {dict.countryLabels?.russia || "RUSSIA"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setCountry("TM")}
                            className={`px-3 py-1 text-[9px] font-black rounded-full transition-all ${country === "TM" ? "bg-white text-[#0A2647]" : "text-blue-200/30"}`}
                          >
                            {dict.countryLabels?.turkmenistan || "TM"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setCountry(null)}
                            className={`px-3 py-1 text-[9px] font-black rounded-full transition-all ${country === null ? "bg-white text-[#0A2647]" : "text-blue-200/30"}`}
                          >
                            {dict.countryLabels?.other || "OTHER"}
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      {formData.preference !== "telegram" && (
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white font-bold flex items-center gap-3 z-10 pointer-events-none">
                          <span className="text-sm">{country === "RU" ? "+7" : country === "TM" ? "+993" : "+"}</span>
                          <div className="w-[1px] h-4 bg-white/20" />
                        </div>
                      )}
                      <input
                        required
                        type="text"
                        inputMode={formData.preference === "telegram" ? "text" : "tel"}
                        autoComplete="off"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        placeholder={
                          formData.preference === "telegram"
                            ? (dict.placeholders?.telegram || "@username or phone")
                            : country === "RU"
                              ? "(___) ___-__-__"
                              : country === "TM"
                                ? "__ ______"
                                : (dict.placeholders?.phone || "Phone number")
                        }
                        className={`w-full bg-[#0A2647]/60 backdrop-blur-md border border-white/10 focus:border-white/30 outline-none py-3 rounded-xl text-white placeholder-white/10 transition-all ${formData.preference === "telegram" ? "font-medium px-5" : "font-mono tracking-wider"} text-sm ${formData.preference !== "telegram" && (country === "RU" ? "pl-16" : country === "TM" ? "pl-20" : "pl-10")}`}
                      />
                    </div>
                  </div>
                  {}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-blue-200/40 uppercase tracking-[0.2em] pl-1">
                      {dict.fields.contactPreference}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {(["whatsapp", "telegram", "call", "email"] as ContactPreference[]).map((pref) => (
                        <button
                          key={pref}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, preference: pref }))}
                          className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl border transition-all text-[9px] font-black uppercase tracking-widest ${formData.preference === pref
                            ? "bg-white border-white text-[#0A2647]"
                            : "bg-[#0A2647]/60 backdrop-blur-md border-white/10 text-white/70 hover:border-white/20 hover:text-white"
                            }`}
                        >
                          {pref === "whatsapp" && <MessageCircle className="w-3.5 h-3.5" />}
                          {pref === "telegram" && <Send className="w-3.5 h-3.5" />}
                          {pref === "call" && <PhoneCall className="w-3.5 h-3.5" />}
                          {pref === "email" && <Mail className="w-3.5 h-3.5" />}
                          <span>{dict.preferences[pref]}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  {}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-[#0A2647] py-4 rounded-xl font-black uppercase tracking-[0.2em] hover:bg-blue-50 transition-all transform hover:-translate-y-1 shadow-2xl mt-6 text-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (dict.sending || "Sending...") : dict.submit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      {}
      <AnimatePresence>
        {showTelegramModal && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="fixed bottom-0 left-0 lg:left-12 bottom-12 z-[100] max-w-md w-[calc(100%-2rem)]"
          >
            <div className="bg-white text-[#0A2647] p-6 rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.5)] flex items-center gap-5 border border-white/20">
              <div className="bg-[#0A2647]/5 p-3 rounded-[1.25rem]">
                <Info className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-tight mb-1">{dict.telegramPrivacyTitle || "Telegram Privacy"}</p>
                <p className="text-xs font-bold text-gray-400">
                  {dict.privacyModal}
                </p>
              </div>
              <button
                onClick={() => setShowTelegramModal(false)}
                className="ml-auto bg-[#0A2647] text-white p-2.5 rounded-xl transition-all hover:scale-105"
              >
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
