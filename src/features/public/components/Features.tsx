import type { Feature } from "../type"
import FeatureWrapper from "../ui/FeatureWrapper"
import { HeaderBtn } from "../ui/HeaderBtn"
import Intro from "../ui/Intro"


const Features = () => {
    const features:Feature[] = [
        {
            header: 'Centralized CSR Management',
            body: `Plan and manage all CSR initiatives across teams in one workspace. 
                    Keep everything organized and accessible`,
            src: '/src/assets/icons/management.svg',
            alt: 'management'
        },
        {
            header: 'Track Progress & Impact',
            body: `Monitor budgets, timelines, beneficiaries, and outcome in realtime. 
                    See what's its working and where to improve.`,
            src: '/src/assets/icons/progress.svg',
            alt: 'progress'
        },
        {
            header: 'Audit & Reporting',
            body: `Generate compliance-ready reports. Review internally, share publicly, 
                    and maintain full transparency.`,
            src: '/src/assets/icons/audit.svg',
            alt: 'audit'
        },
        {
            header: 'Public Impact Showcase',
            body: `Instantly publish verified project data to public-facing map 
                    to boost stakeholder trust.`,
            src: '/src/assets/icons/public.svg',
            alt: 'public'
        },
        {
            header: 'Compliance & Security',
            body: `Built with security and compliance in mind. Your data stays protected 
                    with enterprise-grade security.`,
            src: '/src/assets/icons/security.svg',
            alt: 'security'
        },
        {
            header: 'SDG Alignment',
            body: `Map your initiatives to UN sustainable Development Goals. Show stakeholders 
                    your global impact alignment.`,
            src: '/src/assets/icons/alignment.svg',
            alt: 'alignment'
        },
    ]
  return (
    <div className="bg-bg-main pb-20" id="features">
      <section className="global-p text-center">
        {/* intro */}
        <div>
            {/* heading */}
            <HeaderBtn width='w-25' name="Features"/>
            <Intro 
                header="Turn good intentions into verified data"
                content={`
                    Fragmented data makes impact hard to see. We bring clarity to your 
                    initiatives so you can focus on the outcome, not the paperwork.
                `}
                colorChange={false}
            />
                {/* feature boxes */}
            <div className="font-lato grid grid-cols-3 gap-5">
                {
                    features.map((feature, index)=>{
                        return (
                            <FeatureWrapper 
                                key={index}
                                src={feature.src} 
                                alt={feature.alt} 
                                body={feature.body} 
                                header={feature.header}
                            />
                        )
                    })
                }
            </div>
            
        </div>

      </section>
    </div>
  )
}

export default Features
