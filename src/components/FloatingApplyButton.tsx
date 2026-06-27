"use client";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

interface FloatingApplyButtonProps {
    lang: string;
}

export default function FloatingApplyButton({ lang }: FloatingApplyButtonProps) {
    return (
        <Link
            href={`/${lang}/contact`}
            className="fixed bottom-6 right-6 z-50 flex md:hidden items-center justify-center w-14 h-14 rounded-full bg-crimson text-white shadow-lg shadow-crimson/40 active:scale-95 transition-transform"
            aria-label="Apply now"
        >
            <MessageCircle className="w-6 h-6" />
        </Link>
    );
}
