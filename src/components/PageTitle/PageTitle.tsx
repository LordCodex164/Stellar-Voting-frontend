
interface PageTitleProps {
    title: string
}

const PageTitle = ({title}: PageTitleProps) => {
  return (
    <div>
        <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  )
}

export default PageTitle