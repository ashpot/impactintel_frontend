import Container from "@/shared/components/Container"
import PageTransition from "@/shared/components/PageTransition"
import UseSlug from "@/shared/hooks/UseSlug"
import BackButton from "@/shared/ui/BackButton"
import Button from "@/shared/ui/Button"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router-dom"

const orgInfo02 = [
    {label: 'Approval Type', value: 'Organization Verification'},
    {label: 'Requested By', value: 'Tunde Victor (Director)'},
    {label: 'Date Submitted', value: 'Janauary 9, 2024'},
    {label: 'Current Status', value: 'Pending'},
]
const ApprovalDetails = () => {
    const {slug} = useParams()
    const {fromSlug} = UseSlug()
    const orgName = fromSlug(slug);
    const [textarea, setTextarea] = useState("")
  return (
    <PageTransition>
        <div className="space-y-8">
        <BackButton
            path="/admin/approvals"
        >
            Back to Approvals
        </BackButton>

        <section className="space-y-2">
            <div className="flex gap-3">
                <small className="text-text-body text-sm">Organization Verification</small>
                <small className="text-brand-primary text-sm">Pending</small>
            </div>
            <h3 className="text-text-primary01 text-3xl tracking-wide capitalize font-semibold">{orgName}</h3>
        </section>

        <section>
        <Container
            title="Request Summary"
            className="grid grid-cols-2 gap-x-5 pb-0"
        >
            {orgInfo02.map(({label, value}, i)=>{
                return(
                    <div className="w-full space-y-1.5 mb-6" key={i} >
                        <p className="text-text-body text-xs">{label}</p>
                        <h3 className={`text-sm font-bold tracking-wide 
                            ${label ==='Current Status' && 'text-brand-primary'}`}>{value}</h3>
                    </div>
                )
            })}
        </Container>
       </section>

       <section>
        <Container
            title="Request Details"
        >
            <div className="text-sm text-text-primary01">
                The Organization has submitted the following documents for verification:
            </div>
            <ul className="list-disc space-y-1.5 my-3 ml-[1.3rem]">
                {
                    [
                        "Certificate of Incorporation", "CAC Registration Number: RC 1289473",
                        "Registered Office Address", "Official Organization Email Domain",
                        "Primary Contact Identification Document"
                    ].map((value, index)=>{
                        return(
                            <li 
                                key={index}
                                className=""
                            >{value}</li>
                        )
                    })
                }
            </ul>
            <div className="w-full space-y-1.5 mb-6 pt-4 mt-4 border-t border-line">
                <p className="text-text-body text-xs">Note From Organization</p>
                <h3 className={`text-sm font-medium tracking-wide text-text-primary01`}>
                    "All required documents have been uploaded for verification. Pls let us know 
                    if additional information is needed."
                </h3>
            </div>
        </Container>
       </section>

       {/* supporting link container */}
       <section>
        <Container
            title="Supporting Links"
        >
            <div className="flex flex-col items-start gap-3">
                <Button
                    variant="ghost"
                    leftIcon={<ArrowRight className="w-4 h-4"/>}
                    className="px-0 gap-1 font-semibold text-text-primary01 hover:bg-line/30"
                >
                    View Organization Detail
                </Button>
                <Button
                    variant="ghost"
                    className="text-text-body gap-1 px-0 hover:bg-line/30"
                    leftIcon={<ArrowRight className="w-4 h-4"/>}
                >
                    View Related Users
                </Button>
                <Button
                        variant="ghost"
                        className="text-text-body gap-1 px-0 hover:bg-line/30"
                        leftIcon={<ArrowRight className="w-4 h-4"/>}
                    >
                        View Audit Logs
                </Button>
            </div>
        </Container>
       </section>

       <section>
        <Container
                title="Admin Notes"
                className=""
            >
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
                        placeholder="Add any internal notes or comments about this approval request (optional)"
                        className="w-full rounded-xl px-3 py-2 outline-none border border-line resize-none focus:border-brand-primary"
                        rows={4}
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

       {/* decision */}
       <section>
        <Container
            title="Decision Required"
            className=""
        >
            <div className="flex gap-5">
                <Button
                    size="md"
                    className="text-base text-text-primary01 px-10"
                >
                    Approve
                </Button>
                <Button
                    size="md"
                    variant="outline"
                    className="text-base hover:bg-line/30 px-10 border-line text-text-body"
                >
                    Reject
                </Button>
            </div>
        </Container>
       </section>
    </div>
    </PageTransition>
    
  )
}

export default ApprovalDetails
