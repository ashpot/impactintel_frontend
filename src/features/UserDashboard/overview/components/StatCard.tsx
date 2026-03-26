import trending from "@/assets/icons/trending.svg"
import { CardAnimation } from "@/shared/components/CardAnimation";

export interface StatCardProps {
  title: string;
  score: string;
  summary: string;
  badgeText?: string;
  iconSrc: string;
  iconBg: string;
  iconBorderColor: string;
  index: number
}

export const StatCard = ({
  title,
  score,
  summary,
  badgeText,
  iconSrc,
  iconBg,
  iconBorderColor,
  index = 0
}: StatCardProps) => {
  return (
    <CardAnimation 
      className="relative bg-white rounded-2xl border border-line p-6 font-lato w-full"
      index={index}
    >
      {/* Icon + Content Row */}
      <div className="flex items-center gap-4">

        {/* Icon Box */}
        <div
          className="shrink-0 w-16 h-16 rounded-xl border-2 flex items-center justify-center"
          style={{ backgroundColor: iconBg, borderColor: iconBorderColor }}
        >
          <img src={iconSrc} alt={title} className="w-8 h-8 object-contain" />
        </div>

        {/* Title + Score + Summary */}
        <div className="flex flex-col gap-2">
          <p className="text-xs text-text-body tracking-[0.15em] uppercase">
            {title}
          </p>
          <span className="text-3xl font-semibold text-text-primary01 tracking-wider leading-tight">
            {score}
          </span>
          <p className="text-sm text-text-body">
            {summary}
          </p>
        </div>

      </div>

      {/* Divider and Badge — only when badgeText is provided */}
      {badgeText && (
        <>
          <div className="border-t border-line my-4" />
          <div
            className="bg-[#E6FBEC] text-[#44B276] inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
          >
            <img src={trending} alt="trend-up" className="w-3.5 h-3.5" />
            {badgeText}
          </div>
        </>
      )}
    </CardAnimation>
  );
}