import HeroImage from '@/assets/images/BG.png'
import RequestBtn from '@/shared/ui/RequestBtn';
import watch from '@/assets/icons/watch.svg'
import dashboardImage from '@/assets/images/dashboard_image.png'
import floatingOne from '@/assets/icons/floating_icon_1.svg'
import floatingTwo from '@/assets/icons/floating_icon_2.png'
import floatingThree from '@/assets/icons/floating_icon_3.png'
import { cn } from '@/shared/utils/cn';
const Hero = () => {
  const buttonClass = 'group border rounded-full py-3 px-4 pl-14.5 font-medium text-base transition-all duration-300';

  return (
    <div className='bg-bg-dark'>
      <section
        className="bg-no-repeat"
        style={{
          backgroundImage: `url(${HeroImage})`,
          backgroundBlendMode: 'overlay',
          backgroundSize: 'cover',
          // minHeight: '100vh',
        }}
      >
        <div className='pt-40 g-pad space-y-6'>
          <header className='text-center font-jakarta text-text-on-dark space-y-8'>
          <h1 className='leading-[1.18] font-semibold text-[64px]'>Manage CSR with clarity, accountability, and confidence.</h1>
          <p className='px-[13.5rem] text-xl leading-relaxed'>
            Impact Intel is a centralized platform that helps organizations plan, 
            track, audit, and publish cooperate social responsibility initiatives - all in one place.
          </p>
        </header>

          <section className='space-x-3 flex justify-center'>
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
        <div className='px-[16rem] mt-18 relative'>
          
          <div className='absolute left-[15rem] top-[30%] rounded-full z-10'>
            <img src={floatingOne} alt="arrow" />
          </div>

      
          <div className='w-[11.688rem] absolute left-[9.3rem] bottom-[2rem] rounded-2xl z-10 shadow-lg '>
            <img src={floatingTwo} alt="arrow"/>
          </div>

          <div className='w-[14.375rem] absolute right-[10rem] bottom-[6rem] rounded-2xl z-10 shadow-lg'>
            <img src={floatingThree} alt="arrow"/>
          </div>

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
