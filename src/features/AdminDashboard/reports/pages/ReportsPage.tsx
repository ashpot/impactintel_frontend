import { CardAnimation } from '@/shared/components/CardAnimation'
import PageTitle from '@/shared/components/PageTitle'
import PageTransition from '@/shared/components/PageTransition'
import Button from '@/shared/ui/Button'
import type React from 'react'

interface StatProps {
  title: string
  bigText: string
  index: number
}
const statInfo: StatProps[] = [
  {title: 'Total Organizatons', bigText: '847', index: 1},
  {title: 'Total Users', bigText: '12,473', index: 2},
  {title: 'Active Organizations (Last 30 Days)', bigText: '623',  index: 3},
  {title: 'Pending Approvals', bigText: '5', index: 4}
]
const ReportContainer = ({children, title}:{children: React.ReactNode, title: string})=>{
  return(
    <>
      <div className='text-lg text-text-primary01 mb-5 font-semibold'>{title}</div>
      <div className={`bg-white rounded-3xl border border-line p-6 font-lato card-shadow`}>
        {children}
      </div>
    </>

  )
}
const ReportsPage = () => {
  return (
    <PageTransition>
        <div className='space-y-8'>
            <PageTitle 
              title='Reports'
              body='Platform-level summaries and administrative insights'
            />

            <section>
              <div className='text-lg text-text-primary01 mb-5 font-semibold'>Reports Overview</div>
              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6'>
                {statInfo.map(({title, bigText, index})=>{
                  return(
                    <CardAnimation 
                      className="card-shadow border border-line bg-white p-6 space-y-2 rounded-[10px]"
                      index={index}
                    >
                      {/* title */}
                          <h3 className="text-xs text-text-body capitalize">
                              {title}
                          </h3>
                      {/* big text */}
                      <div className={`text-3xl font-semibold tracking-wider leading-tight
                        ${bigText === '5' ? 'text-brand-primary' : 'text-text-primary01'}`}>
                          {bigText}
                      </div>
                  </CardAnimation>

                  )
                })}
              </div>
            </section>

            <section>

                <ReportContainer
                  title='Activity Reports'
                >
                  {Array.from({length: 4}).map((_, i)=>{
                    return(
                      <div className={`py-5 flex justify-between ${i !== 3 && 'border-b border-line'}`} key={i}>
                        <div className='w-full space-y-2'>
                          <p className='text-sm text-text-primary01 font-semibold'>Organization registrations</p>
                          <small className='block text-text-body text-xs'>Last 30 days</small>
                        </div>
                        <div className='flex items-center text-2xl font-semibold tracking-wider leading-tight'>{47 * i}</div>
                      </div>
                    )
                  })}
                </ReportContainer>
            </section>

            <section>
              <ReportContainer
                title='Compliance & Risk Summary'
              >
                {[
                  {dot: true, label: 'Flagged Organizations', value: '3'},
                  {dot: true, label: 'Flagged Reports', value: '7'},
                  {dot: false, label: 'Suspended Users', value: '12'},
                  {dot: false, label: 'Pending Reviews', value: '18'},
                ].map(({dot, label, value}, i)=>{
                  return(
                      <div className={`py-5 pt-7 flex justify-between ${i !== 3 && 'border-b border-line'}`} key={i}>
                        {dot ? (
                          <div className='flex gap-3 items-center'>
                            <span className='w-2 h-2 rounded-full bg-brand-primary'/>
                            <p className='text-sm text-text-primary01 font-semibold'>{label}</p>
                          </div>
                        ) : (
                          <p className='text-sm text-text-primary01 font-semibold'>{label}</p>
                        )}
                        <div className={`flex items-center text-2xl font-semibold tracking-wider leading-tight
                          ${dot ? 'text-brand-primary' : 'text-text-primary01'}`}>
                          {value}
                        </div>
                      </div>
                  )
                })}
              </ReportContainer>
            </section>

            <section>
              <ReportContainer
                title='Export'
              >
                <div className='flex flex-col gap-2'>
                  <label htmlFor="range" className='text-text-body text-sm'>Time Range</label>
                  <div className='flex gap-4'>
                    <input
                      name='range'
                      readOnly
                      className="flex-1 px-4 py-2.5 rounded-lg border border-border-secondary text-placeholder cursor-not-allowed outline-none"
                    />
                    <Button
                      className="py-2.5"
                    >
                      Export Report
                    </Button>
                  </div>
                </div>
              </ReportContainer>
            </section>
        </div>
    </PageTransition>
  )
    
}

export default ReportsPage
