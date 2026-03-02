import RequestBtn from "@/shared/ui/RequestBtn"
import Intro from "../ui/Intro"
import starIcon from "@/assets/icons/star.svg"
import combined_avatars from "@/assets/images/combined_avatar.png"
import cta_bg from "@/assets/images/cta_bg.png"

const CTA = () => {
  return (
    <div className="bg-bg-main py-20 text-center">
      <section className="global-p">
        <div className="mx-auto my-27 mb-32 max-w-[765px] text-[22px] text-text-body leading-normal tracking-wide font-lato">
            Impact Intel is a CSR management platform designed to help 
            organizations run accountable, transparent, and well-documented 
            social responsibility programs. We focus on structure, compliance, 
            and clarity, so teams can focus on impact.
        </div>

        <div className="bg-bg-dark rounded-[50px]">
            <div className="mx-auto space-y-10 py-15 pt-20 rounded-[50px]"
                style={{
                backgroundImage: `url(${cta_bg})`,
                backgroundBlendMode: 'overlay',
                backgroundSize: 'cover',
                }}
            >
                <div className="mx-auto flex flex-col items-center gap-4 max-w-[262px]">
                    {/* rating */}
                    <div className="flex gap-3">
                        <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <img 
                                    key={index}
                                    src={starIcon} 
                                    alt='star'
                                    className="w-4" 
                                />
                            ))}
                        </div>
                        <div className="font-medium text-text-on-dark">4.9/5</div>
                    </div>
                    {/* side to side avatars */}
                    <div className="w-[180px]">
                        <img 
                            src={combined_avatars} 
                            alt="avatars" 
                        />
                    </div>
                    {/* text */}
                    <div className="text-text-muted font-lato font-medium leading-snug text-lg text-center">
                        Over 12K+ Entrepreneurs, and businesses choose us
                    </div>
                </div>
                <div className="space-y-6">
                    <Intro 
                        header="Ready to bring structure to you CSR programs"
                        content="See how ImpactIntel can support your organizations's CSR goals."
                        colorChange
                    />
                    <div className="flex justify-center">
                        <RequestBtn/>
                    </div>
                    
                </div>
            </div>
            
            
        </div>

      </section>
    </div>
  )
}
export default CTA