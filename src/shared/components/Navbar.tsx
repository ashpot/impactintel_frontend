import brandLogo from '@/assets/brand/brand_logo.png';
import { cn } from '@/shared/utils/cn';
import RequestBtn from '@/features/public/ui/RequestBtn';
import { useScrollNav } from '@/shared/hooks/Usescrollnav';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { showSideNav, activeSection, scrollTo, SECTIONS } = useScrollNav();

  const buttonClass = 'border rounded-full py-3 px-4 font-medium text-base transition-all duration-300';

  return (
    <nav
      className={cn(
        'hidden xl:block w-full fixed font-lato px-30 text-white border-b border-border-primary z-50',
        'transition-all duration-500 ease-in-out',
        // hide when scrolled past threshold
        showSideNav
          ? '-translate-y-full opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100'
      )}
    >
      <section className='py-7 flex items-center justify-between'>
        {/* Logo */}
        <div className='w-62.5'>
          <img src={brandLogo} alt="brand logo" />
        </div>

        {/* Links */}
        <ul className='flex gap-5 text-base'>
          {SECTIONS.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <li
                key={id}
                onClick={() => scrollTo(id)}
                className={cn(
                  'relative hover:cursor-pointer font-medium py-3 px-4 transition-all duration-300 group',
                  isActive ? 'text-brand-primary' : 'text-text-muted hover:text-brand-primary'
                )}
              >
                {label}
                {/* animated underline */}
                <span
                  className={cn(
                    'absolute bottom-2 left-4 right-4 h-px bg-brand-primary',
                    'transition-all duration-300',
                    isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                  )}
                />
              </li>
            );
          })}
        </ul>

        {/* Quick actions */}
        <div className='space-x-2 flex'>
          <Link
            to='/login'
          >
            <button
            className={cn(
              'border-border-primary text-text-muted',
              'hover:bg-brand-primary hover:border-bg-brand-primary hover:text-text-title',
              buttonClass
            )}
          >
            Client Login
          </button>
          </Link>
          
          <RequestBtn />
        </div>
      </section>
    </nav>
  );
};

export default Navbar;