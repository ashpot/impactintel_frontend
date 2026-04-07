import PageTransition from "@/shared/components/PageTransition"
import OrganizationTable from "../components/OrganizationTable"
// import TableFilter from "@/shared/components/TableFilter"
import PageTitle from "@/shared/components/PageTitle"

const OrganizationsPage = () => {
  return (
    <PageTransition>
        <div className="space-y-8">
            <PageTitle 
                title="Organizations"
                body="Manage and monitor organizations registered on ImpactIntel"
            />
            {/* table filter */}
             <section>
                {/* <TableFilter 
                    sectorOptions={["All Sectors", "Banking & Finance", "Technology", "Telecommunications", "Philanthropy", "Manufacturing", "Energy & Oil"]}
                /> */}
            </section>
            {/* table */}
            <section>
                <OrganizationTable />
            </section>
        </div>
    </PageTransition>
 
  )
}

export default OrganizationsPage
