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
                        <p className="text-text-body text-sm">{label}</p>
                        <h3 className={`text-base font-bold tracking-wide ${value === 'Active' ? 'text-success': 'text-text-primary01'}`}>{value}</h3>
                    </div>
                )
            })}
        </div>
       </section>

       {/* organization details */}
       <section>
        <Container
            title="Organization Details"
            className="grid grid-cols-2 gap-x-5 pb-0"
        >
            {orgInfo02.map(({label, value}, i)=>{
                return(
                    <div className="w-full space-y-1.5 mb-6" key={i} >
                        <p className="text-text-body text-sm">{label}</p>
                        <h3 className="text-base font-bold tracking-wide">{value}</h3>
                    </div>
                )
            })}
        </Container>
       </section>

       <section className="flex gap-8">
        <Container
            title="Users Overview"
            className="w-full"
        >
            <p className="text-text-body text-sm mb-5">Total Users: 45</p>
            <div className="space-y-4">
                {[
                {label: 'Client Admin', value: '3'},
                {label: 'CSR Officer', value: '28'},
                {label: 'Auditor', value: '14'}
            ].map(({label, value}, i)=>{
                return(
                    <div className="flex items-center justify-between" key={i}>
                        <p className="text-base font-bold tracking-wide text-text-primary01">{label}</p>
                        <p className="text-base font-bold tracking-wide text-shadow-text-primary01">{value}</p>
                    </div>
                    
                )
            })
            }
            </div>
            <Button
                variant="ghost"
                className="text-base font-bold mt-6 px-0 hover:bg-transparent hover:cursor-pointer"
            >
                View All Users
            </Button>
        </Container>
        <Container
            title="Reviews & Flags"
            className="w-full"
        >
            <p className="text-text-body text-sm">No pending reviews of flags.</p>
        </Container>
       </section>

       <section>
        <Container
            title="System Activity"
        >
            <div className="border-b border-line flex items-center py-5 justify-between">
                <div className="w-full space-y-2">
                    <h3 className="text-text-primary01 text-base font-bold capitalize">Approval</h3>
                    <p className="text-text-body text-sm">Organization approved by Super Admin</p>
                </div>
                <div className="text-text-body text-sm w-30">
                    Dec 15, 2024
                </div>
            </div>
            <div className="border-b border-line flex items-center py-5 justify-between">
                <div className="w-full space-y-2">
                    <h3 className="text-text-primary01 text-base font-bold capitalize">Approval</h3>
                    <p className="text-text-body text-sm">Organization approved by Super Admin</p>
                </div>
                <div className="text-text-body text-sm w-30">
                    Dec 15, 2024
                </div>
            </div>
            
            <Button
                variant="ghost"
                className="text-base font-bold mt-6 px-0 hover:bg-transparent hover:cursor-pointer"
            >
                View Full Audit Logs
            </Button>
        </Container>
       </section>
    </div>
  )
}

export default OrganizationDetails
