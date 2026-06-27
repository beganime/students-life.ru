"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Cookie } from "lucide-react";
interface CookieConsentProps {
    lang: string;
    dict: any;
}
export default function CookieConsent({ lang, dict }: CookieConsentProps) {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);
    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };
    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "declined");
        setIsVisible(false);
    };
    if (!isVisible) return null;
    return (
        <div className="fixed bottom-6 left-6 right-6 z-[100] md:max-w-md lg:max-w-lg md:left-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 overflow-hidden relative group transition-all duration-300 hover:shadow-blue-500/10 dark:bg-slate-900 dark:border-slate-800">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 dark:bg-blue-900/20">
                        <Cookie className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            {dict?.cookies?.title || "We value your privacy"}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed mb-4">
                            {dict?.cookies?.description || "We use cookies to enhance your browsing experience and analyze our traffic."}
                            <Link
                                href={`/${lang}/cookie-policy`}
                                className="ml-1 text-blue-600 hover:underline font-medium"
                            >
                                {dict?.cookies?.policy || "Cookie Policy"}
                            </Link>
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleAccept}
                                className="flex-1 px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl transition-all duration-300 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/20"
                            >
                                {dict?.cookies?.accept || "Accept"}
                            </button>
                            <button
                                onClick={handleDecline}
                                className="flex-1 px-6 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl transition-all duration-300 hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                            >
                                {dict?.cookies?.decline || "Decline"}
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-gray-400 hover:text-gray-900 transition-colors p-1 dark:hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                { }
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl" />
            </div>
        </div>
    );
}
