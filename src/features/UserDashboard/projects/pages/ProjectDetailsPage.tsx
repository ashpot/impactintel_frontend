import { Trash } from "@/shared"
import PageNavigation from "@/shared/components/PageNavigation"
import Button from "@/shared/ui/Button"
import type { NavItem } from "@/shared/utils/types"
import { ArrowLeft } from "lucide-react"
import { Outlet, useNavigate, useParams } from "react-router-dom"


const ProjectDetailsPage = () => {
    const {slug} = useParams()
    const title = slug?.replaceAll('-', ' ')
    const navigate = useNavigate()
    const navItems: Omit<NavItem, 'icon'>[] = [
      { 
        id: 'overview', 
        label: 'Overview', 
        path: `/dashboard/projects/${slug}`
      },
      { 
        id: 'metrics',     
        label: 'Metrics',     
        path: `/dashboard/projects/${slug}/metrics`
      },

      { 
        id: 'documents',      
        label: 'Document',      
        path: `/dashboard/projects/${slug}/documents`
      }
    ]

  return (
    <div className="space-y-7">
      {/* navigate back button */}
      <div>
        <Button
          leftIcon={<ArrowLeft className="w-4.5 h-4.5"/>}
          variant="ghost"
          size="md"
          className="px-0 text-sm text-text-primary01 font-medium gap-1 hover:text-brand-primary"
          onClick={()=>navigate('/dashboard/projects')}
        >
          Back to Projects
        </Button>
      </div>
      {/* page title */}
        <section className="flex justify-between items-center">

          <div className="space-y-3">
            <h3 className="font-semibold text-text-primary01 text-4xl tracking-wide capitalize">{title}</h3>
            <div className="flex gap-3 items-center">
              <div
                className="text-sm font-medium text-success px-3 py-1.5 border border-[#98EDB2] bg-[#E6FBEC] rounded-full"
              >
                Ongoing
              </div>
              <div className="text-text-body font-medium text-sm">Project ID: #001</div>
            </div>
          </div>

          {/* delete button */}
          <div>
            <Button 
              leftIcon={<Trash className="h-4 w-4"/>}
              variant="outline"
              className="text-sm text-error01 border-error01 rounded-lg p-3 hover:bg-error01/10"
            >
              Delete
            </Button>
          </div>
        </section>
        {/* project details navigation */}
        <section>
          <PageNavigation 
            items={navItems}
            endPath={`/dashboard/projects/${slug}`}
            className="mb-10"
          />
        </section>
        <Outlet/>
    </div>
  )
}
export default ProjectDetailsPage