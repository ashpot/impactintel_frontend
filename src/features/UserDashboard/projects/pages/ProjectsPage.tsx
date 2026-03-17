import PageTitle from "@/shared/components/PageTitle"
import { Plus } from "lucide-react"
import ProjectsTable from "../components/ProjectsTable"
import TableToolbar from "@/shared/components/TableToolbar"
import Button from "@/shared/ui/Button"

const ProjectsPage = () => {
  return (
        <div className="font-lato">
        {/* heading */}
        <section className="flex justify-between items-center mb-10">
            <PageTitle
                title="Projects"
                body="View and manage all CSR initiatives and their progress"
            />
            <Button variant="primary" className=" text-text-primary01" leftIcon={<Plus color="hsla(0, 0%, 11%)" size={20}/>} size="sm">
                New Project
            </Button>
        </section>

        {/* table tools bar */}
        <div className="space-y-7">
            <TableToolbar/>
            <ProjectsTable/>
        </div>
        
          
    </div>
  )
}

export default ProjectsPage
