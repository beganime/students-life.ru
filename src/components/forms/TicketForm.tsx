"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { submitToGoogleSheets } from "@/lib/submitToGoogleSheets";
import { submitToCRM } from "@/lib/submitToCRM";
interface TicketFormProps {
  onBack: () => void;
  dict: {
    backButton: string;
    services: { ticket: { title: string } };
    fields: Record<string, string>;
    placeholders: Record<string, string>;
    options: Record<string, string>;
    buttons: Record<string, string>;
  };
}
const COUNTRIES = ['Turkmenistan', 'China', 'Turkey', 'Uzbekistan', 'Tajikistan'];
const TURKMEN_REGIONS = ['Lebap', 'Mary', 'Dashoguz', 'Balkan', 'Ahal', 'Ashgabat'];
export default function TicketForm({ onBack, dict }: TicketFormProps) {
  const router = useRouter();
  const params = useParams();
  const lang = params.lang as string;
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', fromCity: '', toCity: '', travelDate: '',
    needsBaggage: '', citizenship: '', region: '', city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const [sheetsResult] = await Promise.allSettled([
      submitToGoogleSheets('Ticket', formData),
      submitToCRM('Ticket', formData)
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
      <h3 className="text-3xl font-black text-gray-900 mb-8 text-center">{dict.services.ticket.title}</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="ticket-fullName" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.fullName} *</label>
          <input id="ticket-fullName" type="text" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
            placeholder={dict.placeholders.fullName} />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="ticket-phone" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.phone} *</label>
            <input id="ticket-phone" type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
              placeholder={dict.placeholders.phone} />
          </div>
          <div>
            <label htmlFor="ticket-email" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.email} *</label>
            <input id="ticket-email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
              placeholder={dict.placeholders.email} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="ticket-fromCity" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.fromCity} *</label>
            <input id="ticket-fromCity" type="text" required value={formData.fromCity} onChange={(e) => setFormData({ ...formData, fromCity: e.target.value })}
              className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
              placeholder={dict.placeholders.fromCity} />
          </div>
          <div>
            <label htmlFor="ticket-toCity" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.toCity} *</label>
            <input id="ticket-toCity" type="text" required value={formData.toCity} onChange={(e) => setFormData({ ...formData, toCity: e.target.value })}
              className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
              placeholder={dict.placeholders.toCity} />
          </div>
        </div>
        <div>
          <label htmlFor="ticket-travelDate" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.travelDate} *</label>
          <input id="ticket-travelDate" type="date" required value={formData.travelDate} onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
            className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" />
        </div>
        <div>
          <label htmlFor="ticket-needsBaggage" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.needsBaggage} *</label>
          <select id="ticket-needsBaggage" required value={formData.needsBaggage} onChange={(e) => setFormData({ ...formData, needsBaggage: e.target.value })}
            className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
            <option value="">{dict.options.select}</option>
            <option value="yes">{dict.options.yesBaggage}</option>
            <option value="no">{dict.options.noBaggage}</option>
          </select>
        </div>
        <div>
          <label htmlFor="ticket-citizenship" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.citizenship} *</label>
          <select id="ticket-citizenship" required value={formData.citizenship} onChange={(e) => setFormData({ ...formData, citizenship: e.target.value, region: '', city: '' })}
            className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
            <option value="">{dict.options.select}</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        {formData.citizenship === 'Turkmenistan' ? (
          <div>
            <label htmlFor="ticket-region" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.region} *</label>
            <select id="ticket-region" required value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
              <option value="">{dict.options.select}</option>
              {TURKMEN_REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        ) : formData.citizenship ? (
          <div>
            <label htmlFor="ticket-city" className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.city} *</label>
            <input id="ticket-city" type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full max-w-full min-w-0 max-w-[calc(100vw-3rem)] bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
              placeholder={dict.placeholders.city} />
          </div>
        ) : null}
        <div className="pt-6">
          <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-crimson text-white font-black uppercase tracking-widest rounded-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
            {isSubmitting ? 'Submitting...' : dict.buttons.bookTicket}
          </button>
        </div>
      </form>
    </div>
  );
}
