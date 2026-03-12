import PageTitle from "@/shared/components/PageTitle"
import { type StatCardProps, StatCard } from "../components/StatCard"

// mock data
const statInfo: StatCardProps[] = [
    {
        title: 'csr maturity score',
        score: '85/100', 
        summary: 'Based on 8 active projects', 
        badgeText: '8% vs last quater', 
        iconSrc: 'src/assets/icons/trend.svg', 
        iconBg: '#FFFAE9', 
        iconBorderColor: '#FFEBA4' 
    },
    {
        title: 'total beneficiaries',
        score: '12,450', 
        summary: 'Across all initiatives', 
        badgeText: '14% vs last month', 
        iconSrc: 'src/assets/icons/two_user.svg', 
        iconBg: '#E8EBEE', 
        iconBorderColor: '#A2ACBA' 
    },
    {
        title: 'budget utilization',
        score: '68%', 
        summary: '$45M of $66M', 
        badgeText: 'on track', 
        iconSrc: 'src/assets/icons/wallet.svg', 
        iconBg: '#E6FBEC', 
        iconBorderColor: '#98EDB2' 
    },
    {
        title: 'sdg alignment',
        score: '6/7', 
        summary: 'primary focus areas',  
        iconSrc: 'src/assets/icons/target.svg', 
        iconBg: '#EFEFEF', 
        iconBorderColor: '#C5C6C7' 
    },
]
const UserOverview = () => {
  return (
    <div className="font-lato">
        <PageTitle
            title="Dashboard Overview"
            body="Last updated: Nov 8, 2025 at 10:30 AM"
        />
        <div className="flex justify-between flex-wrap">
            
            {statInfo.map((stat, i)=>{
                return (
                    <StatCard
                        key={i}
                        title={stat.title}
                        score={stat.score}
                        summary={stat.summary}
                        badgeText={stat.badgeText}
                        iconSrc={stat.iconSrc}
                        iconBg={stat.iconBg}
                        iconBorderColor={stat.iconBorderColor}
                    />
                )
            })}
        </div>
    </div>
  )
}

export default UserOverview
