import { ReactNode } from "react";

export type StatBreakdown = {
  label: string;
  value: string | number;
  color?: string; // Optional hex for accent dot
};

type MetricsCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon: ReactNode;
  className?: string;
  iconBg: string;
  breakdown?: StatBreakdown[];
};

export default function MetricsCard({
  title,
  value,
  description,
  icon,
  className = "",
  iconBg = "#2E0BF51A",
  breakdown,
}: MetricsCardProps) {
  // Extract a solid color from the potentially transparent iconBg for the decorative blur
  // Fallback to primary-ish color if it's too complex to parse
  const solidColor = iconBg.length === 9 ? iconBg.slice(0, 7) : (iconBg || "#2E0BF5");

  return (
    <div
      className={`group relative overflow-hidden bg-white border border-[#EAEAEE] rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 ${className}`}
    >
      <div className="flex justify-between items-start w-full relative z-10">
        <div className="space-y-1">
          <p className="text-[#6B7280] text-sm font-medium tracking-wide">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl text-[#111827] font-bold tracking-tight">
              {value}
            </h3>
          </div>
          {description && (
            <p className="text-[#9CA3AF] text-xs mt-1">
              {description}
            </p>
          )}
        </div>
        <div
          style={{ backgroundColor: iconBg }}
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110 duration-300"
        >
          {icon}
        </div>
      </div>

      {breakdown && breakdown.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[#F3F4F6] relative z-10">
          {breakdown.map((stat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#F9FAFB] text-[#4B5563] border border-[#F3F4F6] hover:bg-white transition-colors"
            >
              {stat.color && (
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: stat.color }}
                />
              )}
              <span className="text-[#6B7280] font-medium">{stat.label}:</span>
              <span className="text-[#111827]">{stat.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Decorative background blur gradient */}
      <div
        className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-30"
        style={{ backgroundColor: solidColor }}
      />
    </div>
  );
}
