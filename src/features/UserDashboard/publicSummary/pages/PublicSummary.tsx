import { FolderOpen, Medal, ProfileUsers, Target } from "@/shared"
import { PublicSumCard, type PublicSumCardProps } from "../components/PublicSumCard"
import HeroBanner from "../components/HeroBanner"
import NigeriaProjectMap from "@/features/UserDashboard/publicSummary/components/Map";
import { Blog } from "../components/Blog";
import image from "@/assets/images/storyImage.png"

const PUBLIC_STAT: Omit<PublicSumCardProps, 'index'>[] = [
    {
        title: 'projects completed',
        bodyText: 'Across 8 states',
        icon: <FolderOpen/>,
        iconColor: '#04D242',
        iconBg: 'hsla(137, 72%, 94%, 1)',
        value: '24',
    },
    {
        title: 'total beneficiaries',
        bodyText: 'Lives impacted positively',
        icon: <ProfileUsers />,
        iconColor: '#E9C46A',
        iconBg: 'hsla(42, 76%, 97%, 1)',
        value: '12,450',
    },
    {
        title: 'average impact ',
        bodyText: 'above industry average',
        icon: <Target />,
        iconColor: '#727377',
        iconBg: 'hsla(0, 0%, 94%, 1)',
        value: '91%',
    },
    {
        title: 'sdgs supported',
        bodyText: 'Goals addressed',
        icon: <Medal />,
        iconColor: '#2B7FFF',
        iconBg: 'hsla(216, 100%, 95%, 1)',
        value: '8',
    },
]
const PublicSummary = () => {
  return (
    <div className="text-3xl space-y-7">
        <HeroBanner />
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {PUBLIC_STAT.map((p,i)=>{
            return(
                <PublicSumCard 
                    index={i}
                    {...p}
                />
            )
        })}
      </section>
        <NigeriaProjectMap />

        {/* blog area */}
        <section className="space-y-7">
            {/* heading */}
            <div>
                <h3 
                    className="leading-relaxed text-text-primary01 tracking-widest font-semibold text-2xl"
                >
                    Featured Stories
                </h3>
                <p
                    className="text-text-body font-medium text-sm"
                >Real impact stories from our CSR initiatives</p>
            </div>

            {/* blog */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <Blog 
                    index={1} 
                    imageSrc={image}
                />
                <Blog 
                    index={2} 
                    imageSrc={image}
                />
                <Blog 
                    index={3} 
                    imageSrc={image}
                />
                <Blog 
                    index={4} 
                    imageSrc={image}
                />
                <Blog 
                    index={5} 
                    imageSrc={image}
                />
                <Blog 
                    index={6} 
                    imageSrc={image}
                />
            </div>
        </section>
    </div>
  )
}
export default PublicSummary
