import PageTitle from "@/shared/components/PageTitle"
import Button from "@/shared/ui/Button"
import { CalendarDays } from "lucide-react"
import Drop from "../components/Drop"

const UploadsPage = () => {
  return (
        <div className="font-lato">
        {/* heading */}
        <section className="flex justify-between items-center mb-10">
            <PageTitle
                title="Fields Uploads"
                body="Upload projects images, reports, or beneficiary data"
            />
            <Button 
                variant="outline" 
                className="border border-line"
                leftIcon={<CalendarDays size={17}/>}
            >
                Last 30 Days
            </Button>
        </section>

        <div className="space-y-7">
            <Drop />
        </div>
        
          
    </div>
  )
}

export default UploadsPage