import { parseISO, format } from 'date-fns'

export const formatDate = (date: Date): string => {
  // eslint-disable-next-line quotes
  return format(parseISO(date.toLocaleString('pt-br')), "'dia' dd/MM, 'às' HH:mm'h'")
}
