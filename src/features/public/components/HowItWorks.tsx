import type { howItWorks } from "../type"
import { HeaderBtn } from "../ui/HeaderBtn"
import HiwBox from "../ui/HiwBox"
import Intro from "../ui/Intro"

const HowItWorks = () => {
    const data:howItWorks[] = [
        {
            no: '01',
            title: 'Register Your Organization',
            body: `Set up your workspace and define user roles. Get your team onboarded in minutes.`,
            src:'/src/assets/images/illustration_01.png',
            alt: 'step one',
            reverse: false
        },
        {
            no: '02',
            title: 'Manage CSR Initiatives',
            body: `Track projects, budgets, timelines and impact. Everything in one organized dashboard.`,
            src:'/src/assets/images/illustration_02.png',
            alt: 'step two',
            reverse: true
        },
        {
            no: '03',
            title: 'Review, Audit and Publish',
            body: `Approve reports internally and share public data when needed.
                     Full control and transparency.`,
            src:'/src/assets/images/illustration_03.png',
            alt: 'step three',
            reverse: false
        },
    ]
  return (
        <div className="bg-bg-main pb-30" id="how-it-works">
      <section className="global-p">
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
