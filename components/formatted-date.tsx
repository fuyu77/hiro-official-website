import { parseISO, format } from 'date-fns';

interface Props {
  readonly dateString: string;
}

export function FormattedDate({ dateString }: Props) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'yyyy.MM.dd')}</time>;
}
