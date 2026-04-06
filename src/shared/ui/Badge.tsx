const Badge = ({className, name}:{className:string, name:string}) => {
  return (
    <div className={`px-2 py-1 rounded-lg ${className}`}>{name}</div>
  )
}

export default Badge