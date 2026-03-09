import { cn } from "@/shared/utils/cn"

type introProps ={
    header: string
    content: string
    colorChange: boolean
}
const Intro = ({header, content, colorChange}:introProps) => {
  return (
    <div className='lg:px-40 space-y-3 mb-10 text-center'>
        <h2 
            className={cn("leading-tight font-jakarta font-semibold md:text-6xl text-[28px]",
                colorChange ? "text-text-on-dark" : "text-text-title"
            )}
        >
            {header}
        </h2>
        <p className={cn("lg:px-30 leading-snug font-lato font-medium md:text-xl text-sm",
            colorChange ? "text-text-muted" : "text-text-body"
        )}>
            {content}
        </p>
    </div>
  )
}

export default Intro
