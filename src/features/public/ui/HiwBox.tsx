import { cn } from '@/shared/utils/cn'
import type { howItWorks } from '../type'

const HiwBox = ({no, title, body, src, alt, reverse}: howItWorks) => {
    const rotateContainer = reverse ? 'xl:rotate-[17deg]' : 'xl:-rotate-[17deg]'
    const rotateImg = reverse ? 'xl:-rotate-[17deg]' : 'xl:rotate-[17deg]'
  return (
    <div className={cn("flex md:flex-row flex-col md:gap-24 gap-8", reverse && 'md:flex-row-reverse')}>
        <div className="font-jakarta md:space-y-6 space-y-3 flex flex-col justify-center">
            <h1 className="text-brand-primary font-bold md:text-6xl text-[28px]">{no}</h1>
            <h2 className="text-text-title leading-tight md:text-[56px] text-2xl font-bold">{title}</h2>
            <p className="text-text-body font-lato font-medium md:text-xl text-sm leading-snug">
                {body}
            </p>
        </div>
        <div className={cn("mx-auto xl:border-2 xl:border-brand-primary md:rounded-[50px] rounded-3xl w-[100%] sm:w-[80%] md:w-[614px] relative",
            rotateContainer
        )}>
            <img 
                src={src}
                alt={alt} 
                className={rotateImg}
                loading='lazy'
            />
        </div>
    </div>
  )
}

export default HiwBox
