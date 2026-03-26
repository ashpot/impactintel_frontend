import Drop from "@/shared/components/Drop"
import UploadedDocumentsTable from "../../components/UploadedDocumentsTable"

const Documents = () => {
  return (
    <div className="space-y-7">
      <Drop />
      <UploadedDocumentsTable />
    </div>
  )
}

export default Documents
