import { parseISO, format } from 'date-fns';

export const formatDate = (date: Date): string => {
  return format(parseISO(date.toLocaleString('pt-br')), "'dia' dd/MM/yy, 'às' HH:mm'h'");
};

export const simpleDate = (date: Date): string => {
  if (!date) return;
  return format(parseISO(date.toLocaleString('pt-br')), 'dd/MM/yy');
};
