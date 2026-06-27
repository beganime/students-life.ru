"use client";
import { useState } from "react";
import { Star } from "lucide-react";

interface ReviewFormProps {
    lang: string;
    dict?: any;
}

const SERVICE_OPTIONS = [
    { value: "university", labelKey: "university" },
    { value: "school", labelKey: "school" },
    { value: "transfer", labelKey: "transfer" },
    { value: "visa", labelKey: "visa" },
    { value: "umrah", labelKey: "umrah" },
    { value: "ticket", labelKey: "ticket" },
    { value: "other", labelKey: "other" },
];

export default function ReviewForm({ lang, dict }: ReviewFormProps) {
    const t = dict?.reviews || {};
    const services = t?.services || {};

    const [form, setForm] = useState({ name: "", city: "", service: "other", rating: 0, content: "" });
    const [hovered, setHovered] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.rating || !form.content) return;
        setSubmitting(true);
        setError("");
        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setSubmitted(true);
            } else {
                setError(t.error || "Something went wrong. Please try again.");
            }
        } catch {
            setError(t.error || "Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                    <p className="text-green-800 font-semibold text-lg">
                    {t.success || "Thank you! Your review will be published after moderation."}
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-5">
            <h3 className="text-xl font-black text-gray-900">{t.formTitle || "Leave a Review"}</h3>

            {/* Name + City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                        {t.name || "Full Name"} *
                    </label>
                    <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-crimson transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                        {t.city || "Your City"}
                    </label>
                    <input
                        type="text"
                        value={form.city}
                        onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-crimson transition-colors"
                    />
                </div>
            </div>

            {/* Service */}
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                    {t.service || "Service Used"}
                </label>
                <select
                    value={form.service}
                    onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-crimson transition-colors bg-white"
                >
                    {SERVICE_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>
                            {services[opt.labelKey] || opt.value}
                        </option>
                    ))}
                </select>
            </div>

            {/* Star Rating */}
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                    {t.rating || "Rating"} *
                </label>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setForm(f => ({ ...f, rating: star }))}
                            onMouseEnter={() => setHovered(star)}
                            onMouseLeave={() => setHovered(0)}
                            className="p-0.5 transition-transform hover:scale-110"
                        >
                            <Star
                                className={`w-8 h-8 transition-colors ${
                                    star <= (hovered || form.rating)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                }`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                    {t.content || "Your Review"} *
                </label>
                <textarea
                    required
                    rows={4}
                    value={form.content}
                    onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-crimson transition-colors resize-none"
                />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
                type="submit"
                disabled={submitting || !form.name || !form.rating || !form.content}
                className="w-full bg-crimson text-white font-bold py-3 px-6 rounded-xl hover:bg-crimson/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                {submitting ? "..." : (t.submit || "Submit Review")}
            </button>
        </form>
    );
}
