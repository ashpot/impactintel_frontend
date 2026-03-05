import { cn } from '@/shared/utils/cn';
import { useScrollNav } from '@/shared/hooks/Usescrollnav';

const SideNav = () => {
  const { showSideNav, activeSection, scrollTo, SECTIONS } = useScrollNav();

  return (
    <div
      className={cn(
        // layout & shape
        'fixed right-5 top-1/2 -translate-y-1/2 z-50',
        'hidden xl:flex flex-col items-start gap-4 px-2 py-3 rounded-xl',
        'border backdrop-blur-xl bg-bg-dark border-white/15 shadow-lg shadow-black/20',
        // slide in/out
        'transition-all duration-500 ease-in-out',
        showSideNav ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'
      )}
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = activeSection === id;

        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={label}
            className={cn(
              'group flex items-center justify-center gap-2.5 w-full',
              'px-2 py-1.5 rounded-full border-none cursor-pointer',
              'transition-all duration-200',
              isActive ? 'bg-white/10 hover:bg-white/15' : 'hover:bg-white/15'
            )}
          >
            {/* Label — always visible, color shifts on active */}
            <span
              className={cn(
                'text-[0.65rem] font-medium font-lato uppercase tracking-widest whitespace-nowrap',
                'transition-colors duration-200 text-white group-hover:text-brand-primary',
                isActive ? 'text-white' : 'text-white/35'
              )}
            >
              {label}
            </span>

            {/* Pill indicator — extends when active */}
            <span
              className={cn(
                'flex-shrink-0 h-1.5 w-1.5 rounded-full transition-all duration-300 group-hover:bg-brand-primary',
                isActive ? 'w-5 bg-white shadow-[0_0_8px] shadow-white/40' : 'bg-white/35'
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export default SideNav;