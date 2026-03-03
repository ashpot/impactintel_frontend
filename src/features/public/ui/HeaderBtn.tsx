import { cn } from "@/shared/utils/cn"
interface headerBtnProps {
    width: string
    name: string
}
export const HeaderBtn = ({width, name}:headerBtnProps) => {
  return (
    <div className={cn(width, "mb-5 mx-auto py-2 border border-brand-primary rounded-full flex gap-2 items-center justify-center")}>
        <span className="bg-brand-primary h-1.5 w-1.5 rounded-full"/>
        <span className="text-xs text-brand-primary font-lato font-medium">{name}</span>
    </div>
  )
}
