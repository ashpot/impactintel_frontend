import PageTitle from "@/shared/components/PageTitle"
import { Plus } from "lucide-react"
import TableToolbar from "../components/TableToolbar"
import ProjectsTable from "../components/ProjectsTable"

const ProjectsPage = () => {
  return (
    <div className="font-lato">
        {/* heading */}
        <section className="flex justify-between items-center mb-10">
            <PageTitle
                title="Projects"
                body="View and manage all CSR initiatives and their progress"
            />
            <button className="bg-brand-primary flex gap-1 py-3 px-4 rounded-lg">
                <Plus color="hsla(0, 0%, 11%)" size={20}/>
                <span className="text-sm">New Project</span>
            </button>
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
