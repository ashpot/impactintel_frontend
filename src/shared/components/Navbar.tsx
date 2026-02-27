import brandLogo from '@/assets/brand/brand_logo.png';
import { cn } from '@/shared/utils/cn';
const Navbar = () => {
  const buttonClass = 'border rounded-full py-3 px-4 font-medium text-base';
  const linkClass = 'hover:cursor-pointer font-medium text-text-muted py-3 px-4 transition-all duration-100'
  return (
    <nav className='w-full fixed font-lato g-pad w-full text-white border-b border-border-primary'>
      <section className='py-7 flex items-center justify-between'>
        <div className='w-[230px]'>
          <img src={brandLogo} alt="brand logo" />
        </div>
        {/* links */}
          <ul className='flex gap-5 text-base'>
            <li className={linkClass}>How It Works</li>
            <li className={linkClass}>About</li>
            <li className={linkClass}>Contact</li>
          </ul>
        {/* quick actions */}
        <div className='space-x-2'>
          <button className={cn('border-border-primary text-text-muted',
            buttonClass
          )}>
            Client Login
          </button>
          <button className={cn('border-brand-primary text-text-title bg-brand-primary',
            buttonClass
          )}>
            Request a Demo
          </button>
        </div>
      </section>
        
    </nav>
  )
}
export default Navbar