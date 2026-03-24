import PageTitle from "@/shared/components/PageTitle"
import Button from "@/shared/ui/Button"
import { CalendarDays } from "lucide-react"
import UploadTable from "../components/UploadTable"
import PageTransition from "@/shared/components/PageTransition"
import Drop from "@/shared/components/Drop"

const UploadsPage = () => {
  return (
    <PageTransition>
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
            <UploadTable/>
        </div>
    </PageTransition>
  )
}

export default UploadsPage