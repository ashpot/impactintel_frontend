import Container from "@/shared/components/Container"
import { getInitials } from "@/shared/hooks/getInitials"
import UseSlug from "@/shared/hooks/UseSlug"
import BackButton from "@/shared/ui/BackButton"
import Button from "@/shared/ui/Button"
import { useParams } from "react-router-dom"

const orgInfo01 = [
    {label: 'Status', value: 'Active'},
    {label: 'Date Registered', value: 'Dec 15, 2024'},
    {label: 'Total Users', value: '45'},
    {label: 'CSR Projects', value: '23'},
    {label: 'Public Visibility', value: 'Enabled'},
]
const orgInfo02 = [
    {label: 'Legal Organization Name', value: 'Shell Nigeria Exploration and Production Company Limited'},
    {label: 'Sector', value: 'Energy'},
    {label: 'Primary Admin', value: 'Adewale Johnson • Client Admin'},
    {label: 'Registration ID', value: 'NG-ORG-2025-001'},
    {label: 'Country / Region', value: 'Nigeria'},
    {label: 'Contact Email', value: 'admin@shell.com'},
]
const OrganizationDetails = () => {
    const {slug} = useParams()
    const { fromSlug } = UseSlug();
    const orgName = fromSlug(slug)
  return (
    <div className="space-y-8">
       <BackButton
        path="/admin/organizations"
       >
        Back to Organizations
       </BackButton>

        {/* page header */}
       <section className="flex justify-between">
        <div className="flex gap-5">
            {/* company name + sector + initials */}
            <div className="text-lg font-lato w-16 h-16 rounded-full bg-bg-soft flex items-center justify-center text-text-body font-bold shrink-0">
                {getInitials(orgName)}
            </div>
            <div className="flex flex-col justify-between">
                <h3 className="text-2xl font-semibold text-text-primary01 capitalize">{orgName}</h3>
                <p className="text-sm text-text-body">Energy</p>
            </div>
        </div>
        <Button
            variant="outline"
            className="px-7 self-start text-base border-line text-text-body hover:bg-line/30"
        >
            Suspend Organization
        </Button>
       </section>

       <section>
        <div className="bg-white rounded-2xl border border-line p-7 font-lato card-shadow grid grid-cols-5">
            {orgInfo01.map(({label, value}, i)=>{
                return(
                    <div className="w-full space-y-3" key={i}>
                        <p className="text-text-body text-xs">{label}</p>
                        <h3 className={`text-sm font-bold tracking-wide ${value === 'Active' ? 'text-success': 'text-text-primary01'}`}>{value}</h3>
                    </div>
                )
            })}
        </div>
       </section>

       {/* organization details */}
       <section>
        <Container
            title="Organization Details"
            className="grid grid-cols-2 gap-x-5"
        >
            {orgInfo02.map(({label, value}, i)=>{
                return(
                    <div className="w-full space-y-1.5 mb-6 last:mb-0" key={i} >
                        <p className="text-text-body text-xs">{label}</p>
                        <h3 className="text-sm font-bold tracking-wide">{value}</h3>
                    </div>
                )
            })}
        </Container>

       </section>
    </div>
  )
}

export default OrganizationDetails
