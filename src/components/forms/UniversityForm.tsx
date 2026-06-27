"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { submitToGoogleSheets } from "@/lib/submitToGoogleSheets";
import { submitToCRM } from "@/lib/submitToCRM";
interface UniversityFormProps {
  onBack: () => void;
  dict: {
    backButton: string;
    services: { university: { title: string } };
    fields: Record<string, string>;
    placeholders: Record<string, string>;
    options: Record<string, string>;
    buttons: Record<string, string>;
  };
}
interface UniversityFormData {
  fullName: string;
  phone: string;
  email: string;
  educationLevel: string;
  relationship: string;
  dateOfBirth: string;
  targetCountry: string;
  fieldOfStudy: string;
  citizenship: string;
  region: string;
  city: string;
}
const COUNTRIES = [
  'Turkmenistan', 'China', 'Turkey', 'Uzbekistan', 'Tajikistan',
  'Russia', 'Kazakhstan', 'Kyrgyzstan', 'Afghanistan', 'Iran'
];
const TURKMEN_REGIONS = ['Lebap', 'Mary', 'Dashoguz', 'Balkan', 'Ahal', 'Ashgabat'];
const TARGET_COUNTRIES = ['Russia', 'China', 'Cyprus', 'Turkey', 'Belarus', 'Uzbekistan', 'Kazakhstan', 'Malaysia', 'Romania', 'Europe (Hungary, Bulgaria)'];
export default function UniversityForm({ onBack, dict }: UniversityFormProps) {
  const router = useRouter();
  const params = useParams();
  const lang = params.lang as string;
  const [formData, setFormData] = useState<UniversityFormData>({
    fullName: '', phone: '', email: '', educationLevel: '', relationship: '',
    dateOfBirth: '', targetCountry: '', fieldOfStudy: '', citizenship: '', region: '', city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const [sheetsResult] = await Promise.allSettled([
      submitToGoogleSheets('University', formData),
      submitToCRM('University', formData)
    ]);
    const result = sheetsResult.status === 'fulfilled'
      ? sheetsResult.value
      : { success: false, message: 'Google Sheets submission failed' };
    if (result.success) {
      router.push(`/${lang}/thanks`);
    } else {
      alert(result.message);
      setIsSubmitting(false);
    }
  };
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
      <div className="mb-8">
        <button onClick={onBack} className="text-crimson hover:text-red-700 font-bold flex items-center gap-2 transition-colors">
          ← {dict.backButton}
        </button>
      </div>
      <h3 className="text-3xl font-black text-gray-900 mb-8 text-center">
        {dict.services.university.title}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.fullName} *</label>
          <input id="fullName" type="text" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
            placeholder={dict.placeholders.fullName} />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.phone} *</label>
            <input id="phone" type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
              placeholder={dict.placeholders.phone} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.email} *</label>
            <input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
              placeholder={dict.placeholders.email} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="educationLevel" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.educationLevel} *</label>
            <select id="educationLevel" required value={formData.educationLevel} onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
              className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
              <option value="">{dict.options.selectLevel}</option>
              <option value="language">{dict.options.languageCourses}</option>
              <option value="college">{dict.options.college || 'Колледж'}</option>
              <option value="preparatory">{dict.options.preparatory}</option>
              <option value="bachelor">{dict.options.bachelor}</option>
              <option value="master">{dict.options.master}</option>
            </select>
          </div>
          <div>
            <label htmlFor="relationship" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.relationship} *</label>
            <select id="relationship" required value={formData.relationship} onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
              className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
              <option value="">{dict.options.selectRelationship}</option>
              <option value="self">{dict.options.self}</option>
              <option value="father">{dict.options.father}</option>
              <option value="mother">{dict.options.mother}</option>
              <option value="friend">{dict.options.friend}</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.dateOfBirth} *</label>
          <input id="dateOfBirth" type="date" required value={formData.dateOfBirth} onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="targetCountry" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.targetCountry} *</label>
            <select id="targetCountry" required value={formData.targetCountry} onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
              className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
              <option value="">{dict.options.selectCountry}</option>
              {TARGET_COUNTRIES.map(country => <option key={country} value={country}>{country}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="fieldOfStudy" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.fieldOfStudy} *</label>
            <input id="fieldOfStudy" type="text" required value={formData.fieldOfStudy} onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
              className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
              placeholder={dict.placeholders.fieldOfStudy} />
          </div>
        </div>
        <div>
          <label htmlFor="citizenship" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.citizenship} *</label>
          <select id="citizenship" required value={formData.citizenship} onChange={(e) => setFormData({ ...formData, citizenship: e.target.value, region: '', city: '' })}
            className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
            <option value="">{dict.options.selectCountry}</option>
            {COUNTRIES.map(country => <option key={country} value={country}>{country}</option>)}
          </select>
        </div>
        {formData.citizenship === 'Turkmenistan' ? (
          <div>
            <label htmlFor="region" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.region} *</label>
            <select id="region" required value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
              <option value="">{dict.options.selectRegion}</option>
              {TURKMEN_REGIONS.map(region => <option key={region} value={region}>{region}</option>)}
            </select>
          </div>
        ) : formData.citizenship ? (
          <div>
            <label htmlFor="city" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.city} *</label>
            <input id="city" type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
              placeholder={dict.placeholders.city} />
          </div>
        ) : null}
        <div className="pt-6">
          <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-crimson text-white font-black uppercase tracking-widest rounded-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
            {isSubmitting ? 'Submitting...' : dict.buttons.submit}
          </button>
        </div>
      </form>
    </div>
  );
}
