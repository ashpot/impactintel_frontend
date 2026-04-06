type headerProps = {
    title?: string,
    body: string
}
const PageTitle = (props:headerProps) => {
  return (
    <div className="space-y-1">
      <h1 className="font-semibold text-text-primary01 text-4xl tracking-wide capitalize">{props.title}</h1>
      <p className="font-medium text-base text-text-body">{props.body}</p>
    </div>
  )
}

export default PageTitle
