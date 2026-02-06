import { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";

type EmptyStateProps = {
  icon: StaticImageData;
  title: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
};

export default function EmptyState({
  icon,
  title,
  description,
  buttonText,
  onButtonClick,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center text-center space-y-10 max-w-[460px] w-full ${className}`}
    >
      <div className="flex flex-col items-center gap-3">
        <Image
          src={icon}
          alt="empty-state-icon"
          className="md:w-[250px] md:h-[200px] w-[164px] h-[131.2px]"
        />

        <h4 className="md:text-[24px] text-[16px] md:leading-8 leading-6 font-semibold text-[#5A5A5A]">
          {title}
        </h4>

        {description && (
          <p className="md:text-[18px] text-[14px] md:leading-7 leading-5 text-[#5A5A5A]">
            {description}
          </p>
        )}
      </div>

      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="w-full h-12 bg-[#27AE60] rounded-[6px] text-[18px] leading-8 text-white font-semibold"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
