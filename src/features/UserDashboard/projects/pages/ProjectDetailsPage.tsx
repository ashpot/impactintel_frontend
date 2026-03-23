import { Outlet, useParams } from "react-router-dom"

const ProjectDetailsPage = () => {
    const {slug} = useParams()
  return (
    <div>
        <h1>Project: {slug}</h1>
        <Outlet/>
    </div>
  )
}
export default ProjectDetailsPage