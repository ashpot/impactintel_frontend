import Container from "@/shared/components/Container"
import PageTitle from "@/shared/components/PageTitle"
import PageTransition from "@/shared/components/PageTransition"
import Badge from "@/shared/ui/Badge"
import Button from "@/shared/ui/Button"
import { ChevronLeft } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import RequestStatus from "../components/RequestStatus"
import { useState } from "react"
import OnboardingActions from "../components/OnboardingActions"

interface RequestInfoFieldProps{
    label: string
    value: string
}

const companyInfo : RequestInfoFieldProps[] = [
    { label: 'Organization Name', value: 'First Bank of Nigeria' },
    { label: 'Industry / Sector', value: 'Banking & Finance' },
    { label: 'Company Size', value: '500+ employees' },
    { label: 'Country', value: 'Nigeria' },
    { label: 'Website', value: 'www.firstbank.com' },
    { label: 'Primary Contact Name', value: 'Chidi Okonkwo' },
    { label: 'Primary Contact Email', value: 'chidi.okonkwo@firstbank.com' },
    { label: 'Date Submitted', value: '10 Jan 2026, 14:30' },
    { label: 'Message / Use Case Description', value: 'We are interested in implementing impactIntel for our cooperate social responsibilities.' },
]

const RequestInfoField = ({label, value}: RequestInfoFieldProps)=>{
    return (
        <div className="w-full max-w-xl space-y-2">
            <p className="text-text-body text-xs">{label}</p>
            <h3 className="text-text-primary01 text-sm font-bold tracking-wide">{value}</h3>
        </div>
    )
}

const DemoRequestDetails = () => {
    const { slug } = useParams()
    const detailTitle = slug?.replaceAll('-', ' ')
    const navigate = useNavigate();
    const [textarea, setTextarea] = useState("")
  return (
    <PageTransition>
        <div className="space-y-8">
            <Button
                variant="ghost"
                leftIcon={<ChevronLeft className="w-5 h-5"/>}
                className="px-0 text-text-body font-medium text-sm gap-1"
                onClick={()=>navigate('/admin/demo-requests')}
            >
                Back to Demo Projects
            </Button>

            <section className="flex justify-between items-center">
                <PageTitle 
                    title={detailTitle}
                    body="Demo Request details"
                />
                <Badge 
                    name="New"
                    className="text-brand-primary bg-nav-active text-sm font-medium py-2 px-3"
                />
            </section>

            {/* request information + request status + internal notes */}
            <section
                className="grid grid-cols-3 grid-rows-2 gap-8"
            >
                <Container
                    title="Request Information"
                    className="space-y-6 col-span-2 row-span-2"
                >
                    {companyInfo.map(({label, value}, index)=>{
                        return(
                            <RequestInfoField 
                                key={index}
                                label={label}
                                value={value}
                            />
                        )
                    })}
                    
                </Container>

                <Container
                    title="Request Status"
                    className="col-span-1 row-span-1"
                >
                    <div className="w-full space-y-2.5 mb-4">
                        <p className="text-text-body text-xs">Current Status</p>
                        <h3 className="text-text-primary01 text-sm font-bold tracking-wide">New</h3>
                    </div>
                    <RequestStatus />
                </Container>

                <Container
                    title="Internal Notes"
                    className="space-y-8 col-span-1 row-span-1"
                >
                    <div className="w-full space-y-2.5">
                        <h3 className="text-text-primary01 text-sm font-bold tracking-wide">
                            Initial review completed. Organizations meets platform requirements.
                        </h3>
                        <p className="text-text-body text-xs">
                            10 Jan 2026, 15:00 • Super Admin
                        </p>
                    </div>
                    <form 
                        className="space-y-3"
                        onSubmit={(e)=>{
                            e.preventDefault()
                            console.log(textarea)
                        }}
                    >
                        <textarea name="" id="" 
                            value={textarea}
                            onChange={(e)=>setTextarea(e.target.value)}
                            placeholder="Add internal note (admin-only visibility)"
                            className="w-full rounded-xl px-3 py-2 outline-none border border-line resize-none focus:border-brand-primary"
                            rows={3}
                        />
                        <Button
                            className="w-full text-base font-semibold disabled:opacity-50"
                            size="md"
                            type="submit"
                            disabled={!textarea.trim()}
                        >
                            Add Note
                        </Button>
                    </form>
                </Container>
            </section>

            <section>
                <OnboardingActions />
            </section>
            
        </div>
    </PageTransition>
    
  )
}

export default DemoRequestDetails
