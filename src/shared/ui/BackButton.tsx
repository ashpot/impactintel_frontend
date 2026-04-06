import { ChevronLeft } from "lucide-react"
import Button from "./Button"
import { useNavigate } from "react-router-dom"

interface buttonProps{
    path: string
    children: React.ReactNode
}
const BackButton = ({path, children}:buttonProps) => {
    const navigate = useNavigate()
  return (
   <Button
        variant="ghost"
        leftIcon={<ChevronLeft className="w-5 h-5"/>}
        className="px-0 text-text-body font-medium text-sm gap-1 hover:cursor-pointer"
        onClick={()=>navigate(path)}
    >
        {children}
    </Button>
  )
}
export default BackButton