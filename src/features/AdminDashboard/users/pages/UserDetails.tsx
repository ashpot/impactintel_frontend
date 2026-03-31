import Container from "@/shared/components/Container"
import PageTransition from "@/shared/components/PageTransition"
import BackButton from "@/shared/ui/BackButton"
import avatar from "@/assets/images/testimonial_avatar_03.png"
import Button from "@/shared/ui/Button"
import { useParams } from "react-router-dom"
import UseSlug from "@/shared/hooks/UseSlug"

const orgInfo01 = [
    {label: 'Status', value: 'Active'},
    {label: 'Role', value: 'Client Admin'},
    {label: 'Last Active', value: '2 hours ago'},
    {label: 'Date Joined', value: 'Dec 15, 2024'},
    {label: 'Department', value: 'Cooperate Social Responsibility'},
]
const UserDetails = () => {
    const {slug} = useParams()
    const { fromSlug } = UseSlug();
    const user = fromSlug(slug)
    const mail = `${user?.replaceAll(' ', '').toLowerCase()}@gmail.com`
    const orgInfo02 = [
        {label: 'Full Name', value: user},
        {label: 'Contact Email', value: mail},
        {label: 'Phone Number', value: '+234 810 442 0678'},
        {label: 'Organization', value: 'Shell Nigeria'},
    ]
  return (
    <PageTransition>
        <div className="space-y-8">
        <BackButton
            path="/admin/users"
        >
            Back to Users
        </BackButton>

        {/* page header */}
       <section className="flex justify-between">
        <div className="flex gap-5">
            {/* company name + sector + initials */}
            <div className="text-lg font-lato w-16 h-16 rounded-full bg-bg-soft flex items-center justify-center text-text-body font-bold shrink-0">
                <img src={avatar} alt="avatar" />
            </div>
            <div className="flex flex-col justify-between">
                <h3 className="text-2xl font-semibold text-text-primary01 capitalize">{user}</h3>
                <p className="text-sm text-text-body">{mail}</p>
                <p className="text-lg font-semibold text-text-primary01 capitalize">Shell Nigeria</p>
            </div>
        </div>
        <Button
            variant="outline"
            className="px-7 self-start text-base border-line text-text-body hover:bg-line/30"
        >
            Suspend User
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

       {/* user details */}
       <section>
        <Container
            title="User Details"
            className="grid grid-cols-2 gap-x-5 pb-0"
        >
            {orgInfo02.map(({label, value}, i)=>{
                return(
                    <div className="w-full space-y-1.5 mb-6" key={i} >
                        <p className="text-text-body text-sm">{label}</p>
                        <h3 className={`text-base font-bold tracking-wide 
                            ${label ==='Full Name' && 'capitalize'}`}>{value}</h3>
                    </div>
                )
            })}
        </Container>
       </section>
            {/* recent activities */}
       <section className="flex gap-8">
            <Container title="Recent Activity" className="w-full">
                {
                    Array.from({length: 4}).map((_, i)=>{
                        const isLast = i === 3;
                        return(
                        <div className={`w-full space-y-2.5 py-6 px-4 
                            ${!isLast && 'border-b border-line'}`} key={i}
                        >
                            <h3 className="text-text-primary01 text-sm font-bold tracking-wide">
                                Created CSR project: 'Clean Water Initiative'
                            </h3>
                            <p className="text-text-body text-xs">2 hours ago</p>
                        </div>
                        )
                    })
                }
            </Container>
            <Container title="Login History" className="w-full">
               {
                    Array.from({length: 4}).map((_, i)=>{
                        const isLast = i === 3;
                        return(
                        <section className={`w-full space-y-2.5 py-6 px-4 
                            ${!isLast && 'border-b border-line'}`} key={i}
                        >   
                            <div className="flex justify-between">
                                <h3 className="text-text-primary01 text-sm font-bold tracking-wide">
                                    Jan 9, 2026
                                </h3>
                                <p className="text-text-body text-sm">09:15 AM</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-text-body text-sm">
                                    Lagos, Nigeria
                                </p>
                                <p className="text-text-body text-sm">102.89.2.45</p>
                            </div>
                        </section>
                        )
                    })
                }
            </Container>
       </section>

    </div>
    </PageTransition>
    
  )
}

export default UserDetails
