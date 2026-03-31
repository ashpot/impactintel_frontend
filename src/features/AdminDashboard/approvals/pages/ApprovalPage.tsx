import PageTitle from "@/shared/components/PageTitle"
import PageTransition from "@/shared/components/PageTransition"
import TableFilter from "@/shared/components/TableFilter"
import UseSlug from "@/shared/hooks/UseSlug";
import Button from "@/shared/ui/Button";
import {motion} from "framer-motion";
import { Link } from "react-router-dom";

type Status = "Pending" | "Approved" | "Rejected";
interface ApprovalInfoProps{
    type:  string
    status: Status
    organization: string
    description: string
    submissionDate: {
        dateTime: string,
        dateString: string
    }
    submittedBy: string
    index: number
}
const STATUS_STYLES : Record<Status, string> = {
    Pending: 'text-brand-primary',
    Approved: 'text-success',
    Rejected: 'text-text-body'
}
const approvalInfo:ApprovalInfoProps[] = [
  { index: 1,
    type: "User Access Request",
    status: "Approved",
    organization: "ExxonMobil Nigeria",
    description: "Request for additional user licenses approved for expansion team.",
    submissionDate: {
        dateString: "Jan 2, 2026",
        dateTime: "2026-01-02"
    },
    submittedBy: "Emily Watson (Client Admin)"
  },
  { index: 2,
    type: "Project Submission",
    status: "Rejected",
    organization: "TotalEnergies Foundation",
    description: `CSR project "Youth Skills Training Program" rejected due to incomplete documentation.`,
    submissionDate: {
        dateString: "Jan 3, 2026",
        dateTime: "2026-01-03"
    },
    submittedBy: "Fatima Hassan (CSR Officer)"
  },
  { index: 3,
    type: "Organization Registration",
    status: "Approved",
    organization: "Delta Development Initiative",
    description: "New organization approved for platform access on Jan 5, 2026.",
    submissionDate: {
        dateString: "Jan 4, 2026",
        dateTime: "2026-01-04"
    },
    submittedBy: "Ibrahim Musa (Director)"
  },
  { index: 4,
    type: "Flag Review",
    status: "Pending",
    organization: "Future Leaders Academy",
    description: "Organization flagged for suspicious activity - multiple failed verification attempts.",
    submissionDate: {
        dateString: "Jan 6, 2026",
        dateTime: "2026-01-06"
    },
    submittedBy: "System (Automated)"
  },
  { index: 5,
    type: "User Access Request",
    status: "Pending",
    organization: "GreenEarth Foundation",
    description: "Request for elevated permissions to enable audit access for compliance review.",
    submissionDate: {
        dateString: "Jan 7, 2026",
        dateTime: "2026-01-07"
    },
    submittedBy: "Chioma Okafor (Client Admin)"
  },
  { index: 6,
    type: "Profile Changes",
    status: "Pending",
    organization: "Chevron Corporation",
    description: "Significant updates to organization profile including contact information and corporate structure.",
    submissionDate: {
        dateString: "Jan 8, 2026",
        dateTime: "2026-01-08"
    },
    submittedBy: "Michael Chen (Client Admin)"
  },
  { index: 7,
    type: "Project Submission",
    status: "Pending",
    organization: "Shell Nigeria",
    description: `CSR project submission for "Clean Water Initiative Phase 2" awaiting approval.`,
    submissionDate: {
        dateString: "Jan 8, 2026",
        dateTime: "2026-01-08"
    },
    submittedBy: "Adewale Johnson (Client Admin)"
  },
  { index: 8,
    type: "Organization Registration",
    status: "Pending",
    organization: "Lagos Youth Foundation",
    description: "New organization requesting platform access to manage community education programs.",
    submissionDate: {
        dateString: "Jan 9, 2026",
        dateTime: "2026-01-09"
    },
    submittedBy: "Tunde Williams (Director)"
  }
];
const ApprovalCard = ({type, status, organization, description, submissionDate, submittedBy, index}:
    ApprovalInfoProps
)=>{
    const dateTime = submissionDate.dateTime,
        dateString = submissionDate.dateString,
        isRejected = status.toLocaleLowerCase() === 'rejected',
        {toSlug} = UseSlug(),
        organizationSlug = toSlug(organization);
    return(
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: isRejected ? 0.5 : 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.25, delay: index * 0.1, ease: "easeOut" }}
            whileHover={{ scale: isRejected ? 1 : 1.01 }}
            className={`bg-white rounded-2xl border border-line p-6 font-lato card-shadow flex items-start`}
        >
            <div className="space-y-2 w-full">
                <div className="flex gap-3">
                    <small className="text-text-body text-xs">{type}</small>
                    <span className={`text-xs ${STATUS_STYLES[status]}`}>{status}</span>
                </div>
                {/* title(company name) */}
                <h3 className="text-text-primary01 font-semibold text-lg">{organization}</h3>

                {/* description */}
                <div className="space-y-1.5">
                    <p className="text-text-body text-sm">{description}</p>
                    <div className="flex gap-8">
                        <time dateTime={dateTime} className="text-text-body text-xs">Submitted {dateString}</time>
                        <small className="text-text-body text-xs">By {submittedBy}</small>
                    </div>
                </div>
            </div>
            <Link
                to={`/admin/approvals/${organizationSlug}`}
            >
                <Button
                    variant="outline"
                    className="text-text-primary01 border-line hover:bg-line/30 px-6"
                >
                    Review
                </Button>
            </Link>
            
        </motion.div>
    )
}
const ApprovalPage = () => {
  return (
    <PageTransition>
        <div className="space-y-8">
            <PageTitle 
                title="Approvals"
                body="Items requiring administrative review and action"
            />

            <section>
                <TableFilter 
                    statusOptions={['All Statuses', 'Approved', 'Pending', 'Rejected']}
                />
            </section>

            <section className="space-y-5">
                {Array.from(approvalInfo).map((value)=>{
                    return(
                        <ApprovalCard 
                            {...value}
                        />
                    )
                })}
            </section>
        </div>
    </PageTransition>
    
  )
}

export default ApprovalPage
