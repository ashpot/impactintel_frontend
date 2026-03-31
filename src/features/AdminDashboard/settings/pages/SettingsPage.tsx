import PageTitle from "@/shared/components/PageTitle"
import PageTransition from "@/shared/components/PageTransition"

const SettingsPage = () => {
  return (
    <PageTransition>
        <div className='space-y-8'>
            <PageTitle
              title='Settings'
              body='Platform configuration and administrative controls'
            />
        </div>
    </PageTransition>
    
  )
}

export default SettingsPage
