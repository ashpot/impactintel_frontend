// import { cn } from '@/shared/utils/cn';
// import { useScrollNav } from '../hooks/Usescrollnav';

// const SideNav = () => {
//   const { showSideNav, activeSection, scrollTo, SECTIONS } = useScrollNav();

//   return (
//     <div
//       className={cn(
//         'fixed right-5 top-1/2 -translate-y-1/2 z-50 rounded-xl',
//         'flex flex-col items-end gap-1',
//         'border border-white/20 bg-white/5 backdrop-blur-xl',
//         'transition-all duration-500 ease-in-out',
//         showSideNav
//           ? 'opacity-100 translate-x-0'
//           : 'opacity-0 translate-x-10 pointer-events-none'
//       )}
//     >
//       {SECTIONS.map(({ id, label }) => {
//         const isActive = activeSection === id;
//         return (
//           <button
//             key={id}
//             onClick={() => scrollTo(id)}
//             aria-label={label}
//             className={cn(
//               'group flex items-center gap-2.5',
//               'px-3 py-2 rounded-full bg-transparent border-none cursor-pointer',
//               'hover:bg-white/5 transition-colors duration-200'
//             )}
//           >
//             {/* Label — fades in on hover or when active */}
//             <span
//               className={cn(
//                 'text-[0.65rem] font-medium font-lato uppercase tracking-widest whitespace-nowrap',
//                 'transition-all duration-200',
//                 isActive
//                   ? 'opacity-100 text-brand-primary'
//                   : 'opacity-0 text-text-muted group-hover:opacity-100'
//               )}
//             >
//               {label}
//             </span>

//             {/* Dot — stretches into a pill when active */}
//             <span
//               className={cn(
//                 'flex-shrink-0 h-1.5 rounded-full transition-all duration-300',
//                 isActive
//                   ? 'w-4 bg-brand-primary shadow-[0_0_8px] shadow-brand-primary/50'
//                   : 'w-1.5 bg-text-muted/30 group-hover:bg-text-muted/60 group-hover:scale-125'
//               )}
//             />
//           </button>
//         );
//       })}
//     </div>
//   );
// };

// export default SideNav;

import { cn } from '@/shared/utils/cn';
import { useScrollNav } from '@/shared/hooks/Usescrollnav';

const SideNav = () => {
  const { showSideNav, activeSection, scrollTo, SECTIONS } = useScrollNav();

  return (
    <div
      className={cn(
        // layout & shape
        'fixed right-5 top-1/2 -translate-y-1/2 z-50',
        'flex flex-col items-start gap-4 px-2 py-3 rounded-xl',
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
              'group flex items-center gap-2.5 w-full',
              'px-2 py-1.5 rounded-full border-none cursor-pointer',
              'transition-all duration-200',
              isActive ? 'bg-white/10 hover:bg-white/15' : 'hover:bg-white/15'                                // idle on dark bg
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