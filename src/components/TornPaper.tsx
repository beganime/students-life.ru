"use client";
import { cn } from "@/lib/utils";
interface TornPaperProps {
  className?: string;
  position?: "top" | "bottom";
  color?: string;
}
export default function TornPaper({ className, position = "bottom", color = "white" }: TornPaperProps) {
  const colorClasses: Record<string, string> = {
    white: "text-white",
    navy: "text-navy",
    "gray-50": "text-gray-50",
    crimson: "text-crimson",
  };
  return (
    <div
      className={cn(
        "absolute left-0 w-full overflow-hidden leading-none z-10 pointer-events-none",
        position === "bottom" ? "-bottom-1" : "-top-1",
        className
      )}
      style={{ transform: position === "top" ? "rotate(180deg)" : "none" }}
    >
      <svg
        className={cn("block w-full h-[50px] md:h-[80px]", colorClasses[color] || "text-white")}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0,0V46.29c47,0,103,32.55,160.5,32.55,60.54,0,123.07-55.57,192.51-55.57,69.58,0,139.73,43,205.86,43,62.83,0,130-38.31,189.69-38.31,64.24,0,121.36,36.56,183.18,36.56,66.86,0,120.47-51.48,187.31-51.48,31,0,60.11,10.66,80.95,20.18V0Z" transform="scale(1, -1) translate(0, -100)"/>
        {}
        {}
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        {}
        <polygon points="1200 0 1200 120 0 120 0 0 50.5 28.5 100.5 0 150.5 28.5 200.5 0 250.5 28.5 300.5 0 350.5 28.5 400.5 0 450.5 28.5 500.5 0 550.5 28.5 600.5 0 650.5 28.5 700.5 0 750.5 28.5 800.5 0 850.5 28.5 900.5 0 950.5 28.5 1000.5 0 1050.5 28.5 1100.5 0 1150.5 28.5 1200 0" />
      </svg>
    </div>
  );
}
