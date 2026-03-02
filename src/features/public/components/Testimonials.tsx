import type { testimonial } from "../type"
import { HeaderBtn } from "../ui/HeaderBtn"
import Intro from "../ui/Intro"
import TestimonialCard from "../ui/TestimonialCard"
import testimonial_bg from '@/assets/images/testimonial_bg.png'

const Testimonials = () => {
    const data:testimonial[] = [
        {
            src: '/src/assets/images/testimonial_avatar_03.png',
            name: 'Sarah Johnson',
            role: 'Head of CSR, Shell Nigeria',
            quote: '"Impact Intel cut our reporting time by 40% and gave us undeniable proof of our field work."',
            star: 5,
        },
        {
            src: '/src/assets/images/testimonial_avatar_01.png',
            name: 'David Okonkwo',
            role: 'Sustainability Director, MTN Nigeria',
            quote: '"The real-time dashboards transformed how we communicate impact to our stakeholders. 100% transparency."',
            star: 5,
        },
        {
            src: '/src/assets/images/testimonial_avatar_02.png',
            name: 'Daniel Yun',
            role: 'Community Relations, NNPC',
            quote: '"Finally, a platform that bridges the gap between corporate commitment and measurable community impact."',
            star: 5,
        },
    ]
  return (
    <div className='bg-bg-dark'>
        <section
            className="bg-no-repeat "
            style={{
            backgroundImage: `url(${testimonial_bg})`,
            backgroundBlendMode: 'overlay',
            backgroundSize: 'cover',
        }}
        >
            <div className="global-p py-20">
                {/* intro */}
                <div>
                    {/* heading */}
                    <HeaderBtn width='w-29' name="Testimonials"/>
                    <Intro 
                        header="Trusted by organizations that take responsibility seriously"
                        content={`
                            See why leading brands trust Impact Intel to validate their impact, 
                            streamline governance, and stay audit-ready.
                            `}
                        colorChange
                    />
                </div>

                {/* testimonials */}
                <div className="grid grid-cols-3 gap-10">
                    {data.map((d, index)=>(
                        <TestimonialCard 
                            key={index}
                            name={d.name}
                            role={d.role}
                            quote={d.quote}
                            src={d.src}
                            star={d.star}
                        />
                    ))}
                </div>
            </div>
        </section>
    </div>
  )
}

export default Testimonials
