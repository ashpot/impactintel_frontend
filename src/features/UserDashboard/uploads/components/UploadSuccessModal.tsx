import Button from "@/shared/ui/Button"
import { motion } from "framer-motion"

const UploadSuccessModal = () => {
  return (
    // modal
    <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute flex z-50 justify-center items-center inset-0 bg-dashboard-bg/80 backdrop-blur-[1px]">
        {/* modal container */}
      <motion.div 
        initial={{ opacity: 0, scaleX: 0.9, scaleY: 0.95, y: 10 }}
        animate={{ opacity: 1, scaleX: 1, scaleY: 1, y: 0 }}
        transition={{ 
            duration: 0.3, 
            ease: [0.2, 0, 0, 1], 
        }}
        style={{ originX: 0.5, originY: 0.5 }}
        className="border border-line max-w-md rounded-2xl bg-white shadow-[0_1px_3px_0_#1D35580F] p-6 flex 
            flex-col text-center items-center justify-center gap-3.5"
        >
            {/* icon */}
            <span>
                <img 
                    src="/src/assets/icons/success.svg" 
                    alt="success"
                    className="w-15 h-15" 
                />
            </span>
            {/* text */}
            <div className="space-y-2">
                <h3 className="font-semibold text-xl ">Upload Successful</h3>
                <p className="test-sm text-text-body">Water Project Report Q2.pdf has been uploaded Successful and is ready for review.</p>
            </div>
            <Button variant="primary" className="w-full py-2.5">
                Done
            </Button>
      </motion.div>
    </motion.section>
  )
}

export default UploadSuccessModal
