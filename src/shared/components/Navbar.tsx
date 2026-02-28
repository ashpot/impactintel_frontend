import brandLogo from '@/assets/brand/brand_logo.png';
import { cn } from '@/shared/utils/cn';
import RequestBtn from '../ui/RequestBtn';
const Navbar = () => {
  const buttonClass = 'border rounded-full py-3 px-4 font-medium text-base transition-all duration-300';
  const linkClass = cn('hover:cursor-pointer hover:text-brand-primary font-medium', 
    'text-text-muted py-3 px-4 transition-all duration-300')
  return (
    <nav className='w-full fixed font-lato px-30 w-full text-white border-b border-border-primary'>
      <section className='py-7 flex items-center justify-between'>
        <div className='w-[250px]'>
          <img src={brandLogo} alt="brand logo" />
        </div>
        {/* links */}
          <ul className='flex gap-5 text-base'>
            <li className={linkClass}>How It Works</li>
            <li className={linkClass}>About</li>
            <li className={linkClass}>Contact</li>
          </ul>
        {/* quick actions */}
        <div className='space-x-2 flex'>
          <button className={cn('border-border-primary text-text-muted',
            'hover:bg-brand-primary hover:border-bg-brand-primary  hover:text-text-title',
            buttonClass
          )}>
            Client Login
          </button>
          <RequestBtn />
        </div>
      </section>
        
    </nav>
  )
}
export default Navbar