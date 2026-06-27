"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#06182E] flex items-center justify-center p-4 relative overflow-hidden">
            {}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#C00000] rounded-full blur-[120px] opacity-20" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#0A2647] rounded-full blur-[120px] opacity-30" />
            </div>
            <div className="max-w-3xl w-full text-center relative z-9">
                {}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-[120px] md:text-[240px] font-[family-name:var(--font-octin)] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 leading-none select-none drop-shadow-2xl">
                        404
                    </h1>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="relative -mt-4 md:-mt-12"
                >
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 tracking-wide">
                        Page Not Found
                    </h2>
                    <p className="text-blue-100/60 text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                        We can't seem to find the page you're looking for. It might have been moved or doesn't exist.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="group flex items-center gap-3 px-8 py-4 bg-[#C00000] text-white rounded-xl font-bold transition-all hover:bg-[#A00000] hover:scale-105 shadow-xl shadow-[#C00000]/20"
                        >
                            <Home className="w-5 h-5" />
                            <span>Back to Home</span>
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-xl font-bold transition-all hover:bg-white/10 hover:border-white/20"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Go Back</span>
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
