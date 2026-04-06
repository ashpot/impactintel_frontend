import PageTitle from "@/shared/components/PageTitle"
import PageTransition from "@/shared/components/PageTransition"
import AuditLogsTable from "../components/AuditLogsTable"
import TableFilter from "@/shared/components/TableFilter"

const AuditLogsPage = () => {
  return (
    <PageTransition>
        <div className='space-y-8'>
            <PageTitle
              title='Audit Logs'
              body='Chronological record of platform activity'
            />
            <section>
              <TableFilter
                showLabels
                searchLabel="Search"
                searchPlaceholder="Search logs"
                actorFilter={{
                  label:   "Actor",
                  options: ["All Actors", "Sarah Admin", "Client Admin", "System"],
                }}
                entityFilter={{
                  label:   "Entity Type",
                  options: ["All Types", "Organization", "User Account", "CSR Report"],
                }}
                actionFilter={{
                  label:   "Action Type",
                  options: ["All Actions", "Approved", "Rejected", "Created", "Updated", "Deleted", "Flagged", "Suspended"],
                }}
                dateRangeFilter={{
                  label:   "Date Range",
                  options: ["All Time", "Today", "Last 7 Days", "Last 30 Days", "Last 3 Months"],
                }}
              />
            </section>
            <section>
              <AuditLogsTable />
            </section>

        </div>
    </PageTransition>
    
  )
}

export default AuditLogsPage
