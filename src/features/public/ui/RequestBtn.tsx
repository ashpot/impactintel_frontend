import { cn } from "../../../shared/utils/cn"
import arrow_right from '@/assets/icons/arrow_right_line.svg'

const RequestBtn = () => {
  const buttonClass = 'group border rounded-full py-3 px-4 font-medium text-base transition-all duration-300';
  return (
    <button className={cn('flex items-center justify-center gap-2 border-brand-primary text-text-title bg-brand-primary', 
            'hover:bg-brand-primary/80 hover:border-brand-primary/80',
            buttonClass
    )}>
            <span>Request a Demo</span>
           <img 
                src={arrow_right} 
                alt="arrow right" 
                className="w-6 transition-transform duration-300 group-hover:translate-x-1" 
            />
    </button>
  )
}

export default RequestBtn
