import type React from "react"
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;  
  subtitle?: string;
}

const Container = ({ 
  children, 
  className = "",
  title, 
  subtitle, 
  ...rest 
}: ContainerProps) => {
  return (
    <div 
      {...rest} 
      className={`bg-white rounded-3xl border border-line p-6 font-lato card-shadow ${className}`}
    >
      <h2 className={`text-lg font-semibold text-text-primary01 ${!subtitle ? 'mb-6' : 'mb-1'}`}>
        {title}
      </h2>
  
      {subtitle && (
        <p className="text-sm text-text-body mb-6">
          {subtitle}
        </p>
      )}

      {children}
    </div>
  )
}

export default Container