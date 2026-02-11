import { ReactNode } from "react";

type MetricsCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon: ReactNode;
  className?: string;
  iconBg: string;
};

export default function MetricsCard({
  title,
  value,
  description,
  icon,
  className = "",
  iconBg = "#2E0BF51A",
}: MetricsCardProps) {
  return (
    <div
      className={`md:min-w-[225px] w-full border-[0.6px] bg-white border-[#EFEEEE] shadow-custom2 md:p-4 p-3 flex items-start md:gap-4 gap-2 rounded-lg ${className}`}
    >
      <div
        style={{ backgroundColor: iconBg }}
        className={`md:w-12 md:h-12 w-8 h-8 md:rounded-[8px] rounded-[5.33px] flex items-center justify-center`}
      >
        {icon}
      </div>

      <div className="md:space-y-2">
        <p className="text-[#787878] text-[12px] leading-[18px] font-semibold line-clamp-1">
          {title}
        </p>

        <div>
          <h3 className="text-[24px] text-[#2A2A2A] leading-8 font-semibold line-clamp-1">
            {value}
          </h3>

          {description && (
            <p className="text-[#787878] md:text-[12px] text-[10px] leading-[18px] line-clamp-1">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
