import illustration_one from '@/assets/images/illustration_01.png'
import { cn } from '@/shared/utils/cn'
import type { howItWorks } from '../type'

const HiwBox = ({no, title, body, reverse}: howItWorks) => {
    const rotateContainer = reverse ? 'rotate-[17deg]' : '-rotate-[17deg]'
    const rotateImg = reverse ? '-rotate-[17deg]' : 'rotate-[17deg]'
  return (
    <div className={cn("flex gap-24", reverse && 'flex-row-reverse')}>
        <div className="font-jakarta space-y-6 flex flex-col justify-center">
            <h1 className="text-brand-primary font-bold text-6xl">{no}</h1>
            <h2 className="text-text-title leading-tight text-[56px] font-bold">{title}</h2>
            <p className="text-text-body font-lato font-medium text-xl leading-snug">
                {body}
            </p>
        </div>
        <div className={cn("border-2 -rotate-[17deg] border-brand-primary rounded-[50px] w-[614px]",
            rotateContainer
        )}>
            <img 
                src={illustration_one}
                alt="step one" 
                className={rotateImg}
            />
        </div>
    </div>
  )
}

export default HiwBox
