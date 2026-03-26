import { CardAnimation } from "@/shared/components/CardAnimation"

export interface PublicSumCardProps{
    title: string
    bodyText: string
    icon: React.ReactNode
    iconColor: string
    iconBg: string
    value: string
    index: number
}
export const PublicSumCard:React.FC<PublicSumCardProps> = ({
    title,
    bodyText,
    icon,
    iconColor,
    iconBg,
    value,
    index
}) => {
  return (
    <CardAnimation 
        className="relative bg-white rounded-2xl border border-line p-6 font-lato w-full"
        index={index}
    >
        {/* Icon + Content Row */}
      <div className="flex gap-4">

        {/* Icon Box */}
        <div
          className="shrink-0 w-16 h-16 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: iconBg, color: `${iconColor}`}}
        >
          <span className="w-8.5 h-8.5">{icon}</span>
        </div>

        {/* Title + Score + Summary */}
        <div className="flex flex-col gap-2">
          <p className="text-xs text-text-body tracking-wider uppercase">
            {title}
          </p>
          <span className="text-3xl font-semibold text-text-primary01 tracking-wider leading-tight">
            {value}
          </span>
          <p className="text-sm text-text-body">
            {bodyText}
          </p>
        </div>

      </div>
    </CardAnimation>
  )
}
