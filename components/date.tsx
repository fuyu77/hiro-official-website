import { parseISO, format } from 'date-fns'

const Date: React.FC<{ dateString: string }> = ({ dateString }) => {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'yyyy.MM.dd')}</time>
}

export default Date
