import PageTitle from "@/shared/components/PageTitle"
import { type StatCardProps, StatCard } from "../components/StatCard"
import RecentRow from "../ui/RecentRow"
import PageTransition from "@/shared/components/PageTransition"
import { DonutChart } from "@/shared/components/DonutChart"
import { LineChartMain } from "@/shared/components/LineChart"
import stat1 from '/src/assets/icons/trend.svg'
import stat2 from '/src/assets/icons/two_user.svg'
import stat3 from '/src/assets/icons/wallet.svg'
import stat4 from '/src/assets/icons/target.svg'


// mock data
const statInfo: StatCardProps[] = [
    {
        title: 'csr maturity score',
        score: '85/100', 
        summary: 'Based on 8 active projects', 
        badgeText: '8% vs last quater', 
        iconSrc: stat1, 
        iconBg: '#FFFAE9', 
        iconBorderColor: '#FFEBA4',
        index: 1
    },
    {
        title: 'total beneficiaries',
        score: '12,450', 
        summary: 'Across all initiatives', 
        badgeText: '14% vs last month', 
        iconSrc: stat2, 
        iconBg: '#E8EBEE', 
        iconBorderColor: '#A2ACBA',
        index: 2
    },
    {
        title: 'budget utilization',
        score: '68%', 
        summary: '₦45M of ₦66M', 
        badgeText: 'on track', 
        iconSrc: stat3, 
        iconBg: '#E6FBEC', 
        iconBorderColor: '#98EDB2',
        index: 3
    },
    {
        title: 'sdg alignment',
        score: '6/7', 
        summary: 'primary focus areas',  
        iconSrc: stat4, 
        iconBg: '#EFEFEF', 
        iconBorderColor: '#C5C6C7',
        index: 4
    },
]
const donutChart_data = [
  { name: "Environmental", value: 45, color: "hsla(44, 100%, 52%, 1)" },
  { name: "Social",         value: 35, color: "hsla(147, 45%, 48%, 1)" },
  { name: "Governance",     value: 20, color: "hsla(0, 94%, 48%, 1)" },
];
const lineChart_data = [
  { month: "Jan", score: 64 },
  { month: "Feb", score: 68 },
  { month: "Mar", score: 72 },
  { month: "Apr", score: 69 },
  { month: "May", score: 75 },
  { month: "Jun", score: 78 },
  { month: "Jul", score: 82 },
  { month: "Aug", score: 86 },
];
const UserOverview = () => {
  return (
        <PageTransition>
            <PageTitle
            title="Dashboard Overview"
            body="Last updated: Nov 8, 2025 at 10:30 AM"
        />

        <div className="space-y-7 mt-10">
            <section 
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {statInfo.map((stat, i)=>{
                return (
                    <StatCard
                        key={i}
                        index={stat.index}
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
        <section className="grid lg:grid-cols-2 lg:gap-x-6 grid-cols-1 gap-y-7">
           <LineChartMain 
                data={lineChart_data}
                ticks={[0, 25, 50, 75, 100]}
                title="CSR Progress Over Time"
                subtitle="Monthly performance tracking"
           />
            <DonutChart 
                items={donutChart_data}
                header="Budget Allocation"
                subHead="Distribution by category"
            />
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
        </PageTransition>
  )
}
export default UserOverview