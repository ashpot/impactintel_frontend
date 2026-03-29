const Container = ({children, className, title, subtitle}: 
    {children: React.ReactNode, className?: string, title: string, subtitle?: string}) => {
  return (
    <div className={`bg-white rounded-3xl border border-line p-6 font-lato card-shadow ${className}`}>
        <h2 className={`text-lg font-semibold text-text-primary01 ${!subtitle && 'mb-6'}`}>{title}</h2>
        <p className="text-sm text-text-body mb-6">{subtitle}</p>
        {children}
    </div>
  )
}
export default Container
