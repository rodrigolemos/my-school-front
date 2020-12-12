import { parseISO, format } from 'date-fns'

export const formatLog = (date: string): string => {
  return format(parseISO(date), "'Acesso dia' dd/MM, 'às' HH:mm'h'")
}
