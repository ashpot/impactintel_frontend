import { Organization, Pending, ProfileUsers, type svgProps } from "@/shared"
import { CardAnimation } from "@/shared/components/CardAnimation"
import Container from "@/shared/components/Container"
import PageTitle from "@/shared/components/PageTitle"
import PageTransition from "@/shared/components/PageTransition"
import Button from "@/shared/ui/Button"


interface statProps{
    title: string
    Icon: React.FC<svgProps>
    bigText: string
    index: number
}
interface attentionProps{
    title?: string
    subtitle?: string
    status?: string
}
const statInfo: Omit<statProps, 'index'>[] = [
    {
        title: 'Total Organizations',
        bigText: '247',
        Icon: Organization,
    },
    {
        title: 'Active Organizations',
        bigText: '198',
        Icon: Organization,
    },
    {
        title: 'Total Users',
        bigText: '3,842',
        Icon: ProfileUsers,
    },
    {
        title: 'Pending Approvals',
        bigText: '12',
        Icon: Pending,
    },
]

const StatCard = ({title, Icon, bigText, index }:statProps)=>{
  return(
    <CardAnimation 
        className="card-shadow border border-line bg-white py-6 px-4 space-y-2 rounded-[10px]"
        index={index}
    >
        {/* title */}
        <div className="flex justify-between">
            <p className="text-xs text-text-body capitalize">
                {title}
            </p>
            <Icon className="w-5 h-5 text-text-body"/>
        </div>
        {/* big text */}
        <div className="text-3xl font-semibold text-text-primary01 tracking-wider leading-tight">
            {bigText}
        </div>
    </CardAnimation>
  )
}
const AttentionRow = ({
    title = 'greenEarth foundation',
    subtitle = 'documentation incomplete',
    status = 'pending verification'
}:attentionProps)=>{
    return(
        <div className="border-b border-line flex items-center py-5 justify-between">
            {/* title + body + badge */}
            <div className="w-full max-w-xl space-y-2.5">
                <div className="flex items-center gap-4">
                    <h3 className="text-text-primary01 text-sm font-bold capitalize">{title}</h3>
                    <p className="text-brand-primary text-xs px-2 py-1 bg-nav-active rounded-lg">{status}</p>
                </div>
                <p className="text-text-body text-sm capitalize">{subtitle}</p>
            </div>
            
            <Button
                variant="outline"
                className="text-text-primary01 border-line hover:bg-line/30"
            >
                Review
            </Button>
        </div>
        
    )
}
const PlatformActivity = ()=>{
    return (
        <div>
            <div className="text-3xl font-semibold text-text-primary01 tracking-wider mb-2.5">
                120
            </div>
            <div className="w-full max-w-xl space-y-2">
                <h3 className="text-text-primary01 text-sm font-bold capitalize tracking-wide">New Demo Requests</h3>
                <p className="text-text-body text-xs">Submitted this week</p>
            </div>
        </div>
    )
}

const AdminAction = ()=>{
    return(
        <div className="w-full space-y-2.5 border-b border-line py-6 px-4">
            <h3 className="text-text-primary01 text-sm font-bold tracking-wide">Admin approved organization GreenEarth Ltd</h3>
            <p className="text-text-body text-xs">2 hours ago</p>
        </div>
    )
}

const AdminOverview = () => {
  return (
    <PageTransition>
    <div className="space-y-8">
        <section className="flex justify-between">
            <PageTitle 
                title="Overview"
                body="Platform activity and system status at glance"
            />
            <p className="font-medium text-xs text-text-body self-end">Last updated: Today, 10:42AM</p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6">
            {statInfo.map(({title, Icon, bigText}, i)=>{
            return(
                <StatCard 
                    index={i}
                    key={bigText}
                    title={title}
                    Icon={Icon}
                    bigText={bigText}
                />
            )
            })}
      </section>

        {/* attention required section */}
      <section>
       <Container title="Attention Required">
            <AttentionRow />
            <AttentionRow />
            <AttentionRow />
       </Container>
      </section>

        {/* platform snapshot + recent admin actions */}
      <section className="grid grid-cols-3 gap-x-5">
        <Container 
            title="Platform Activity Snapshot"
            subtitle="last 7 days" 
            className="col-span-2"
        >
            <div className="grid grid-cols-2 gap-y-4">
                <PlatformActivity/>
                <PlatformActivity/>
                <PlatformActivity/>
                <PlatformActivity/>
            </div>
            <hr className="border-line my-5" />
            <div className="flex justify-end">
                <Button 
                    variant="ghost"
                >
                    View Details
                </Button>
            </div>
        </Container>

        <Container title="Recent Admin Actions">
            <AdminAction />
            <AdminAction />
        </Container>
      </section>
    </div>
    </PageTransition>
  )
}

export default AdminOverview
