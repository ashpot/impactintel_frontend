import { CardAnimation } from "@/shared/components/CardAnimation"
import Button from "@/shared/ui/Button"

export interface genProps{
    title: string
    bodyText: string
    iconBorder: string
    iconBg: string
    iconSrc: string
    index: number
}
const GenReportsCard = ({
    title,
    bodyText,
    iconBorder,
    iconBg,
    iconSrc,
    index
}:genProps) => {
  return (
    <CardAnimation
        className="bg-dashboard-bg rounded-2xl border border-line p-6 font-lato w-full"
        index={index}
    >
        <div className="space-y-4">
            {/* icon container */}
            <div
                className={`shrink-0 w-16 h-16 rounded-xl border flex items-center justify-center`}
                style={{borderColor: iconBorder, background: iconBg}}
            >
                <img src={iconSrc} alt={title} className="w-8 h-8 object-contain" />
            </div>

            {/* title and bodyText */}
            <div>
                <h3 className="font-bold text-base text-text-primary01 leading-8">{title}</h3>
                <p className="text-sm text-text-body">{bodyText}</p>
            </div>

            <Button variant="outline" className="bg-white w-full py-3">
                Generate Report
            </Button>
        </div>
      
    </CardAnimation>
  )
}

export default GenReportsCard
