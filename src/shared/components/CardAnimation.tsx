import {motion} from "framer-motion"
export interface cardProps {
    children: React.ReactNode
    index: number
    className: string
}
export const CardAnimation = ({
    children,
    index,
    className
}:cardProps) => {
  return (
    <motion.section
      layout
      initial={{ opacity: 0, y: 10}}
      animate={{ opacity: 1, y: 0}}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{scale: 1.01 }}
      className={className}
      >
        {children}
      </motion.section>
  )
}