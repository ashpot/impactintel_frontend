import { cn } from '@/shared/utils/cn'
import rep_publish from '@/assets/icons/rep_published.svg'
import {motion} from 'framer-motion'
import type { howItWorks } from '../type'

const HiwBox = ({no, title, body, src, alt, reverse}: howItWorks) => {
    const rotateContainer = reverse ? 'rotate-[17deg]' : '-rotate-[17deg]'
    const rotateImg = reverse ? '-rotate-[17deg]' : 'rotate-[17deg]'
    const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };
  return (
    <div className={cn("flex md:flex-row flex-col gap-24", reverse && 'flex-row-reverse')}>
        <div className="font-jakarta space-y-6 flex flex-col justify-center">
            <h1 className="text-brand-primary font-bold text-6xl">{no}</h1>
            <h2 className="text-text-title leading-tight text-[56px] font-bold">{title}</h2>
            <p className="text-text-body font-lato font-medium text-xl leading-snug">
                {body}
            </p>
        </div>
        <div className={cn("border-2 -rotate-[17deg] border-brand-primary rounded-[50px] w-[614px] relative",
            rotateContainer
        )}>
            <img 
                src={src}
                alt={alt} 
                className={rotateImg}
                loading='lazy'
            />
            {no === '03' && 
                <motion.div
                    variants={floatingAnimation}
                    animate="animate"
                    className='absolute bottom-[9.8rem] -left-[7rem] rotate-[20deg] w-48'
                >
                    <img 
                        src={rep_publish} 
                        alt="icon" 
                    />
                </motion.div>
                }
            
        </div>
    </div>
  )
}

export default HiwBox
