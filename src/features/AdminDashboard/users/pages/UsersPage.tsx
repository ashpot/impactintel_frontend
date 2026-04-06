import PageTitle from "@/shared/components/PageTitle"
import PageTransition from "@/shared/components/PageTransition"
import TableFilter from "@/shared/components/TableFilter"
import UsersTable from "../components/UsersTable"

const UsersPage = () => {
  return (
    <PageTransition>
        <div className="space-y-8">
            <PageTitle 
                title="Users"
                body="Platform-wide user account across all organizations"
            />

            <section>
                <TableFilter 
                    roleOptions={["All Roles", "CSR Officer", "Auditor", "Client Admin"]}
                    statusOptions={["All Statuses", "Active", "Inactive", "Suspended"]}
                    organizationOptions={["All Organizations", "shell", "chevron", "mobil", "chivita", "green earth"]}
                />
            </section>

            <section>
                <UsersTable />
            </section>
        </div>
    </PageTransition>
    
  )
}

export default UsersPage
