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
    <div className="mx-auto flex items-center justify-center w-[100%]">
      <div className="relative w-full h-full rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-7 shadow-2xl">
        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={src}
            alt='avatar'
            className="md:w-14 md:h-14 w-11 h-11 rounded-full object-cover"
          />
          <div>
            <h3 className="md:text-xl text-base font-medium text-text-on-dark font-lato ">
              {name}
            </h3>
            <p className="md:text-sm text-xs text-text-muted font-medium font-lato">
              {role}
            </p>
          </div>
        </div>

        {/* Testimonial Text */}
        <p className="md:text-[15px] text-[13px] leading-relaxed mb-6 text-text-muted-1">
          {quote}
        </p>

        {/* Star Rating */}
        <div className="flex gap-1 text-yellow-400">
          {Array.from({ length: star }).map((_, index) => (
            <img 
                key={index}
                src={starIcon} 
                alt='star' 
                className='w-[14px] h-[14px]'
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default TestimonialCard