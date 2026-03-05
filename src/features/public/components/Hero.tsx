import HeroImage from '@/assets/images/BG.png'
import RequestBtn from '@/features/public/ui/RequestBtn';
import watch from '@/assets/icons/watch.svg'
import dashboardImage from '@/assets/images/dashboard_image.png'
import floatingOne from '@/assets/icons/floating_icon_1.svg'
import floatingTwo from '@/assets/icons/floating_icon_2.png'
import floatingThree from '@/assets/icons/floating_icon_3.png'
import { motion } from "framer-motion";
import { cn } from '@/shared/utils/cn';
const Hero = () => {
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
  const buttonClass = 'group border rounded-full py-3 px-4 pl-14.5 font-medium text-base transition-all duration-300';

  return (
    <div className='bg-bg-dark' id='home'>
      <section
        className="bg-no-repeat "
        style={{
          backgroundImage: `url(${HeroImage})`,
          backgroundBlendMode: 'overlay',
          backgroundSize: 'cover',
          // minHeight: '100vh',
        }}
      >
        <div className='pt-40 space-y-6 mx-auto max-w-[90%] md:global-p'>
          <header className='text-center font-jakarta text-text-on-dark space-y-8'>
          <h1 className='leading-[1.18] font-semibold md:text-[64px] text-[28px]'>
            Manage CSR with clarity, accountability, and confidence.
          </h1>
          <p className='lg:px-[13.5rem] md:text-xl leading-relaxed'>
            Impact Intel is a centralized platform that helps organizations plan, 
            track, audit, and publish cooperate social responsibility initiatives - all in one place.
          </p>
        </header>

          <section className='md:gap-3 gap-4 flex md:flex-row flex-col justify-center max-w-[212px] md:global-p mx-auto'>
            <RequestBtn />
            <button className={cn('relative border border-text-on-dark bg-text-on-dark text-text-title',
              'hover:bg-text-on-dark/85 hover:border-text-on-dark/85',
              buttonClass
            )}>
                <img 
                src={watch} 
                alt="watch icon"  
                className={cn("transition-transform duration-700 group-hover:rotate-[360deg]",
                    "absolute top-1/2 left-7.5 -translate-x-1/2 -translate-y-1/2"
                )} 
                
              />
              <span>Watch Tutorial</span>
            </button>
          </section>
        </div>
                
        {/* dashboard hero image */}
        <div className='md:global-p mt-18 relative max-w-[90%] mx-auto'>
  
          <motion.div
            variants={floatingAnimation}
            animate="animate"
            className='absolute md:left-[1rem] md:top-[30%] left-[-0.5rem] top-[40%] rounded-full z-10 md:w-full w-[2rem]'
          >
            <img src={floatingOne} alt="arrow" />
          </motion.div>

          <motion.div
            variants={floatingAnimation}
            animate="animate"
            transition={{ delay: 0.5 }}
            className={cn(
              'md:w-[11rem] lg:w-[11.688rem] w-[5rem] absolute left-[-0.8rem] bottom-[-0.5rem] md:left-[0.5rem] md:bottom-[-1.5rem]',
              'rounded-2xl z-10 shadow-lg lg:left-[-3.3rem] lg:bottom-[3.3rem]'
            )}
          >
            <img src={floatingTwo} alt="arrow"/>
          </motion.div>

          <motion.div
            variants={floatingAnimation}
            animate="animate"
            transition={{ delay: 1 }}
            className={cn(
              'w-[6rem] md:w-[13rem] lg:w-[14.375rem] absolute rounded-2xl z-10 shadow-lg lg:right-[-2rem] lg:bottom-[7.5rem]',
              'right-[-0.8rem] bottom-[1.3rem] md:right-[1rem] md:bottom-[3.6rem] lg:right-[1rem] lg:bottom-[6rem]'
            )}
          >
            <img src={floatingThree} alt="arrow"/>
          </motion.div>

          <img 
            src={dashboardImage} 
            alt="Dashboard preview" 
            className="w-full h-auto relative z-0"
          />
        </div>
      </section>
    </div>
      )
}

export default Hero
