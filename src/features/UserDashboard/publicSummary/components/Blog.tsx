import { motion } from "framer-motion"
export interface blogProps{
    index: number
    title?: string
    content?: string
    imageSrc: string
}
export const Blog: React.FC<blogProps> = ({
    title = 'Education Reaches 850 students',
    content = 'Our rural education programme provided quality learning resources and trained teachers to undeserved areas',
    imageSrc,
    index
}) => {
  return (
    <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.35, delay: index * 0.25, ease: "easeOut" }}
        whileHover={{ scale: 1.01 }}
        className="card-shadow bg-transparent min-w-89 rounded-2xl">
        {/* blog image */}
        <div className="max-h-50.75">
            <img 
                src={imageSrc} alt="cover photo" 
                className="object-cover rounded-t-2xl"
            />
        </div>
        {/* blog content */}
        <div className="bg-white px-4 py-8 rounded-b-2xl">
            <h3 
                className="mb-2 text-base text-text-primary01 font-semibold"
            >
               {title}
            </h3>
            <p
                className="text-text-body font-medium text-sm leading-normal"
            >
                {content}
            </p>
        </div>

    </motion.div>
  )
}