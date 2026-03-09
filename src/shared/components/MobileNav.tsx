import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import brandLogo from '@/assets/brand/brand_logo.png';
import RequestBtn from '@/features/public/ui/RequestBtn';
import { useScrollNav } from '@/shared/hooks/Usescrollnav';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeSection, scrollTo, SECTIONS } = useScrollNav();

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleNavClick = (id: string) => {
    scrollTo(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Top bar */}
      <header
        className={cn(
          'xl:hidden fixed top-0 left-0 right-0 z-50',
          'flex items-center justify-between',
          'px-5 py-4',
          'border-b border-white/10 backdrop-blur-xl',
          'transition-colors duration-300',
          isOpen ? 'bg-bg-dark' : 'bg-bg-dark/80'
        )}
      >
        {/* Brand logo */}
        <div className="w-[140px]">
          <img src={brandLogo} alt="brand logo" className="w-full" />
        </div>

        {/* Hamburger button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className={cn(
            'relative w-10 h-10 flex flex-col items-center justify-center gap-[5px]',
            'rounded-xl border border-white/15 backdrop-blur-sm bg-white/5',
            'transition-all duration-300 hover:bg-white/10 hover:border-white/25'
          )}
        >
          <span
            className={cn(
              'block h-[1.5px] bg-white rounded-full origin-center',
              'transition-all duration-300 ease-in-out',
              isOpen ? 'w-4 rotate-45 translate-y-[6.5px]' : 'w-5'
            )}
          />
          <span
            className={cn(
              'block h-[1.5px] bg-white rounded-full',
              'transition-all duration-200 ease-in-out',
              isOpen ? 'w-0 opacity-0' : 'w-4 opacity-100'
            )}
          />
          <span
            className={cn(
              'block h-[1.5px] bg-white rounded-full origin-center',
              'transition-all duration-300 ease-in-out',
              isOpen ? 'w-4 -rotate-45 -translate-y-[6.5px]' : 'w-5'
            )}
          />
        </button>
      </header>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={cn(
              'xl:hidden fixed inset-0 z-40 bg-bg-dark',
              'flex flex-col pt-[72px]' // offset for top bar height
            )}
          >
            {/* Subtle radial glow in bg */}
            <div
              className="absolute inset-0 pointer-events-none opacity-25"
              style={{
                background:
                  'radial-gradient(ellipse at top right, hsl(45,100%,51%) 0%, transparent 55%)',
              }}
            />

            {/* Nav links */}
            <nav className="relative flex-1 flex flex-col justify-center px-7">
              <ul className="space-y-1">
                {SECTIONS.map(({ id, label }, i) => {
                  const isActive = activeSection === id;
                  return (
                    <motion.li
                      key={id}
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.07 * i, duration: 0.25 }}
                    >
                      <button
                        onClick={() => handleNavClick(id)}
                        className={cn(
                          'group w-full flex items-center justify-between',
                          'py-4 border-b border-white/8',
                          'font-jakarta text-2xl font-semibold tracking-tight',
                          'transition-colors duration-200',
                          isActive
                            ? 'text-brand-primary'
                            : 'text-white/60 hover:text-white'
                        )}
                      >
                        <span>{label}</span>
                        {/* active indicator pill */}
                        <span
                          className={cn(
                            'w-1.5 h-1.5 rounded-full transition-all duration-300',
                            isActive
                              ? 'bg-brand-primary shadow-[0_0_8px] shadow-brand-primary/60 scale-100'
                              : 'bg-white/20 scale-75 group-hover:scale-100 group-hover:bg-white/50'
                          )}
                        />
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Bottom actions */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.25 }}
              className="relative px-7 pb-10 space-y-3"
            >
              <button
                className={cn(
                  'w-full py-3.5 rounded-full font-lato font-medium text-base',
                  'border border-white/20 text-text-muted',
                  'transition-all duration-300',
                  'hover:bg-white/8 hover:border-white/35 hover:text-white'
                )}
              >
                Client Login
              </button>
              {/* Reuse your existing RequestBtn — it's already full-width-capable */}
              <div className="[&>button]:w-full [&>a]:w-full">
                <RequestBtn />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;