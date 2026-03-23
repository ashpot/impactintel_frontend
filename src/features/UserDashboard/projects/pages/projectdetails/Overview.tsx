import { Calendar, People, ProfileUsers, Trend, Wallet, type svgProps } from "@/shared"
import ProjectTimeline from "../../components/ProjectTimeline"
import KeyStakeholders from "../../components/Stakeholders"
interface statProps{
  title: string
  Icon: React.FC<svgProps>
  bigText: string
  summary: string
}

const statCardInfo:statProps[] = [
  {
    title: 'Budget Utilized',
    Icon: Wallet,
    bigText: '$1,950,000',
    summary: '78% of $2,500,00'
  },
  {
    title: 'beneficiaries',
    Icon: ProfileUsers,
    bigText: '1,450',
    summary: '97% of target'
  },
  {
    title: 'Completion',
    Icon: Trend,
    bigText: '62%',
    summary: 'On track for Dec 2026'
  },
  {
    title: 'days active',
    Icon: Calendar,
    bigText: '75 days',
    summary: '47 days left'
  },
  {
    title: 'Team size',
    Icon: People,
    bigText: '12',
    summary: 'Fully staffed'
  }
]
const StatCard = ({title, Icon, bigText, summary}:statProps)=>{
  return(
    <div className="card-shadow border border-line bg-white py-6 px-4 space-y-2 rounded-[10px]">
          {/* title */}
          <div className="flex justify-between">
            <p className="text-xs text-text-body tracking-[0.15em] uppercase">
              {title}
            </p>
            <Icon className="w-5 h-5 text-brand-primary"/>
          </div>
          {/* big text */}
          <div className="text-2xl font-semibold text-text-primary01 tracking-wider leading-tight">
            {bigText}
          </div>
          {/* summary */}
          <div className="text-xs text-success">{summary}</div>
        </div>
  )
}

// main component
const Overview = () => {
  return (
    <div className="space-y-10">
      {/* overview intro */}
     <section>
      <div className="border border-line bg-white space-y-4 p-6 rounded-2xl">
        <h3 className="text-text-primary01 font-semibold text-lg tracking-wide">Project Objectives</h3>
        <p className="text-text-body text-sm">
          The Clean Water Initiative aims to provide sustainable access to clean drinking water 
          for rural communities. Through the installation of solar-powered water purification systems 
          and community training programs, we are working to improve health outcomes and reduce waterborne 
          diseases. This project aligns with SDG 6 (Clean Water and Sanitation) and SDG 13 (Climate Action) 
          by utilizing renewable energy solutions.
        </p>
      </div>
     </section>

     {/* stat cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {statCardInfo.map(({title, Icon, bigText, summary})=>{
          return(
            <StatCard 
              title={title}
              Icon={Icon}
              bigText={bigText}
              summary={summary}
            />
          )
        })}
      </section>
      <section className="flex gap-7.5 justify-between">
        <ProjectTimeline />
        <KeyStakeholders />
      </section>
      

    </div>
  )
}

export default Overview
