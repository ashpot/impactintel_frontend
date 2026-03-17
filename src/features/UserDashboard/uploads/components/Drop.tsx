import Button from "@/shared/ui/Button"
import { Upload } from "lucide-react"

const Drop = () => {
  return (
    <div className="grid rounded-xl bg-dashboard-bg border border-border-secondary min-h-95 p-8">
        <div className="flex flex-col rounded-xl border-2 border-dashed border-[#C5C6C7] items-center justify-center gap-4 bg-bg-main">
            <Button variant="ghost" className="rounded-full bg-nav-active p-5">
                <Upload className="text-brand-primary w-8 h-8"/>
            </Button>
            <div className="space-y-2">
                <p className="text-sm font-medium text-text-primary01">Drag & drop files here or browse</p>
                <p className="text-xs text-text-body">Supports PDF, Excel, jpeg, (Max 50MB per file)</p>
            </div>
            <Button variant="primary" className="px-9 py-2.5 text-sm">
                Browse files
            </Button>
        </div>
    </div>

    
  )
}

export default Drop
