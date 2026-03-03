import starIcon from '@/assets/icons/star.svg'
import type { testimonial } from '../type';
const TestimonialCard = ({
    src,
    name,
    role,
    quote,
    star,
}: testimonial)=>{
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full h-full rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-7 shadow-2xl">
        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={src}
            alt='avatar'
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-medium text-text-on-dark font-lato ">
              {name}
            </h3>
            <p className="text-sm text-text-muted font-medium font-lato">
              {role}
            </p>
          </div>
        </div>

        {/* Testimonial Text */}
        <p className="text-[15px] leading-relaxed mb-6 text-text-muted-1">
          {quote}
        </p>

        {/* Star Rating */}
        <div className="flex gap-1 text-yellow-400">
          {Array.from({ length: star }).map((_, index) => (
            <img 
                key={index}
                src={starIcon} 
                alt='star' 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default TestimonialCard