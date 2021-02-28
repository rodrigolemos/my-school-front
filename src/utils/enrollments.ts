export const formatStatus = (status: string): string => {
  const description = {
    P: 'Pendente',
    A: 'Aprovada',
    C: 'Cancelada'
  };
  return description[status] || 'Status não informado';
};
