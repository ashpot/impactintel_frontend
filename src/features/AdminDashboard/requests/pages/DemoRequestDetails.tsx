import PageTransition from "@/shared/components/PageTransition"
import { useParams } from "react-router-dom"

const DemoRequestDetails = () => {
    const { slug } = useParams()
    const detailTitle = slug?.replaceAll('-', ' ')
  return (
    <PageTransition>
        <div>
            Demo Request Details for <span className="capitalize">{detailTitle}</span>
        </div>
    </PageTransition>
    
  )
}

export default DemoRequestDetails
