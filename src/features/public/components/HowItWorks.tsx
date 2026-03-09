import type { howItWorks } from "../type"
import { HeaderBtn } from "../ui/HeaderBtn"
import HiwBox from "../ui/HiwBox"
import Intro from "../ui/Intro"
import h_one from "@/assets/images/illustration_01.png"
import h_two from "@/assets/images/illustration_02.png"
import h_three from "@/assets/images/illustration_03.png"

const HowItWorks = () => {
    const data:howItWorks[] = [
        {
            no: '01',
            title: 'Register Your Organization',
            body: `Set up your workspace and define user roles. Get your team onboarded in minutes.`,
            src: h_one,
            alt: 'step one',
            reverse: false
        },
        {
            no: '02',
            title: 'Manage CSR Initiatives',
            body: `Track projects, budgets, timelines and impact. Everything in one organized dashboard.`,
            src: h_two,
            alt: 'step two',
            reverse: true
        },
        {
            no: '03',
            title: 'Review, Audit and Publish',
            body: `Approve reports internally and share public data when needed.
                     Full control and transparency.`,
            src:h_three,
            alt: 'step three',
            reverse: false
        },
    ]
  return (
        <div className="bg-bg-main pb-30 overflow-hidden" id="how-it-works">
      <section className="mx-auto max-w-[90%] md:global-p">
        {/* intro */}
        <div>
            {/* heading */}
            <HeaderBtn width='w-29' name="How It Works"/>
            <Intro 
                header="How Impact Intel Works"
                content={`
                    Complex compliance simplified. Go from onboarding to 
                    audit-ready in three structured steps.
                `}
                colorChange={false}
            />
        </div>
        <div className="space-y-17 mt-10">
            {data.map((d, index)=>(
                <HiwBox 
                    key={index}
                    no={d.no}
                    title={d.title}
                    body={d.body}
                    src={d.src}
                    alt={d.alt}
                    reverse={d.reverse}
                />
            ))}

        </div>
      </section>
    </div>
    
  )
}

export default HowItWorks
