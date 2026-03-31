import PageTitle from "@/shared/components/PageTitle"
import PageTransition from "@/shared/components/PageTransition"

const AuditLogsPage = () => {
  return (
    <PageTransition>
        <div className='space-y-8'>
            <PageTitle
              title='Audit Logs'
              body='Chronological record of platform activity'
            />
        </div>
    </PageTransition>
    
  )
}

export default AuditLogsPage
