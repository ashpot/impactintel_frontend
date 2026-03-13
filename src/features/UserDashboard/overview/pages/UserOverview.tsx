import PageTitle from "@/shared/components/PageTitle"
import { type StatCardProps, StatCard } from "../components/StatCard"
import CSRProgressChart from "../components/LineChart"
import BudgetAllocationChart from "../components/PieChart"
import RecentRow from "../ui/RecentRow"

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
        summary: '₦45M of ₦66M', 
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

        <div className="space-y-7 mt-10">
            <section className="flex gap-6 justify-between flex-wrap">
            
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
        </section>

        {/* analytics */}
        <section className="flex gap-6">
            <CSRProgressChart/>
            <BudgetAllocationChart/>
        </section>

            {/* recent activities */}
            <section>
                <div className="w-full bg-white rounded-3xl border border-line p-6 font-lato">
                    {/* header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-text-primary01">Recent Activities</h2>
                        <p className="text-sm text-brand-accent font-medium">
                            <a href="#" className="p-2">
                                See all
                            </a>
                        </p>
                    </div>

                    {/* rows */}
                    <RecentRow />
                    <RecentRow />
                    <RecentRow />
                    <RecentRow />
                    <RecentRow />
                </div>
            </section>
        </div>
        
    </div>
  )
}
export default UserOverview