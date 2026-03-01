type introProps ={
    header: string
    content: string
}
const Intro = ({header, content}:introProps) => {
  return (
    <div className='px-40 space-y-3 mb-10 text-center'>
        <h2 
            className="leading-tight font-jakarta text-text-title font-semibold text-6xl"
        >
            {header}
        </h2>
        <p className="px-30 leading-snug font-lato text-text-body font-medium text-xl ">
            {content}
        </p>
    </div>

  )
}

export default Intro
