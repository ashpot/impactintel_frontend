import { motion } from "framer-motion";
import type { Logo } from "../type";

interface MarqueeProps {
  logos: Logo[];
  duration?: number;
  reverse?: boolean;
}

const Marquee: React.FC<MarqueeProps> = ({
  logos,
  duration = 30,
  reverse = false,
}) => {
  const duplicated = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden w-full">
      <motion.div
        className="flex gap-10 w-max"
        animate={{
          x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          duration,
          ease: "linear",
        }}
      >
        {duplicated.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center min-w-[150px]"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-12 object-contain opacity-85 hover:opacity-100 transition"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
export default Marquee
