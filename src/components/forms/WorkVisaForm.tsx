"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { submitToGoogleSheets } from "@/lib/submitToGoogleSheets";
import { submitToCRM } from "@/lib/submitToCRM";
interface WorkVisaFormProps {
  onBack: () => void;
  dict: {
    backButton: string;
    services: { workVisa: { title: string } };
    fields: Record<string, string>;
    placeholders: Record<string, string>;
    options: Record<string, string>;
    buttons: Record<string, string>;
  };
}
const COUNTRIES = ['Turkmenistan', 'China', 'Turkey', 'Uzbekistan', 'Tajikistan'];
const TURKMEN_REGIONS = ['Lebap', 'Mary', 'Dashoguz', 'Balkan', 'Ahal', 'Ashgabat'];
const WORK_COUNTRIES = ['Russia', 'Belarus'];
export default function WorkVisaForm({ onBack, dict }: WorkVisaFormProps) {
  const router = useRouter();
  const params = useParams();
  const lang = params.lang as string;
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', dateOfBirth: '', hasPassport: '', passportExpiry: '',
    relationship: '', citizenship: '', region: '', city: '', workPreferences: '',
    targetCountry: '', previousTravel: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const [sheetsResult] = await Promise.allSettled([
      submitToGoogleSheets('Work Visa', formData),
      submitToCRM('Work Visa', formData)
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
      <h3 className="text-3xl font-black text-gray-900 mb-8 text-center">{dict.services.workVisa.title}</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="workVisa-fullName" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.fullName} *</label>
          <input id="workVisa-fullName" type="text" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
            placeholder={dict.placeholders.fullName} />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="workVisa-phone" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.phone} *</label>
            <input id="workVisa-phone" type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
              placeholder={dict.placeholders.phone} />
          </div>
          <div>
            <label htmlFor="workVisa-email" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.email} *</label>
            <input id="workVisa-email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
              placeholder={dict.placeholders.email} />
          </div>
        </div>
        <div>
          <label htmlFor="workVisa-dateOfBirth" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.dateOfBirth} *</label>
          <input id="workVisa-dateOfBirth" type="date" required value={formData.dateOfBirth} onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="workVisa-hasPassport" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.hasPassport} *</label>
            <select id="workVisa-hasPassport" required value={formData.hasPassport} onChange={(e) => setFormData({ ...formData, hasPassport: e.target.value })}
              className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
              <option value="">{dict.options.select}</option>
              <option value="yes">{dict.options.yes}</option>
              <option value="no">{dict.options.no}</option>
            </select>
          </div>
          <div>
            <label htmlFor="workVisa-passportExpiry" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.passportExpiry} {formData.hasPassport === 'yes' && '*'}</label>
            <input id="workVisa-passportExpiry" type="date" required={formData.hasPassport === 'yes'} value={formData.passportExpiry} onChange={(e) => setFormData({ ...formData, passportExpiry: e.target.value })}
              className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" />
          </div>
        </div>
        <div>
          <label htmlFor="workVisa-relationship" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.relationship} *</label>
          <select id="workVisa-relationship" required value={formData.relationship} onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
            className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
            <option value="">{dict.options.select}</option>
            <option value="self">{dict.options.self}</option>
            <option value="father">{dict.options.father}</option>
            <option value="mother">{dict.options.mother}</option>
            <option value="friend">{dict.options.friend}</option>
          </select>
        </div>
        <div>
          <label htmlFor="workVisa-citizenship" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.citizenship} *</label>
          <select id="workVisa-citizenship" required value={formData.citizenship} onChange={(e) => setFormData({ ...formData, citizenship: e.target.value, region: '', city: '' })}
            className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
            <option value="">{dict.options.select}</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        {formData.citizenship === 'Turkmenistan' ? (
          <div>
            <label htmlFor="workVisa-region" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.region} *</label>
            <select id="workVisa-region" required value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
              <option value="">{dict.options.select}</option>
              {TURKMEN_REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        ) : formData.citizenship ? (
          <div>
            <label htmlFor="workVisa-city" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.city} *</label>
            <input id="workVisa-city" type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
              placeholder={dict.placeholders.city} />
          </div>
        ) : null}
        <div>
          <label htmlFor="workVisa-workPreferences" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.workPreferences} *</label>
          <textarea id="workVisa-workPreferences" required value={formData.workPreferences} onChange={(e) => setFormData({ ...formData, workPreferences: e.target.value })}
            className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" rows={3}
            placeholder={dict.placeholders.workPreferences} />
        </div>
        <div>
          <label htmlFor="workVisa-targetCountry" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.targetCountry} *</label>
          <select id="workVisa-targetCountry" required value={formData.targetCountry} onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
            className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
            <option value="">{dict.options.select}</option>
            {WORK_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="workVisa-previousTravel" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.previousTravel} *</label>
          <textarea id="workVisa-previousTravel" required value={formData.previousTravel} onChange={(e) => setFormData({ ...formData, previousTravel: e.target.value })}
            className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" rows={2}
            placeholder={dict.placeholders.previousTravel} />
        </div>
        <div className="pt-6">
          <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-crimson text-white font-black uppercase tracking-widest rounded-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
            {isSubmitting ? 'Submitting...' : dict.buttons.submit}
          </button>
        </div>
      </form>
    </div>
  );
}
