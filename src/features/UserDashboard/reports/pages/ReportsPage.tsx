import PageTitle from "@/shared/components/PageTitle"
import TableToolbar from "@/shared/components/TableToolbar"
import Button from "@/shared/ui/Button"
import { CalendarDays } from "lucide-react"
import type { genProps } from "../components/GenReportsCard"
import GenReportsCard from "../components/GenReportsCard"
import BuildCustomReport from "../components/BuildCustomReport"
import ReportsTable from "../components/ReportsTable"
import PageTransition from "@/shared/components/PageTransition"

const generateReportInfo:Omit<genProps, 'index'>[] = [
    {
        title: 'SDG Impact Report',
        bodyText: 'Comprehensive analysis of SDG alignment and impact',
        iconBorder: 'hsla(47, 100%, 82%, 1)',
        iconBg: 'hsla(46, 100%, 96%, 1)',
        iconSrc: '/src/assets/icons/chart.svg'
    },
    {
        title: 'Financial Report',
        bodyText: 'Budget utilization across all projects',
        iconBorder: 'hsla(138, 70%, 76%, 1)',
        iconBg: 'hsla(137, 72%, 94%, 1)',
        iconSrc: '/src/assets/icons/trendReport.svg'
    },    
    {
        title: 'Impact Scorecard',
        bodyText: 'GRI-aligned sustainability scorecard',
        iconBorder: 'hsla(210, 2%, 78%, 1)',
        iconBg: 'hsla(0, 0%, 91%, 1)',
        iconSrc: '/src/assets/icons/medal.svg'
    },
]
const ReportsPage = () => {
  return (
    <PageTransition>
        {/* heading */}
        <section className="flex justify-between items-center mb-10">
            <PageTitle
                title="Reports & Insights"
                body="Visualize CSR outcomes across all projects"
            />
            <Button 
                variant="outline" 
                className="border border-line"
                leftIcon={<CalendarDays size={17}/>}
            >
                Last 30 Days
            </Button>
        </section>

        {/* table tools bar */}
        <div className="space-y-7">
            <TableToolbar/>
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {generateReportInfo.map((g, i)=>{
                    return(
                        <GenReportsCard
                            index={i} 
                            title={g.title}
                            bodyText={g.bodyText}
                            iconBorder={g.iconBorder}
                            iconBg={g.iconBg}
                            iconSrc={g.iconSrc}
                        />
                    )
                })}
            </section>
            <BuildCustomReport />
            <ReportsTable />
        </div>
    </PageTransition>
  )
}

export default ReportsPage
