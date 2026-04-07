import PageTitle from "@/shared/components/PageTitle"
import PageTransition from "@/shared/components/PageTransition"
// import TableFilter from "@/shared/components/TableFilter"
import RequestTable from "../components/RequestTable"

const DemoRequestPage = () => {
  return (
    <PageTransition>
        <div className="space-y-8">
            <PageTitle 
                title="Demo Request"
                body="Organizations requesting access to ImpactIntel"
            />

            {/* table toolbar */}
            <section>
                {/* <TableFilter 
                    sectorOptions={["All Sectors", "Banking & Finance", "Technology", "Telecommunications", "Philanthropy", "Manufacturing", "Energy & Oil"]}
                /> */}
            </section>

            {/* table */}
            <section>
                <RequestTable />
            </section>
           

        </div>
    </PageTransition>
    
  )
}

export default DemoRequestPage