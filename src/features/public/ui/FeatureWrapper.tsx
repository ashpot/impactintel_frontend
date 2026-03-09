import type { Feature } from "../type"
const FeatureWrapper = ({header, src, body, alt}:Feature) => {
  return (
    <div className="bg-bg-soft py-10 md:px-0 px-4 rounded-[32px]">
        <img 
            src={src} 
            alt={alt}
            className="mx-auto mb-8"
        />
        <div className="space-y-3">
            <h3 
                className="font-semibold text-xl md:text-2xl tracking-wide text-text-title"
            >
                {header}
            </h3>
            <p className="font-medium leading-snug md:text-base text-sm text-text-body md:px-8">
                {body}
            </p>
        </div>
        
    </div>
  )
}
export default FeatureWrapper